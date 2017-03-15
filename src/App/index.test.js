import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import TestUtils from 'react-addons-test-utils';


describe('App', () => {
	const app = TestUtils.renderIntoDocument(<App/>);
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
	});
	it('changeEndpoint sets the endpoint and loading to true, and clears data and errors', () => {
		const mockEndpoint = "http://localhost:3002/alternateImages.json";
		app.changeEndpoint(mockEndpoint);
		const {endpoint, loading, data, error, subscription} = app.state;
		expect(endpoint).toBe(mockEndpoint);
		expect(loading).toBe(true);
		expect(data).toBe(null);
		expect(error).toBe(null);
	});
	it('setData sets the data correctly and loading to false', () => {
		const mockData = {"name": [
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
		]};
		app.setData(mockData);
		const {data, loading} = app.state;
		expect(data).toBe(mockData.name);
		expect(loading).toBe(false);
	});
	it('setError set the error to the passed message and loading to false', () => {
		const mockError = "SomeError";
		app.setError(mockError);
		const {error, loading} = app.state;
		expect(error).toBe(mockError);
		expect(loading).toBe(false);
	});
});
