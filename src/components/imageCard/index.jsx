import React, {PropTypes} from 'react';
import EllipsisText  from 'react-ellipsis-text';
import './index.less';

export const ImageCard = ({imageObject}) => {

	const maxTextLength = 78;

	const getTagElement = (tag) => {
		return (
			<li key={tag}>{tag}</li>
		);
	};

	const getTags = (tags) => {
		if(!tags) {
			return null;
		}
		return (
			<div className="tag-wrapper">
				<h3>Tags:</h3>
				<ul>{tags.map(getTagElement)}</ul>
			</div>
		);
	};

	const {title, image, description, tags} = imageObject;

	return (
		<div className="image-card">
			<div className="wrapper">
				<h2>{title}</h2>
				<div className="image-frame">
					<img src={image} alt={title}/>
				</div>
				<EllipsisText text={description} length={maxTextLength} />
				{getTags(tags)}
			</div>
		</div>

	);

};

ImageCard.propTypes = {
	imageObject: PropTypes.object.isRequired
};
