"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import fetchFn from "@/libs/fetchFn";
import ButtonVot from "@/components/pages/ButtonVot";
import { useSession } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function VotacionesComponente({error}: {error?:string}) {
	const { data: session, status } = useSession();
	const [loading, setloading] = useState(true);
	const [data, setData] = useState([]);
	const router = useRouter();
	const getData = async () => {
		const response = await fetchFn(
			`/vot_act?estado=1&email=${
				session && session.user ? session.user.email : ""
			}`
		);
		if (response.error || response.code !== 200) {
			return ("/votaciones?error=server");
		}
		setData(response.data);
		setloading(false);
	};

	useEffect(() => {
		if (status === "authenticated") getData();
				  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	useEffect(()=>{
		if (error) {
			if (error === "server") toast.error("Ha ocurrido un error", {id:"1"})
			router.push("/votaciones")
		}
		if (error) {
			if (error === "e_ccl") toast.error("Usted ya votó a Comite de convivencia laboral", {id:"2"})
			router.push("/votaciones")
		}
		if (error) {
			if (error === "e_copasst") toast.error("Usted ya votó a la Votación COPASST", {id:"3"})
			router.push("/votaciones")
		}
				  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className="back2 w-full h-screen">
			<Header />
			{loading && (
				<div className="absolute ml-[40%] lg:ml-[47%] mt-[25%] lg:mt-[7%]  justify-center px-auto items-center ">
					<TailSpin
						height="80"
						width="80"
						color="#990000"
						ariaLabel="tail-spin-loading"
						radius="1"
					/>
				</div>
			)}
			{!loading && (
				<>
					<div className="main-class justify-center items-center text-center">
						<h1 className=" text-3xl text-primary font-bold">Votaciones</h1>
					</div>
					<div className="bg-default-white  mx-auto w-[200px] min-w-[15%] rounded-lg h-[30px] justify-center items-center text-center text-xl  mt-8 lg:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] text-primary font-bold m-6 transition-all">
						<h2 className="">Elija la votación:</h2>
					</div>
					<div className="flex w-[95%] sm:grid lg:grid-cols-2 sm:grid-cols-1 flex-col  gap-5 max-w-[1200px]  mx-auto mt-[4%] justify-center items-center rounded-xl p-5 mb-10">
						{data.map((item: any) => (
							<ButtonVot
								disabled={item.estado_voto === "1"}
								key={item.id}
								route={item.ruta ?? "/"}
								text={item.nombre}
							/>
						))}
					</div>
					<div className=" justify-center text-center mt-[2%]">
						<button
							className="mx-5 w-[5%] min-w-[70px] h-11 font-semibold shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] bg-default-white rounded-lg  text-primary hover:text-default-white hover:bg-primary hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
							onClick={() => router.push("/")}
						>
							Volver
						</button>
					</div>
				</>
			)}
		</main>
	);
}
