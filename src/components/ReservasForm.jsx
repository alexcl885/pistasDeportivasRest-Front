import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const ReservasForm = () => {
    const [instalaciones, setInstalaciones] = useState([]);
    // const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => { 
        const peticion = async () => {
            try {
                const response = await api.get('/instalacion');
                setInstalaciones(response.data);
            } catch (err) {
                // setError('No se puede completar la operación');
                navigate('/login')
                console.log(err);
            }
        };
        peticion();
    }, []); 

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>  
                        <th>Nombre</th> 
                        <th>Escoge</th>
                        {/**<th>Borrar</th>**/}
                    </tr>
                </thead>
                <tbody>
                    {instalaciones.map((instalacion) => (
                        <tr key={instalacion.id}>
                            <td>{instalacion.id}</td>
                            <td>{instalacion.nombre}</td>
                            <td>
                                <Button as={Link} to={`/mis-reservas/add/horario/instalacion/${instalacion.id}`} className="btn-success">
                                    elegir
                                </Button>
                            </td>                            
                            {/**<td>
                                <Button as={Link} to={`/instalacion/del/${instalacion.id}`} className="btn-danger">
                                    Eliminar
                                </Button>
                            </td>**/}
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/*error && <p style={{ color: 'red' }}>{error}</p>*/}
        </Container>
    );
};

export default ReservasForm;