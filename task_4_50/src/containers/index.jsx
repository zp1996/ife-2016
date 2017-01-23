import React from 'react';
import { connect } from 'react-redux';

const IndexShow = ({ data }) => {
	return (
		<span>{data.next_id}</span>
	);
};

const mapStateToProps = (state) => ({
	data: state.item
});

const DataIndexShow = connect(
	mapStateToProps
)(IndexShow);

export default DataIndexShow;