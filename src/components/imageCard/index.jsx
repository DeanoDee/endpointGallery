import React, {PropTypes} from 'react';
import EllipsisText  from 'react-ellipsis-text';
import './index.less';

export const ImageCard = ({title, image, description, tags}) => {

	const maxCharacterLength= 78;

	return (
		<div className="image-card">
			<div className="wrapper">
				<h2>{title}</h2>
				<div className="image-frame">
					<img src={image} alt={title}/>
				</div>
				<EllipsisText text={description} length={maxCharacterLength} />
				{tags &&
					<div className="tag-wrapper">
						<h3>Tags:</h3>
						<ul>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
					</div>
				}
			</div>
		</div>

	);

};

ImageCard.propTypes = {
	imageObject: PropTypes.object.isRequired
};
