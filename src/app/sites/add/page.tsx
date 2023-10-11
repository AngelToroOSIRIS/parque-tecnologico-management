import Header from "@/components/Header";
import FormSite from "@/components/FormSite";

export default function CreatePage() {
  return (
    <>
      <Header />
      <p className="text-center text-primary mt-[20%] md:mt-[10%] lg:mt-[6%] font-semibold text-3xl">
        Añadir sitio:
      </p>
      <div className=" w-[80%] h-[80%] rounded-lg mb-44 mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] mt-7 m-20 p-7">
        {/* <button>Agregar Imagenes
        <i className="bi bi-images"></i>
        </button> */}
        <FormSite site={{}} />
      </div>
    </>
  );
}
