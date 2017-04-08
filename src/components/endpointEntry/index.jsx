import React, {Component, PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';
import './index.less';

export class EndpointEntry extends Component {

	constructor() {
		super();
		const show = false;
		const endpoint = '';
		this.state = {show, endpoint};
	}

	toggleShow = () => {
		const {show:currentShow} = this.state;
		const show = !currentShow;
		this.setState({show});
	}

	onChange = (event) => {
		const {value: endpoint} = event.target;
		this.setState({endpoint});
	}

	getOnSubmit = (changeEndpoint) => {
		return (event) => {
			event.preventDefault();
			const {endpoint:submitedEndpoint} = this.state;
			changeEndpoint(submitedEndpoint);
			const endpoint = '';
			const show = false;
			this.setState({endpoint, show});
		};
	}

	render() {
		const {toggleShow, state, props, getOnSubmit, onChange} = this;
		const {changeEndpoint} = props;
		const {show, endpoint} = state;
		const onSubmit = getOnSubmit(changeEndpoint);
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

EndpointEntry.propTypes = {
	changeEndpoint: PropTypes.func.isRequired
};
