import React from "react";

const Icon = ({
	icon,
	className = "",
}: {
	icon: string;
	className?: string;
}) => {
	return <i className={`bi bi-${icon} text-gray ` + className}></i>;
};

export default Icon;
