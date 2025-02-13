import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import bcrypt from "bcryptjs";
import api from "../services/api"

const UsuarioForm = () => {
    let { id } = useParams();

    const [enabled, setEnabled] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tipo, setTipo] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const ruta = useLocation();

    const estado = () => {
        if (ruta.pathname.includes('add')) return 'add';
        if (ruta.pathname.includes('del')) return 'del';
        if (ruta.pathname.includes('edit')) return 'edit';
    };

    const manejaForm = async (event) => {
        event.preventDefault();
        try {
            // para enviar hasheada la contraseña...
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const response = await api.post('/admin/usuario', {
                id,
                username,
                email,
                password: hashedPassword, // y aqui envio la contraseña hasheada
                tipo,
                enabled
            });

            console.log(response);
            navigate('/usuarios');
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    };

    const deleteForm = async (event) => {
        event.preventDefault();
        try {
            const response = await api.delete('/admin/usuario/' + id, {
                id,
                username,
                email,
                password,
                tipo,
                enabled
            });

            console.log(response);
            navigate('/usuarios');
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    };

    const manejaAtras = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    useEffect(() => {
        const peticion = async () => {
            if (!isNaN(id))
                try {
                    const response = await api.get('/usuario/' + id);
                    console.log("response" + response.data.email);

                    setEmail(response.data.email);
                    setPassword(response.data.password);
                    setTipo(response.data.tipo);
                    setUsername(response.data.username);
                    setEnabled(response.data.enabled);

                } catch (err) {
                    setError('No se puede completar la operación - No recibo los datos bien');
                    console.log(err);
                }
        };
        peticion();

    }, []);

    return (
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
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre de usuario"
                    aria-label="Nombre del usuario"
                    value={username}
                    disabled={estado() === 'del'}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Email del usuario"
                    aria-label="Email del usuario"
                    value={email}
                    disabled={estado() === 'del'}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Contraseña del usuario..."
                    aria-label="Contraseña del usuario"
                    value={password}
                    disabled={estado() === 'del'}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tipo:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Tipo de usuario"
                    aria-label="Tipo del usuario"
                    value={tipo}
                    disabled={estado() === 'del'}
                    onChange={(e) => setTipo(e.target.value)}
                />
                <Form.Select aria-label="Default select example" disabled={estado() === 'del'}
                    onChange={(e) => setTipo(e.target.value)}>
                    <option>Open this select menu</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    disabled={estado() === 'del'}
                    onChange={(e) => setTipo(e.target.value)}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Enabled:</Form.Label>
                <Form.Check
                    type="checkbox"
                    checked={enabled}
                    aria-label="Enabled del usuario"
                    disabled={estado() === 'del'}
                    onChange={(e) => setEnabled(e.target.checked)} // Ahora obtiene un booleano
                />
            </Form.Group>

            <Form.Group className="mb-3">
                {
                    {
                        'add': <Button className="btn-success" onClick={manejaForm}>Alta</Button>,
                        'edit': <Button className="btn-success" onClick={manejaForm}>Actualizar</Button>,
                        'del': <Button as={Link} className="btn-danger" onClick={deleteForm}>Borrar</Button>
                    }[estado()]
                }
                <Button as={Link} onClick={manejaAtras}>
                    Cancelar
                </Button>
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
    );
};

export default UsuarioForm;
