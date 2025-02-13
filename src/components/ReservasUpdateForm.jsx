import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const ReservasUpdateForm = () => {
    let { id } = useParams();
    const [fecha, setFecha] = useState('');
    const [horario, setHorario] = useState('');
    const [usuario, setUsuario] = useState('');
    const [error, setError] = useState(false);
    const [instalaciones, setInstalaciones] = useState([]);
    const [instalacion, setInstalacion] = useState('');
    const [horarios, setHorarios] = useState([]);
    const [idInsta, setIdInsta] = useState('');

    const [minFecha, setMinFecha] = useState("");
    const [maxFecha, setMaxFecha] = useState("");

    const navigate = useNavigate();
    const ruta = useLocation();

    const estado = () => {
        if (ruta.pathname.includes('add')) return 'add';
        if (ruta.pathname.includes('del')) return 'del';
        if (ruta.pathname.includes('edit')) return 'edit';
        return '';
    };

    const manejaForm = async (event) => {
        event.preventDefault();
        try {
            if (!idInsta || !horario || !fecha) {
                setError('Todos los campos son obligatorios.');
                return;
            }

            const response = await api.post('/mis-reservas', {
                instalacion: { id: idInsta },
                horario: { id: horario },
                fecha: fecha
            });
            console.log(response);
            navigate('/mis-reservas');
        } catch (err) {
            setError('No se pueden realizar dos reservas el mismo dia');
            console.error(err);
        }
    };

    const buscarHorariosDisponibles = async () => {
        try {
            if (!idInsta || !fecha) return;
            const response = await api.get(`/mis-reservas/horario/instalacion/${idInsta}/fecha/${fecha}`);
            setHorarios(response.data);
            console.log(response);
        } catch (err) {
            setError('No se puede completar la petición');
            console.error(err);
        }
    };

    const deleteForm = async (event) => {
        event.preventDefault();
        try {
            await api.delete(`/mis-reservas/${id}`);
            navigate('/mis-reservas');
        } catch (err) {
            setError('No se puede completar la petición');
            console.error(err);
        }
    };

    useEffect(() => {
        const peticion = async () => {
            if (id && !isNaN(id)) {
                try {
                    const response = await api.get(`/mis-reservas/${id}`);
                    setFecha(response.data.fecha);
                    setHorario(response.data.horario.id);
                    setInstalacion(response.data.horario.instalacion);
                    setIdInsta(response.data.horario.instalacion.id);
                    setUsuario(response.data.usuario.username);
                } catch (err) {
                    setError('No se puede completar la operación');
                    console.error(err);
                }
            }
        };
        peticion();

        const peticionInstalaciones = async () => {
            try {
                const response = await api.get('/instalacion');
                setInstalaciones(response.data);
            } catch (err) {
                navigate('/login');
                console.error(err);
            }
        };
        peticionInstalaciones();
        /**
         * Para poder realizar una reserva para una semana
         */
        const fechaDeHoy = new Date();
        const fechaMaximaQuePermito = new Date();
        fechaMaximaQuePermito.setDate(fechaDeHoy.getDate() + 7);

        const formatoFecha = (date) => date.toISOString().split("T")[0];

        setMinFecha(formatoFecha(fechaDeHoy));
        setMaxFecha(formatoFecha(fechaMaximaQuePermito));
    }, [id]);

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>ID:</Form.Label>
                <Form.Control type="text" disabled value={id} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Fecha:</Form.Label>
                <Form.Control
                    type="date"
                    value={fecha}
                    min={minFecha} 
                    max={maxFecha} 
                    
                    disabled={estado() === 'del'}
                    onChange={(e) => setFecha(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Instalación:</Form.Label>
                <Form.Select
                    value={idInsta}
                    disabled={estado() === 'del'}
                    onChange={(e) => setIdInsta(e.target.value)}
                    onClick={buscarHorariosDisponibles}
                >
                    {instalaciones.map((instalacion) => (
                        <option key={instalacion.id} value={instalacion.id}>{instalacion.nombre}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Horario:</Form.Label>
                <Form.Select
                    value={horario}
                    disabled={estado() === 'del'}
                    onChange={(e) => setHorario(e.target.value)}
                >
                    {horarios.map((horario) => (
                        <option key={horario.id} value={horario.id}>{horario.horaInicio } - {horario.horaFin}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label hidden>Usuario:</Form.Label>
                <Form.Control
                    type="text"
                    value={usuario}
                    hidden
                    disabled={estado() === 'edit'}
                    onChange={(e) => setUsuario(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                {
                    {
                        'add': <Button className="btn-success" onClick={manejaForm}>Alta</Button>,
                        'edit': <Button className="btn-success" onClick={manejaForm}>Actualizar</Button>,
                        'del': <Button className="btn-danger" onClick={deleteForm}>Borrar</Button>
                    }[estado()]
                }
                <Button as={Link} to={-1} className="btn-secondary">Cancelar</Button>
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
    );
};

export default ReservasUpdateForm;
