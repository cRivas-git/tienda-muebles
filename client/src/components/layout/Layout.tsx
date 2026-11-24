import {Outlet} from "react-router";
import {Header} from "../header/Header.tsx";

export function Layout() {
    return (
        <>
            <Header/>
            <main className="mx-auto max-w-4xl px-4 py-10">
                <Outlet/>
            </main>
        </>
    );
}
