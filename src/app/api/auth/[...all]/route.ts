// ou "../lib/auth" dependendo da sua estrutura
import { auth } from "@/lib/auth/betterAuth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
