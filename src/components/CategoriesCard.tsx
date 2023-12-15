"use client";

import { useAppSelector } from "@/redux/hook";
import { ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageGallery from "react-image-gallery";
import { TailSpin } from "react-loader-spinner";

const CategoriesCards = () => {
	const router = useRouter();
	const { data: categories } = useAppSelector(
		(state) => state.categoriesReducer
	);

	if (categories.length > 0) {
		return (
			<section
				className="sm:grid lg:grid-cols-3 sm:grid-cols-2 md:grid-col-3 xl:grid-cols-4 gap-5 mt-10 mx-auto mb-10 items-center"
				style={{
					scrollSnapType: "x proximity",
				}}
			>
				{categories.map(
					({ identificador, titulo, descripcion, imagenes, estado }, i) => {
						if (estado === "1") {
							return (
								<article className="flex-center" key={i}>
									<div className="min-w-[267px] h-[422px] mx-auto p-0 bg-off-white card-shadow rounded-2xl overflow-hidden transition-all">
										<div
											className="w-full h-[178px] flex-center overflow-hidden hover:opacity-90 cursor-pointer transition-all"
											title="Más información"
										>
											<ImageGallery
												items={imagenes.map((image) => {
													return {
														original: `${process.env.NEXT_PUBLIC_API_BASEURL}/imageCategory?image=${image.img}`,
													};
												})}
												infinite={true}
												lazyLoad={true}
												showNav={true}
												showThumbnails={false}
												showBullets={false}
												showFullscreenButton={false}
												showPlayButton={false}
												disableKeyDown={true}
												onClick={() =>
													router.push(`/categories/${identificador}`)
												}
											/>
										</div>
										<div className="w-full px-5 pt-2 pb-5">
											<p className="mb-2 text-primary font-semibold text-lg">
												{titulo}
											</p>
											<ScrollShadow className="mb-3 h-[145px]">
												<p>{descripcion}</p>
											</ScrollShadow>
											<Link
												href={`/categories/${identificador}`}
												className="mt-2 text-primary hover:underline text-center select-none cursor-pointer"
											>
												Administrar{" "}
												<i className="bi bi-arrow-right-circle mr-1"></i>
											</Link>
										</div>
									</div>
								</article>
							);
						}
					}
				)}
			</section>
		);
	}

	if (categories.length < 1) {
		return (
			<div className="h-[200px] flex-center">
				<TailSpin
					height="150"
					width="150"
					color="#990000"
					ariaLabel="TailSpin"
					wrapperStyle={{
						justifyContent: "center",
					}}
				/>
			</div>
		);
	}
};

export default CategoriesCards;