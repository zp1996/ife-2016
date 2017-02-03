import React, { Component, PropTypes } from 'react';
import Mask from '../Mask/index';
import Icon from '../Icon/index';
import Button from '../Button/index';
import { noop } from '../../utils';

class Layer extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		destroy: PropTypes.func.isRequired,
		type: PropTypes.string.isRequired
	};
	static defaultProps = {
		title: '提示',
		type: 'alert',
		destroy: noop,
		yes: noop,
		no: noop
	}; 
	constructor(props) {
		super(props);
		this.state = {
			show: true
		};
		this.flag = false;
	}
	close() {
		this.setState({
			show: !this.state.show
		});
	}
	componentDidUpdate() {
		// 延迟执行关闭,数据更新造成页面的重新render
		setTimeout(() => {
			this.props.destroy();
			this.flag && this.props.yes();
			this.flag = false;
		}, 500);
	}
	yes() {
		this.close();
		this.flag = true;
	}
	no() {
		this.close();
		this.props.no();
	}
	render() {
		const { title, content, type } = this.props,
			{ show } = this.state;
		return (
			<Mask handleClick={
					(e) => {
						if (e.target === this.mask)
							this.close();
					}
				} 
				refFunc={ (ref) => this.mask = ref }
			>
				<div className={
					show ? 'layer' : 'layer-none'
				}>
					<div className="layer-title">
						<span>{title}</span>
						<Icon 
							name="remove" 
							handleClick={::this.close}
						/>
					</div>
					<div className="layer-content">
						{ content }
					</div>
					<div className="layer-button-area">
						<Button text="确认" handleClick={::this.yes} />
						{
							type === 'alert' ? null : 
								<Button text="取消" handleClick={::this.no} />
						}
					</div>
				</div>
			</Mask>
		);
	}
}

export default Layer;