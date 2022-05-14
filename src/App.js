import './App.css';
import Board from './components/board';
import Keyboard from './components/keyboard';
import { boardDefault, testWord, defaultBoardObject } from "./words";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

function App() {
	const [board, setBoard] = useState(defaultBoardObject);
	const [word, setWord] = useState(testWord.toUpperCase());
	const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPosition: 0 });
	const [guessedLetters, setGuessedLetters] = useState(new Object());

	const onLetter = (keyValue) => {
		// check ended game
		if (currentAttempt.attempt >= board.length) return
		// don't allow adding letter to full row
		if (currentAttempt.letterPosition >= board[0].length) return
		const newBoard = [...board];
		newBoard[currentAttempt.attempt][currentAttempt.letterPosition].value = keyValue.toUpperCase();
		setBoard(newBoard);
		setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition + 1 });
	};

	const onEnter = () => {
		// check ended game
		if (currentAttempt.attempt >= board.length) return
		// don't allow submit if row not full
		if (currentAttempt.letterPosition !== board[0].length) return

		const attemptWord = board[currentAttempt.attempt].map(i => i.value).join('');
		if (word === attemptWord) {
			for (let elem of board[currentAttempt.attempt]) {
				elem.state = 'correct';
				guessedLetters[elem.value] = elem.state;
			}
			setGuessedLetters(guessedLetters);
			setCurrentAttempt({ attempt: board.length }); // setting attempt to equal to length of board 'ends' game
			return;
		} else {
			for (let [i, elem] of board[currentAttempt.attempt].entries()) {
				if (word.includes(elem.value)) {
					if (word[i] === elem.value) {
						elem.state = 'correct';
					} else {
						elem.state = 'almost';
					}
					// update the guessed letters collection
					if (guessedLetters[elem.value]) {
						if (guessedLetters[elem.value] !== elem.state && guessedLetters[elem.value] !== 'correct') {
							guessedLetters[elem.value] = elem.state;
						}
					} else {
						guessedLetters[elem.value] = elem.state;
					}
				} else {
					// set incorrect letter for keyboard display
					guessedLetters[elem.value] = 'error';
				}
			}
		}
		setGuessedLetters(guessedLetters);
		setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0 }); // setting attempt to equal to length of board 'ends' game
	};

	const onDelete = () => {
		// check ended game
		if (currentAttempt.attempt >= board.length) return
		// don't allow backspace on empty row
		if (currentAttempt.letterPosition === 0) return
		const newBoard = [...board];
		newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = null;
		setBoard(newBoard);
		setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition - 1 });
	};

	return (
		<div className="App">
			<nav>
				<h1>Wordle</h1>
			</nav>
			<div className='game'>
				<AppContext.Provider
					value = {{ 
						board, 
						setBoard, 
						currentAttempt, 
						setCurrentAttempt, 
						onLetter, 
						onDelete, 
						onEnter,
						guessedLetters, 
					}}
				>
					<Board />
					<Keyboard />
				</AppContext.Provider>
			</div>
		</div>
	);
}

export default App;
