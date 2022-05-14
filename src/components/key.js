import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({keyValue, keySize = ''}) {
	const { onLetter, onDelete, onEnter, guessedLetters } = useContext(AppContext);
	const keyState = guessedLetters[keyValue] ? guessedLetters[keyValue] : '';
	const classes = `key ${keySize} ${keyState}`;
	
	// keyboard input handed in keyboard.js
	const selectKey = () => {
		switch(keyValue) { 
			case 'ENTER':
				onEnter();
				break;
			case String.fromCharCode(8678):
				onDelete();
				break;
			default:
				onLetter(keyValue);
				break
		}
	};

	return (
		<div 
			className={classes}
			onClick={selectKey}
		>
		{keyValue}
		</div>
	)
}

export default Key;