import React from 'react';
import EllipsisText  from 'react-ellipsis-text';
import './index.less';

export const ImageCard = ({imageObject}) => {

	let maxTextLength = 78;

	let getTagElement = (tag) => {
		return (
			<li key={tag}>{tag}</li>
		);
	};

	let getTags = (tags) => {
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

	let {title, image, description, tags} = imageObject;

	return (
		<div className="image-card">
			<h2>{title}</h2>
			<div className="image-frame">
				<img src={image} role="presentation"/>
			</div>
			<EllipsisText text={description} length={maxTextLength} />
			{getTags(tags)}
		</div>

	);

};
