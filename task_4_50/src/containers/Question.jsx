import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addItem, changeTitle, changeDate } from '../actions/items';

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
	static defaultRadio() {
		return {
			type: 'radio',
			title: '单选题',
			options: [{
				val: '选项1',
				count: '0'
			}, {
				val: '选项2',
				count: '0'
			}]
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
				content: '该问卷已经保存成功！'
			}
		});
		this.changeInnerState('layer');
		this.patch();
	}
	publish() {
		this.setState({
			layerConfig: {
				content: '该问卷已经发布成功！'
			}
		});
		this.changeInnerState('layer');
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
	addQuestion(type) {
		const { questions } = this.state;
		questions.push(
			Question[`default${type}`]()
		);
		this.setState({
			questions,
			area: !this.state.area
		});
	}
	delQuestion() {

	}
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
		}
	}
	getOptionIcon(type) {
		var name;
		switch(type) {
			case 'radio':
				name = 'circle-blank';
				break;
		}
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
									{ this.getOptions(val, i) }
									<div className="add-option" data-question={i}>
										<Icon name="plus" extendClass="add-option-icon" />
									</div>
									<span className="handle-area">
										复用
									</span>
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
							handleClick={() => this.addQuestion('Radio')} />
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