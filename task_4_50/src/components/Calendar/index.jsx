import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon/index';
import { getDays, getFirstDate, noop } from "../../utils";

const chinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
	TDNUMBER = 42;
class Calendar extends Component {
	static propTypes = {
		handleClick: PropTypes.func
	};
	static defaultProps = {
		handleClick: noop
	};
	constructor(props) {
		super(props);
		const { date } = props;
		this.state = {
			year: +date[0],
			month: +(date[1] - 1),
			date: +(date[2])
		}; 
	}
	addMonth() {
		var { month, year } = this.state;
		month++;
		year += ~~(month / 12);
		month = month % 12;
		this.setState({
			year,
			month
		});
	}
	subMonth() {
		var { month, year } = this.state;
		const flag = month === 0;
		year -= +flag;
		month = flag ? 11 : (month - 1);
		this.setState({
			year,
			month
		});
	}
	getTds(year, month, date) {
		const res = [],
			realMonth = month + 1, 
			now = getDays(year, realMonth),
			first = getFirstDate(year, realMonth),
			after = TDNUMBER - now - first;
		var prev = getDays(year, month);
		for (let i = 0; i < first; i++) {
			res.unshift({
				val: prev--,
				status: -1
			});
		}
 		for (let i = 1; i <= now; i++) {
 			res.push({
 				val: i,
 				status: +(i === date)
 			});
 		}
 		for (let i = 1; i <= after; i++) {
 			res.push({
 				val: i,
 				status: -1
 			});
 		}
 		return res;
	}
	burnDate(tds) {
		const res = [];
		for (let i = 0; i < 6; i++) {
			res.push((
				<tr key={`tr-${i}`}>
					{this.burnTrs(tds, i * 7)}
				</tr>
			));
		}
		return res;
	}
	burnTrs(tds, s) {
		const res = [];
		var i = 0;
		while (i++ < 7) {
			const data = tds[s],
				classes = classnames({
					"disabled-td": data.status === -1,
					"active-td": data.status === 1
				});
			res.push((
				<td key={`td-${s++}`} className={classes}>
					{data.val}
				</td>
			));
		}
		return res;
	}
	changeDate(e) {
		const { className } = e.target,
			date = +(e.target.innerText);
		if (className === '') {
			this.setState({
				date
			});
			const { handleClick } = this.props,
				{ year, month } = this.state;
			handleClick([year , month + 1, date]);
		}
	}
	render() {
		const { extendClass, handleClick } = this.props,
			{ year, month, date } = this.state,
			classes = classnames({
				[extendClass]: extendClass,
				calendar: true
			}),
			tds = this.getTds(year, month, date);
		return (
			<div className={classes}>
				<div className="calendar-title">
					<span onClick={::this.subMonth}>
						<Icon name="caret-left" />
					</span>
					<span>
						{year}年 {chinese[month]}月
					</span>
					<span onClick={::this.addMonth}>
						<Icon name="caret-right" />
					</span>
				</div>
				<table>
					<thead>
						<tr className="calendar-day">
							{
								['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((val, i) => (
									<th key={i}>{val}</th>
								))
							}
						</tr>
					</thead>
					<tbody className="calendar-date" onClick={::this.changeDate}>
						{this.burnDate(tds)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Calendar;