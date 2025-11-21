# 📦 Guia Completo de Deploy - Pequeno Prato App

Este guia detalha todos os passos necessários para colocar o app Pequeno Prato em produção de forma 100% funcional.

---

## 🎯 Pré-requisitos

Antes de começar, certifique-se de ter:
- [ ] Conta na Vercel (grátis): https://vercel.com
- [ ] Conta no Supabase (grátis): https://supabase.com
- [ ] Conta no Stripe (modo teste grátis): https://stripe.com
- [ ] (Opcional) Conta no Google Cloud Console para login com Google

---

## 📋 PASSO 1: Preparar o Projeto Localmente

### 1.1. Baixar o projeto da v0
- Clique nos três pontos (...) no topo direito da v0
- Selecione "Download ZIP"
- Extraia o arquivo ZIP em uma pasta no seu computador

### 1.2. Instalar dependências (opcional, apenas para testar localmente)
\`\`\`bash
cd pequeno-prato-app
npm install
\`\`\`

---

## 🚀 PASSO 2: Deploy na Vercel

### 2.1. Criar repositório no GitHub
1. Acesse: https://github.com/new
2. Nome do repositório: `pequeno-prato-app`
3. Deixe como **Público** ou **Privado** (sua escolha)
4. Clique em "Create repository"

### 2.2. Subir código para o GitHub
\`\`\`bash
# Dentro da pasta do projeto
git init
git add .
git commit -m "Initial commit - Pequeno Prato App"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/pequeno-prato-app.git
git push -u origin main
\`\`\`

### 2.3. Conectar Vercel ao GitHub
1. Acesse: https://vercel.com
2. Clique em "Add New" → "Project"
3. Clique em "Import Git Repository"
4. Selecione o repositório `pequeno-prato-app`
5. **NÃO clique em Deploy ainda** - primeiro vamos configurar as variáveis de ambiente

---

## 🗄️ PASSO 3: Configurar Supabase

### 3.1. Criar projeto no Supabase
1. Acesse: https://supabase.com/dashboard
2. Clique em "New project"
3. Preencha:
   - **Name:** Pequeno Prato
   - **Database Password:** Crie uma senha forte (anote!)
   - **Region:** South America (São Paulo) - mais próximo do Brasil
4. Clique em "Create new project"
5. Aguarde 2-3 minutos até o projeto estar pronto

### 3.2. Copiar credenciais do Supabase
1. No menu lateral, clique em "Project Settings" (ícone de engrenagem)
2. Clique em "API"
3. Copie e anote:
   - **Project URL** (ex: `https://abc123.supabase.co`)
   - **anon public** (em API Keys)
   - **service_role** (em API Keys - clique em "Reveal" para ver)

### 3.3. Executar scripts do banco de dados
1. No Supabase, clique em "SQL Editor" no menu lateral
2. Execute este script para criar a tabela de assinaturas:

\`\`\`sql
-- Criar tabela de assinaturas
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Habilitar Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Usuários podem ver apenas suas próprias assinaturas
CREATE POLICY "Users can view their own subscription"
  ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Usuários podem inserir suas próprias assinaturas
CREATE POLICY "Users can insert their own subscription"
  ON subscriptions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Usuários podem atualizar suas próprias assinaturas
CREATE POLICY "Users can update their own subscription"
  ON subscriptions
  FOR UPDATE
  USING (auth.uid() = user_id);
\`\`\`

3. Clique em "Run" para executar

### 3.4. Configurar autenticação
1. No Supabase, clique em "Authentication" → "Providers"
2. Verifique se **Email** está habilitado (deve estar por padrão)
3. Em "Email Auth", configure:
   - **Enable Email Confirmations:** OFF (para simplificar, ou ON se quiser confirmação por email)

### 3.5. (Opcional) Configurar login com Google
1. No Supabase, vá em "Authentication" → "Providers"
2. Encontre **Google** e clique para expandir
3. Ative o toggle
4. Deixe os campos **Client ID** e **Client Secret** vazios por enquanto
5. Copie a **Callback URL** (ex: `https://abc123.supabase.co/auth/v1/callback`)
6. Guarde esta URL - vamos usá-la no Google Cloud Console

#### Configurar Google Cloud Console:
1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto ou selecione um existente
3. Vá em "APIs & Services" → "Credentials"
4. Clique em "Create Credentials" → "OAuth client ID"
5. Application type: **Web application**
6. Nome: `Pequeno Prato`
7. Em **Authorized redirect URIs**, adicione:
   - Cole a Callback URL do Supabase que você copiou
