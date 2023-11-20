import Table from "@/components/Table";
import { CategoryTextShort } from "@/types/d";
import { useState } from "react";

interface Props {
  params: { category: CategoryTextShort };
}

export default function Categories({ params }: Props) {
  return (
    <>
        <Table params={params}/>
    </>
  );
}
