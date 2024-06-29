import { Button } from "@nextui-org/react"
import { useStoreUi } from "../../store/store"
import { CustomModal } from "../../components/ui/modal/CustomModal";
import { FormularioCitas } from "../../components/Formularios/Citas/FormularioCitas";

export const RecepcionistaHome = () => {

    const { setOpenModal } = useStoreUi();

    return(
        <>
            <CustomModal form="citas-form">
                <FormularioCitas />
            </CustomModal>
            <div className=" grid grid-rows-9 grid-cols-9 row-span-9 col-span-9" style={{margin: "20px 20px 20px 0" }}>
                <Button onClick={ setOpenModal }>Agendar Cita</Button>
            </div>
        
        </>
    )
}