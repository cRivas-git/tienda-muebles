import {api} from "../api/client.ts";

export async function requireAuth(){
    try{
        await api.get("/api/auth/me")
    }catch {
        throw new Response("Not found", {status: 404})
    }
}