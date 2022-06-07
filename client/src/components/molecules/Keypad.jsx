/** @format */

import React from "react";
import { BUTTON_ENUM } from "../../libs/enum";
import Button from "../atoms/Button.jsx";

const Keypad = () => {
	const buttonValues = Object.values(BUTTON_ENUM);
	const showButtons = buttonValues.map((button, idx) => (
		<Button value={button} key={idx} />
	));

	return (
		<div className='grid grid-cols-4 w-full gap-1 bg-gray-300 p-3'>
			{showButtons}
		</div>
	);
};

export default Keypad;
