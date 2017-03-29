import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import TestUtils from 'react-addons-test-utils';
import {Spinner} from '../spinner';
import {ErrorCard} from '../errorCard';
import {ImageCard} from '../imageCard';

describe('App', () => {
	const app = TestUtils.renderIntoDocument(<App/>);
	const mockEndpoint = "http://localhost:3002/alternateImages.json";
	const badMockEndpoint = "asdfafasf";
	const mockData = {
		"name": [
			{
				"_id": "N0tv3ryR3a0ab13Gu1d",
				"title": "A title for the image",
				"image": "http://somedomain.com/a/url/for/the/image.jpg",
				"description": "A little something to tell the person what they are looking at",
				"tags": [
					"somethings",
					"to",
					"describe",
					"what",
					"this",
					"is"
				]
			}
		]
	};
	const mockError = "SomeError";

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App/>, div);
	});
	it('renders correctly', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<App />);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});
	it('changeEndpoint sets the endpoint and loading to true, and clears errors', () => {
		app.changeEndpoint(mockEndpoint);
		const {endpoint, loading, error} = app.state;
		expect(endpoint).toBe(mockEndpoint);
		expect(loading).toBe(true);
		expect(error).toBe(null);
	});
	it('setData sets the data correctly and loading to false', () => {
		app.setData(mockData);
		const {data, loading} = app.state;
		expect(data).toBe(mockData.name);
		expect(loading).toBe(false);
	});
	it('setError set the error to the passed message and loading to false', () => {

		app.setError(mockError);
		const {error, loading} = app.state;
		expect(error).toBe(mockError);
		expect(loading).toBe(false);
	});
	it('getBody with loading true displays the spinner, not error card and does not run getCards', () => {
		const getCards = jest.fn();
		const state = {
			loading: true,
			data: mockData.name,
			error: true,
			endpoint: mockEndpoint
		};
		const result = app.getBody(state, getCards);
		expect(result.type).toBe(Spinner);
		expect(result.type).not.toBe(ErrorCard);
		expect(getCards.mock.calls.length).toBe(0);
	});
	it('getBody with loading false and error has value displays the error, not spinner and does not run getCards', () => {
		const getCards = jest.fn();
		const state = {
			loading: false,
			data: mockData.name,
			error: mockError,
			endpoint: mockEndpoint
		};
		const result = app.getBody(state, getCards);
		expect(result.type).toBe(ErrorCard);
		expect(result.type).not.toBe(Spinner);
		expect(getCards.mock.calls.length).toBe(0);
	});
	it('getBody with data, loading and error false does not display spinner or error card and run getCards', () => {
		const getCards = jest.fn();
		const state = {
			loading: false,
			data: mockData.name,
			error: false,
			endpoint: mockEndpoint
		};
		const result = app.getBody(state, getCards);
		expect(result.type).not.toBe(ErrorCard);
		expect(result.type).not.toBe(Spinner);
		expect(getCards.mock.calls.length).toBe(1);
	});
	// it('getCards with returns an image card', () => {
	// 	const result = app.getCards(mockData.name);
	// 	expect(result.type).toBe(ImageCard);
	// });
});
