import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addItem, changeTitle, changeDate } from '../actions/items';

import config from '../config';
import { Data, clone } from "../utils";

import Icon from '../components/Icon/index';
import Calendar from '../components/Calendar/index';
import Button from '../components/Button/index';
import IconButton from '../components/Button/IconButton';


class Question extends Component {
	static defaultItem() {
		const date = new Date();
		return {
			title: config.default_title,
			status: 0,
			questions: Object.create(null),
			date: [ date.getFullYear(), date.getMonth() + 1, date.getDate()]
		};
	}
	constructor(props) {
		super(props);
		const { question } = props,
			{ id } = this.props.params;
		this.has = !!id;
		this.state = this.has ? clone(question) : Question.defaultItem();
		// 内部显示状态
		this.state.area = false;
		this.state.calendar = false;
		this.state.activeInput = '';
	}
	changeInnerState(key) {
		this.setState({
			[key]: !this.state[key]
		});
	}
	changeDate(date) {
		this.setState({
			date
		});
		this.changeInnerState('calendar');
	}
	inputBlur() {
		this.setState({
			activeInput: ''
		});
	}
	changeValue(type, e) {
		this.setState({
			[type]: e.target.value
		});
	}
	showInput(val) {
		this.setState({
			activeInput: val
		});
	}
	patch() {
		// 新增问卷 不用diff
		const { dispatch } = this.props;
		if (!this.has) {
			const { questions, status, date, title } = this.state;
			dispatch(
				addItem({
					questions,
					status, 
					date,
					title
				})
			);
		} else {
			const patches = this.diff(this.state),
				len = patches.length;
			for (let i = 0; i < len; i++) {
				dispatch(
					patches[i]()
				);
			}
			Data.writeLocalStroage(); 
		}
	}
	diff(state) {
		const { question } = this.props,
			patches = [],
			{ id, title, date } = state;
		if (question.title !== title) {
			patches.push(
				() => changeTitle(id, title)
			);
		}	
		if (question.date.join('') !== date.join('')) {
			patches.push(
				() => changeDate(id, date)
			);
		}
		return patches;
	}
	render() {
		const { title, area, date, calendar, activeInput } = this.state;
		return (
			<div className="question-container">
				<div className="item-title" onClick={this.showInput.bind(this, 'title')}>
					{	
						activeInput === 'title' ?
						<input className="title title-input"
							autoFocus
							type="text" value={title}
							onBlur={::this.inputBlur} 
							onChange={this.changeValue.bind(this, 'title')}
						/>
						: <h2 className="title">{title}</h2>
					}
				</div>
				<div className="questions-container">

				</div>
				<div className="add-question-container">
					<div className="question-type"
						style={ area ? {
							height: "80px"
						} : {
						}}
					>
						<IconButton text="单选" icon="circle-blank" />
						<IconButton text="多选" icon="check" />
						<IconButton text="文本" icon="list-alt" />
					</div>
					<div className="add-question" onClick={this.changeInnerState.bind(this, 'area')}>
						<span>
							<Icon name="plus" />
							添加问题
						</span>
					</div>
				</div>
				<div className="button-area">
					<div className="date">
						<label>问卷截止日期：</label>
						<span onClick={this.changeInnerState.bind(this, 'calendar')}>
							{date.join('-')}
						</span>
					</div>
					<Button text={"发布问卷"} isFixed={false} handleClick={::this.patch} />
					<Button text={"保存问卷"} isFixed={false} handleClick={::this.patch} />
				</div>
				<div className="calendar-area">
					{
						calendar ? 
							(<Calendar extendClass="question-calendar" 
								date={date} 
								handleClick={::this.changeDate}
							/>) 
							: null
					}
				</div>
			</div>
		);
	}	
}

const mapStateToProps = (state) => ({
	item: state.item,
	question: state.question
});

const DataQuestion = connect(
	mapStateToProps
)(Question);

export default DataQuestion;