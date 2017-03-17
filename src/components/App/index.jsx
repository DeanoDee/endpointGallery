import React, {Component} from 'react';
import {EndpointEntry} from '../endpointEntry';
import {Logo} from '../logo';
import {ImageCard} from '../imageCard';
import {Spinner} from '../spinner';
import {ErrorCard} from '../errorCard';
import './index.less';
import {poll} from '../../lib/polling.js';


class App extends Component {

	constructor() {
		super();
		const {host} = window.location;
		const endpoint = `http://${host}/defaultImages.json`;
		this.state = {endpoint, loading: true, data: null, error: null};
	}

	componentWillMount() {
		const {getData} = this;
		getData();
	}

	changeEndpoint = (endpoint) => {
		const loading = true;
		const error = null;
		const {subscription} = this.state;
		if(subscription){
			subscription.unsubscribe();
		}
		this.setState({endpoint, error, loading}, this.getData);
	}

	setData = (object) => {
		const loading = false;
		const first = Object.keys(object)[0];
		const data = object[first];
		this.setState({data, loading});
	}

	getData = () => {
		const {setData, setError, state} = this;
		const {endpoint} = state;
		const subscription = poll(endpoint).subscribe(setData, setError);
		this.setState({subscription});
	}

	setError = (error) => {
		error = error.toString();
		const loading = false;
		this.setState({loading, error});
	}

	getCards = (imageObject) => {
		const {_id} = imageObject;
		return (
			<ImageCard key={_id} imageObject={imageObject}/>
		);
	}

	getBody = ({loading, error, data, endpoint}, getCards) => {
		if (loading) {
			return (
				<Spinner />
			);
		} else if (error){
			return (
				<ErrorCard error={error} endpoint={endpoint} />
			);
		}
		return data.map(getCards);
	}

	render() {
		const {changeEndpoint, getBody, getCards, state} = this;
		return (
			<div className="app">
				<Logo />
				<EndpointEntry changeEndpoint={changeEndpoint}/>
				{getBody(state, getCards)}
			</div>
		);
	}
}

export default App;
