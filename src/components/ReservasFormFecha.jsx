import { useEffect, useState } from "react";
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";


const ReservasFormFecha = () => {
    const [fecha, setFecha] = useState(""); 
    const navigate = useNavigate();
    //recojo el atributo del endpoint en la cual obtengo el id de la instalacion
    let { instalacionId } = useParams();

    return (
        <Container>
            <FormLabel>Fecha:</FormLabel>
            <Form.Control
                type="date"
                placeholder="Fecha"
                aria-label="Fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
            />
            <Button 
                as={Link} 
                to={fecha ? `/mis-reservas/add/horario/instalacion/${instalacionId}/fecha/${fecha}` : "#"} 
                className="btn-success"
                disabled={!fecha} 
            >
                Siguiente
            </Button>
        </Container>
    );
};

export default ReservasFormFecha;
