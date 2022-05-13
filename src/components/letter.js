import React, { useContext } from "react";
import { AppContext } from "../App";


function Letter({letterPosition, attemptValue}) {
    const { board, testWord } = useContext(AppContext)
    const letter = board[attemptValue][letterPosition];
    var state = () => {
        if (!testWord) return
        console.log(letter, testWord)
        if (testWord[letterPosition] === letter) {
            return 'correct';
        } else if (testWord.has(letter)) {
            return 'almost';
        }
    };
    const classes = `letter ${state}`
    return <div className={classes}>{letter}</div>
}

export default Letter;