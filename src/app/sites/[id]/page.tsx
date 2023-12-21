import ButtonTable from "@/components/ButtonTable";
import Header from "@/components/Header";
// import ImagesGallery from "@/components/ImagesGallery";
import ChairSvg from "@/components/icons/ChairSvg";
import TableSvg from "@/components/icons/TableSvg";
import fetchFn from "@/libs/fetchFn";
import {
	convertToCurrency,
	formatTime,
	stringIncludes,
	validateString,
} from "@/libs/functionsStrings";
import { SiteInter } from "@/types/d";
import { redirect } from "next/navigation";

const getPlace = async (id: number) => {
	const response = await fetchFn(`/getPlace/${id}`, { cache: "no-cache" });

	if (response.code !== 200) return false;
	return response.data;
};

export async function generateMetadata({ params }: { params: { id: string } }) {
	let place = null;
	const idParam = validateString(params.id, "int");

	if (idParam) {
		place = await getPlace(Number(params.id));
		if (!place) return redirect("/404");
	} else {
		return redirect("/");
	}
	return {
		title: `${place.nombre} | Parque Tecnólogico ECIJG`,
	};
}

export default async function DetailsPlacePage({
	params,
}: {
	params: { id: string };
}) {
	const place: SiteInter = await getPlace(Number(params.id));

	const characteristics = [
		{
			icon: "bounding-box-circles",
			plural: "Dimensiones",
			singular: "Dimensiones",
			value: place.caracteristicas_espacio.dimensiones ?? null,
			visible: place.caracteristicas_espacio.dimensiones ? true : false,
		},
		{
			icon: <TableSvg color="#686868" width="110" />,
			plural: "Escritorios",
			singular: "Escritorio",
			value: place.caracteristicas_espacio.escritorios ?? null,
			visible: place.caracteristicas_espacio.escritorios ? true : false,
		},
		{
			icon: <ChairSvg color="#686868" width="110" />,
			plural: "Sillas",
			singular: "Silla",
			value: place.caracteristicas_espacio.sillas ?? null,
			visible: place.caracteristicas_espacio.sillas ? true : false,
		},
		{
			icon: "people",
			plural: "Mesas de reuniones",
			singular: "Mesa de reuniones",
			value: place.caracteristicas_espacio.mesa_reuniones ?? null,
			visible: place.caracteristicas_espacio.mesa_reuniones ? true : false,
		},
		{
			icon: "tv",
			plural: "Televisores",
			singular: "Televisor",
			value: place.caracteristicas_espacio.televisores ?? null,
			visible: place.caracteristicas_espacio.televisores ? true : false,
		},
		{
			icon: "pc-display",
			plural: "Computadores",
			singular: "Computador",
			value: place.caracteristicas_espacio.computadores ?? null,
			visible: place.caracteristicas_espacio.computadores ? true : false,
		},
		{
			icon: "easel2",
			plural: "Tableros",
			singular: "Tablero",
			value: place.caracteristicas_espacio.tablero ?? null,
			visible: place.caracteristicas_espacio.tablero ? true : false,
		},
		{
			icon: "projector",
			plural: "Video Beam",
			singular: "Video Beam",
			value: place.caracteristicas_espacio.video_beam ?? null,
			visible: place.caracteristicas_espacio.video_beam ? true : false,
		},
	];

	const extras = place.caracteristicas_espacio.adicionales
		? place.caracteristicas_espacio.adicionales.split("\\n")
		: null;

	return (
		<>
			<Header />
			<main className="margin-header container mb-9">
				<h1 className="font-semibold text-primary text-3xl text-center m-8">{place.nombre}</h1>
				{/* <section className="lg:flex gap-4 items-start lg:max-h-[599px] justify-between pt-4">
					<ImagesGallery
						images={place.images.map((image) => {
							return {
								thumbnail: `${process.env.NEXT_PUBLIC_API_BASEURL}/image?imageName=${image.img_small}`,
								original: `${process.env.NEXT_PUBLIC_API_BASEURL}/image?imageName=${image.img_medium}`,
								fullscreen: `${process.env.NEXT_PUBLIC_API_BASEURL}/image?imageName=${image.img_big}`,
							};
						})}
					/>
					<DetailsPlace place={place} />
				</section> */}

				<section className="md:flex gap-3">
					<article className="w-full mt-5">
						<p className="pb-2 text-center text-2xl font-semibold text-primary">
							Descripción del lugar
						</p>
						<p>{place.descripcion_corta}</p>
					</article>

					<article className="max-w-none md:max-w-md w-full mt-5">
						<p className="pb-2 text-center text-2xl font-semibold text-primary">
							Días disponibles
						</p>

						<div className="mx-auto max-w-[320px] border-2 border-borders-light">
							{[
								"lunes",
								"martes",
								"miercoles",
								"jueves",
								"viernes",
								"sabado",
								"domingo",
								"festivos",
							].map((day, i) => (
								<div className="flex border-2 border-borders-light" key={i}>
									<div className="w-full py-2 px-1 border-r-2 border-borders-light">
										<p className="text-gray font-medium">
											{!stringIncludes(String(i), ["2", "5"])
												? day.toUpperCase()
												: i === 2
												? "MIÉRCOLES"
												: "SÁBADO"}
										</p>
									</div>
									<div className="w-[45%] sm:w-[35%] text-center py-2 px-1 border-l-2 border-borders-light">
										<i
											className={
												// @ts-ignore
												place.dias_disponibilidad_espacio[day] === "1"
													? "bi bi-check-circle-fill text-green"
													: "bi bi-x-circle-fill text-red"
											}
										></i>
									</div>
								</div>
							))}
						</div>
					</article>
				</section>

				<div className="block md:flex mt-10">
					{characteristics.filter((item) => item.visible).length > 0 && (
						<section className="mt-5">
							<p className="text-center text-2xl font-semibold text-primary">
								Caracter&iacute;sticas
							</p>
					
							<div className="mt-5 mx-auto w-full sm:w-[95%] max-w-3xl flex flex-wrap justify-center gap-y-6">
								{characteristics.map((item, i) => {
									if (item.visible) {
										return (
											<div
												className="w-[180px] sm:w-[250px] flex flex-col justify-start py-4 select-none text-center"
												key={i}
											>
												{typeof item.icon === "string" && (
													<i
														className={`bi bi-${item.icon} text-8xl text-borders`}
													></i>
												)}
												{typeof item.icon !== "string" && item.icon}
												<p className="font-semibold text-soft-gray text-2xl">
													{typeof item.value === "string"
														? item.plural
														: item.value && item.value > 1
														? item.plural
														: item.singular}
												</p>
												{item.value &&
													typeof item.value === "number" &&
													item.value > 1 && (
														<p className="font-medium text-primary text-lg">
															Cantidad: {item.value}
														</p>
													)}
												{item.value && typeof item.value === "string" && (
													<p className="font-medium text-primary text-lg">
														{item.value}
													</p>
												)}
											</div>
										);
									}
								})}
							</div>
						</section>
					)}
					
						{extras && (
							<article className="min-w-[300px] w-full max-w-[500px] mt-5 mx-auto">
								<p className="pb-2 text-center text-2xl font-semibold text-primary">
									Adicionales
								</p>
					
								<div className="flex flex-col gap-2">
									{extras.map((item, i) => (
										<p
											className="px-2 py-3 bg-gray-box rounded-2xl soft-shadow"
											key={i}
										>
											<i className="bi bi-arrow-right-circle-fill text-primary"></i>{" "}
											<span className="font-semibold text-gray">
												{item.split(":")[0]}:{" "}
											</span>
											{String(item.split(":")[1]).trim()}
										</p>
									))}
								</div>
							</article>
						)}
				</div>

					<article className="min-w-[300px] w-full max-w-[500px] mt-5 mx-auto">
						{/* <p className="pb-2 text-center text-sm font-medium text-primary">
							Horario: {formatTime(place.dias_disponibilidad_espacio.hora_inicio)} -{" "}
							{formatTime(place.dias_disponibilidad_espacio.hora_fin)}
						</p> */}
					</article>
			</main>
		</>
	);
}