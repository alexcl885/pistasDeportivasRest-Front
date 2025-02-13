import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api"

const ReservasUpdateForm = () =>{

    let { id } = useParams();

    // const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    const [horario, setHorario] = useState('')
    const [usuario, setUsuario] = useState('')
    const [error, setError] = useState('');
    const [instalaciones, setInstalaciones] = useState([]);
    const [instalacion, setInstalacion] = useState('');
    const [horarios, setHorarios] = useState([]);
    const [idInsta, setIdInsta] = useState('');

    const navigate = useNavigate();
    const ruta = useLocation();

    const estado = () => {
        if (ruta.pathname.includes('add')) return 'add';
        if (ruta.pathname.includes('del')) return 'del';
        if (ruta.pathname.includes('edit')) return 'edit';
    }

    const manejaForm = async(event) => {
        event.preventDefault();
        try {
            const response = await api.post('/mis-reservas/', { id, fecha ,horario, usuario });
            /*
            setId(response.data.id);
            setFecha(response.data.nombre);
            */
            console.log(response);
            navigate('/mis-reservas')
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    }

    const buscarHorariosDisponibles = async () => {
        try {
        
            const response = await api.get(`/mis-reservas/horario/instalacion/${idInsta}/fecha/${fecha}`);
            /*
            setId(response.data.id);
            setFecha(response.data.nombre);
            */
            setHorarios(response.data)
            console.log(response);
            
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }

    }

    const deleteForm = async(event) => {
        event.preventDefault();
        try {
            const response = await api.delete('/mis-reservas/'+id, { id, fecha ,horario, usuario });
            /*
            setId(response.data.id);
            setFecha(response.data.nombre);
            */
            console.log(response);
            navigate('/mis-reservas')
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    }

    const manejaAtras = async(event) => {
        event.preventDefault();
        navigate(-1);
    }

    useEffect( ()=>{
        
        const peticion = async () => {
            if (!isNaN(id))
                try {
                    const response = await api.get('mis-reservas/'+id);
                    console.log(response);
                    
                    setFecha(response.data.fecha);
                    setHorario(response.data.horario.id)
                    setInstalacion(response.data.horario.instalacion)
                    setIdInsta(response.data.horario.instalacion.id)
                    
                    
                    
                    
                    setUsuario(response.data.usuario.username)       
                                 
                } catch (err) {
                    setError('No se puede completar la operación');
                    // navigate('/login')
                    console.log(err);
                }
        };
        peticion();

        const peticionInstalaciones = async () => {
            
            try {
                const response = await api.get('/instalacion');
                setInstalaciones(response.data);
            } catch (err) {
                // setError('No se puede completar la operación');
                navigate('/login')
                console.log(err);
            }
        };
        peticionInstalaciones();
        
    }, []);

    return(
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>ID:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ID de Instalación"
                    aria-label="Identificador de la instalación"                    
                    disabled
                    value={id}
                />
            <Form.Group className="mb-3">
            <Form.Label>Fecha:</Form.Label>
            <Form.Control
                type="date"
                placeholder="Fecha de Instalación"
                aria-label="Fecha de la instalación"
                value={fecha}
                disabled={estado()=='del'?true:false}
                onChange={(e) => setFecha(e.target.value)}
            />
            </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Instalacion:</Form.Label>
                <Form.Select
                    type="text"
                    placeholder="Instalación"
                    aria-label="instalación"
                    value={instalacion}
                    disabled={estado()=='del'?true:false}
                    onChange={(e) => setIdInsta(e.target.value)}
                    onClick={() => buscarHorariosDisponibles()}
                    
                >
                    {instalaciones.map((instalacion) => {
                        return (
                            <option key={instalacion.id} value={instalacion.id}>{instalacion.nombre}</option>
                            
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Horario:</Form.Label>
                <Form.Select
                    type="text"
                    placeholder="Horario de Instalación"
                    aria-label="Horario de Instalacion"
                    value={horarios}
                    disabled={estado()=='del'?true:false}
                    onChange={(e) => setHorario(e.target.value)}
                >
                    {horarios.map((horario, index) => {
                        return(
                            <>
                                <option  key={horario.id} value={horario.id}>{horario.id}</option>
                            </>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Usuario:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Horario de Instalación"
                    aria-label="Horario de Instalacion"
                    value={usuario}
                    disabled={estado()=='edit'?true:false}
                    onChange={(e) => setUsuario(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                {
                    {
                        'add': <Button className="btn-success" onClick={manejaForm}>Alta</Button>,
                        'edit': <Button className="btn-success" onClick={manejaForm}>Actualizar</Button>,
                        'del': <Button as={Link} className="btn-danger" onClick={deleteForm} >Borrar</Button>
                    } [estado()]
                }
                <Button as={Link} onClick={manejaAtras} >
                    Cancelar
                </Button>
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
    );

}



export default ReservasUpdateForm;
