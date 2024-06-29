import './citasCard.css';

export const CitasCard = ( {cita} ) => {
    return (
        <div className="col-span-9 citas-card">
            <div className="citas-card_header">
                <strong>Proxima cita:</strong> { cita.fecha_consulta } a las {cita.hora_consulta}
            </div>
            <div className="citas-card_body">
                <div className=""><strong>Medico:</strong> { cita.nombre_medico }</div>
                <div className=""><strong>Especialidad:</strong> { cita.especialidad }</div>
                <div className=""><strong>Consultorio:</strong> { cita.consultorio }</div>
                <div className=""><strong>Piso:</strong> { cita.piso_consultorio }</div>
            </div>
        </div>
    )
}