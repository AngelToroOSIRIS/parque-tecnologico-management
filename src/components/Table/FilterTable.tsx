import React from "react";
import { Column } from "@tanstack/react-table";
import InputTable from "./InputTable";

const FilterTable = ({ column }: { column: Column<any> }) => {
	const columnFilterValue = column.getFilterValue();

	return (
		<InputTable
			className="my-0 py-0 font-medium bg-opacity-0"
			type="text"
			placeholder="Buscar..."
			value={(columnFilterValue ?? "") as string}
			onChange={({value}) => column.setFilterValue(value)}
		/>
	);
};

export default FilterTable;