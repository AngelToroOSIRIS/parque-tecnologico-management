import Table from "@/components/Table";
import { CategoryTextShort } from "@/types/d";

export default function Categories({ category }: {category:CategoryTextShort} ) {
  return <Table category={category} />;
}
