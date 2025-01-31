import { Button, Form } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from "../services/auth";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const manejaLogin = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            setToken(response.data.token);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError('Credenciales no válidas');
        }
    }

    return( 
        <Form onSubmit={manejaLogin}>
            <Form.Group className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre de Usuario"
                    aria-label="Nombre de Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    aria-label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">                
                <Button type="submit">
                    ¡Enviar!
                </Button>
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
    );
};

export default Login;