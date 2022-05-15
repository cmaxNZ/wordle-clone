import './App.css';
import Board from './components/board';
import Keyboard from './components/keyboard';
import GameOver from './components/gameOver';
import { defaultBoard, generateWords, defaultGuessedLetters, defaultAttempts } from "./words";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

function App() {
	const [board, setBoard] = useState(defaultBoard);
	const [words, setWords] = useState();
	const [word, setWord] = useState();
	const [currentAttempt, setCurrentAttempt] = useState(defaultAttempts);
	const [guessedLetters, setGuessedLetters] = useState(defaultGuessedLetters);
	const [gameOver, setGameOver] = useState({ gameOver: false, won: false });

	// if strict mode is on it will set this twice as the render is done twice...
	useEffect(() => {
		generateWords().then((words) => {
			setWords(words);
			const word = words[Math.floor(Math.random() * words.length)];
			setWord(word.toUpperCase());
		});
	}, []);

	const initGame = () => {
		const word = words[Math.floor(Math.random() * words.length)];
		setWord(word.toUpperCase());
		console.log('reset word', word);
		setBoard(defaultBoard);
		setGameOver({ gameOver: false, won: false });
		setGuessedLetters(defaultGuessedLetters);
		setCurrentAttempt(defaultAttempts);
	};

	const onLetter = (keyValue) => {
		// check ended game
		if (gameOver.gameOver || currentAttempt.attempt >= board.length) return;
		// don't allow adding letter to full row
		if (currentAttempt.letterPosition >= board[0].length) return;

		const newBoard = [...board];
		newBoard[currentAttempt.attempt][currentAttempt.letterPosition].value = keyValue.toUpperCase();
		setBoard(newBoard);
		setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition + 1 });

		guessedLetters['ENTER'] = currentAttempt.letterPosition === board[0].length - 1 ? '' : 'disabled';
		guessedLetters['⇦'] = '';
		setGuessedLetters(guessedLetters);
	};

	const onEnter = () => {
		// check ended game
		if (gameOver.gameOver || currentAttempt.attempt >= board.length) return
		// don't allow submit if row not full
		if (currentAttempt.letterPosition !== board[0].length) return

		const attemptWord = board[currentAttempt.attempt].map(i => i.value).join('');
		if (word === attemptWord) {
			for (let elem of board[currentAttempt.attempt]) {
				elem.state = 'correct';
				guessedLetters[elem.value] = elem.state;
			}
			setGameOver({ gameOver: true, won: true });
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
		guessedLetters['ENTER'] = 'disabled';
		guessedLetters['⇦'] = 'disabled';
		setGuessedLetters(guessedLetters);
		if (currentAttempt.attempt >= board.length - 1) {
			setGameOver({ gameOver: true, won: false });
		} else {
			setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0 });
		}
	};

	const onDelete = () => {
		// check ended game
		if (gameOver.gameOver ||  currentAttempt.attempt >= board.length) return
		// don't allow backspace on empty row
		if (currentAttempt.letterPosition < 1 ) return

		const newBoard = [...board];
		newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1].value = '';
		setBoard(newBoard);
		setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition - 1 });
		// show backspace if row is empty
		if (currentAttempt.letterPosition <= 1) {
			guessedLetters['⇦'] = 'disabled';
			setGuessedLetters(guessedLetters);
		}
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
						gameOver,
						word,
						initGame
					}}
				>
					<Board />
					{gameOver.gameOver ? <GameOver /> : <Keyboard />}
				</AppContext.Provider>
			</div>
		</div>
	);
}

export default App;
