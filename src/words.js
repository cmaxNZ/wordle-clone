export const boardDefault = [...Array(5)].map( () => Array(5)); // defaults to 5 letter word, 6 attempts
export const testWord = 'tests'
const boardEntry = () => { 
	return { "value": null, "state": null };
};
export const defaultBoardObject = Array.from(Array(5), () => {
	return Array.from(Array(5), () => {
		return { "value": null, "state": null };
	})
});