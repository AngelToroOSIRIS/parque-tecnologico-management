"use client";

import fetchFn from "@/libs/fetchFn";
import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import PlaceCard from "../PlaceCard";
import { SiteInter } from "@/types/d";
const SitesPageInter = () => {
  const categories = useAppSelector((state) => state.categoriesReducer);

  const [loading, setLoading] = useState<boolean>(true);
  const [dataSite, setDataSite] = useState<SiteInter[]>([]);

  const getData = async () => {
    setLoading(true);
    const response = await fetchFn("/getInternPlaces");
    if (response.code !== 200) {
      toast.error("No se ha podido obtener la información");
    }
    setDataSite(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!loading && (
        <main>
          <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 md:grid-col-3 xl:grid-cols-4 gap-5 mt-10 mx-auto mb-10 items-center">
            {dataSite.map((site) => (
              <>
                <div key={site.id}>
                  <PlaceCard
                    place={{
                      id: site.id,
                      descripcion_corta: site.descripcion_corta,
                      img_card: site.img_card,
                      nombre: site.nombre,
                      caracteristicas_espacio: {
                        id: site.caracteristicas_espacio.id,
                        adicionales: site.caracteristicas_espacio.adicionales,
                        computadores: site.caracteristicas_espacio.computadores,
                        dimensiones: site.caracteristicas_espacio.dimensiones,
                        escritorios: site.caracteristicas_espacio.escritorios,
                        mesa_reuniones:
                          site.caracteristicas_espacio.mesa_reuniones,
                        sillas: site.caracteristicas_espacio.sillas,
                        tablero: site.caracteristicas_espacio.tablero,
                        televisores: site.caracteristicas_espacio.televisores,
                        video_beam: site.caracteristicas_espacio.video_beam,
                      },
                    }}
                  />
                </div>
              </>
            ))}
          </div>
        </main>
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
};

export default SitesPageInter;
