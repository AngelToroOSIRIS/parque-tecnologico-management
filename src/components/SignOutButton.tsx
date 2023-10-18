"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
	const router = useRouter();
	return (
		<button
		title="Cerrar sesión"
		aria-label="Cerrar sesión"
			className="w-[40px] h-10 items-center font-medium text-borders text-2xl hover:text-primary transition-all p-1"
			onClick={() => signOut({callbackUrl:"/login"})
			}
		>
			<i className="bi bi-box-arrow-right justify-center items-center text-xl"></i>
			{/* Cerrar Sesión */}
		</button>
	);
}
