"use client";

import { PlaceCard } from "@/types/d";
import { Badge, Image, ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TableSvg from "./icons/TableSvg";
import ChairSvg from "./icons/ChairSvg";
import { emptyValue } from "@/libs/functionsStrings";

const PlaceCard = ({ place }: { place: PlaceCard }) => {
  const router = useRouter();

  return (
    <article className="mx-auto w-full sm:max-w-[330px]">
      <div className="block bg-off-white card-shadow rounded-2xl overflow-hidden transition-all">
        <div className="block sm:hidden w-full px-5 pt-3">
          <p className="mb-2 text-primary font-semibold text-lg">
            {place.nombre}
          </p>
        </div>
        <div
          className="flex-center w-full sm:max-w-[330px] h-full max-h-[186px] overflow-hidden hover:opacity-80 cursor-pointer transition-all"
          onClick={() => router.push(`/sites/${place.id}`)}
          title="Ver detalles"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASEURL}/image?imageName=${place.img_card}`}
            className="select-none rounded-2xl sm:rounded-none"
            alt="Imagen lugar"
            radius="none"
          />
        </div>
        <div className="w-full px-5 pt-3 pb-5">
          <p className="hidden sm:block mb-2 text-primary font-semibold text-lg">
            {place.nombre}
          </p>

          <ScrollShadow className="h-[140px] sm:h-[190px]">
            <p>{place.descripcion_corta}</p>
          </ScrollShadow>

          <div className="flex flex-wrap items-center gap-4 py-2 text-xl text-primary">
            {!emptyValue(place.caracteristicas_espacio.escritorios) && (
              <Badge
                size="sm"
                content={place.caracteristicas_espacio.escritorios}
                color="primary"
                title="Escritorios"
                isInvisible={
                  place.caracteristicas_espacio.escritorios
                    ? place.caracteristicas_espacio.escritorios < 2
                    : true
                }
              >
                <TableSvg color="#686868" width="28" />
              </Badge>
            )}
            {!emptyValue(place.caracteristicas_espacio.mesa_reuniones) && (
              <Badge
                size="sm"
                content={place.caracteristicas_espacio.mesa_reuniones}
                color="primary"
                isInvisible={
                  place.caracteristicas_espacio.mesa_reuniones
                    ? place.caracteristicas_espacio.mesa_reuniones < 2
                    : true
                }
              >
                <i
                  className="bi bi-people text-soft-gray"
                  title="Mesas de reuniones"
                ></i>
              </Badge>
            )}
            {!emptyValue(place.caracteristicas_espacio.video_beam) && (
              <Badge
                size="sm"
                content={place.caracteristicas_espacio.video_beam}
                color="primary"
                isInvisible={
                  place.caracteristicas_espacio.video_beam
                    ? place.caracteristicas_espacio.video_beam < 2
                    : true
                }
              >
                <i
                  className="bi bi-projector text-soft-gray"
                  title="Video Beam"
                ></i>
              </Badge>
            )}
            {!emptyValue(place.caracteristicas_espacio.televisores) && (
              <Badge
                size="sm"
                content={place.caracteristicas_espacio.televisores}
                color="primary"
                isInvisible={
                  place.caracteristicas_espacio.televisores
                    ? place.caracteristicas_espacio.televisores < 2
                    : true
                }
              >
                <i className="bi bi-tv text-soft-gray" title="Televisores"></i>
              </Badge>
            )}
            {!emptyValue(place.caracteristicas_espacio.computadores) && (
              <Badge
                size="sm"
                content={place.caracteristicas_espacio.computadores}
                color="primary"
                isInvisible={
                  place.caracteristicas_espacio.computadores
                    ? place.caracteristicas_espacio.computadores < 2
                    : true
                }
              >
                <i
                  className="bi bi-pc-display text-soft-gray"
                  title="Computadores"
                ></i>
              </Badge>
            )}
            {!emptyValue(place.caracteristicas_espacio.sillas) && (
              <Badge
                size="sm"
                content={place.caracteristicas_espacio.sillas}
                color="primary"
                title="Sillas"
                isInvisible={
                  place.caracteristicas_espacio.sillas
                    ? place.caracteristicas_espacio.sillas < 2
                    : true
                }
              >
                <ChairSvg color="#686868" width="28" />
              </Badge>
            )}
            {!emptyValue(place.caracteristicas_espacio.tablero) && (
              <Badge
                size="sm"
                content={place.caracteristicas_espacio.tablero}
                color="primary"
                isInvisible={
                  place.caracteristicas_espacio.tablero
                    ? place.caracteristicas_espacio.tablero < 2
                    : true
                }
              >
                <i className="bi bi-easel2 text-soft-gray" title="Tableros"></i>
              </Badge>
            )}
          </div>

          <Link
            href={`/sites/${place.id}`}
            className="mt-2 text-primary hover:underline text-center select-none cursor-pointer"
          >
            Ver detalles <i className="bi bi-arrow-right-circle mr-1"></i>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PlaceCard;
