"use client";

import Table from "@/components/Table";
import { CategoryTextShort } from "@/types/d";

interface Props {
  params: { category: CategoryTextShort };
}

export default function Categories({ params }: Props) {
  return (
        <Table params={params}/>
  );
}
