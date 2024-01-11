"use client";

import { ScrollShadow } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ReservationDateDetails, PlaceComplete } from "@/types/d";
import Modal from "./Modal";
import Button from "./Button";

interface Props {
	reservation: ReservationDateDetails;
	i: number;
	deleteFn: (id: number) => void;
}

// export const ReservationDateCard = ({ reservation, i, deleteFn }: Props) => {
// 	return (
// 		<li className="relative my-1 py-1 px-2 border-2 border-borders-light text-sm rounded-2xl">
// 			<p>
// 				<strong>{i + 1}- </strong>
// 				{reservation.type === "1" &&
// 					`${formatDate(reservation.dateTimeStart, true)} - ${formatDate(
// 						reservation.dateTimeEnd,
// 						true
// 					)}`}

// 				{reservation.type === "2" &&
// 					`Dia: ${formatDate(reservation.dateTimeStart)}`}

// 				{reservation.type === "3" &&
// 					`Mes completo: ${formatDate(
// 						reservation.dateTimeStart
// 					)} - ${formatDate(reservation.dateTimeEnd)}`}
// 			</p>
// 			<p>
// 				<strong>Valor: </strong>
// 				{convertToCurrency(reservation.value)} COP
// 			</p>
// 			<i
// 				className="bi bi-x-circle-fill absolute top-1 right-2 text-sm text-primary hover:text-dark-primary cursor-pointer transition-all"
// 				title="Eliminar fecha seleccionada"
// 				onClick={() => deleteFn(reservation.id ?? 0)}
// 			></i>
// 		</li>
// 	);
// };

const DetailsPlace = ({ place }: { place: PlaceComplete }) => {
	const { status } = useSession();

	const [showModal, setShowModal] = useState<boolean>(false);
	const [contentModal, setContentModal] = useState<
		"login" | "reservation" | "disponibility"
	>("login");
	const [reservations, setReservations] = useState<ReservationDateDetails[]>(
		[]
	);


	useEffect(() => {
		if (status !== "loading") {
			setContentModal(status === "authenticated" ? "reservation" : "login");
		}
	}, [status]);

	return (
		<>
			<Modal
				isOpen={showModal}
				setIsOpen={setShowModal}
				classContainer="w-[95%] max-w-2xl"
			>
				<i
					className="bi bi-x-circle-fill absolute top-2 right-3 text-soft-primary hover:text-primary text-3xl transition-all cursor-pointer"
					title="Cerrar ventana"
					onClick={() => setShowModal(false)}
				></i>
				{/* {contentModal === "reservation" && (
					<FinishReservation
						place={place}
						reservations={reservations}
						setReservations={setReservations}
					/>
				)} */}

				{/* {contentModal === "disponibility" && (
					<>
						<RedTitle text="Calcular precio" />
						<CalculatePrice
							place={place}
							addReservation={(reservation) => {
								if (
									!reservations.find(
										(item) =>
											item.dateTimeStart === reservation.dateTimeStart &&
											item.dateTimeEnd === reservation.dateTimeEnd &&
											item.totalTime === reservation.totalTime
									)
								) {
									setReservations([...reservations, reservation]);
									toast.success("Fecha seleccionada");
								} else {
									toast.error("No puede seleccionar las mismas fechas");
								}
							}}
						/>
					</>
				)} */}
			</Modal>

			<div className="flex flex-col justify-between gap-3 lg:gap-0 mx-auto w-[95%] lg:max-w-[400px] lg:h-[473px] p-5 normal-shadow bg-off-white rounded-2xl">
				<section>
					<h1 className="mb-2 text-center font-semibold text-2xl text-primary">
						{place.nombre}
					</h1>
					<ScrollShadow
						className={
							reservations.length > 0
								? "h-[120px] sm:h-auto lg:h-[120px]"
								: "h-auto"
						}
					>
						<h2>{place.descripcion_corta}</h2>
					</ScrollShadow>
				</section>

				{place.estado && (
					<>
						{/* {reservations.length > 0 && (
							<section>
								<p className="text-primary font-semibold">
									Fechas seleccionadas
								</p>
								<ScrollShadow className="h-[140px]">
									<ul>
										{reservations.map((reservation, i) => (
											<ReservationDateCard
												reservation={reservation}
												i={i}
												deleteFn={(id: number) => {
													setReservations(
														reservations.filter((item) => item.id !== id)
													);
												}}
												key={i}
											/>
										))}
									</ul> 
								</ScrollShadow>
							</section>
						)} */}

						<section>
							{reservations.length < 1 && (
								<p className="mb-3 text-soft-gray font-semibold text-sm">
									Puede verificar la disponibilidad.
								</p>
							)}

							<div className="flex flex-col sm:flex-row lg:flex-col gap-2">
								<Button
									text="Reservar"
									icon="bag-check-fill"
									onClick={() => {
										setContentModal(
											status === "authenticated" ? "reservation" : "login"
										);
										setShowModal(true);
									}}
								/>
							</div>
						</section>
					</>
				)}

				{!place.estado && (
					<p className="text-center text-soft-gray text-lg font-bold">
						NO DISPONIBLE
					</p>
				)}
			</div>
		</>
	);
};

export default DetailsPlace;