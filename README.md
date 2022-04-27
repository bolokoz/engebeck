# EngeBECK

Acesse aqui [EngeBeck](https://engebeck.com.br)

Web App para administração de obras

- Use celular ou desktop, qualquer browser
- Crie obras, cadastre administradores e contas de pagamentos
- Registre compras simples ou complexas (diversos pagamentos, notas fracionadas)
- Vários campos de preenchimento opcionais (observações, use leitor de código de barras para guardar chave de acesso de nfe) 
- Adicione fornecedores com todos os dados, conta bancária
- Tire foto pelo celular ou faça upload de recibos ou orçamentos
- Categorize os gastos por etapa de obra
- Relatórios (em HTML ou PDF) de administração, ressarcimentos (personalize obra, período, porcentagem)
- Controle contabilidade da empresa com receitas e despesas, gere relatórios mensais
- Gráficos de gastos por mês

Em desenvolvimento:
- Diário de obra (previsão do tempo)
- Calendário com pagamentos, cobranças, lembretes 
- Área do cliente (mande link para cliente acompanhar os gastos e relatórios apenas de dados restritos)

Planejando para o futuro:
- Cadastro de fornecedor por CNPJ e buscar dados (api) completos na receita  
- Obter chave de acesso de NFe pelo celular (js library) e buscar dados (api) na receita para cadastrar compra por item
- Vue2 -> Vue3 (refatorar, modular, componentizar melhor) 

Usando:

- Auth, DB NoSQL e 'hosting' na Firestore 
- 'serverless' Static pages
- Nuxt2/Vue2/Vuetify

Made using Spaceship Template

- 🤘 Vue2
- ☄ Nuxt2
- 📱 PWA
- 👤 Firebase Auth (and server side verification)
- 🔥 [Nuxt-Fire](https://github.com/lupas/nuxt-fire) : all Firebase tools in Nuxt
- 💄 Prettier : code formatting rules
- 🚨 Eslint : control code quality
- ✅ Jest (testing) -- isso eu não uso não, ta loko

## Build Setup

```bash
# install dependencies
$ yarn install
# serve with hot reload at localhost:3000
$ yarn dev
# generate static project
$ yarn generate
```
