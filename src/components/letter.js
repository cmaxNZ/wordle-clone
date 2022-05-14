import React, { useContext } from "react";
import { AppContext } from "../App";


function Letter({letterPosition, attemptValue}) {
	const { board, testWord } = useContext(AppContext);
	const letter = board[attemptValue][letterPosition]?.value;
	const state = board[attemptValue][letterPosition]?.state || '';
	const classes = `letter ${state}`;

	return <div className={classes}>{letter}</div>
}

export default Letter;