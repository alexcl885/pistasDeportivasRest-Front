// App.jsx o donde definas el enrutador
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import InstalacionesPage from "./pages/InstalacionesPage";
import InstalacionDeletePage from "./pages/InstalacionDeletePage";
import InstalacionFormPage from "./pages/InstalacionFormPage";
import ReservasPage from "./pages/ReservasPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import ReservasFormPage from "./pages/ReservasFormPage";
import UsuariosPage from "./pages/UsuariosPage";
import UsuarioFormPage from "./pages/UsuarioFormPage";
import ReservasFormFechaPage from "./pages/ReservasFormFechaPage";
import ReservasFormHorariosDisponiblesPage from "./pages/ReservasFormHorariosDisponiblesPage";
import ReservaDeletePage from "./pages/ReservaDeletePage";
import ReservasUpdateFormPage from "./pages/ReservasUpdateFormPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true, // Esto indica que es la ruta por defecto para "/"
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "instalaciones",
        element: <InstalacionesPage />,
      },
      {
        path: "instalacion/add",
        element: <InstalacionFormPage />,
      },
      {
        path: "instalacion/edit/:id",
        element: <InstalacionFormPage />,
      },
      {
        path: "instalacion/del/:id",
        element: <InstalacionDeletePage />,
      },
      {
        path: "mis-reservas",
        element: <ReservasPage />,
      },
      {
        path: "mis-reservas/add",
        element: <ReservasFormPage/>,
      },
      {
        path: "mis-reservas/edit/:id",
        element: <ReservasUpdateFormPage />,
      },
      {
        path: "mis-reservas/del/:id",
        element: <ReservaDeletePage />,
      },
      {
        path: "mis-reservas/add/horario/instalacion/:instalacionId",
        element: <ReservasFormFechaPage />,
      },
      {
        path: "mis-reservas/add/horario/instalacion/:instalacionId/fecha/:fecha",
        element: <ReservasFormHorariosDisponiblesPage />,
      },
      {
        path: "usuarios",
        element: <UsuariosPage />,
      },
      {
        path: "usuarios/add/",
        element: <UsuarioFormPage />,
      },
      {
        path: "usuarios/edit/:id",
        element: <UsuarioFormPage />,
      },
      {
        path: "usuarios/del/:id",
        element: <UsuarioFormPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
