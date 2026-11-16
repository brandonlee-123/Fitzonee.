# FitZone 💪

Projeto acadêmico de Engenharia de Software: site para academia, musculação, treinos e acompanhamento de evolução física.

Tecnologias: **HTML5, CSS3 e JavaScript puro** (sem frameworks e sem banco de dados — os dados ficam no `localStorage` do navegador).

## Como abrir no computador

1. Extraia o arquivo `FitZone.zip` (clique com o botão direito → *Extrair tudo*).
2. Abra a pasta `FitZone`.
3. Dê dois cliques em **`index.html`**. O site abre no seu navegador (Chrome, Edge, Firefox...).

Não precisa instalar nada nem ter internet.

> Os dados (perfil, treinos, histórico) ficam salvos no navegador em que você usou. Se abrir em outro navegador ou limpar os dados do navegador, eles não aparecem.

## Estrutura

```
FitZone/
├── index.html   → estrutura das páginas (HTML)
├── style.css    → visual: cores, cards, botões, responsivo (CSS)
├── script.js    → funcionalidades e salvamento (JavaScript)
├── assets/      → pasta reservada para imagens/ícones
└── README.md    → este arquivo
```

## Páginas e funcionalidades

| Página | O que faz |
|---|---|
| Dashboard | Boas-vindas com o nome, treinos realizados, resumo da semana, meta semanal com barra de progresso, objetivo, IMC e treino planejado para hoje |
| Exercícios | 35 exercícios em 7 grupos musculares, com pesquisa e filtro; botão para adicionar ao treino |
| Montar Treino | Escolher exercícios, definir séries e repetições, remover, salvar, editar e excluir treinos |
| Cronograma | Os 7 dias da semana, cada um com um treino salvo (ou descanso) |
| Cronômetro | Iniciar, pausar e zerar; atalhos de descanso de 30s, 60s, 90s e 2min com aviso sonoro ao final |
| Evolução | Registro de treinos feitos, meta semanal, gráfico dos últimos 7 dias e histórico |
| Perfil | Nome, idade, peso, altura e objetivo, com IMC calculado automaticamente |

## Como o código está organizado (para a apresentação)

O `script.js` é dividido em 11 seções comentadas:

1. Dados (lista de exercícios) e constantes
2. Salvar/carregar no `localStorage`
3. Navegação entre páginas
4. Dashboard
5. Biblioteca de exercícios
6. Montagem de treinos
7. Cronograma semanal
8. Cronômetro
9. Evolução
10. Perfil e IMC
11. Inicialização

Ideias principais para explicar ao professor:

- **Navegação:** todas as páginas estão no mesmo `index.html`; o JavaScript mostra uma e esconde as outras (`irParaPagina`).
- **Persistência:** cada informação é guardada com `localStorage` (`salvar` / `carregar`), convertida em JSON.
- **IMC:** `peso ÷ (altura em metros)²`, classificado conforme a tabela da OMS.
- **Responsividade:** o CSS usa `@media` para transformar o menu lateral em um menu retrátil (botão ☰) no celular.
