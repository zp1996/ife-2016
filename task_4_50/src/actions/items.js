export const addItem = (info) => ({
	type: 'ADD_ITEM',
	info
});

export const delItem = (id) => ({
	type: 'DEL_ITEM',
	id
});