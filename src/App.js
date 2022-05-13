import './App.css';
import Board from './components/board';
import Keyboard from './components/keyboard';
import { boardDefault } from "./words";
import { createContext, useState } from "react";

export const AppContext = createContext();

function App() {
	const [board, setBoard] = useState(boardDefault);
	const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPosition: 0 })
	const testWord = new Set('tests');

	const onLetter = (keyValue) => {
		// check ended game
		if (currentAttempt.attempt >= board.length) return
		// don't allow adding letter to full row
		if (currentAttempt.letterPosition >= board[0].length) return
		const newBoard = [...board];
		newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyValue.toUpperCase();
		setBoard(newBoard);
		setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition + 1 });
	};

	const onEnter = () => {
		// check ended game
		if (currentAttempt.attempt >= board.length) return
		// don't allow submit if row not full
		if (currentAttempt.letterPosition !== board[0].length) return
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
						onEnter 
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
