import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { addItem, changeTitle, changeDate, publishItem, updateQuestions } from '../actions/items';

import config from '../config';
import { Data, clone, getDomData } from "../utils";

import Layer from '../components/Layer/index';
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
			questions: [],
			date: [ date.getFullYear(), date.getMonth() + 1, date.getDate()]
		};
	}
	static defaultQuestion(type, title, count=2) {
		const options = [];
		for (let i = 1; i <= count; i++) {
			options.push({
				val: `选项${i}`,
				count: 0
			});
		}
		return { type, title, options };
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
		this.state.layer = false;
		this.state.layerConfig = {};
	}
	changeInnerState(key) {
		this.setState({
			[key]: !this.state[key]
		});
	}
	changeDate(date) {
		this.setState({ date });
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
	save() {
		this.setState({
			layerConfig: {
				yes: () => browserHistory.push('/'),
				content: '该问卷已经保存成功！'
			}
		});
		this.changeInnerState('layer');
		this.patch();
	}
	publish() {
		const { date } = this.state;
		this.setState({
			layerConfig: {
				yes: () => browserHistory.push('/'),
				content: `该问卷已经发布成功，截止日期为${date.join('-')}`
			}
		});
		this.changeInnerState('layer');
		this.state.status = 1;
		this.patch();
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
			{ id, title, date, status, questions } = state;
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
		if (question.status !== status) {
			patches.push(
				() => publishItem(id)
			);
		}
		// questions直接充值
		if (!
			(question.questions.length === 0 && 
			questions.length === 0)
		) {
			patches.push(
				() => updateQuestions(id, questions)
			);
		}
		return patches;
	}
	addOption(id) {
		const { questions } = this.state,
			{ options } = questions[id];
		options.push({
			val: `选项${options.length + 1}`,
			count: 0
		});
		this.setState({ questions })
	}
	changeQuestionTitle(e) {
		const { activeInput, questions } = this.state,
			{ value } = e.target,
			id = activeInput.split('-')[1];
		questions[id].title = value
 		this.setState({ questions });
	}
	changeOptionVal(e) {
		const { activeInput, questions } = this.state,
			{ value } = e.target,
			data = activeInput.split('-');
		questions[data[1]].options[data[2]].val = value; 
		this.setState({ questions });
	}
	delQuestionOption(data) {
		const { questions } = this.state;
		data = data.split('-').map(val => Number(val));
		questions[data[0]].options.splice(data[1], 1);
		this.setState({ questions });
	}
	addQuestion(type, title, count) {
		const { questions } = this.state;
		questions.push(
			Question.defaultQuestion(type, title, count)
		);
		this.setState({
			questions,
			area: !this.state.area
		});
	}
	addTextQuestion() {
		const { questions } = this.state;
		questions.push({
			type: 'text',
			title: '文本题',
			answers: [],
			isRequired: false
		});
		this.setState({
			questions,
			area: !this.state.area
		});
	}
	handleQuestion(fn) {
		const { questions } = this.state;
		fn(questions);
		this.setState({ questions });
	}
	changeRequired(id) {
		this.handleQuestion(arr => {
			const { isRequired } = arr[id];
			arr[id].isRequired = !isRequired;
		});
	}
	delQuestion(id) {
		this.handleQuestion(arr => arr.splice(id, 1));
	}
	copyQuestion(id) {
		this.handleQuestion(
			arr => arr.splice(
				id,
				0, 
				clone(arr[id])
			)
		);
	}
	bottomQuestion(id) {
		this.handleQuestion(arr => {
			const temp = arr[id];
			arr[id] = arr[id + 1];
			arr[id + 1] = temp;
		});
	}
	topQuestion(id) {
		this.handleQuestion(arr => {
			const temp = arr[id];
			arr[id] = arr[id - 1];
			arr[id - 1] = temp;
		});
	}
	// 用代理节省内存空间
	delegate(e) {
		const { className } = e.target;
		var data;
		switch(className) {
			case 'one-question-title':
				data = getDomData(e.target, 'title');
				this.showInput(`title-${data}`);
				break;
			case 'option-remove icon-remove':
				data = getDomData(e.target.parentNode, 'option');
				this.delQuestionOption(data);
				break;
			case 'question-option':
				data = getDomData(e.target, 'option');
				this.showInput(`title-${data}`);
				break;
			case 'add-option':
			case 'add-option-icon icon-plus':
				data = getDomData(e.target, 'question') || 
					getDomData(e.target.parentNode, 'question');
				this.addOption(data);
				break;
			case 'copy-question':
			case 'del-question':
			case 'top-question':
			case 'bottom-question':
				let type = className.split('-')[0];
				data = +getDomData(e.target.parentNode, 'id')
				this[`${type}Question`](data);
				break;
		}
	}
	getOptionIcon(type) {
		const name = type === 'radio' ? 'circle-blank' : 'check-empty';
		return (
			<Icon name={name} extendClass="option-icon" />
		);
	}
	getOptions({ options, type }, id) {
		const { activeInput } = this.state;
		return (
			<div>
				{	
					options.map((option, i) => (
						<p key={i} className="question-option" 
							data-option={`${id}-${i}`}
						>
							{this.getOptionIcon(type)}
							{
								activeInput === `title-${id}-${i}` ?
									<input type="text" autoFocus
										value={option.val} 
										onBlur={::this.inputBlur}   
										onChange={::this.changeOptionVal}
										className="question-option-input" /> : 
									option.val
							}
							<Icon name="remove" extendClass="option-remove" />
						</p>
					))
				}
			</div>
		);
	}
	render() {
		const { 
			title, 
			area, 
			date, 
			calendar, 
			activeInput,
			questions,
			layer,
			layerConfig
		} = this.state;
		const len = questions.length - 1;
		return (
			<div className="question-container">
				{
					layer ? <Layer 
						{...layerConfig}
						destroy={ () => {
							this.changeInnerState('layer')
						}}
					/> : null
				}
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
				<div className="questions-container" onClick={::this.delegate}>
					{
						questions.map((val, i) => {
							return (
								<div className="one-question" key={i}>
									<h2>
										Q{i + 1}
										{
											activeInput === `title-${i}` ?
											<input type="text" 
												autoFocus
												value={val.title} 
												onBlur={::this.inputBlur}   
												onChange={::this.changeQuestionTitle}
												className="question-title-input" /> :
											<span className="one-question-title" data-title={i}>{val.title}</span>
										}
									</h2>
									{
										val.type === 'text' ? (
											<div>
												<textarea className="show-text-question"></textarea>
											</div>
										) : (
											<div>
												{ this.getOptions(val, i) }
												<div className="add-option" data-question={i}>
													<Icon name="plus" extendClass="add-option-icon" />
												</div>
											</div>
										)
									}
									<div className="handle-area" data-id={i}>
										{ 
											val.type === "text" ? 
											<span className="choose-require">
												<input type="checkbox" checked={val.isRequired} onChange={this.changeRequired.bind(this, i)} />
												此题是否必填
											</span> : null	 
										}
										{ i !== 0 ? <span className="top-question">上移</span> : null }
										{ i !== len ? <span className="bottom-question">下移</span> : null }
										<span className="copy-question">复用</span>
										<span className="del-question">删除</span>
									</div>
								</div>
							);
						})
					}
				</div>
				<div className="add-question-container">
					<div className="question-type"
						style={ area ? {
							height: "80px"
						} : {
						}}
					>
						<IconButton text="单选" 
							icon="circle-blank" 
							handleClick={() => this.addQuestion('radio', '单选题')} 
						/>
						<IconButton text="多选" 
							icon="check"
							handleClick={() => this.addQuestion('check', '多选题', 4)}
						/>
						<IconButton text="文本" icon="list-alt"
							handleClick={::this.addTextQuestion}
					 	/>
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
					<Button text={"发布问卷"} isFixed={false} handleClick={::this.publish} />
					<Button text={"保存问卷"} isFixed={false} handleClick={::this.save} />
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