import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getToken, clearToken } from '../services/auth';

function NavBar() {
  // Estado para controlar si el usuario está autenticado
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation(); // Obtiene la ubicación actual
  const navigate = useNavigate(); // Ahora useNavigate tiene acceso al contexto del Router

  // Se ejecuta cada vez que cambia la ruta
  useEffect(() => {
    const token = getToken();
    setIsLogged(!!token);
  }, [location]);

  const handleLogout = () => {
    clearToken();
    setIsLogged(false);
    navigate('/login');
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Gestión de reservas</Navbar.Brand>
        {/* Botón para mostrar/ocultar el menú en pantallas pequeñas */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Contenedor colapsable del menú */}
        <Navbar.Collapse id="basic-navbar-nav">        
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isLogged ? (
              <>
                <Nav.Link as={Link} to="/instalaciones">Instalaciones</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
