const TableSvg = ({ color, width }: { color: string; width: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			id="table"
			fill={color}
			height={width}
			width={width}
			className="mx-auto"
		>
			<path d="M29.13 10.47h-26a1 1 0 0 0-1 1v3.31a1 1 0 0 0 1 1h.2V29a1 1 0 0 0 1 1H7a1 1 0 0 0 1-1V15.78h7V29a1 1 0 0 0 1 1h13.13a1 1 0 0 0 1-1V11.47a1 1 0 0 0-1-1Zm-25 2h24v1.31h-24ZM6 28h-.67V15.78H6Zm22.13-12.22v5.11H17v-5.11Zm0 12.22H17v-5.11h11.13Z"></path>
			<path d="M19.06 19.33h7.25a1 1 0 1 0 0-2h-7.25a1 1 0 0 0 0 2zM18.94 26h7.25a1 1 0 0 0 0-2h-7.25a1 1 0 1 0 0 2z"></path>
		</svg>
	);
};

export default TableSvg;