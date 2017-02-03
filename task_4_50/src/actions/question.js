export const addQuestion = (type) => ({
	type: 'ADD_QUESTION',
	type
});

export const toggleQuestion = (id) => ({
	type: 'TOGGLE_ITEM',
	id
});
