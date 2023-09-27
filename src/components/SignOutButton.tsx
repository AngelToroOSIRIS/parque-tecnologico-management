"use client";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<button
			className="bg-primary w-[120px] h-10 items-center p-1 my-3 hidden lg:block hover:bg-dark-primary text-off-white justify-center rounded-xl"
			onClick={() =>
				router.push(
					"https://login.microsoftonline.com/common/oauth2/v2.0/logout"
				)
			}
		>
			{/* <i className="bi bi-box-arrow-right mr-2 mt-3 text-2xl sm:text-base "></i> */}
			Cerrar Sesión
		</button>
	);
}
