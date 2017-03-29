import React from 'react';
import ReactDOM from 'react-dom';
import {EndpointEntry} from './index';
import TestUtils from 'react-addons-test-utils';

describe('endpointEntry', () => {
	const changeEndpoint = jest.fn();
	const endpointEntry = TestUtils.renderIntoDocument(<EndpointEntry changeEndpoint={changeEndpoint}/>);
	const showHideToggle = TestUtils.findRenderedDOMComponentWithClass(endpointEntry, 'show-hide-toggle');
	const onSubmit = endpointEntry.getOnSubmit(changeEndpoint);
	const mockEvent = {
		preventDefault: jest.fn(),
		target: {
			value:"mockString"
		}
	};
	it('renders correctly', () => {
		const renderer = TestUtils.createRenderer();
		renderer.render(<EndpointEntry changeEndpoint={changeEndpoint}/>);
		const tree = renderer.getRenderOutput();
		expect(tree).toMatchSnapshot();
	});
	it('toggleShow will toggle show true and false', () => {
		const {show: originalState} = endpointEntry.state;
		endpointEntry.toggleShow();
		const {show: modifiedState} = endpointEntry.state;
		expect(modifiedState).toBe(!originalState);
		endpointEntry.toggleShow();
		const {show: returnedState} = endpointEntry.state;
		expect(returnedState).toBe(originalState);
	});
	it('onChange it sets the endpoint with a field value', () => {
		endpointEntry.onChange(mockEvent);
		const {endpoint} = endpointEntry.state;
		expect(endpoint).toBe(mockEvent.target.value);
	});
	it('onSubmit should pass endpoint to changeEndpoint, clear endpoint and change show to false', () => {
		endpointEntry.onChange(mockEvent);
		onSubmit(mockEvent);
		expect(changeEndpoint.mock.calls.length).toBe(1);
		expect(changeEndpoint.mock.calls[0][0]).toBe(mockEvent.target.value);
		const {show} = endpointEntry.state;
		expect(show).toBe(false);
	});
	it('clicking show-hide-toggle should toggle show state', () => {
		const {show: originalState} = endpointEntry.state;
		TestUtils.Simulate.click(showHideToggle);
		const {show: modifiedState} = endpointEntry.state;
		expect(modifiedState).toBe(!originalState);
		TestUtils.Simulate.click(showHideToggle);
		const {show: returnedState} = endpointEntry.state;
		expect(returnedState).toBe(originalState);
	});
	it('clicking endpoint-entry-overlay should remove show state', () => {
		TestUtils.Simulate.click(showHideToggle);
		const {show: originalState} = endpointEntry.state;
		const endpointEntryOverlay = TestUtils.findRenderedDOMComponentWithClass(endpointEntry, 'endpoint-entry-overlay');
		TestUtils.Simulate.click(endpointEntryOverlay);
		const {show: modifiedState} = endpointEntry.state;
	});
	it('entering and submiting in the text input should update endpoint and call changeEndpoint', () => {
		TestUtils.Simulate.click(showHideToggle);
		const testString = 'test';
		const input = TestUtils.findRenderedDOMComponentWithTag(endpointEntry, 'input');
		TestUtils.Simulate.change(input, {target:{value:testString}});
		const {endpoint: modifiedState} = endpointEntry.state;
		expect(modifiedState).toBe(testString);
		const form = TestUtils.findRenderedDOMComponentWithTag(endpointEntry, 'form');
		TestUtils.Simulate.change(form);
		expect(changeEndpoint.mock.calls.length).toBe(1);
		expect(changeEndpoint.mock.calls[0][0]).toBe(mockEvent.target.value);
	});
});
