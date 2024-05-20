import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip,
  } from "@nextui-org/react";
import { useStorePacientes, useStoreUi } from "../../store/store";
import { useEffect, useMemo, useState } from "react";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import PacientesModal from "../../components/ui/PacientesModal";
import { EditIcon } from "../../assets/icons/EditIcon";
import { DeleteIcon } from "../../assets/icons/DeleteIcoin";

  
  const columns = [
    {
      key: "nombre",
      label: "Nombre",
    },
    {
        key: "telefono",
        label: "Telefono"
    },
    {
        key: "direccion",
        label: "Direccion"
    },
    {
        key: "curp",
        label: "CURP"
    },
    {
        key: "opciones",
        label: "Opciones"
    }
  ];

export const Pacientes = () => {

    const [ pacientesDataTable, setPacientesDataTable ] = useState([]);

    const {
        pacientesData,
        setPacientes,
        pacienteSetActive,
        deletePaciente
    } = useStorePacientes();

    const {
        setOpenModal
    } = useStoreUi()

    
    useEffect(() => {
        setPacientes();
    }, []);

    useEffect(() => {
      setPacientesDataTable(formatedDataTable);
    }, [ pacientesData ])
    

    const topContet = useMemo(() => {
        return(
            <div className="flex flex-col gap-4">
                <Button 
                    color="primary"
                    endContent={ <PlusIcon /> }
                    onClick={ setOpenModal }
                >Nuevo Paciente</Button>
            </div>
        )

    }, []);
    
    const handleDeletePaciente = ( { id_paciente, nombre, ap_paterno, ap_materno } )=>{
        const confirmDelete = confirm(`¿Seguro quiere eliminear el paciente ${nombre} ${ap_paterno} ${ap_materno}?`);
        if( confirmDelete ){
            deletePaciente( { id_paciente } );
        }
    }

    const handleUpdatePaciente = ( paciente ) => {
        pacienteSetActive( paciente );
        setOpenModal();
    }

    const formatedDataTable = pacientesData.map(( paciente) => ({
        id: paciente.id_paciente ,
        nombre: `${paciente.nombre} ${paciente.ap_paterno} ${paciente.ap_materno}`,
        telefono: paciente.telefono,
        direccion: paciente.direccion,
        curp: paciente.curp,
        opciones: (
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar Usuario">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon onClick={ () => handleUpdatePaciente( paciente ) } />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar Usuario">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon onClick={ () => handleDeletePaciente( paciente  ) } />
                    </span>
                  </Tooltip>
                </div>
        )
    }));

  return (
    <>
        
        <PacientesModal />

        <div className="col-span-10 col-start-2 row-start-3">
            <Table 
                aria-label="Tabla Pacientes"
                topContent={ topContet }
                topContentPlacement="outside"
            >
                <TableHeader columns={ columns }>
                    {( column ) => <TableColumn key={ column.key }>{ column.label }</TableColumn>}
                </TableHeader>
                <TableBody items={pacientesDataTable}>
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
