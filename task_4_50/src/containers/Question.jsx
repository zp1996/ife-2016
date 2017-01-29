import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/items';
import config from '../config';
import Icon from '../components/Icon/index';

class Question extends Component {
	constructor(props) {
		super(props);
		const { question } = props,
			has = !!Object.keys(question).length;
		this.state = has ? question : {
			title: config.default_title,
			status: null,
			questions: Object.create(null)
		};
		this.state.area = false;
	}
	handleArea() {
		this.setState({
			area: !this.state.area
		});
		console.log(this.state.area);
	}
	render() {
		const { title, area } = this.state;
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
					<h1>zp1996</h1>
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