8. Clique em "Create"
9. Copie o **Client ID** e **Client Secret**
10. Volte ao Supabase e cole essas credenciais nos campos correspondentes
11. Clique em "Save"

---

## 💳 PASSO 4: Configurar Stripe

### 4.1. Criar conta no Stripe
1. Acesse: https://stripe.com
2. Crie uma conta (pode usar modo teste gratuitamente)
3. **NÃO precisa ativar pagamentos reais** - modo teste funciona perfeitamente

### 4.2. Copiar chaves da API
1. No dashboard do Stripe, clique em "Developers" → "API keys"
2. Copie e anote:
   - **Publishable key** (começa com `pk_test_...`)
   - **Secret key** (clique em "Reveal" e copie - começa com `sk_test_...`)

### 4.3. Criar produtos no Stripe
1. No dashboard, clique em "Products" → "Add product"
2. Crie o plano **Essencial**:
   - **Name:** Essencial
   - **Description:** Acesso completo às receitas atuais
   - **Pricing:** Recurring → Monthly → R$ 9,90 (ou 9.90)
   - Clique em "Save product"
   - **Copie o Price ID** (começa com `price_...`)

3. Crie o plano **Premium**:
   - **Name:** Premium
   - **Description:** Tudo ilimitado + conteúdo exclusivo
   - **Pricing:** Recurring → Monthly → R$ 19,90 (ou 19.90)
   - Clique em "Save product"
   - **Copie o Price ID** (começa com `price_...`)

### 4.4. Atualizar Price IDs no código
**IMPORTANTE:** Você precisa atualizar os Price IDs no arquivo `lib/products.ts`

Abra o arquivo `lib/products.ts` e substitua os valores:
\`\`\`typescript
export const PRODUCTS = {
  essencial: {
    priceId: 'price_SEU_PRICE_ID_DO_ESSENCIAL', // Substitua aqui
    // ... resto do código
  },
  premium: {
    priceId: 'price_SEU_PRICE_ID_DO_PREMIUM', // Substitua aqui
    // ... resto do código
  }
}
\`\`\`

Faça commit e push dessa alteração:
\`\`\`bash
git add lib/products.ts
git commit -m "Update Stripe Price IDs"
git push
\`\`\`

---

## 🔧 PASSO 5: Configurar Variáveis de Ambiente na Vercel

### 5.1. Adicionar variáveis de ambiente
1. Volte para a Vercel (onde você estava importando o projeto)
2. Na seção "Environment Variables", adicione:

\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_aqui
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta_aqui

# Site URL (deixe vazio por enquanto - vamos preencher depois)
NEXT_PUBLIC_SITE_URL=
\`\`\`

**Nota:** Deixe `NEXT_PUBLIC_SITE_URL` vazio por enquanto

### 5.2. Fazer o primeiro deploy
1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos até o deploy completar
3. Quando terminar, copie a URL do projeto (ex: `https://pequeno-prato-app.vercel.app`)

### 5.3. Adicionar a URL do site
1. Na Vercel, vá em "Settings" → "Environment Variables"
2. Adicione ou edite:
   - **Key:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://seu-projeto.vercel.app` (a URL que você copiou)
3. Clique em "Save"
4. Vá em "Deployments" e clique em "Redeploy" no último deploy

---

## 🔗 PASSO 6: Configurar URLs de Callback

### 6.1. Atualizar Supabase
1. No Supabase, vá em "Authentication" → "URL Configuration"
2. Configure:
   - **Site URL:** `https://seu-projeto.vercel.app`
   - **Redirect URLs:** Adicione estas URLs (uma por linha):
     \`\`\`
     https://seu-projeto.vercel.app/auth/callback
     https://seu-projeto.vercel.app/*
     http://localhost:3000/auth/callback
     \`\`\`
3. Clique em "Save"

---

## 🪝 PASSO 7: Configurar Stripe Webhooks

### 7.1. Criar webhook
1. No Stripe, vá em "Developers" → "Webhooks"
2. Clique em "Add endpoint"
3. Configure:
   - **Endpoint URL:** `https://seu-projeto.vercel.app/api/webhooks/stripe`
   - **Listen to:** Events on your account
   - **Select events to listen to:**
     - ✅ `checkout.session.completed`
     - ✅ `customer.subscription.created`
     - ✅ `customer.subscription.updated`
     - ✅ `customer.subscription.deleted`
4. Clique em "Add endpoint"

