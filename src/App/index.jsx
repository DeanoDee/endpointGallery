import React, {Component} from 'react';
import {EndpointEntry} from '../endpointEntry';
import {Logo} from '../logo';
import FontAwesome from 'react-fontawesome';
import {ImageCard} from '../imageCard';
import './index.less';
import {poll} from '../lib/polling.js';


class App extends Component {

	constructor() {
		super();
		let {host} = window.location;
		let endpoint = `http://${host}/defaultImages.json`;
		this.state = {endpoint, loading: true, data: null, error: null};
	}

	componentWillMount() {
		let {getData} = this;
		getData();
	}

	changeEndpoint = (endpoint) => {
		let data = null;
		let loading = true;
		let error = false;
		let {subscription} = this.state;
		if(subscription){
			subscription.unsubscribe();
		}
		this.setState({endpoint, data, error, loading, subscription: null}, this.getData);
	}

	setData = (object) => {
		let loading = false;
		let first = Object.keys(object)[0];
		let data = object[first];
		this.setState({data, loading});
	}

	getData = () => {
		let {setData, setError, state} = this;
		let {endpoint} = state;
		let subscription = poll(endpoint).subscribe(setData, setError);
		this.setState({subscription});
	}

	setError = (error) => {
		error = error.toString();
		let loading = false;
		this.setState({loading, error});
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
		let {loading, error, endpoint} = this.state;
		if(loading){
			return (
				<div className="spinner-wrapper">
					<FontAwesome name="refresh" className="fa-spin" />
				</div>
			);
		}
		return (
			<div className="error-wrapper"><h2>Something went wrong</h2><p>The machine said, <strong>"{error}"</strong>. I guess it didn't like <strong><em>{endpoint}</em></strong> as a place to get images.</p></div>
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
				{data ? data.map(getCards) : getNoData()}
			</div>
		);
	}
}

export default App;
