const ChairSvg = ({ color, width }: { color: string; width: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-chair-director mx-auto"
			width={width}
			height={width}
			viewBox="0 0 24 24"
			stroke={color}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M6 21l12 -9" />
			<path d="M6 12l12 9" />
			<path d="M5 12h14" />
			<path d="M6 3v9" />
			<path d="M18 3v9" />
			<path d="M6 8h12" />
			<path d="M6 5h12" />
		</svg>
	);
};

export default ChairSvg;