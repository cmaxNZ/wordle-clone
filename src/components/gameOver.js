import React, { useContext } from "react";
import { AppContext } from "../App";


function GameOver() {
     const { gameOver, word, currentAttempt, initGame } = useContext(AppContext);
	return (
    <div className="gameOver">
        <h3>{gameOver.won ? "You won!" : "You lost!"}</h3>
        <h1>Wordle: {word}</h1>
        {gameOver.won && (<h3>You guessed in {currentAttempt.attempt + 1} tries</h3>)}
        <h1 onClick={initGame}>Play again?</h1>
    </div>
    );
}

export default GameOver;