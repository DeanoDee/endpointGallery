import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import './index.less';

export class EndpointEntry extends Component {

	componentWillMount(){
		let show = false;
		let endpoint = '';
		this.setState({show, endpoint});
	}

	toggleShow = () => {
		let {show} = Object.assign(this.state);
		show = !show;
		this.setState({show});
	}

	onChange = (event) => {
		let {value: endpoint} = event.target;
		this.setState({endpoint});
	}

	getOnSubmit = (changeEndpoint) => {
		return (event) => {
			event.preventDefault();
			let {endpoint} = this.state;
			changeEndpoint(endpoint);
			endpoint = '';
			let show = false;
			this.setState({endpoint, show});
		};
	}

	render() {
		let {toggleShow, state, props, getOnSubmit, onChange} = this;
		let {changeEndpoint} = props;
		let {show, endpoint} = state;
		let onSubmit = getOnSubmit(changeEndpoint);
		return (
			<div>
				{show ? <div className="endpoint-entry-overlay" onClick={toggleShow}></div> : null}
				<div className={show ? 'endpoint-entry show' : 'endpoint-entry'}>

					<div className="show-hide-toggle" onClick={toggleShow}>
						<FontAwesome name="code" />
					</div>
					<form onSubmit={onSubmit}>
						<label>Enter endpoint</label>
						<input type="text" name="endpoint" value={endpoint} onChange={onChange} />
					</form>
				</div>
			</div>
		);
	}
}
