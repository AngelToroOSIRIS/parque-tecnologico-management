"use client";

import { convertToCurrency } from "@/libs/functionsStrings";
import { PlaceCard } from "@/types/d";
import { Badge, Image, ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TableSvg from "./icons/TableSvg";
import ChairSvg from "./icons/ChairSvg";

const PlaceCard = ({ place }: { place: PlaceCard }) => {
	const router = useRouter();

	return (
		<article className="mx-auto w-full sm:max-w-[330px]">
			<div className="block bg-off-white card-shadow rounded-2xl overflow-hidden transition-all">
				<div className="block sm:hidden w-full px-5 pt-3">
					<p className="mb-2 text-primary font-semibold text-lg">
						{place.nombre}
					</p>
				</div>
				<div
					className="flex-center w-full sm:max-w-[330px] h-full max-h-[186px] overflow-hidden hover:opacity-80 cursor-pointer transition-all"
					onClick={() => router.push(`/sites/${place.id}`)}
					title="Ver detalles"
				>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_BASEURL}/image?imageName=${place.img_card}`}
						className="select-none rounded-2xl sm:rounded-none"
						alt="Imagen lugar"
						radius="none"
					/>
				</div>
				<div className="w-full px-5 pt-3 pb-5">
					<p className="hidden sm:block mb-2 text-primary font-semibold text-lg">
						{place.nombre}
					</p>

					<ScrollShadow className="h-[140px] sm:h-[190px]">
						<p>{place.descripcion_corta}</p>
					</ScrollShadow>


					<Link
						href={`/sites/${place.id}`}
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