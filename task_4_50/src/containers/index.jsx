import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import { toggleQuestion } from "../actions/question";
import { delItem } from "../actions/items";

import IconButton from '../components/Button/IconButton';
import Button from '../components/Button/index';

import { tags } from "../config.js";

var Dispatch = null;

const linkTo = () => {
	browserHistory.push('/add-question')
};

const edit = (id) => {
	Dispatch(toggleQuestion(id));
	browserHistory.push(`/question/${id}`);
};

const del = (id) => {
	Dispatch(delItem(id));
};

const getStatus = (val) => {
	switch(val) {
		case 1:
			return <span className="status-publish">发布中</span>;
		case -1:
			return <span className="status-end">已经结束</span>;
		default:
			return '未发布';
	}
};

const getButtons = ({ status }, id) => {
	var look;
	if (status) {
		look = (
			<Link to="/answer" className="button-link">
				回答问卷
			</Link>
		);
	} else {
		look = (
			<Link to="/look-item-data" className="button-link">
				查看数据
			</Link>
		);
	}
	return (
		<span>
			<Button text="编辑" handleClick={ () => { edit(id) } } />
			<Button text="删除" handleClick={ () => { del(id) } }/>
			{look}
		</span>
	);
};

const getTbody = (items, tagKeys) => {
	const keys = Object.keys(items);
	return keys.map(
		(id) => {
			const val = items[id];
			if (!val) return null;
			return (
				<tr key={`tr-${id}`} className="show-items-tr">
					{
						tagKeys.map((key, i) => (
							<td key={`td-${i}`}>
								{key === 'status' ? getStatus(val[key]) : val[key]}
							</td>
						))
					}
					<td>
						{getButtons(val, id)}	
					</td>
				</tr>
			);
		}
	)
};

const Table = ({ items }) => {
	const tagKeys = Object.keys(tags);
	return (
		<table className="show-items">
			<thead className="show-items-title">
				<tr>
					{
						tagKeys.map((val, i) => (
							<th key={`th-${i}`} 
								className={`show-items-td-${val}`} >
								{tags[val]}
							</th>
						))
					}
					<th className="show-items-td-handle">
						操作
						<IconButton 
							text="新增问卷" 
							icon="plus"
							isActive={true}
							handleClick={linkTo} 
						/>
					</th>
				</tr>
			</thead>
			<tbody className="show-items-body">
				{
					getTbody(items, tagKeys)
				}
			</tbody>
		</table>
	);
};

const IndexContainer = ({ data, dispatch }) => {
	const hasItem = Object.keys(data.items).length !== 0;
	Dispatch = dispatch;
	return hasItem ? 
		(
			<div className="index-container"> 
				{
					Table(data)
				}
			</div>
		) :
		(
			<div className="no-index-container">
				<IconButton text="新建问卷" 
						icon="plus" 
					isActive={true} 
					handleClick={linkTo}
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