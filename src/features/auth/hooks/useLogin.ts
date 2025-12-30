import { LoginFormData } from "../types/auth";
import { envConfig } from "@/config/env.config";

const BASEURL = envConfig.BASE_URL;

export async function login({ email, password }: LoginFormData) {
  try{
    const response = await fetch(BASEURL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return response;
  }catch(error){
    console.error("Login failed:", error);
  }
}