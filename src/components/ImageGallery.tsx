"use client";

import Link from "next/link";
import { useState } from "react";
import ReactImageGallery from "react-image-gallery";

const ImagesGallery = ({
	images,
}: {
	images: { thumbnail: string; original: string; fullscreen: string }[];
}) => {
	const [selectedImage, setSelectedImage] = useState<number>(0);

	return (
		<div className="details-place-container w-[95%] lg:w-auto mx-auto">
			<ReactImageGallery
				items={images}
				thumbnailPosition="left"
				lazyLoad={true}
				showNav={true}
				showThumbnails={true}
				showIndex={true}
				showBullets={false}
				showPlayButton={false}
				showFullscreenButton={false}
				onSlide={(i) => setSelectedImage(i)}
				additionalClass="place-images"
			/>
			{images[selectedImage] && (
				<Link
					href={images[selectedImage].fullscreen}
					target="_blank"
					className="image-gallery-fullscreen-btn absolute right-2 w-10 h-10 flex-center bg-off-white rounded-2xl transition-all hover:opacity-90 normal-shadow"
					title="Ver imagen de mayor resolución"
				>
					<i className="bi bi-arrows-fullscreen text-primary text-2xl"></i>
				</Link>
			)}
		</div>
	);
};

export default ImagesGallery;