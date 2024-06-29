import { useEffect, useState } from "react";
import { useStoreCitas } from "../../store/store"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../../assets/icons/DeleteIcoin";

const columns = [
    {
      key: "paciente",
      label: "Paciente",
    },
    {
        key: "medico",
        label: "Medico"
    },
    {
        key: "fecha",
        label: "Fecha"
    },
    {
        key: "hora",
        label: "Hora"
    },
    {
        key: "opciones",
        label: "Opciones"
    }
  ];


export const HistorialCitas = () => {

    const { historialCitasData, setHistorialConsultas } = useStoreCitas();
    const [ citasDataTable, setCitasDataTable ] = useState();

    useEffect((() => {
        setHistorialConsultas();
    }),[]);

    useEffect((()=>{
        setCitasDataTable( formatedDataTable );
        console.log( citasDataTable );
    }),[citasDataTable])

    const formatedDataTable = historialCitasData.map(( cita) => ({
        id:  cita.id_consulta,
        paciente: cita.nombre_paciente,
        medico: cita.nombre_medico,
        fecha: cita.fecha_consulta,
        hora: cita.hora_consulta,
        opciones: (
                <div className="relative flex items-center gap-2">
                  <Tooltip color="danger" content="Eliminar Usuario">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon /*onClick={ () => handleDeletePaciente( usuario  ) }*/ />
                    </span>
                  </Tooltip>
                </div>
        )
    }));

    return(
        <>
            <div className="col-span-10 col-start-2 row-start-3">
                <Table 
                    aria-label="Tabla Pacientes"
                    // topContent={ topContet }
                    // topContentPlacement="outside"
                >
                    <TableHeader columns={ columns }>
                        {( column ) => <TableColumn key={ column.key }>{ column.label }</TableColumn>}
                    </TableHeader>
                    <TableBody items={ citasDataTable }>
                        {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}