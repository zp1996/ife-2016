export const addQuestion = (type) => ({
	type: 'ADD_QUESTION',
	question_type: type
});

export const toggleQuestion = (id) => ({
	type: 'TOGGLE_ITEM',
	id
});
