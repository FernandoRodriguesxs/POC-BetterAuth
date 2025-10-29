import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Configuração básica
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL,
  
  // opções principais
  emailAndPassword: {
    enabled: true,    // ativa login com e-mail e senha
    autoSignIn: true, // default: após registro já loga automaticamente
  },
});
