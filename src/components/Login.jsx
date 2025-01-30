import { Button, Form } from "react-bootstrap";

const Login = () => {

    const manejaLogin = () => {

    }

    return( 
        <Form onSubmit={manejaLogin}>
            <Form.Group className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre de Usuario"
                    aria-label="Nombre de Usuario"
                
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    aria-label="Password"
                
                />
            </Form.Group>
            <Form.Group className="mb-3">                
                <Button type="submit">
                    ¡Enviar!
                </Button>
            </Form.Group>

        </Form>
    );
};

export default Login;