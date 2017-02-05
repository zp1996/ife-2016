import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { answerItem } from '../actions/items';

import { getDomData } from "../utils";

import Button from '../components/Button/index';
import Layer from '../components/Layer/index';
 
class Answer extends Component {
	constructor(props) {
		super(props);
		const { params: { id } } = props,
			{ data: { questions, status} } = props;
		this.id = id;
		if (status !== 1) {
			browserHistory.push('/');
		}
		const { length } = questions,
			answers = [];
		for (let i = 0; i < length; i++) {
			const { type } = questions[i],
				required = type === 'text' ? questions[i].isRequired : true,
				value = type === "check" ? [] : ''; 
			answers.push({ 
				value,
				required
			})
		}
		this.state = { 
			answers,
			layer: false,
			layerConfig: {}
		};
	}
	changeValue(e) {
		let { value, type, checked } = e.target,
			{ answers } = this.state,
			id = getDomData(e.target, 'id');
		value = isNaN(Number(value)) ? value : Number(value);
		if (type === 'checkbox') {
			let arr = answers[id].value;			
			if (checked && arr.indexOf(value) === -1) {
				arr.push(value);
			} else {
				arr = arr.filter(i => i !== value);
			}
			answers[id].value = arr;
		} else {
			answers[id].value = value;
		}
		this.setState({ answers });
	}
	submit() {
		const { answers } = this.state,
			{ length } = answers;
		for (var i = 0; i < length; i++) {
			if (
				answers[i].required && 
				String(answers[i].value) === ''
			) {
				break;
			}
		}
		if (i !== length) {
			this.showLayer({
				content: `Q${i + 1}为必填题，请填写！`
			});
		} else {
			const { dispatch } = this.props;
			dispatch(answerItem(this.id, answers));
			this.showLayer({
				content: `提交成功！`,
				yes: () => browserHistory.push('/')
			});
		}
	}
	showLayer(config) {
		this.setState({
			layer: true,
			layerConfig: {
				...config
			}
		});
	}
	hideLayer() {
		this.setState({
			layer: false,
			layerConfig: {}
		});
	}
	render() {
		const { data: { title, questions } } = this.props,
			{ answers, layer, layerConfig } = this.state;
		return (
			<div className="index-container">
				{
					layer ? <Layer 
						{...layerConfig}
						destroy={::this.hideLayer}
					/> : null
				}
				<div className="item-title">
					<h2 className="title">{title}</h2>	
				</div>
				<div className="questions-container">
					{
						questions.map((val, i) => (
							<div className="one-question" key={i}>
								<h2>
									Q{i + 1}
									<span className="one-question-title">
										{val.title}
									</span>
								</h2>
								{
										val.type === 'text' ? (
											<div>
												<textarea 
													className="show-text-question" 
													placeholder="请输入您的回答"
													value={answers[i].value}
													data-id={i}
													onChange={::this.changeValue}
												></textarea>
											</div>
										) : (
											<div>
												{
													val.options.map((option, index) => (
														<p key={index} className="question-option">
															{
																val.type === "radio" ?
																	<input type="radio" 
																		className="radio-input"
																		value={index}
																		data-id={i}
																		checked={ answers[i].value === index}
																		onChange={::this.changeValue} 
																	/> : 
																	<input type="checkbox"
																		className="radio-input"
																		value={index}
																		data-id={i} 
																		checked={ answers[i].value.indexOf(index) !== -1 }
																		onChange={::this.changeValue} />
															}
															{option.val}
														</p>
													))
												}
											</div>
										)
									}
							</div>
						))
					}
				</div>
				<div className="submit-answer">
					<Button text="提交" isFixed={false} handleClick={::this.submit} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.question
});     

const DataAnswer = connect(
	mapStateToProps
)(Answer);   

export default DataAnswer;