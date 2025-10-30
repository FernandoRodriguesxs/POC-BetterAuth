import { betterAuth } from "better-auth";

// Função nativa de envio de email (simulada)
async function sendEmail({ to, subject, text, html }: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  // SIMULAÇÃO: Em produção, aqui você implementaria o envio real
  console.log("\n📧 ===== EMAIL ENVIADO =====");
  console.log(`📬 Para: ${to}`);
  console.log(`📝 Assunto: ${subject}`);
  console.log(`📄 Conteúdo:`);
  if (html) {
    // Extrair apenas o link do HTML para mostrar no console
    const linkMatch = html.match(/href="([^"]+)"/);
    if (linkMatch) {
      console.log(`🔗 Link de reset: ${linkMatch[1]}`);
    }
  } else if (text) {
    console.log(text);
  }
  console.log("============================\n");
  
  // Simular delay de envio
  await new Promise(resolve => setTimeout(resolve, 500));
}

export const auth = betterAuth({
  // Configuração básica
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL || "http://localhost:3000/api/auth",
  
  // opções principais
  emailAndPassword: {
    enabled: true,    // ativa login com e-mail e senha
    autoSignIn: true, // default: após registro já loga automaticamente
    
    // MÉTODO NATIVO: Função para enviar email de reset de senha
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Redefinir sua senha - POC Auth",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #4F46E5; text-align: center;">🔐 Redefinir Senha</h2>
            
            <p>Olá, <strong>${user.name || 'usuário'}</strong>!</p>
            
            <p>Você solicitou a redefinição da sua senha no POC Auth. Clique no botão abaixo para continuar:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${url}" 
                 style="background: #4F46E5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                ✨ Redefinir Senha
              </a>
            </div>
            
            <div style="background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #6B7280; font-size: 14px;">
                <strong>Não consegue clicar no botão?</strong><br>
                Copie e cole este link no seu navegador:<br>
                <a href="${url}" style="color: #4F46E5; word-break: break-all;">${url}</a>
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
            
            <p style="color: #6B7280; font-size: 12px; text-align: center;">
              🕐 Este link expira em 1 hora por segurança.<br>
              Se você não solicitou isso, pode ignorar este email com segurança.
            </p>
            
            <p style="color: #9CA3AF; font-size: 11px; text-align: center; margin-top: 20px;">
              POC Better Auth - Sistema de Autenticação
            </p>
          </div>
        `,
      });
    },

    // Callback executado após reset bem-sucedido
    onPasswordReset: async ({ user }, request) => {
      console.log(`✅ Senha redefinida com sucesso para: ${user.email}`);
    },
  },
});
