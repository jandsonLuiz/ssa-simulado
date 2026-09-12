# SSA 1 Simulados

Plataforma de estudos em HTML, CSS e JavaScript puro (sem frameworks, sem backend) para praticar para o SSA 1 da UPE. Todo o progresso é salvo no `localStorage` do próprio navegador.

## Como executar

1. Baixe/copie a pasta `ssa1-simulado` (com `index.html`, `style.css`, `script.js`).
2. Dê duplo clique em `index.html` — ele abre direto no navegador, sem precisar de servidor ou instalação.
3. Pronto. O progresso fica salvo automaticamente nesse navegador e nesse computador.

> Se quiser hospedar online (GitHub Pages, Netlify, etc.), basta subir os três arquivos juntos, mantendo os nomes e caminhos relativos.

## Estrutura do projeto

```
ssa1-simulado/
├── index.html    → estrutura de todas as telas (dashboard, prova, resultado, etc.)
├── style.css     → todo o visual (cores, tipografia, responsividade, tema claro/escuro)
├── script.js     → toda a lógica: banco de questões, estado, navegação, correção, estatísticas
└── README.md     → este arquivo
```

O `script.js` é dividido em blocos numerados e comentados (banco de questões, estado, utilitários, telas, etc.) para facilitar a edição.

## Como adicionar novas questões

Abra `script.js` e procure o array `QUESTIONS`, no topo do arquivo (seção 1). Cada questão é um objeto assim:

```js
{
  id: "q33",                       // precisa ser único no arquivo inteiro
  subject: "Matemática",           // nome da disciplina (livre — veja abaixo)
  topic: "Progressão aritmética",  // assunto dentro da disciplina
  difficulty: "médio",             // "fácil" | "médio" | "difícil"
  statement: "Enunciado da questão aqui.",
  alternatives: [
    { id: "a", text: "Texto da alternativa A" },
    { id: "b", text: "Texto da alternativa B" },
    { id: "c", text: "Texto da alternativa C" },
    { id: "d", text: "Texto da alternativa D" },
    { id: "e", text: "Texto da alternativa E" }
  ],
  correct: "b",                    // id da alternativa correta
  explanation: "Por que essa é a resposta certa."
}
```

Basta copiar um objeto existente dentro do array, colar logo abaixo (não esqueça da vírgula entre objetos) e editar os campos. Não é necessário mexer em nenhum outro arquivo — o site lê o array inteiro automaticamente.

## Como alterar disciplinas e assuntos

Não existe uma lista fixa de disciplinas/assuntos em outro lugar do código: elas são geradas automaticamente a partir do que estiver escrito no campo `subject`/`topic` de cada questão em `QUESTIONS`. Ou seja:

- Para criar uma disciplina nova, basta usar esse nome no campo `subject` de uma questão nova (ex.: `"subject": "Redação"`).
- Para renomear uma disciplina existente, use o localizar/substituir do seu editor de texto para trocar o nome em todas as questões daquela disciplina (ex.: trocar todas as ocorrências de `"Língua Inglesa"` por `"Inglês"`).
- O mesmo vale para `topic` (assuntos).

Os filtros de disciplina/assunto nas telas de simulado e banco de questões são preenchidos dinamicamente — não é preciso editar HTML nem CSS.

## Como alterar a quantidade de questões de um simulado

Na tela **Simulados**, o campo "Quantidade de questões" já tem opções pré-definidas (5, 10, 15, 20). Para mudar essas opções, edite em `index.html` o `<select id="f-count">` e adicione/remova `<option>`s, por exemplo:

```html
<option value="25">25 questões</option>
```

Os simulados rápidos da aba "Completo" (Rápido, Padrão, Maratona, Revisão de Erros) têm sua quantidade definida em `script.js`, na função `renderPresetCards()` (seção 8) — basta alterar os números ali.

## Funcionalidades incluídas

- Navegação entre todas as telas sem recarregar a página.
- Seleção de simulado completo, por disciplina, por assunto ou personalizado, com filtros de dificuldade e status.
- Tela de prova com cronômetro (opcional), barra de progresso, marcação de questões para revisão, navegação livre entre questões e confirmação antes de finalizar.
- Correção automática, cálculo de pontuação/percentual e gráfico de desempenho por disciplina.
- Revisão detalhada das questões erradas, com explicação e marcação de "revisada".
- Banco de questões navegável com filtros e status (respondida/errada/não respondida).
- Estatísticas com evolução dos resultados, desempenho por disciplina e assuntos com mais erros.
- Configurações: tema claro/escuro, ativar/desativar cronômetro, nome do estudante, limpar histórico e reiniciar progresso.
- Simulado em andamento é salvo automaticamente e pode ser retomado mesmo se a página for fechada.
- Modais personalizados no lugar de `alert()`/`confirm()`.

## Limitações desta primeira versão

- Não há backend nem login: o progresso é local a cada navegador/computador (limpar dados do navegador apaga o progresso).
- As 32 questões iniciais são exemplos originais, no estilo do SSA 1, para demonstrar o funcionamento — recomenda-se ampliar o banco com mais questões antes do uso real de estudo.
- Nem todas as disciplinas têm o mesmo número de questões; isso é proposital, para você equilibrar o banco como preferir.
