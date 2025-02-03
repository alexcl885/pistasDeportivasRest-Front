import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import api from "../services/api";

const InstalacionesList = () => {
    const [instalaciones, setInstalaciones] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => { 
        const peticion = async () => {
            try {
                const response = await api.get('/instalacion');
                setInstalaciones(response.data);
            } catch (err) {
                setError('No se puede completar la operación');
                console.log(err);
            }
        };
        peticion();
    }, []); // <-- Agrega el arreglo de dependencias vacío

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>  
                        <th>Nombre</th> 
                    </tr>
                </thead>
                <tbody>
                    {instalaciones.map((instalacion) => (
                        <tr key={instalacion.id}>
                            <td>{instalacion.id}</td>
                            <td>{instalacion.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Container>
    );
};

export default InstalacionesList;