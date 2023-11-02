import Header from "@/components/Header";
import FormSite from "@/components/FormSite";

export const metadata = {
  title: "Crear sitio",
};

export default function CreatePage() {
  return (
    <>
      <Header />
      <div className=" w-[87%] min-w-unit-8 mt-[7%] rounded-lg mb-44 mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] m-20 p-7">
        <FormSite site={{}} />
      </div>
    </>
  );
}
