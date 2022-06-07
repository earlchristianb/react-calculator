/** @format */

import React, { useContext } from "react";
import CalculatorContext from "../../context/CalculatorContext";
import { NUMBERS, OPERATIONS } from "../../libs/constants";
import { BUTTON_ENUM } from "../../libs/enum";

const Button = ({ value }) => {
	const { handleButtonClick } = useContext(CalculatorContext);

	const backgroundColor = (value) => {
		if (OPERATIONS.includes(value)) {
			return "bg-red-400 text-white font-bold";
		} else if (NUMBERS.includes(value)) {
			return "bg-white";
		} else {
			return "bg-gray-100";
		}
	};

	const occupyTwoColums = value === BUTTON_ENUM.ZERO && "col-span-2";

	return (
		<button
			className={`
			${backgroundColor(value)}
			${occupyTwoColums}
			 shadow-md h-10`}
			onClick={handleButtonClick}
			value={value}>
			{value}
		</button>
	);
};

export default Button;
