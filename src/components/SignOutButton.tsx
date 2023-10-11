"use client";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<button
		title="Cerrar sesión"
		aria-label="Cerrar sesión"
			className="bg-primary w-[40px] h-10 items-center hover:bg-dark-primary text-off-white text-2xl justify-between rounded-2xl"
			onClick={() =>
				router.push(
					"https://login.microsoftonline.com/common/oauth2/v2.0/logout"
				)
			}
		>
			<i className="bi bi-box-arrow-right justify-center items-center text-xl"></i>
			{/* Cerrar Sesión */}
		</button>
	);
}
