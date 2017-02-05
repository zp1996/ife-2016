export const addItem = (info) => ({
	type: 'ADD_ITEM',
	info
});

export const delItem = (id) => ({
	type: 'DEL_ITEM',
	id
});

export const changeTitle = (id, title) => ({
	type: 'CHANGE_TITLE',
	title,
	id
});

export const changeDate = (id, date) => ({
	type: 'CHANGE_DATE',
	date,
	id
});

export const publishItem = (id) => ({
	type: 'PUBLISH_ITEM',
	id
});

export const updateQuestions = (id, questions) => ({
	type: 'UPDATE_QUESTIONS',
	id,
	questions
});

export const answerItem = (id, answers) => ({
	type: 'ANSWER_ITEM',
	id,
	answers
});