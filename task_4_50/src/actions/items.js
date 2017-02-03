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