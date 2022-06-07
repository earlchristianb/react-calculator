/** @format */

import React, { useContext } from "react";
import CalculatorContext from "../../context/CalculatorContext";

const Screen = () => {
	const { calculatorData } = useContext(CalculatorContext);
	
	return (
		<div className='border-8 border-gray-300 bg-white w-full h-20 flex justify-center items-end px-4 flex-col relative'>
			<div className='flex space-x-3'>
				<p>{calculatorData.previousOperand}</p>
				<p>{calculatorData?.operation}</p>
			</div>
			<p className='absolute top-2 left-2 text-gray-300 text-xs'>
				Earl Bernardo
			</p>
			{calculatorData?.currentOperand}
		</div>
	);
};

export default Screen;
