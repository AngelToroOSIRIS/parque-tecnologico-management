"use client"

import Table from "@/components/Table";
import fetchFn from "@/libs/fetchFn";
import { CategoryTextShort, Site } from "@/types/d";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import TankTable from "../TankTable";

export default function Categories({
  category,
}: {
  category: CategoryTextShort;
}) {
  const [dataSite, setDataSite] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, status } = useSession();
  const userSession = data?.user ?? {
    name: "default",
    email: "useremail",
  };
  const getData = async () => {
    setLoading(true)
    const response = await fetchFn(`/places?categoria=${category}`);
    if (response.code !== 200) {
      return toast.error("No se ha podido obtener la información.", {
        id: "1",
      });
    }
    setDataSite(response.data);
    setLoading(false)
  };

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status]);

  return(
    <>
    {!loading && (
      <>
        <Table category={category} dataSite={dataSite} />
        <TankTable category={category} dataSite={dataSite}/>
      </>
    )}
    {loading && (
        <TailSpin
          height="100"
          width="100"
          color="#990000"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{
            margin: "20px 0",
            justifyContent: "center",
          }}
        />
      )}
     </>
     );
}
