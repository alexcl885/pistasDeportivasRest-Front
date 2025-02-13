import { useEffect, useState } from "react";
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";


const ReservasFormFecha = () => {
    const [fecha, setFecha] = useState(""); 

    const [minFecha, setMinFecha] = useState("");
    const [maxFecha, setMaxFecha] = useState("");

   
    //recojo el atributo del endpoint en la cual obtengo el id de la instalacion
    let { instalacionId } = useParams();

    useEffect(() => {
        /**
         * Para poder realizar una reserva para una semana
         */
        const fechaDeHoy = new Date();
        const fechaMaximaQuePermito = new Date();
        fechaMaximaQuePermito.setDate(fechaDeHoy.getDate() + 7);

        const formatoFecha = (date) => date.toISOString().split("T")[0];

        setMinFecha(formatoFecha(fechaDeHoy));
        setMaxFecha(formatoFecha(fechaMaximaQuePermito));
    }, [])

    return (
        <Container>
            <FormLabel>Fecha:</FormLabel>
            <Form.Control
                    type="date"
                    value={fecha}
                    min={minFecha} 
                    max={maxFecha} 
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
