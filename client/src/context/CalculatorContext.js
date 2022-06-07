/** @format */

import React, { useState, createContext, useCallback } from "react";
import { NUMBERS, OPERATIONS } from "../libs/constants";
import { BUTTON_ENUM, ACTIONS } from "../libs/enum";

const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
	const [calculatorData, setCalculatorData] = useState({
		currentOperand: "",
		operation: "",
		previousOperand: "",
		clear: false,
	});

	const handleButtonClick = useCallback(
		(e) => {
			e.preventDefault();
			let newInput = e.target.value;

			//CONDITIONS
			const currentOperandEmpty = calculatorData.currentOperand === "";
			const currentOperandNull = calculatorData.currentOperand === null;
			const previousOperandEmpty = calculatorData.previousOperand === "";
			//COMPOUND CONDITIONS
			const isCurrentOrPreviousOperandEmpty =
				currentOperandEmpty || previousOperandEmpty;
			const isCurrentAndPreviousOperandEmpty =
				currentOperandEmpty && previousOperandEmpty;
			const isCurrentOperandMissingAndPreviousOperandPresent =
				currentOperandNull && !previousOperandEmpty;
			let actionType;
			if (
				NUMBERS.includes(newInput) ||
				newInput === BUTTON_ENUM.DOT ||
				newInput === BUTTON_ENUM.NEGATIVE
			) {
				actionType = ACTIONS.ADD_DIGIT;
			} else if (OPERATIONS.includes(newInput)) {
				actionType = ACTIONS.ADD_OPERATION;
			} else if (newInput === BUTTON_ENUM.PERCENTAGE) {
				actionType = ACTIONS.GET_PERCENTAGE;
			} else if (newInput === BUTTON_ENUM.CLEAR) {
				actionType = ACTIONS.RESET;
			}

			switch (actionType) {
				case ACTIONS.ADD_DIGIT:
					if (
						newInput === BUTTON_ENUM.ZERO &&
						calculatorData.currentOperand === BUTTON_ENUM.ZERO
					) {
						return;
					}

					if (
						newInput === BUTTON_ENUM.NEGATIVE &&
						(currentOperandEmpty || currentOperandNull)
					) {
						return;
					}
					if (
						newInput === BUTTON_ENUM.DOT &&
						calculatorData.currentOperand.includes(BUTTON_ENUM.DOT)
					) {
						return;
					}
					let newValue;

					if (
						calculatorData.currentOperand === "" &&
						newInput === BUTTON_ENUM.DOT
					) {
						newValue = `0${newInput}`;
					} else if (newInput === BUTTON_ENUM.NEGATIVE) {
						//APPLYING NEGATIVE OR POSITIVE

						newValue = `${calculatorData.currentOperand || ""}`;
						if (newValue.includes("-")) {
							newValue = newValue.replace("-", "");
						} else {
							newValue = `-${newValue}`;
						}
					} else {
						newValue = calculatorData.clear
							? newInput
							: `${calculatorData.currentOperand || ""}${newInput}`;
					}
					if (newValue.length > 13) {
						return;
					}

					//SETTING THE NEW VALUE TO CURRENT OPERAND
					setCalculatorData((prevData) => ({
						...prevData,
						currentOperand: newValue,
						clear: false,
					}));
					return;
				case ACTIONS.ADD_OPERATION:
					if (isCurrentAndPreviousOperandEmpty) {
						return;
					}
					if (
						isCurrentOrPreviousOperandEmpty &&
						newInput === BUTTON_ENUM.EQUALS
					) {
						return;
					}

					if (isCurrentOperandMissingAndPreviousOperandPresent) {
						if (newInput === BUTTON_ENUM.EQUALS) {
							return;
						}
						setCalculatorData((prevData) => ({
							...prevData,
							operation: newInput,
						}));
						return;
					}

					if (previousOperandEmpty) {
						setCalculatorData((prevData) => ({
							operation: newInput,
							previousOperand: prevData.currentOperand,
							currentOperand: null,
						}));
						return;
					}

					if (newInput === BUTTON_ENUM.EQUALS) {
						setCalculatorData((prevData) => ({
							...prevData,
							currentOperand: compute(
								prevData.currentOperand,
								prevData.previousOperand,
								prevData.operation
							),
							operation: "",
							previousOperand: "",
							clear: true,
						}));
						return;
					}

					setCalculatorData((prevData) => ({
						...prevData,
						previousOperand: compute(
							prevData.currentOperand,
							prevData.previousOperand,
							prevData.operation
						),
						operation: newInput,
						currentOperand: "",
					}));
					return;

				case ACTIONS.GET_PERCENTAGE:
					console.log("percentage");
					if (isCurrentAndPreviousOperandEmpty) {
						return;
					}
					if (previousOperandEmpty) {
						setCalculatorData((prevData) => ({
							...prevData,
							currentOperand: compute(100, prevData.currentOperand, newInput),
							operation: "",
							previousOperand: "",
						}));
						return;
					}
					if (
						currentOperandNull &&
						!previousOperandEmpty &&
						calculatorData.operation
					) {
						setCalculatorData((prevData) => ({
							...prevData,
							currentOperand: compute(100, prevData.previousOperand, newInput),
							operation: "",
							previousOperand: "",
						}));
						return;
					}
					return;
				case ACTIONS.RESET:
					setCalculatorData({
						currentOperand: "",
						operation: "",
						previousOperand: "",
						clear: false,
					});
					return;
				default:
					break;
			}
		},
		[calculatorData]
	);

	const compute = (current, previous, operation) => {
		const prevNumber = parseFloat(previous);
		const currentNumber = parseFloat(current);

		if (isNaN(prevNumber) || isNaN(currentNumber)) return "";
		let computation = "";
		switch (operation) {
			case BUTTON_ENUM.ADD:
				computation = prevNumber + currentNumber;
				break;
			case BUTTON_ENUM.SUBTRACT:
				computation = prevNumber - currentNumber;
				break;
			case BUTTON_ENUM.MULTIPLY:
				computation = prevNumber * currentNumber;
				break;
			case BUTTON_ENUM.DIVIDE:
				computation = prevNumber / currentNumber;
				break;
			case BUTTON_ENUM.PERCENTAGE:
				computation = prevNumber / currentNumber;
				break;
			default:
				break;
		}

		//CHECKING IF IT IS WHOLE NUMBER OR NOT
		let decimals = Number(computation % 1);
		if (decimals !== 0) {
			//LIMITING DECIMAL PLACES
			computation = Number(computation).toFixed(3);
			return String(computation);
		}
		return computation.toString();
	};

	return (
		<CalculatorContext.Provider
			value={{ calculatorData, compute, handleButtonClick }}>
			{children}
		</CalculatorContext.Provider>
	);
};

export default CalculatorContext;
