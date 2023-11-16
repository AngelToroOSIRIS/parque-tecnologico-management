import { formatDate } from "@/libs/functionsStrings";
import { HistoryRequest } from "@/types/d";

const ReservationRecordCard = ({ record }: { record: HistoryRequest }) => {
  return (
    <article className="px-4 py-2 border-2 border-borders-light rounded-2xl">
      <div className="w-full flex justify-between items-start">
        <p className="text-primary font-medium">
          <strong>Estado: </strong>
          {record.estado_reservacion}
        </p>
        <p>
          <strong>Fecha: </strong>
          {formatDate(record.fecha_creacion, true)}
        </p>
      </div>
      <p className="mt-2 font-bold">Observaciones:</p>
      <p>{record.observaciones ?? "No registra."}</p>
      <p className="mt-2 font-bold">Creado por:</p>
      <p>{record.creado_por ?? "No registra."}</p>
    </article>
  );
};

export default ReservationRecordCard;
