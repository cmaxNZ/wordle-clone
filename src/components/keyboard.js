import React, { useCallback, useEffect, useContext } from "react";
import { AppContext } from "../App";
import Key from "./key"

function mapKeys(row) { 
	// check if the key has been used before, pass along state if has been
	return row.map( key => <Key keyValue={key} /> );
}

function Keyboard() {
	const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const row3 = ["Z", "X", "C", "V", "B", "N", "M"];
	const { onLetter, onDelete, onEnter } = useContext(AppContext);
	// on screen key handling is done in keys.js
	const handleKeyboard = useCallback((event) => {
		switch(event.key) { 
			case 'Enter':
				onEnter();
				break;
			case 'Backspace':
				onDelete();
				break;
			default:
				// only allow a-z
				if (String.fromCharCode(event.keyCode).match(/^[A-Za-z]$/)) {
					onLetter(event.key);
				}
				break;
		}
	});

	useEffect(() => {
		document.addEventListener("keyup", handleKeyboard);

		return () => {
			document.removeEventListener("keyup", handleKeyboard);
		};
	}, [handleKeyboard]);
	
	return <div className="keyboard" onKeyUp={handleKeyboard}>
		<div className="row1">
			{mapKeys(row1)}
		</div>
		<div className="row2">
			{mapKeys(row2)}
		</div>        
		<div className="row3">
			<Key keyValue={"ENTER"} keySize={"big"}/>
			{mapKeys(row3)}
			<Key keyValue={String.fromCharCode(8678)} keySize={'big'}/>
		</div>
	</div>
}

export default Keyboard;