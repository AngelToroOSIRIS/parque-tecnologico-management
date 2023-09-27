"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login({ searchParams }: any) {
	const router = useRouter();

	return (
		<>

			<div className="mx-auto p-200 w-[95%] max-w-xs justify-center items-center">
				<p className=" text-3xl text-center my-12 font-semibold">
					Inicio de Sesión
				</p>
				<button
					className="w-[95%] max-w-xs h-12 bg-primary text-off-white py-2 px-4 font-semibold  rounded-xl transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
					onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
				>
					<i className="bi bi-microsoft mr-2"></i> Ingresa con Microsoft
				</button>
				<button
					className="w-[95%] mt-5 max-w-xs h-12 bg-primary text-off-white py-2 px-4 font-semibold  rounded-xl transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
					onClick={() =>
						router.push(
							"https://login.microsoftonline.com/common/oauth2/v2.0/logout"
						)
					}
				>
					Cerrar sesión desde Microsoft
				</button>
			</div>
		</>
	);
}
