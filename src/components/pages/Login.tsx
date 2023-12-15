"use client";

import { signIn } from "next-auth/react";

export default function Login() {
	return (
		<>

			<div className="mx-auto w-[95%] text-center max-w-md justify-center items-center">
				<p className="text-3xl text-center my-12 font-semibold">
					Administración Coworking
				</p>
				<button
					className="w-[95%] max-w-xs h-12 bg-primary text-off-white py-2 px-4 font-semibold rounded-xl transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
					onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
				>
					<i className="bi bi-microsoft mr-2"></i> Ingresa con Microsoft
				</button>
			</div>
		</>
	);
}
