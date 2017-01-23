import React, {Component} from 'react';
import {EndpointEntry} from '../endpointEntry';
import {Logo} from '../logo';
import {ImageCard} from '../imageCard';
import 'whatwg-fetch';
import './index.less';

class App extends Component {

	componentWillMount() {
		let endpoint = '';
		this.setState({endpoint});
		this.getData();
	}

	changeEndpoint = (endpoint) => {
		console.log('endpoint changed', endpoint);
		this.setState({endpoint});
	}

	setData = (object) => {
		let first = Object.keys(object)[0];
		let data = object[first];
		this.setState({data});
	}

	getData = (endpoint) => {
		if(!endpoint){
			let {host} = window.location;
			endpoint = `http://${host}/defaultImages.json`;
		}
		fetch(endpoint)
			.then((response) => response.json())
			.then(this.setData);
	}

	getCards = (imageObject) => {
		let {_id} = imageObject;
		return (
			<div className="image-wrapper" key={_id}>
				<ImageCard  imageObject={imageObject}/>
			</div>
		);
	}

	getNoData = () => {
		return (
			<div>This is a todo</div>
		);
	}

	render() {
		let {changeEndpoint, getCards, getNoData, state} = this;
		let {data} = state;
		return (
			<div className="app">
				<div className="logo-wrapper">
					<Logo />
				</div>
				<EndpointEntry changeEndpoint={changeEndpoint}/>
				{data ? data.map(getCards) : getNoData}
			</div>
		);
	}
}

export default App;