### 7.2. Copiar Webhook Secret
1. Clique no webhook que você acabou de criar
2. Na seção "Signing secret", clique em "Reveal"
3. Copie o webhook secret (começa com `whsec_...`)

### 7.3. Adicionar à Vercel
1. Volte para a Vercel → "Settings" → "Environment Variables"
2. Adicione:
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_seu_webhook_secret_aqui`
3. Clique em "Save"
4. Vá em "Deployments" e faça **Redeploy** do último deploy

---

## ✅ PASSO 8: Testar o App

### 8.1. Testar cadastro e login
1. Acesse: `https://seu-projeto.vercel.app`
2. Clique em "Entrar"
3. Crie uma nova conta
4. Verifique se o login funciona

### 8.2. Testar navegação
- Verifique se as receitas carregam
- Navegue pelas diferentes categorias
- Teste os filtros

### 8.3. Testar pagamento (modo teste)
1. Vá em "Planos"
2. Clique em "Assinar Mensal" em um dos planos
3. Uma nova aba abrirá com o Stripe Checkout
4. Use o cartão de teste:
   - **Número:** `4242 4242 4242 4242`
   - **Data:** Qualquer data futura (ex: 12/25)
   - **CVC:** Qualquer 3 dígitos (ex: 123)
   - **Nome:** Qualquer nome
5. Complete o pagamento
6. Você será redirecionado de volta ao app
7. Verifique se a assinatura aparece na página de planos

### 8.4. Testar login com Google (se configurado)
1. Faça logout
2. Clique em "Continuar com Google"
3. Selecione uma conta Google
4. Verifique se o login funciona

---

## 🔒 PASSO 9: Segurança e Boas Práticas

### 9.1. Habilitar proteção contra spam (Supabase)
1. No Supabase, vá em "Authentication" → "Rate Limits"
2. Configure limites razoáveis:
   - Email signups: 5 por hora por IP
   - Logins: 50 por hora por IP

### 9.2. Configurar confirmação de email (opcional)
1. No Supabase, vá em "Authentication" → "Email Templates"
2. Personalize os templates de email se desejar
3. Em "Settings", ative "Enable Email Confirmations"

---

## 🎉 PRONTO! Seu App Está no Ar

✅ Autenticação funcionando (email/senha + Google)  
✅ Banco de dados Supabase conectado  
✅ Pagamentos Stripe configurados  
✅ Webhooks funcionando  
✅ Design responsivo e moderno  

---

## 📝 Checklist Final

Antes de divulgar seu app, verifique:

- [ ] Todas as variáveis de ambiente estão configuradas
- [ ] Cadastro e login funcionam
- [ ] Login com Google funciona (se habilitado)
- [ ] Receitas carregam corretamente
- [ ] Navegação entre páginas funciona
- [ ] Checkout do Stripe abre em nova aba
- [ ] Pagamento teste funciona
- [ ] Webhook do Stripe está ativo
- [ ] URLs de callback estão corretas no Supabase
- [ ] Price IDs do Stripe estão atualizados no código

---

## 🆘 Solução de Problemas Comuns

### Problema: "Invalid Supabase URL"
**Solução:** Verifique se as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão corretas na Vercel

### Problema: Pagamento não funciona
**Solução:** 
1. Verifique se o webhook está configurado no Stripe
2. Confirme que `STRIPE_WEBHOOK_SECRET` está na Vercel
3. Use os Price IDs corretos em `lib/products.ts`

### Problema: Login com Google não funciona
**Solução:**
1. Verifique se a Callback URL do Supabase está nas Authorized URIs do Google
2. Confirme que Client ID e Secret estão corretos no Supabase

### Problema: "Content is blocked"
**Solução:** Verifique se o Stripe Checkout está abrindo em nova aba (código já configurado)

---

## 📞 Suporte

Se tiver problemas, verifique:
- Logs na Vercel: Settings → Functions → View logs
- Logs no Supabase: Database → Logs
- Webhook logs no Stripe: Developers → Webhooks → (seu webhook) → Events

---

## 🚀 Próximos Passos (Opcional)

Depois que tudo estiver funcionando:

1. **Domínio personalizado:** Configure um domínio próprio na Vercel
2. **Email personalizado:** Configure SMTP no Supabase para emails do seu domínio
3. **Stripe modo produção:** Ative sua conta Stripe e troque as chaves de teste
4. **Analytics:** Adicione Google Analytics ou Vercel Analytics
5. **SEO:** Adicione meta tags e sitemap

---

**Boa sorte com seu app! 🎉**
