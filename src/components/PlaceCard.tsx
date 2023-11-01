"use client";

import { PlaceCard } from "@/types/d";
import { Image, ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PlaceCard = ({ place }: { place: PlaceCard }) => {
	const router = useRouter();

	return (
		<article className="mx-auto w-full sm:max-w-[330px]">
			<div className="flex items-center p-2 sm:p-0 sm:block bg-off-white card-shadow rounded-2xl overflow-hidden transition-all">
				<div
					className="flex-center w-1/3 sm:w-full max-w-[330px] h-full max-h-[186px] sm:max-h-[186px] rounded-2xl sm:rounded-none overflow-hidden hover:opacity-80 cursor-pointer transition-all"
					// TODO:
					// onClick={() => router.push(`/sites/${place.id}`)}
					onClick={() => router.push(`/sites/16`)}
					title="Ver detalles"
				>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_BASEURL}/image?imageName=${place.img_card}`}
						className="select-none"
						alt="Imagen lugar"
						radius="none"
					/>
				</div>
				<div className="w-2/3 pl-2 sm:w-full sm:px-5 sm:pt-3 sm:pb-5">
					<p className="mb-2 text-primary font-semibold text-lg">
						{place.nombre}
					</p>
					<ScrollShadow className="h-[180px]">
						<p className="mb-3">{place.descripcion_corta}</p>
					</ScrollShadow>
					<div className="flex items-center gap-2 mb-2 text-xl text-primary">
						<i className="bi bi-cup-hot-fill" title="Café"></i>
						<i className="bi bi-pc-display" title="Equipos"></i>
						<i className="bi bi-projector-fill" title="Proyector"></i>
						<i className="bi bi-wifi" title="Internet"></i>
					</div>
					<Link
						// TODO:
						// href={`/sites/${place.id}`}
						href={`/sites/16`}
						className="mt-2 text-primary hover:underline text-center select-none cursor-pointer"
					>
						Ver detalles <i className="bi bi-arrow-right-circle mr-1"></i>
					</Link>
				</div>
			</div>
		</article>
	);
};

export default PlaceCard;