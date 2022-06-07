/** @format */

import React, { useContext } from "react";
import CalculatorContext from "../../context/CalculatorContext";

const Screen = () => {
	const { calculatorData } = useContext(CalculatorContext);
	// const limitDecimalPlaces = (value) => {
	// 	let decimal = Number(value % 1);
	// 	if (decimal !== 0) {
	// 		return String(value.toFixed(3));
	// 	}
	// 	return value;
	// };
	return (
		<div className='border-8 border-gray-300 bg-white w-full h-20 flex justify-center items-end px-4 flex-col'>
			<div className='flex space-x-3'>
				<p>{calculatorData.previousOperand}</p>
				<p>{calculatorData?.operation}</p>
			</div>
			{calculatorData?.currentOperand}
		</div>
	);
};

export default Screen;
