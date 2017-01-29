import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import IconButton from '../components/Button/IconButton';

const IndexContainer = ({ data }) => {
	const hasItem = !!Object.keys(data.items).length;
	return hasItem ? 
		(
			<div>zp1996</div>
		) :
		(
			<div className="no-index-container">
				<IconButton text="新建问卷" 
						icon="plus" 
					isActive={true} 
					handleClick={ () => { browserHistory.push('/add-question') } }
				/>
			</div>
	)	;
};

const mapStateToProps = (state) => ({
	data: state.item
});

const DataIndexContainer = connect(
	mapStateToProps
)(IndexContainer);

export default DataIndexContainer;