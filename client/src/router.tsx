import { createBrowserRouter } from "react-router";
import {Layout} from "./components/layout/Layout.tsx";
import {LayoutAdmin} from "./components/layout/LayoutAdmin.tsx";
import Home from "./pages/home/Home.tsx";
import {requireAuth} from "./middlewares/auth.middleware.ts";
import Login from "./pages/login/Login.tsx";
import CrearProducto from "./pages/admin/productos/CrearProducto.tsx";
import {EditarProducto} from "./pages/admin/productos/EditarProducto.tsx";
import {editarProductoLoader} from "./pages/admin/productos/editarProducto.loader.ts";
import {Admin} from "./pages/admin/Admin.tsx";
import {NotFound} from "./pages/notfound/NotFound.tsx";
import {Productos} from "./pages/productos/Productos.tsx";
import {productosLoader} from "./pages/productos/productos.loader.ts";
import {DetalleProducto} from "./pages/productos/DetalleProducto.tsx";
import {productoLoader} from "./pages/productos/producto.loader.ts";
import {AdminProductos} from "./pages/admin/productos/AdminProductos.tsx";
import {adminProductosLoader} from "./pages/admin/productos/adminProductos.loader.ts";

export const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {path: "/", Component: Home},
            {path: "/lgn", Component: Login},
            {path: "/productos", Component: Productos, loader: productosLoader},
            {path: "/productos/:id", Component: DetalleProducto, loader: productoLoader, ErrorBoundary: NotFound},
            {
                path: "/admin",
                Component: LayoutAdmin,
                middleware: [requireAuth],
                ErrorBoundary: Home,
                children: [
                    {index: true, Component: Admin},
                    {path: "productos", Component: AdminProductos, loader: adminProductosLoader},
                    {path: "productos/crear", Component: CrearProducto},
                    {path: "productos/:id/editar", Component: EditarProducto, loader: editarProductoLoader, ErrorBoundary: NotFound},
                ]
            },
            {path: "*", Component: NotFound},
        ]
    },
])
