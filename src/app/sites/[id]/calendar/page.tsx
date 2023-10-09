import { Category } from "@/app/[category]/page";
import Header from "@/components/Header";

const CalendarPage = ({
  params,
}: {
  params: { id: string; category: Category };
}) => {
  return (
    <>
      <Header />
      <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
        Agenda del sitio {params.id}
      </p>
    </>
  );
};

export default CalendarPage;
