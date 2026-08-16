# GitHub Repo Explorer

Aplicação React que busca o perfil público de um usuário do GitHub e lista seus repositórios, consumindo a API REST oficial do GitHub. Segundo projeto de uma trilha de portfólio focada em fundamentos de front-end.

**🔗 Demo ao vivo:** https://meu-github-explorer.vercel.app/

## Sobre o projeto

Depois de uma landing page estática em HTML/CSS puros (Projeto 1), este projeto introduz React: componentização, hooks de estado, formulários controlados e consumo de dado assíncrono vindo de uma API externa real.

## Funcionalidades

- Busca de usuário do GitHub por username, com dados de perfil (avatar, nome, bio) e lista de repositórios públicos
- Estados de carregamento e erro tratados na interface (username inexistente, sem quebrar a aplicação)
- Requisições de perfil e repositórios disparadas em paralelo com `Promise.all`
- Layout responsivo, com formulário adaptado para coluna única em telas pequenas
- Navegação por teclado com indicador de foco visível
- Identidade visual consistente com o Projeto 1 (mesma paleta e tipografia), reforçando marca pessoal entre os projetos do portfólio

## Tecnologias utilizadas

- **React** (Vite como build tool e servidor de desenvolvimento)
- **CSS3** puro — Custom Properties, Flexbox, media queries
- **GitHub REST API** (endpoints públicos, sem autenticação)
- **ESLint** para linting

## Arquitetura

```
src/
├── App.jsx              # Estado da aplicação, formulário e lógica de busca
├── App.css               # Estilos globais e design tokens
└── components/
    └── RepoCard.jsx       # Componente de apresentação de um repositório
```

`App.jsx` concentra o estado (`username`, `profile`, `repos`, `loading`, `error`) e a lógica de fetch. `RepoCard` é um componente de apresentação puro, recebendo os dados de um repositório via props e sem lógica própria — separação comum entre "componente com estado" e "componente de exibição".

## Decisões técnicas

- **`Promise.all` para as duas requisições** (perfil e repositórios) — evita que uma espere a outra terminar desnecessariamente, já que são chamadas independentes.
- **Componente controlado** no campo de busca (`value` + `onChange` amarrados ao estado), padrão consistente do React para formulários.
- **`rel="noopener noreferrer"`** em todos os links `target="_blank"`, prevenindo a vulnerabilidade de tab nabbing.
- **ESLint em vez de Oxlint** (ambos oferecidos pelo scaffold do Vite) — prioriza o ecossistema de tooling mais estabelecido e amplamente esperado em vagas e projetos de terceiros nesta fase de aprendizado.
- **Reaproveitamento da paleta e tokens de design do Projeto 1** — decisão deliberada de consistência visual entre os projetos do portfólio, não repetição por conveniência.

## Desafios encontrados e soluções

| Desafio | Solução |
|---|---|
| PowerShell bloqueando a execução do `npm` (política de segurança padrão do Windows) | Ajuste da `ExecutionPolicy` para `RemoteSigned` no escopo do usuário atual |
| Bug visual de `text-align: center` herdado inesperadamente nos cards | Diagnosticado via inspetor de estilos do DevTools; causa raiz identificada como CSS residual do template padrão do Vite (`index.css`) conflitando com o design system próprio (`App.css`); resolvido removendo o CSS morto |
| Estado de repositórios de uma busca anterior não era limpo em uma busca subsequente que falhasse | Reset explícito do estado (`setRepos([])`, `setProfile(null)`) no início de cada nova submissão |
| Formulário cortando o botão de busca em telas estreitas (~375px) | Media query alterando o formulário de layout em linha para coluna abaixo de 480px |

## Testes realizados

- Verificação manual do fluxo completo: busca válida, busca inválida, busca válida após inválida (e vice-versa)
- Teste responsivo em 375px, 768px e 1024px via DevTools
- Confirmação do build de produção em ambiente real (aba anônima, sem cache local)

## Como rodar localmente

```bash
git clone https://github.com/Nemhh25/meu-github-explorer.git
cd meu-github-explorer
npm install
npm run dev
```

A aplicação consome a API pública do GitHub sem necessidade de chave de API ou variáveis de ambiente. Por ser uma API não autenticada, o limite é de 60 requisições por hora por endereço IP.

## Próximos passos

- Migração para TypeScript (Projeto 3 do portfólio)
- Possível adição de debounce na busca ou histórico de usuários pesquisados
- Paginação para usuários com muitos repositórios (a API retorna no máximo 30 por página por padrão)

## Autor

**Nelson Lisboa**

- GitHub: [@Nemhh25](https://github.com/Nemhh25)
- LinkedIn: [Nelson Lisboa](https://www.linkedin.com/in/nelsonlisboa/)
- Email: nelsondossantos739@gmail.com
