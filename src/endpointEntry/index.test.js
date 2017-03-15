import React from 'react';
import ReactDOM from 'react-dom';
import {EndpointEntry} from './index';
import TestUtils from 'react-addons-test-utils';

describe('endpointEntry', () => {
	const changeEndpoint = jest.fn();
	const endpointEntry = TestUtils.renderIntoDocument(<EndpointEntry />);
	const onSubmit = endpointEntry.getOnSubmit(changeEndpoint);
	const mockEvent = {
		preventDefault: jest.fn(),
		target: {
			value:"mockString"
		}
	};
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
});
