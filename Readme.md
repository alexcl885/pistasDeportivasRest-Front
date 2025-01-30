# Front-end Pistas Deportivas

Front en React para la API REST Spring de gestión de reservas de instalaciones deportivas.

Creamos el proyecto y añadimos las dependencias con: 

```bash
npm create vite@latest front-pistas-deportivas
cd front-pistas-deportivas
npm install react-router-dom axios react-bootstrap bootstrap
npm install 
```

Creamos las carpetas necesarias para el proyecto:

Carpeta | Uso
--------|----
pages | para las páginas
components | para los componentes
services | para la api (peticiones al back)

Buscamos cómo hacer un NavBar con react-bootstrap y [de este ejemplo sacamos la nuestra](https://react-bootstrap.netlify.app/docs/components/navbar/):

```javascript
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/instalaciones">Instalaciones</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>      
    </>
  );
}

export default NavBar;
```

[Aquí](./src/components/NavBar.jsx) tienes el componente NavBar.

Modificamos el App.js para que cargue bootstrap [(tal y como viene en la documentación oficial)](https://react-bootstrap.netlify.app/docs/getting-started/introduction) y además contenga el router:

```javascript
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';

import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Con React Router-v7 siempre usaremos esta manera de definir rutas.
 * No obstante es compatible (hacia atrás) con la manera antigua de v5.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  }/*,
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/installations",
    element: <InstallationPage />,
  },*/
]);

const App = () => {
  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  );
};

export default App

```

Borramos los CSS de App.jsx, main.jsx e index.html porque queremos usar sólo react-bootstrap (por eso el import que ves en el código anterior para cargarlo).

Creamos la página [HomePage](./src/pages/HomePage.jsx).

Creamos la [página LoginPage](./src/pages/LoginPage.jsx) y su [componente Login](./src/components/Login.jsx).