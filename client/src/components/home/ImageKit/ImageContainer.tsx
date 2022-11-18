/**
 * Image Container
 */

// Dependencies
import React, { useRef } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import Draggable from 'react-draggable';

const ImageContainer = () => {
	const [imageFile, imageName, imageDimensions] = useAppSelector((state) => [
		state.app.imageFile,
		state.app.imageName,
		state.app.imageDimensions,
	]);
	const imgRef = useRef<HTMLImageElement>(null);

	return (
		<div id='imageKit__imageBox'>
			<Draggable
				scale={imageDimensions.scale}
				position={
					imageDimensions.scale === 1 ? { x: 0, y: 0 } : undefined
				}
				defaultClassName='hidden__print'
			>
				<img
					ref={imgRef}
					src={imageFile!}
					key={imageFile}
					alt={imageName}
					style={{
						scale: `${imageDimensions.scale}`,
					}}
					className='imageKit__imageBox--image'
				/>
			</Draggable>
		</div>
	);
};

export default ImageContainer;
