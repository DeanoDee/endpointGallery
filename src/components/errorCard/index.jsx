import React, {PropTypes} from 'react';
import './index.less';

export const ErrorCard = ({error, endpoint}) => {
	return (
		<div className="error-card">
			<h2>Something went wrong</h2>
			<p>The machine said, <strong>"{error}"</strong>. I guess it didn't like <strong><em>{endpoint}</em></strong> as a place to get images.</p>
		</div>
	);
};

ErrorCard.propTypes = {
	error: PropTypes.string.isRequired,
	endpoint: PropTypes.string.isRequired
};
