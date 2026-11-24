import type {LoginForm} from "../types/usuario.ts";
import {api} from "./client.ts";

export const LoginAPI = (data: LoginForm)=>
    api.post('/api/auth/login', data).then(r => r.data);

export const LogoutAPI = () =>
    api.post('/api/auth/logout');