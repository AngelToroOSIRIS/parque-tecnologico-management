import Header from "@/components/Header";
import CalendarSitePage from "@/components/pages/CalendarSitePage";
import { CategoryTextShort } from "@/types/d";

const CalendarPage = ({params}:{
  params: { id: string }
}) => {
  //TODO: validar id
  return (
    <>
      <Header />
      <main>
        <CalendarSitePage idPlace={Number(params.id)} />
      </main>
    </>
  );
};

export default CalendarPage;
