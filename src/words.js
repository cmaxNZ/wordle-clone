import wordBank from './wordle-bank.txt';

export const defaultGuessedLetters = { 'ENTER':'disabled', '⇦':'disabled' };
export const defaultBoard = Array.from(Array(5), () => {
	return Array.from(Array(5), () => {
		return { "value": '', "state": '' };
	})
});
export const defaultAttempts = { attempt: 0, letterPosition: 0 };

export const generateWords = async () => {
	let wordArray;
	await fetch(wordBank)
		.then((response) => response.text())
		.then((result) => {
			wordArray = result.split('\n');
		});

	return wordArray;
}