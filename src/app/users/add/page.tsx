import FormUser from "@/components/FormUser";
import Header from "@/components/Header";

export default function () {
  return (
    <>
      <Header />
      <h1 className=" margin-header mx-auto text-3xl text-center font-semibold m-6 text-primary">
        Nuevo usuario
      </h1>
      <div className=" w-[27%] h-[80%] bg-off-white rounded-lg mb-44 mx-auto shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] m-10 p-5">
        <FormUser />
      </div>
    </>
  );
}
