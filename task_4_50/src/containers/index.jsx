import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import { toggleQuestion } from "../actions/question";
import { delItem, publishItem } from "../actions/items";

import Layer from '../components/Layer/index';
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
	
const getTds = {
	status: val => getStatus(val),
	date: val => val.join('-'),
	title: val => val
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

class Buttons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			layer: false,
			layerConfig: {}
		};
	}
	publish() {
		this.setState({
			layer: true,
			layerConfig: {
				content: '该问卷发布成功'
			}
		});
		Dispatch(publishItem(this.props.id));
	}
	del() {
		this.setState({
			layer: true,
			layerConfig: {
				type: 'confirm',
				content: '是否删除该问卷？',
				yes: () => {
					Dispatch(delItem(this.props.id));
				}
			}
		});
	}
	render() {
		const { status, id } = this.props,
			{ layer, layerConfig } = this.state;

		const look = status === 0 ? (
				<Button text="发布问卷" handleClick={::this.publish} />
			) : (
				<Link to="/look-item-data" className="button-link">
					查看数据
				</Link>
			);
		const isAnswer = status === 1 ? (
				<Link to={`/answer/${id}`} className="button-link">
					回答
				</Link>
			) : (
				<Button text="编辑" handleClick={ () => { edit(id) } } />
			);

		return (
			<span>
				{
					layer ? <Layer 
						{...layerConfig}
						destroy={ () => {
							this.setState({
								layer: !layer
							})
						}}
					/> : null
				}
				{isAnswer}
				<Button text="删除" handleClick={::this.del}/>
				{look}
			</span>
		); 
	}
}

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
								{getTds[key](val[key])}
							</td>
						))
					}
					<td>
						<Buttons status={val.status} id={id} />	
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