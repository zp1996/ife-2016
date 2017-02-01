import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/items';
import config from '../config';
import Icon from '../components/Icon/index';
import Calendar from '../components/Calendar/index';

class Question extends Component {
	constructor(props) {
		super(props);
		const { question } = props,
			has = !!Object.keys(question).length,
			date = new Date();
		this.state = has ? question : {
			title: config.default_title,
			status: null,
			questions: Object.create(null),
			date: [ date.getFullYear(), date.getMonth() + 1, date.getDate()]
		};
		this.state.area = false;
		this.state.calendar = false;
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
	render() {
		const { title, area, date, calendar } = this.state;
		return (
			<div className="question-container">
				<div className="item-title">
					<h2 className="title">{title}</h2>
				</div>
				<div className="add-question-container">
					<div className="question-type"
						style={ area ? {
							height: "80px"
						} : {
						}}
					>aaadsdsdsdsdsd</div>
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

