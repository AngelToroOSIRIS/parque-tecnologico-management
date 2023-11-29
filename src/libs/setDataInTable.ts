import { SiteTbl } from "../types/d";

const range = (len: number) => {
	const arr: Array<number> = [];
	for (let i: number = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const printSite = (data: SiteTbl[], position: number): SiteTbl => {
	return {
        id: String(data[position].id),
        nombre: String(data[position].nombre),
        estado_espacio: String(data[position].estado_espacio),
        categoria: String(data[position].categoria),
        fecha_creacion: String(data[position].fecha_creacion),
        fecha_actualizacion: String(data[position].fecha_actualizacion),
	};
};

export function setSitesInTable(data: SiteTbl[]) {
	const setDataInTableLevel = (): SiteTbl[] => {
		return range(data.length).map((d): SiteTbl => {
			return printSite(data, d);
		});
	};

	return setDataInTableLevel();
}