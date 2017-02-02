import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/items';
import config from '../config';
import Icon from '../components/Icon/index';
import Calendar from '../components/Calendar/index';
import Button from '../components/Button/index';
import IconButton from '../components/Button/IconButton';
import utils from "../utils";

class Question extends Component {
	constructor(props) {
		super(props);

		const { question } = props,
			date = new Date();

		this.has = !!Object.keys(question).length;

		this.state = this.has ? question : {
			title: config.default_title,
			status: null,
			questions: Object.create(null),
			date: [ date.getFullYear(), date.getMonth() + 1, date.getDate()]
		};
		// 内部显示状态
		this.state.area = false;
		this.state.calendar = false;
		this.state.activeInput = '';
	}
	handleArea() {
		this.setState({
			area: !this.state.area
		});
	}
	chooseDate() {
		this.setState({
			calendar: !this.state.calendar
		});
	}
	changeDate(date) {
		this.setState({
			date
		});
		this.chooseDate();
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
	diff() {
		if (!this.has) {
			const { questions, status, date, title } = this.state;
			utils.Data.addItem({
				questions,
				status, 
				date,
				title
			});
		}	
		console.log(utils.Data);
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
					<div className="add-question" onClick={::this.handleArea}>
						<span>
							<Icon name="plus" />
							添加问题
						</span>
					</div>
				</div>
				<div className="button-area">
					<div className="date">
						<label>问卷截止日期：</label>
						<span onClick={::this.chooseDate}>
							{date.join('-')}
						</span>
					</div>
					<Button text={"发布问卷"} isFixed={false} handleClick={:: this.diff} />
					<Button text={"保存问卷"} isFixed={false} handleClick={:: this.diff} />
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

