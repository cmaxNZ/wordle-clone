import React, { useContext } from "react";
import { AppContext } from "../App";


function GameOver() {
     const { gameOver, word, currentAttempt, initGame } = useContext(AppContext);
	return (
    <div className="gameOver">
        <h1>{gameOver.won ? "You won!" : "You lost!"}</h1>
        <h2>Wordle: {word}</h2>
        {gameOver.won && (<h3>You guessed in {currentAttempt.attempt + 1} tries</h3>)}
        <h2 onClick={initGame}>Play again?</h2>
    </div>
    );
}

export default GameOver;