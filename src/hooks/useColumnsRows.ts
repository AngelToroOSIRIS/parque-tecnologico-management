"use client"

import { useMemo } from "react";

export default function useColumnsRowsTanstack(array : Object[], table : any) {
  const newArray = array.map((item : any) => {
    const { accessor, header } = item;

    return table.createDataColumn(accessor, {
      header,
      cell: (info : any) => info.getValue(),
      footer: (props : any) => props.column.id,
    });
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memo = useMemo(() => newArray, []);

  return memo;
}