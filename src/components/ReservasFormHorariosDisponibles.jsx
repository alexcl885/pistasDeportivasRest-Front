import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const ReservasFormHorariosDisponibles = () => {
    const [horarios, setHorarios] = useState([]);
    // const [error, setError] = useState('');
    const navigate = useNavigate();

    let {instalacionId , fecha }=useParams()

    useEffect(() => { 
        const peticion = async () => {
            try {
                const response = await api.get(`/mis-reservas/horario/instalacion/${instalacionId}/fecha/${fecha}`);
                setHorarios(response.data);
            } catch (err) {
                // setError('No se puede completar la operación');
                navigate('/login')
                console.log(err);
            }
        };
        peticion();
    }, []); 

    const handleReservar = async (hor) => {
        {/**ESTA ES EL OBJETO RESERVA QUE VA A REALIZAR EL POST */}
        const reservaData = {
            instalacion: { id: instalacionId }, 
            horario: { id:  hor.id}, 
            fecha: fecha
            
        };

        try {
            const response = await api.post("/mis-reservas", reservaData);
            navigate("/mis-reservas"); 
        } catch (error) {
            console.error("Error en la reserva:", error);
        }
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>  
                        <th>Instalacion</th> 
                        <th>Hora Incio</th>
                        <th>Hora Fin</th>
                        <th>Escoge</th>
                    </tr>
                </thead>
                <tbody>
                    {horarios.map((horario) => (
                        <tr key={horario.id}>
                            <td>{horario.id}</td>
                            <td>{horario.instalacion.nombre}</td>
                            <td>{horario.horaInicio}</td>
                            <td>{horario.horaFin}</td>
                            <td>
                                <Button onClick={() => handleReservar(horario)} className="btn-success">
                                    Elegir
                                </Button>
                            </td>                            
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/*error && <p style={{ color: 'red' }}>{error}</p>*/}
        </Container>
    );
};

export default ReservasFormHorariosDisponibles;
