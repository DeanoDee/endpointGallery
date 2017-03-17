import React from 'react';
import FontAwesome from 'react-fontawesome';
import './index.less';

export const Spinner = () => {
	return (
		<div className="spinner">
			<FontAwesome name="refresh" className="fa-spin" />
		</div>
	);
};
