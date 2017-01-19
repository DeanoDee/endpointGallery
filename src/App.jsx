import React, {Component} from 'react';
import {EndpointEntry} from './endpointEntry/';

class App extends Component {

	componentWillMount() {
		let endpoint = '';
		this.setState({endpoint});
	}

	changeEndpoint = (endpoint) => {
		console.log('endpoint changed', endpoint);
		this.setState({endpoint});
	}

	render() {
		let {changeEndpoint} = this;
		return (
			<div className="App">
				<EndpointEntry changeEndpoint={changeEndpoint}/>
				<p className="App-intro">
					To get started, edit
					<code>src/App.js</code>
					and save to reload.
				</p>
			</div>
		);
	}
}

export default App;
