import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input } from "@nextui-org/react"
import { useStorePacientes, useStoreUi } from "../../store/store"
import { useEffect, useState } from "react";

const initialValues = {
    id: null,
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    telefono: '',
    curp: '',
    direccion: ''
}

export default function PacientesModal() {
    const { isOpenModal, setCloseModal } = useStoreUi();
    const {  clearActivePaciente, registrarPaciente, updatePaciente, activePaciente } = useStorePacientes();
    const [ formValues, setFormValues ] = useState( initialValues );

    const { nombre, ap_paterno, ap_materno, telefono, curp, direccion } = formValues;
    // const [ values, handleInputChange, reset ] = useForm( initialValues );

    useEffect(() => {
      if( activePaciente ){
        setFormValues( activePaciente );
      }else{
        setFormValues( initialValues );
      }
    }, [activePaciente, setFormValues]);

    const handleInputChange = ({ target }) => {
      setFormValues({
          ...formValues,
          [target.name]: target.value
      });
  }

  const closeModal = () => {
    setCloseModal();
    clearActivePaciente();
    setFormValues( initialValues );

  }
    

    const handleSubmitform = (e) => {
        e.preventDefault();

        if( activePaciente ){
          updatePaciente( formValues );
        }else{
          registrarPaciente( formValues );
        }


        closeModal();

    }
    
  return (
    <>
      <Modal isOpen={isOpenModal} size="5xl">
      <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{ activePaciente ? "Modificar Paciente":"Agregar Paciente" }</ModalHeader>
              <ModalBody>
                <form className="grid grid-cols-3 grid-rows-2 gap-4">

                    <Input 
                        isRequired
                        name="nombre"
                        className= "col-start-1" 
                        type='text' 
                        variant='faeded' 
                        color='primary' 
                        label="Nombre" 
                        placeholder='Ingresa el nombre' 
                        onChange={ handleInputChange }
                        value={ nombre }
                    />
                    <Input 
                        isRequired
                        name="ap_paterno"
                        className= "col-start-2" 
                        type='text' 
                        variant='faeded' 
                        color='primary' 
                        label="Apellido Paterno" 
                        placeholder='Ingresa el apellido paterno' 
                        onChange={ handleInputChange }
                        value={ ap_paterno }
                    />
                    <Input 
                        isRequired
                        name="ap_materno"
                        className= "col-start-3" 
                        type='text' 
                        variant='faeded' 
                        color='primary' 
                        label="Apellido Materno" 
                        placeholder='Ingresa el apellido materno' 
                        onChange={ handleInputChange }
                        value={ ap_materno }
                    />
                    <Input 
                        isRequired
                        name="telefono"
                        className= "col-start-1 row-start-2" 
                        type='text' 
                        variant='faeded' 
                        color='primary' 
                        label="Telefono" 
                        placeholder='Ingresa el telefono' 
                        onChange={ handleInputChange }
                        value={ telefono }

                    />
                    <Input 
                        isRequired
                        name="direccion"
                        className= "col-start-2 row-start-2" 
                        type='text' 
                        variant='faeded' 
                        color='primary' 
                        label="Direccion" 
                        placeholder='Ingresa el apellido materno' 
                        onChange={ handleInputChange }
                        value={ direccion }
                    />
                    <Input 
                        isRequired
                        name="curp"
                        className= "col-start-3 row-start-2" 
                        type='text' 
                        variant='faeded' 
                        color='primary' 
                        label="CURP" 
                        placeholder='Ingresa el CURP' 
                        onChange={ handleInputChange }
                        value={ curp }
                    />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={ handleSubmitform }>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
