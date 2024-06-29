import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { useStoreUi } from "../../../store/store"

export const CustomModal = ( props ) => {

    const { isOpenModal, setCloseModal } = useStoreUi();

    const closeModal = () => {
        setCloseModal();
    }

    return (
        <>
            <Modal isOpen={isOpenModal} size="5xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">
                            { props.titulo }
                        </ModalHeader>
                        <ModalBody>
                            { props.children  }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onClick={closeModal}>
                            Cancelar
                            </Button>
                            <Button 
                                form={ props.form }
                                color="primary"
                                type="submit"
                            >
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