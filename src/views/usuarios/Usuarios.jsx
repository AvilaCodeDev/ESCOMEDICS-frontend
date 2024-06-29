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
    Select,
    SelectItem
  } from "@nextui-org/react";
import { useStoreUi, useStoreUsuarios } from "../../store/store";
import { useEffect, useMemo, useState } from "react";
import { DeleteIcon } from "../../assets/icons/DeleteIcoin";
import { EditIcon } from "../../assets/icons/EditIcon";
import { PlusIcon } from "../../assets/icons/PlusIcon";

import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import PacientesModal from "../../components/ui/PacientesModal";
import { CustomModal } from "../../components/ui/modal/CustomModal";
import { FormularioUsuarios } from "../../components/Formularios/FormularioUsuario";


const baseUrl = import.meta.env.VITE_REACT_APP_URL;

const roles = [
    {key: "1", label: "Recepcionista"},
    {key: "2", label: "Medico"},
    {key: "3", label: "Farmaceutico"},
    {key: "4", label: "Paciente"}
  ];

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
        key: "rol",
        label: "Rol Usuario"
    },
    {
        key: "opciones",
        label: "Opciones"
    }
  ];
 
 export const Usuarios = () =>{

    const { usuariosData, setUsuarios, usuariosSetActive } = useStoreUsuarios();
    const [ usuariosDataTable, setUsuariosDataTable ] = useState([]);
    const { setOpenModal } = useStoreUi();

    const handleUpdateUsuario = ( usuario ) => {
        usuariosSetActive( usuario );
        setOpenModal();
    }

    const topContet = useMemo(() => {
        return(
            <>
                <div className="flex flex-col gap-4 ">
                    <div className="flex justify-end gap-3 items-end">
                    <div className="flex gap-3">
                        <Button 
                            color="primary" 
                            endContent={<PlusIcon />}
                            onClick={ setOpenModal }
                        >
                            Nuevo Usuario
                        </Button>
                    </div>
                    </div>
                </div>
            </>
        )

    }, []);

    const formatedDataTable = usuariosData.map(( usuario) => ({
        id: usuario.id_usuario ,
        nombre: `${usuario.nombre} ${usuario.ap_paterno} ${usuario.ap_materno}`,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        rol: usuario.rol_usuario,
        opciones: (
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar Usuario">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon onClick={ () => handleUpdateUsuario( usuario ) } />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar Usuario">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon /*onClick={ () => handleDeletePaciente( usuario  ) }*/ />
                    </span>
                  </Tooltip>
                </div>
        )
    }));

    useEffect( () => {
        setUsuarios();
        setUsuariosDataTable( formatedDataTable )
    },[]);

    useEffect( () => {
        setUsuariosDataTable( formatedDataTable )
    },[usuariosData])

    return (
        <>
            <CustomModal form="usuarios-form">
                <FormularioUsuarios />
            </CustomModal>

            <div className="col-span-10 col-start-2 row-start-3">
                <Table 
                    aria-label="Tabla Pacientes"
                    topContent={ topContet }
                    topContentPlacement="outside"
                >
                    <TableHeader columns={ columns }>
                        {( column ) => <TableColumn key={ column.key }>{ column.label }</TableColumn>}
                    </TableHeader>
                    <TableBody items={usuariosDataTable}>
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