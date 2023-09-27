"use client";

import { useRouter } from "next/navigation";

const PlaceCard = ({
	place,
}: {
	place: { id: number; nombre: string;};
}) => {
	const router = useRouter();

	return (
		<article className="mx-auto w-full sm:max-w-[330px]">
			<div className="flex items-center sm:block bg-off-white card-shadow rounded-2xl overflow-hidden transition-all">
				<div
					className="flex-center w-1/3 sm:w-full max-w-[330px] h-full max-h-[330px] overflow-hidden hover:opacity-80 cursor-pointer transition-all"
					onClick={() => router.push(`/sites/${place.id}`)}
					title="Más información"
				>
				</div>
				<div className="w-2/3 sm:w-full px-5 pt-3 pb-5">
					<p className="mb-2 text-primary font-semibold text-lg">
						{place.nombre}
					</p>
					<p className="mb-3">
						Ofrece espacios, programas y servicios a la comunidad institucional.
						Además, favorece la integración con otras organizaciones académicas.
					</p>

				</div>
			</div>
		</article>
	);
};

export default PlaceCard;