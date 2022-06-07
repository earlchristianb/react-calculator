/** @format */

import React from "react";
import Screen from "../atoms/Screen";
import Keypad from "../molecules/Keypad";

const Calculator = () => {
	return (
		<div className='flex flex-col m-auto justify-center items-center h-screen max-w-md'>
			<Screen />
			<Keypad />
		</div>
	);
};

export default Calculator;
