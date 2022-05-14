export const testWord = 'tests'
export const defaultBoardObject = Array.from(Array(5), () => {
	return Array.from(Array(5), () => {
		return { "value": '', "state": '' };
	})
});