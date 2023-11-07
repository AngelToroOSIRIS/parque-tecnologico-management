import React from "react";

const GraySubtitle: React.FC<{
	text: string;
	color?: string;
	required?: boolean;
}> = ({ text, color = "soft-gray", required = false }) => {
	return (
		<p className={"flex justify-start items-center gap-1 mb-1 font-medium text-" + color}>
			{required && <i className="bi bi-asterisk text-primary text-xs"></i>}{" "}
			{text}
		</p>
	);
};

export default GraySubtitle;