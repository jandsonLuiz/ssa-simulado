/* =====================================================================
   SSA 1 SIMULADOS — script.js
   Aplicação SPA em JavaScript puro. Sem frameworks, sem backend.
   Tudo é salvo no localStorage do navegador.

   Índice:
   1. Banco de questões (dados)
   2. Estado da aplicação + persistência
   3. Utilitários
   4. Referências de DOM
   5. Sistema de modal / toast
   6. Navegação entre telas
   7. Dashboard
   8. Seleção de simulado
   9. Tela de resolução de questões (prova)
   10. Resultado
   11. Revisão de questões
   12. Banco de questões (tela)
   13. Estatísticas
   14. Configurações
   15. Inicialização
   ===================================================================== */

/* =====================================================================
   1. BANCO DE QUESTÕES
   Para adicionar uma questão nova, copie um objeto do array abaixo e
   ajuste os campos. Veja o README.md para instruções detalhadas.
   ===================================================================== */
const QUESTIONS = [
  // ---------------- LÍNGUA PORTUGUESA ----------------
  {
    id: "q1", subject: "Língua Portuguesa", topic: "Figuras de linguagem", difficulty: "médio",
    statement: 'Na frase "O Brasil foi campeão mundial de futebol", a palavra "Brasil" está empregada no lugar de "seleção brasileira". Essa figura de linguagem é chamada de:',
    alternatives: [
      { id: "a", text: "Metáfora" },
      { id: "b", text: "Metonímia" },
      { id: "c", text: "Hipérbole" },
      { id: "d", text: "Ironia" },
      { id: "e", text: "Prosopopeia" }
    ],
    correct: "b",
    explanation: "A metonímia ocorre quando um termo substitui outro com o qual mantém relação de proximidade ou associação — neste caso, o país (Brasil) representa a instituição/seleção que o representa."
  },
  {
    id: "q2", subject: "Língua Portuguesa", topic: "Concordância verbal", difficulty: "médio",
    statement: 'Assinale a alternativa em que a concordância verbal está de acordo com a norma-padrão:',
    alternatives: [
      { id: "a", text: "Fazem dois anos que ele se mudou daqui." },
      { id: "b", text: "Aluga-se casas na praia." },
      { id: "c", text: "Faz dois anos que ele se mudou daqui." },
      { id: "d", text: "Existem, naquela empresa, poucas vaga." },
      { id: "e", text: "Houveram muitos problemas na reunião." }
    ],
    correct: "c",
    explanation: 'O verbo "fazer" indicando tempo decorrido é impessoal e fica sempre na 3ª pessoa do singular: "faz dois anos". As demais opções apresentam erros de concordância ou de impessoalidade.'
  },
  {
    id: "q3", subject: "Língua Portuguesa", topic: "Funções da linguagem", difficulty: "fácil",
    statement: 'Um manual de instruções que explica, de forma objetiva, como montar um móvel está centrado predominantemente na função da linguagem:',
    alternatives: [
      { id: "a", text: "Emotiva" },
      { id: "b", text: "Poética" },
      { id: "c", text: "Fática" },
      { id: "d", text: "Referencial" },
      { id: "e", text: "Metalinguística" }
    ],
    correct: "d",
    explanation: "A função referencial (ou denotativa) prioriza a informação objetiva sobre o mundo real, típica de textos instrucionais e informativos, sem envolver emoções do emissor."
  },

  // ---------------- LITERATURA ----------------
  {
    id: "q4", subject: "Literatura", topic: "Arcadismo", difficulty: "médio",
    statement: "O Arcadismo, movimento literário do século XVIII, valorizava temas como a vida simples no campo (fugere urbem) e o aproveitamento do momento presente. Esse último ideal é conhecido pela expressão latina:",
    alternatives: [
      { id: "a", text: "Carpe diem" },
      { id: "b", text: "Inutilia truncat" },
      { id: "c", text: "Aurea mediocritas" },
      { id: "d", text: "Locus amoenus" },
      { id: "e", text: "In medias res" }
    ],
    correct: "a",
    explanation: '"Carpe diem" significa "aproveite o dia" e representa o ideal árcade de viver o presente, em contraste com o exagero do Barroco anterior.'
  },
  {
    id: "q5", subject: "Literatura", topic: "Modernismo brasileiro", difficulty: "fácil",
    statement: "A Semana de Arte Moderna, realizada em São Paulo em 1922, é considerada o marco inicial do Modernismo no Brasil porque:",
    alternatives: [
      { id: "a", text: "Consolidou o estilo parnasiano nas artes brasileiras." },
      { id: "b", text: "Reuniu artistas que propuseram romper com padrões estéticos tradicionais." },
      { id: "c", text: "Foi o primeiro evento cultural realizado no país." },
      { id: "d", text: "Determinou o fim da literatura em língua portuguesa no Brasil." },
      { id: "e", text: "Uniu apenas escritores, sem participação de artistas plásticos ou músicos." }
    ],
    correct: "b",
    explanation: "A Semana de 22 reuniu escritores, pintores, escultores e músicos que buscavam romper com o academicismo e criar uma arte mais livre e ligada à identidade nacional."
  },

  // ---------------- MATEMÁTICA ----------------
  {
    id: "q6", subject: "Matemática", topic: "Função do 1º grau", difficulty: "médio",
    statement: "Considere a função f(x) = 3x − 5. O valor de f(4) é:",
    alternatives: [
      { id: "a", text: "5" },
      { id: "b", text: "7" },
      { id: "c", text: "9" },
      { id: "d", text: "12" },
      { id: "e", text: "17" }
    ],
    correct: "b",
    explanation: "Substituindo x por 4: f(4) = 3×4 − 5 = 12 − 5 = 7."
  },
  {
    id: "q7", subject: "Matemática", topic: "Porcentagem", difficulty: "fácil",
    statement: "Em uma turma de 40 alunos, 25% foram aprovados diretamente sem precisar de recuperação. Quantos alunos isso representa?",
    alternatives: [
      { id: "a", text: "8" },
      { id: "b", text: "10" },
      { id: "c", text: "12" },
      { id: "d", text: "15" },
      { id: "e", text: "20" }
    ],
    correct: "b",
    explanation: "25% de 40 é o mesmo que 40 × 0,25 = 10 alunos."
  },
  {
    id: "q8", subject: "Matemática", topic: "Geometria plana", difficulty: "médio",
    statement: "Um triângulo retângulo possui catetos medindo 6 cm e 8 cm. A medida da hipotenusa, em centímetros, é:",
    alternatives: [
      { id: "a", text: "9" },
      { id: "b", text: "10" },
      { id: "c", text: "12" },
      { id: "d", text: "14" },
      { id: "e", text: "16" }
    ],
    correct: "b",
    explanation: "Pelo Teorema de Pitágoras: h² = 6² + 8² = 36 + 64 = 100, logo h = 10 cm."
  },
  {
    id: "q9", subject: "Matemática", topic: "Razão e proporção", difficulty: "difícil",
    statement: "Uma receita para 4 pessoas usa 300 g de farinha. Mantendo a mesma proporção, quantos gramas de farinha são necessários para 10 pessoas?",
    alternatives: [
      { id: "a", text: "600 g" },
      { id: "b", text: "700 g" },
      { id: "c", text: "750 g" },
      { id: "d", text: "800 g" },
      { id: "e", text: "900 g" }
    ],
    correct: "c",
    explanation: "Montando a proporção 300/4 = x/10, temos x = (300×10)/4 = 750 g."
  },

  // ---------------- FÍSICA ----------------
  {
    id: "q10", subject: "Física", topic: "Cinemática", difficulty: "médio",
    statement: "Um carro percorre 240 km em 4 horas, mantendo velocidade constante. A velocidade média desse carro é de:",
    alternatives: [
      { id: "a", text: "40 km/h" },
      { id: "b", text: "50 km/h" },
      { id: "c", text: "60 km/h" },
      { id: "d", text: "70 km/h" },
      { id: "e", text: "80 km/h" }
    ],
    correct: "c",
    explanation: "Velocidade média = distância ÷ tempo = 240 km ÷ 4 h = 60 km/h."
  },
  {
    id: "q11", subject: "Física", topic: "Leis de Newton", difficulty: "médio",
    statement: "Um objeto de massa 5 kg recebe uma força resultante de 20 N. De acordo com a 2ª Lei de Newton, sua aceleração é de:",
    alternatives: [
      { id: "a", text: "1 m/s²" },
      { id: "b", text: "2 m/s²" },
      { id: "c", text: "4 m/s²" },
      { id: "d", text: "5 m/s²" },
      { id: "e", text: "10 m/s²" }
    ],
    correct: "c",
    explanation: "Pela 2ª Lei de Newton, F = m·a, logo a = F/m = 20/5 = 4 m/s²."
  },
  {
    id: "q12", subject: "Física", topic: "Trabalho e energia", difficulty: "difícil",
    statement: "Quando uma força realiza trabalho positivo sobre um corpo em movimento, o efeito esperado sobre a energia cinética desse corpo é:",
    alternatives: [
      { id: "a", text: "Permanecer sempre constante." },
      { id: "b", text: "Diminuir proporcionalmente ao trabalho realizado." },
      { id: "c", text: "Aumentar, segundo o teorema trabalho-energia." },
      { id: "d", text: "Transformar-se integralmente em energia potencial." },
      { id: "e", text: "Anular-se, pois trabalho e energia são grandezas independentes." }
    ],
    correct: "c",
    explanation: "O teorema trabalho-energia estabelece que o trabalho resultante sobre um corpo é igual à variação de sua energia cinética; um trabalho positivo aumenta essa energia."
  },

  // ---------------- QUÍMICA ----------------
  {
    id: "q13", subject: "Química", topic: "Tabela periódica", difficulty: "fácil",
    statement: "Os elementos químicos flúor (F), cloro (Cl) e iodo (I) pertencem à mesma família da tabela periódica, conhecida como:",
    alternatives: [
      { id: "a", text: "Metais alcalinos" },
      { id: "b", text: "Metais alcalino-terrosos" },
      { id: "c", text: "Halogênios" },
      { id: "d", text: "Gases nobres" },
      { id: "e", text: "Metais de transição" }
    ],
    correct: "c",
    explanation: "Flúor, cloro, bromo, iodo e astato formam a família dos halogênios (grupo 17), caracterizados por possuírem sete elétrons na camada de valência."
  },
  {
    id: "q14", subject: "Química", topic: "Ligações químicas", difficulty: "médio",
    statement: "A ligação química formada entre o sódio (Na) e o cloro (Cl) no composto NaCl é classificada como:",
    alternatives: [
      { id: "a", text: "Covalente apolar" },
      { id: "b", text: "Covalente polar" },
      { id: "c", text: "Metálica" },
      { id: "d", text: "Iônica" },
      { id: "e", text: "Ligação de hidrogênio" }
    ],
    correct: "d",
    explanation: "O sódio (metal) transfere um elétron para o cloro (ametal), formando íons Na⁺ e Cl⁻ que se atraem eletrostaticamente — característica da ligação iônica."
  },
  {
    id: "q15", subject: "Química", topic: "Estados físicos da matéria", difficulty: "fácil",
    statement: "A passagem direta da água do estado sólido para o estado gasoso, sem passar pelo estado líquido, é chamada de:",
    alternatives: [
      { id: "a", text: "Fusão" },
      { id: "b", text: "Condensação" },
      { id: "c", text: "Sublimação" },
      { id: "d", text: "Solidificação" },
      { id: "e", text: "Ebulição" }
    ],
    correct: "c",
    explanation: "Sublimação é a mudança de estado físico direta de sólido para gasoso, sem passagem pelo estado líquido."
  },

  // ---------------- BIOLOGIA ----------------
  {
    id: "q16", subject: "Biologia", topic: "Citologia", difficulty: "médio",
    statement: "A organela celular responsável pela respiração celular e pela produção de energia (ATP) é a:",
    alternatives: [
      { id: "a", text: "Mitocôndria" },
      { id: "b", text: "Ribossomo" },
      { id: "c", text: "Complexo golgiense" },
      { id: "d", text: "Lisossomo" },
      { id: "e", text: "Retículo endoplasmático liso" }
    ],
    correct: "a",
    explanation: "As mitocôndrias realizam a respiração celular, processo que converte energia dos nutrientes em ATP, utilizável pela célula."
  },
  {
    id: "q17", subject: "Biologia", topic: "Ecologia", difficulty: "fácil",
    statement: 'Em uma cadeia alimentar do tipo "capim → gafanhoto → sapo → cobra", o gafanhoto ocupa o nível trófico de:',
    alternatives: [
      { id: "a", text: "Produtor" },
      { id: "b", text: "Consumidor primário" },
      { id: "c", text: "Consumidor secundário" },
      { id: "d", text: "Consumidor terciário" },
      { id: "e", text: "Decompositor" }
    ],
    correct: "b",
    explanation: "O gafanhoto se alimenta diretamente do capim (produtor), sendo por isso classificado como consumidor primário (herbívoro)."
  },
  {
    id: "q18", subject: "Biologia", topic: "Genética", difficulty: "médio",
    statement: "Em genética clássica, quando um alelo se manifesta no fenótipo mesmo estando em heterozigose (associado a um alelo diferente), ele é classificado como:",
    alternatives: [
      { id: "a", text: "Recessivo" },
      { id: "b", text: "Dominante" },
      { id: "c", text: "Codominante" },
      { id: "d", text: "Letal" },
      { id: "e", text: "Ligado ao sexo" }
    ],
    correct: "b",
    explanation: "Um alelo dominante se expressa no fenótipo mesmo quando presente em apenas uma cópia (heterozigoto), mascarando o efeito do alelo recessivo."
  },

  // ---------------- HISTÓRIA ----------------
  {
    id: "q19", subject: "História", topic: "Brasil Colônia", difficulty: "médio",
    statement: "O sistema de Capitanias Hereditárias, implementado por Portugal no século XVI, tinha como principal objetivo:",
    alternatives: [
      { id: "a", text: "Conceder independência administrativa total às colônias." },
      { id: "b", text: "Facilitar a colonização e a defesa do território a baixo custo para a Coroa." },
      { id: "c", text: "Estabelecer um governo democrático no Brasil colonial." },
      { id: "d", text: "Abolir o trabalho escravo nas terras coloniais." },
      { id: "e", text: "Transferir a capital do império para o Brasil." }
    ],
    correct: "b",
    explanation: "As Capitanias Hereditárias transferiam a responsabilidade de colonizar e defender o território a donatários particulares, reduzindo os custos e riscos para a Coroa portuguesa."
  },
  {
    id: "q20", subject: "História", topic: "Revolução Francesa", difficulty: "médio",
    statement: "Entre as principais causas da Revolução Francesa (1789), destaca-se:",
    alternatives: [
      { id: "a", text: "A crise financeira do Estado somada às desigualdades do Antigo Regime." },
      { id: "b", text: "A vitória militar francesa na Guerra dos Cem Anos." },
      { id: "c", text: "A unificação da Alemanha sob Bismarck." },
      { id: "d", text: "A descoberta de ouro nas colônias francesas na América." },
      { id: "e", text: "O fortalecimento do poder da Igreja Católica sobre o Estado." }
    ],
    correct: "a",
    explanation: "A combinação de uma grave crise financeira do Estado francês com as profundas desigualdades sociais entre os três estamentos (clero, nobreza e povo) foi decisiva para eclosão da Revolução."
  },
  {
    id: "q21", subject: "História", topic: "Ditadura Militar Brasileira", difficulty: "difícil",
    statement: "O golpe civil-militar de 1964 no Brasil resultou em um regime marcado por:",
    alternatives: [
      { id: "a", text: "Ampliação das liberdades democráticas e do pluripartidarismo." },
      { id: "b", text: "Restrição de direitos políticos, censura e centralização do poder no Executivo." },
      { id: "c", text: "Fortalecimento imediato do Poder Legislativo em relação ao Executivo." },
      { id: "d", text: "Realização de eleições diretas para presidente já em 1965." },
      { id: "e", text: "Extinção completa das Forças Armadas." }
    ],
    correct: "b",
    explanation: "O regime militar (1964–1985) foi marcado por atos institucionais que restringiram direitos civis e políticos, impuseram censura e concentraram poder no Executivo, sobretudo após o AI-5 (1968)."
  },

  // ---------------- GEOGRAFIA ----------------
  {
    id: "q22", subject: "Geografia", topic: "Estrutura geológica", difficulty: "médio",
    statement: "Os terremotos e vulcões concentrados ao longo do chamado Círculo de Fogo do Pacífico estão diretamente relacionados a(o):",
    alternatives: [
      { id: "a", text: "Aquecimento global" },
      { id: "b", text: "Movimento das placas tectônicas" },
      { id: "c", text: "Correntes marítimas quentes" },
      { id: "d", text: "Efeito estufa intensificado" },
      { id: "e", text: "Desmatamento em larga escala" }
    ],
    correct: "b",
    explanation: "O Círculo de Fogo do Pacífico concentra zonas de encontro entre placas tectônicas, o que explica a intensa atividade sísmica e vulcânica na região."
  },
  {
    id: "q23", subject: "Geografia", topic: "Urbanização", difficulty: "médio",
    statement: "O crescimento acelerado e pouco planejado das cidades brasileiras a partir do século XX contribuiu para o(a):",
    alternatives: [
      { id: "a", text: "Redução das desigualdades sociais nas periferias." },
      { id: "b", text: "Expansão de favelas e ocupações irregulares nas grandes cidades." },
      { id: "c", text: "Diminuição da demanda por transporte público." },
      { id: "d", text: "Extinção do êxodo rural no país." },
      { id: "e", text: "Distribuição uniforme de infraestrutura urbana." }
    ],
    correct: "b",
    explanation: "A urbanização acelerada e sem planejamento adequado, impulsionada pelo êxodo rural, favoreceu a formação de favelas e ocupações irregulares nas periferias das grandes cidades."
  },
  {
    id: "q24", subject: "Geografia", topic: "Climatologia", difficulty: "fácil",
    statement: "A altitude, a latitude e a proximidade com o oceano são exemplos de fatores que influenciam diretamente:",
    alternatives: [
      { id: "a", text: "O relevo de uma região." },
      { id: "b", text: "O clima de uma região." },
      { id: "c", text: "A densidade demográfica de um país." },
      { id: "d", text: "O tipo de solo predominante." },
      { id: "e", text: "A moeda utilizada em uma região." }
    ],
    correct: "b",
    explanation: "Altitude, latitude e continentalidade/maritimidade são fatores climáticos clássicos que determinam temperatura, pressão e umidade de uma região."
  },

  // ---------------- FILOSOFIA ----------------
  {
    id: "q25", subject: "Filosofia", topic: "Filosofia antiga", difficulty: "médio",
    statement: 'O método filosófico de Sócrates, que consistia em fazer perguntas sucessivas para levar o interlocutor a reconhecer suas próprias contradições e "dar à luz" o conhecimento, é conhecido como:',
    alternatives: [
      { id: "a", text: "Dialética hegeliana" },
      { id: "b", text: "Maiêutica" },
      { id: "c", text: "Dúvida metódica" },
      { id: "d", text: "Empirismo lógico" },
      { id: "e", text: "Ceticismo pirrônico" }
    ],
    correct: "b",
    explanation: 'A maiêutica socrática, comparada a uma "arte de partejar ideias", usava perguntas para conduzir o interlocutor a descobrir o conhecimento por si mesmo.'
  },
  {
    id: "q26", subject: "Filosofia", topic: "Teoria do conhecimento", difficulty: "difícil",
    statement: "Na filosofia moderna, a corrente que defende a experiência sensível como principal fonte do conhecimento humano é o(a):",
    alternatives: [
      { id: "a", text: "Racionalismo" },
      { id: "b", text: "Empirismo" },
      { id: "c", text: "Idealismo absoluto" },
      { id: "d", text: "Existencialismo" },
      { id: "e", text: "Estoicismo" }
    ],
    correct: "b",
    explanation: "O empirismo, defendido por filósofos como Locke e Hume, sustenta que todo conhecimento deriva da experiência sensível, em oposição ao racionalismo, que valoriza a razão como fonte primeira do conhecimento."
  },

  // ---------------- SOCIOLOGIA ----------------
  {
    id: "q27", subject: "Sociologia", topic: "Teoria sociológica clássica", difficulty: "difícil",
    statement: 'Para Émile Durkheim, um "fato social" se caracteriza por ser:',
    alternatives: [
      { id: "a", text: "Uma escolha individual livre de qualquer influência externa." },
      { id: "b", text: "Exterior ao indivíduo, coercitivo e geral dentro da sociedade." },
      { id: "c", text: "Um fenômeno exclusivamente biológico e hereditário." },
      { id: "d", text: "Uma manifestação artística sem relação com o coletivo." },
      { id: "e", text: "Restrito às relações econômicas de mercado." }
    ],
    correct: "b",
    explanation: "Durkheim define fato social como todo modo de agir, pensar ou sentir que é exterior ao indivíduo, exerce coerção sobre ele e é geral em determinada sociedade."
  },
  {
    id: "q28", subject: "Sociologia", topic: "Cidadania e direitos", difficulty: "médio",
    statement: "Direitos como votar em eleições e ser eleito para cargos públicos são exemplos de direitos classificados como:",
    alternatives: [
      { id: "a", text: "Direitos civis" },
      { id: "b", text: "Direitos sociais" },
      { id: "c", text: "Direitos políticos" },
      { id: "d", text: "Direitos difusos" },
      { id: "e", text: "Direitos econômicos" }
    ],
    correct: "c",
    explanation: "Os direitos políticos garantem a participação do cidadão na vida pública do Estado, como votar e ser votado, distinguindo-se dos direitos civis e sociais."
  },

  // ---------------- LÍNGUA INGLESA ----------------
  {
    id: "q29", subject: "Língua Inglesa", topic: "Verb tenses", difficulty: "fácil",
    statement: 'Choose the sentence written correctly in the Simple Past tense:',
    alternatives: [
      { id: "a", text: "She go to school yesterday." },
      { id: "b", text: "She goes to school yesterday." },
      { id: "c", text: "She went to school yesterday." },
      { id: "d", text: "She was go to school yesterday." },
      { id: "e", text: "She is going to school yesterday." }
    ],
    correct: "c",
    explanation: '"Went" é o passado irregular do verbo "go", corretamente combinado com o marcador temporal "yesterday" (ontem).'
  },
  {
    id: "q30", subject: "Língua Inglesa", topic: "False cognates", difficulty: "médio",
    statement: 'A palavra em inglês "actually" é um falso cognato em relação ao português. Seu significado correto é:',
    alternatives: [
      { id: "a", text: "Atualmente" },
      { id: "b", text: "Na verdade" },
      { id: "c", text: "Eventualmente" },
      { id: "d", text: "Ativamente" },
      { id: "e", text: "Atuação" }
    ],
    correct: "b",
    explanation: '"Actually" significa "na verdade" ou "de fato", e não "atualmente" (que em inglês se traduz como "currently" ou "nowadays") — por isso é considerado um falso cognato.'
  },

  // ---------------- LÍNGUA ESPANHOLA ----------------
  {
    id: "q31", subject: "Língua Espanhola", topic: "Falsos amigos", difficulty: "médio",
    statement: 'Em espanhol, a palavra "embarazada" é um falso cognato clássico. Seu significado correto é:',
    alternatives: [
      { id: "a", text: "Envergonhada" },
      { id: "b", text: "Grávida" },
      { id: "c", text: "Embaraçada (confusa)" },
      { id: "d", text: "Cansada" },
      { id: "e", text: "Apressada" }
    ],
    correct: "b",
    explanation: '"Embarazada" significa "grávida" em espanhol, e não "embaraçada" (confusa/envergonhada) como se poderia supor pela semelhança com o português — um dos falsos amigos mais conhecidos entre os dois idiomas.'
  },

  // ---------------- ARTES ----------------
  {
    id: "q32", subject: "Artes", topic: "História da arte", difficulty: "fácil",
    statement: "O Renascimento, movimento artístico e cultural surgido na Itália entre os séculos XIV e XVI, é caracterizado principalmente por:",
    alternatives: [
      { id: "a", text: "A rejeição total da arte da Antiguidade Clássica." },
      { id: "b", text: "A valorização do humanismo, da razão e do resgate da arte clássica." },
      { id: "c", text: "O uso exclusivo de temas religiosos, sem representação do corpo humano." },
      { id: "d", text: "A ausência de perspectiva e proporção nas pinturas." },
      { id: "e", text: "A predominância da arte abstrata sobre a figurativa." }
    ],
    correct: "b",
    explanation: "O Renascimento resgatou valores da Antiguidade Clássica e valorizou o humanismo, a razão, a perspectiva e a representação realista do corpo humano, rompendo com padrões medievais."
  }
];

/* =====================================================================
   2. ESTADO DA APLICAÇÃO + PERSISTÊNCIA
   ===================================================================== */
const STORAGE_KEY = "ssa1_simulado_state_v1";

function defaultState() {
  return {
    studentName: "Estudante",
    theme: "light",
    timerEnabled: true,
    answers: {},      // questionId -> { chosen, correct, simId, reviewed, answeredAt }
    history: [],       // simulados concluídos
    goals: [],         // metas de estudo
    currentSimulado: null,
    lastResultId: null
  };
}

let state = defaultState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  } catch (e) {
    console.warn("Não foi possível ler o progresso salvo, iniciando novo estado.", e);
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Não foi possível salvar o progresso.", e);
  }
}

/* =====================================================================
   3. UTILITÁRIOS
   ===================================================================== */
function uid(prefix) {
  return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatSeconds(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}

function formatDuration(totalSeconds) {
  const m = Math.round(totalSeconds / 60);
  if (m < 1) return "menos de 1 min";
  if (m < 60) return m + " min";
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return h + "h" + (rem ? " " + rem + "min" : "");
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function getQuestionById(id) {
  return QUESTIONS.find(q => q.id === id);
}

function getSubjects() {
  return [...new Set(QUESTIONS.map(q => q.subject))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function getTopics(subject) {
  const pool = subject && subject !== "todas" ? QUESTIONS.filter(q => q.subject === subject) : QUESTIONS;
  return [...new Set(pool.map(q => q.topic))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* =====================================================================
   4. REFERÊNCIAS DE DOM
   ===================================================================== */
const El = {}; // preenchido em cacheDom()

function cacheDom() {
  El.header = document.getElementById("app-header");
  El.mainNav = document.getElementById("main-nav");
  El.navToggle = document.getElementById("btn-nav-toggle");
  El.navLinks = document.querySelectorAll("[data-nav]");

  El.dashboardGreeting = document.getElementById("dashboard-greeting");
  El.dashboardStats = document.getElementById("dashboard-stats");
  El.progressOverview = document.getElementById("progress-overview");
  El.recentList = document.getElementById("recent-list");
  El.subjectPerf = document.getElementById("subject-perf");
  El.goalsList = document.getElementById("goals-list");
  El.btnAddGoal = document.getElementById("btn-add-goal");

  El.modeTabs = document.getElementById("mode-tabs");
  El.fieldSubject = document.getElementById("field-subject");
  El.fieldTopic = document.getElementById("field-topic");
  El.fSubject = document.getElementById("f-subject");
  El.fTopic = document.getElementById("f-topic");
  El.fCount = document.getElementById("f-count");
  El.fDifficulty = document.getElementById("f-difficulty");
  El.fStatus = document.getElementById("f-status");
  El.presetGrid = document.getElementById("preset-grid");
  El.selectSummary = document.getElementById("select-summary");
  El.btnStartSimulado = document.getElementById("btn-start-simulado");

  El.quizQCurrent = document.getElementById("quiz-q-current");
  El.quizQTotal = document.getElementById("quiz-q-total");
  El.quizSimName = document.getElementById("quiz-sim-name");
  El.quizProgressFill = document.getElementById("quiz-progress-fill");
  El.quizTimer = document.getElementById("quiz-timer");
  El.quizSubjectTag = document.getElementById("quiz-subject-tag");
  El.quizTopicTag = document.getElementById("quiz-topic-tag");
  El.quizDiffTag = document.getElementById("quiz-diff-tag");
  El.quizStatement = document.getElementById("quiz-statement");
  El.quizAlternatives = document.getElementById("quiz-alternatives");
  El.btnFlagReview = document.getElementById("btn-flag-review");
  El.btnQuizExit = document.getElementById("btn-quiz-exit");
  El.btnQuizPrev = document.getElementById("btn-quiz-prev");
  El.btnQuizNext = document.getElementById("btn-quiz-next");
  El.quizNavTrack = document.getElementById("quiz-nav-track");

  El.resultTitle = document.getElementById("result-title");
  El.scoreRingFg = document.getElementById("score-ring-fg");
  El.scorePercent = document.getElementById("score-percent");
  El.resultCorrect = document.getElementById("result-correct");
  El.resultWrong = document.getElementById("result-wrong");
  El.resultTime = document.getElementById("result-time");
  El.resultSubjectChart = document.getElementById("result-subject-chart");
  El.resultWrongList = document.getElementById("result-wrong-list");
  El.btnResultHome = document.getElementById("btn-result-home");
  El.btnResultRedo = document.getElementById("btn-result-redo");
  El.btnResultReview = document.getElementById("btn-result-review");

  El.reviewList = document.getElementById("review-list");

  El.bSubject = document.getElementById("b-subject");
  El.bTopic = document.getElementById("b-topic");
  El.bDifficulty = document.getElementById("b-difficulty");
  El.bStatus = document.getElementById("b-status");
  El.bankCount = document.getElementById("bank-count");
  El.bankList = document.getElementById("bank-list");

  El.statsSummary = document.getElementById("stats-summary");
  El.evolutionChart = document.getElementById("evolution-chart");
  El.historyList = document.getElementById("history-list");
  El.statsSubjectChart = document.getElementById("stats-subject-chart");
  El.statsWorstTopics = document.getElementById("stats-worst-topics");

  El.sName = document.getElementById("s-name");
  El.btnSaveName = document.getElementById("btn-save-name");
  El.sTheme = document.getElementById("s-theme");
  El.sTimer = document.getElementById("s-timer");
  El.btnClearHistory = document.getElementById("btn-clear-history");
  El.btnResetProgress = document.getElementById("btn-reset-progress");

  El.modalOverlay = document.getElementById("modal-overlay");
  El.modalTitle = document.getElementById("modal-title");
  El.modalMessage = document.getElementById("modal-message");
  El.modalActions = document.getElementById("modal-actions");
  El.toast = document.getElementById("toast");
}

/* =====================================================================
   5. SISTEMA DE MODAL / TOAST (substitui alert()/confirm())
   ===================================================================== */
let toastTimer = null;

function showToast(message, duration = 2200) {
  El.toast.textContent = message;
  El.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { El.toast.hidden = true; }, duration);
}

function closeModal() {
  El.modalOverlay.hidden = true;
  El.modalMessage.innerHTML = "";
  El.modalActions.innerHTML = "";
}

function showModal({ title, message, html = false, actions = [] }) {
  El.modalTitle.textContent = title;
  if (html) El.modalMessage.innerHTML = message;
  else El.modalMessage.textContent = message;

  El.modalActions.innerHTML = "";
  actions.forEach(a => {
    const btn = document.createElement("button");
    btn.className = "btn " + (a.className || "btn-ghost");
    btn.textContent = a.label;
    btn.addEventListener("click", () => {
      if (!a.keepOpen) closeModal();
      if (a.onClick) a.onClick();
    });
    El.modalActions.appendChild(btn);
  });
  El.modalOverlay.hidden = false;
}

function showConfirm(title, message, confirmLabel, onConfirm, danger = false) {
  showModal({
    title, message,
    actions: [
      { label: "Cancelar", className: "btn-ghost" },
      { label: confirmLabel, className: danger ? "btn-danger" : "btn-primary", onClick: onConfirm }
    ]
  });
}

El.modalOverlay?.addEventListener?.("click", () => {}); // placeholder, evento real ligado em bindEvents()

/* =====================================================================
   6. NAVEGAÇÃO ENTRE TELAS
   ===================================================================== */
let currentScreen = "dashboard";

function showScreen(name) {
  // impede sair da tela de prova sem confirmação quando chamada por navegação externa
  document.querySelectorAll("[data-screen]").forEach(s => s.classList.remove("is-active"));
  const target = document.getElementById("screen-" + name);
  if (target) target.classList.add("is-active");
  currentScreen = name;

  document.querySelectorAll(".nav-link").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.nav === name);
  });

  El.mainNav.classList.remove("is-open");
  El.navToggle.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  if (name === "dashboard") renderDashboard();
  if (name === "select") renderSelectScreen();
  if (name === "result") renderResultScreen();
  if (name === "review") renderReviewScreen();
  if (name === "bank") renderBankScreen();
  if (name === "stats") renderStatsScreen();
  if (name === "settings") renderSettingsScreen();
}

/* =====================================================================
   7. DASHBOARD
   ===================================================================== */
function computeGlobalStats() {
  const answered = Object.values(state.answers);
  const totalAnswered = answered.length;
  const totalCorrect = answered.filter(a => a.correct).length;
  const accuracy = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const completed = state.history.length;
  const streak = computeStreak();
  return { totalAnswered, totalCorrect, accuracy, completed, streak };
}

function computeStreak() {
  if (!state.history.length) return 0;
  const days = [...new Set(state.history.map(h => h.date.slice(0, 10)))].sort().reverse();
  let streak = 0;
  let cursor = new Date();
  for (let i = 0; i < days.length; i++) {
    const cursorStr = cursor.toISOString().slice(0, 10);
    if (days[i] === cursorStr) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (i === 0) {
      // permite que o último estudo tenha sido ontem e ainda contar sequência
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (days[i] === yesterday.toISOString().slice(0, 10)) {
        streak++;
        cursor = yesterday;
        cursor.setDate(cursor.getDate() - 1);
      } else break;
    } else break;
  }
  return streak;
}

function computeSubjectPerformance() {
  const bySubject = {};
  Object.entries(state.answers).forEach(([qid, a]) => {
    const q = getQuestionById(qid);
    if (!q) return;
    if (!bySubject[q.subject]) bySubject[q.subject] = { correct: 0, total: 0 };
    bySubject[q.subject].total++;
    if (a.correct) bySubject[q.subject].correct++;
  });
  return Object.entries(bySubject)
    .map(([subject, v]) => ({ subject, ...v, pct: Math.round((v.correct / v.total) * 100) }))
    .sort((a, b) => b.pct - a.pct);
}

function renderDashboard() {
  El.dashboardGreeting.textContent = `Olá, ${state.studentName}!`;
  const stats = computeGlobalStats();

  El.dashboardStats.innerHTML = `
    <div class="stat-card"><span class="stat-icon">📝</span><span class="stat-value">${stats.totalAnswered}</span><span class="stat-label">Questões respondidas</span></div>
    <div class="stat-card"><span class="stat-icon">🎯</span><span class="stat-value">${stats.accuracy}%</span><span class="stat-label">Taxa de acertos</span></div>
    <div class="stat-card"><span class="stat-icon">✅</span><span class="stat-value">${stats.completed}</span><span class="stat-label">Simulados concluídos</span></div>
    <div class="stat-card"><span class="stat-icon">🔥</span><span class="stat-value">${stats.streak}</span><span class="stat-label">Dias seguidos estudando</span></div>
  `;

  // banner de simulado em andamento
  if (state.currentSimulado) {
    const sim = state.currentSimulado;
    const answeredCount = Object.keys(sim.answers).length;
    El.progressOverview.innerHTML = `
      <div class="progress-overview-text">
        <strong>Você tem um simulado em andamento:</strong> ${escapeHtml(sim.name)}
        (${answeredCount}/${sim.questionIds.length} questões respondidas).
      </div>
      <button class="btn btn-primary btn-sm" id="btn-continue-sim">Continuar simulado</button>
    `;
    document.getElementById("btn-continue-sim").addEventListener("click", () => enterQuiz());
  } else {
    const s = computeGlobalStats();
    El.progressOverview.innerHTML = `<p class="progress-overview-text">Você já respondeu <strong>${s.totalAnswered}</strong> questões com <strong>${s.accuracy}%</strong> de aproveitamento geral. Continue praticando para evoluir!</p>`;
  }

  // últimos simulados
  const recent = state.history.slice(-3).reverse();
  El.recentList.innerHTML = recent.length ? recent.map(renderRecentItemHtml).join("") :
    `<p class="empty-hint">Nenhum simulado concluído ainda. Comece agora pelo botão acima.</p>`;

  // desempenho por disciplina
  const perf = computeSubjectPerformance();
  El.subjectPerf.innerHTML = perf.length ? perf.map(p => `
    <div class="subject-perf-row">
      <div class="subject-perf-top"><span class="sp-name">${escapeHtml(p.subject)}</span><span class="sp-value">${p.pct}%</span></div>
      <div class="mini-track"><div class="mini-fill ${p.pct < 50 ? "is-low" : p.pct >= 75 ? "is-high" : ""}" style="width:${p.pct}%"></div></div>
    </div>
  `).join("") : `<p class="empty-hint">Ainda não há dados suficientes.</p>`;

  // metas
  renderGoals();
}

function renderRecentItemHtml(h) {
  const good = h.percent >= 60;
  return `
    <div class="recent-item">
      <div class="recent-item-main">
        <span class="recent-item-name">${escapeHtml(h.name)}</span>
        <span class="recent-item-meta">${formatDate(h.date)} · ${h.correct}/${h.total} questões</span>
      </div>
      <span class="recent-item-score ${good ? "is-good" : "is-bad"}">${h.percent}%</span>
    </div>
  `;
}

function renderGoals() {
  El.goalsList.innerHTML = state.goals.length ? state.goals.map(g => `
    <div class="goal-item" data-goal-id="${g.id}">
      <span class="goal-check ${g.done ? "is-done" : ""}"></span>
      <span>${escapeHtml(g.text)}</span>
    </div>
  `).join("") : `<p class="empty-hint">Nenhuma meta cadastrada. Que tal adicionar uma?</p>`;

  El.goalsList.querySelectorAll(".goal-item").forEach(row => {
    row.addEventListener("click", () => {
      const id = row.dataset.goalId;
      const goal = state.goals.find(g => g.id === id);
      if (goal) { goal.done = !goal.done; saveState(); renderGoals(); }
    });
  });
}

/* =====================================================================
   8. SELEÇÃO DE SIMULADO
   ===================================================================== */
let selectMode = "completo";

function populateFilterSubjects() {
  const subjects = getSubjects();
  [El.fSubject, El.bSubject].forEach(select => {
    const current = select.value;
    select.innerHTML = `<option value="todas">Todas</option>` +
      subjects.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");
    select.value = current || "todas";
  });
  populateFilterTopics(El.fSubject.value, El.fTopic);
  populateFilterTopics(El.bSubject.value, El.bTopic);
}

function populateFilterTopics(subject, selectEl) {
  const topics = getTopics(subject);
  const current = selectEl.value;
  selectEl.innerHTML = `<option value="todos">Todos</option>` +
    topics.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("");
  selectEl.value = topics.includes(current) ? current : "todos";
}

function renderSelectScreen() {
  El.fieldSubject.hidden = selectMode === "completo";
  El.fieldTopic.hidden = selectMode === "completo" || selectMode === "disciplina";
  El.presetGrid.style.display = selectMode === "completo" ? "grid" : "none";

  if (selectMode === "completo") renderPresetCards();
  updateSelectSummary();
}

function renderPresetCards() {
  const total = QUESTIONS.length;
  const wrongIds = getAllWrongQuestionIds();
  const presets = [
    { id: "rapido", name: "Simulado Rápido", count: Math.min(10, total), desc: "Aquecimento diário, todas as disciplinas.", time: Math.min(10, total) * 1.5 },
    { id: "padrao", name: "Simulado Padrão", count: Math.min(20, total), desc: "Boa amostra geral do SSA 1.", time: Math.min(20, total) * 1.5 },
    { id: "maratona", name: "Simulado Maratona", count: total, desc: "Todas as questões disponíveis no banco.", time: total * 1.5 },
    { id: "revisao-erros", name: "Revisão de Erros", count: wrongIds.length, desc: "Só as questões que você já errou.", time: wrongIds.length * 1.5, disabled: wrongIds.length === 0 }
  ];
  El.presetGrid.innerHTML = presets.map(p => `
    <div class="preset-card ${p.disabled ? "is-disabled" : ""}" data-preset="${p.id}" style="${p.disabled ? "opacity:.5;cursor:not-allowed;" : ""}">
      <h3>${p.name}</h3>
      <p style="margin:0;font-size:.85rem;">${p.desc}</p>
      <div class="preset-meta">
        <span>${p.count} questões</span>
        <span>~${Math.round(p.time)} min</span>
      </div>
      <button class="btn btn-secondary btn-sm" ${p.disabled ? "disabled" : ""}>Iniciar</button>
    </div>
  `).join("");

  El.presetGrid.querySelectorAll(".preset-card").forEach(card => {
    if (card.classList.contains("is-disabled")) return;
    card.addEventListener("click", () => {
      const presetId = card.dataset.preset;
      const preset = presets.find(p => p.id === presetId);
      startFromPreset(preset);
    });
  });
}

function startFromPreset(preset) {
  let pool;
  if (preset.id === "revisao-erros") {
    pool = getAllWrongQuestionIds().map(getQuestionById).filter(Boolean);
  } else {
    pool = shuffle(QUESTIONS).slice(0, preset.count);
  }
  if (!pool.length) {
    showToast("Nenhuma questão disponível para esse simulado.");
    return;
  }
  createAndStartSimulado(preset.name, pool.map(q => q.id));
}

function getAllWrongQuestionIds() {
  const ids = new Set();
  Object.entries(state.answers).forEach(([qid, a]) => { if (!a.correct) ids.add(qid); });
  return [...ids];
}

function updateSelectSummary() {
  const count = parseInt(El.fCount.value, 10);
  El.selectSummary.textContent = `Modo: ${selectModeLabel(selectMode)} · ${count} questões selecionadas ao iniciar.`;
}

function selectModeLabel(mode) {
  return { completo: "Completo", disciplina: "Por disciplina", assunto: "Por assunto", personalizado: "Personalizado" }[mode] || mode;
}

function buildFilteredPool() {
  let pool = QUESTIONS.slice();
  const subject = El.fSubject.value;
  const topic = El.fTopic.value;
  const difficulty = El.fDifficulty.value;
  const status = El.fStatus.value;
  const count = parseInt(El.fCount.value, 10);

  if (selectMode !== "completo" && subject !== "todas") pool = pool.filter(q => q.subject === subject);
  if (selectMode === "assunto" && topic !== "todos") pool = pool.filter(q => q.topic === topic);
  if (difficulty !== "todas") pool = pool.filter(q => q.difficulty === difficulty);
  if (status === "ineditas") pool = pool.filter(q => !state.answers[q.id]);
  if (status === "respondidas") pool = pool.filter(q => !!state.answers[q.id]);

  pool = shuffle(pool).slice(0, count);
  return pool;
}

function createAndStartSimulado(name, questionIds) {
  if (state.currentSimulado) {
    showConfirm(
      "Substituir simulado em andamento?",
      "Você já tem um simulado em andamento. Iniciar um novo vai descartar o progresso não finalizado dele.",
      "Iniciar novo",
      () => { doCreateSimulado(name, questionIds); },
      true
    );
  } else {
    doCreateSimulado(name, questionIds);
  }
}

function doCreateSimulado(name, questionIds) {
  state.currentSimulado = {
    id: uid("sim"),
    name,
    questionIds,
    index: 0,
    answers: {}, // qid -> { chosen, flagged }
    startedAt: Date.now(),
    timerSeconds: 0
  };
  saveState();
  enterQuiz();
}

/* =====================================================================
   9. TELA DE RESOLUÇÃO DE QUESTÕES (PROVA)
   ===================================================================== */
let quizTimerHandle = null;

function enterQuiz() {
  showScreen("quiz");
  startQuizTimer();
  renderQuizQuestion();
}

function startQuizTimer() {
  stopQuizTimer();
  if (!state.timerEnabled) { El.quizTimer.textContent = "—:—"; return; }
  El.quizTimer.textContent = formatSeconds(state.currentSimulado.timerSeconds);
  quizTimerHandle = setInterval(() => {
    if (!state.currentSimulado) { stopQuizTimer(); return; }
    state.currentSimulado.timerSeconds++;
    El.quizTimer.textContent = formatSeconds(state.currentSimulado.timerSeconds);
    if (state.currentSimulado.timerSeconds % 5 === 0) saveState();
  }, 1000);
}

function stopQuizTimer() {
  if (quizTimerHandle) { clearInterval(quizTimerHandle); quizTimerHandle = null; }
}

function renderQuizQuestion() {
  const sim = state.currentSimulado;
  if (!sim) return;
  const q = getQuestionById(sim.questionIds[sim.index]);
  if (!q) return;
  const saved = sim.answers[q.id];

  El.quizQCurrent.textContent = sim.index + 1;
  El.quizQTotal.textContent = sim.questionIds.length;
  El.quizSimName.textContent = sim.name;
  El.quizProgressFill.style.width = `${((sim.index + 1) / sim.questionIds.length) * 100}%`;

  El.quizSubjectTag.textContent = q.subject;
  El.quizTopicTag.textContent = q.topic;
  El.quizDiffTag.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);

  El.quizStatement.textContent = q.statement;

  El.quizAlternatives.innerHTML = q.alternatives.map(alt => `
    <button class="alt-option ${saved && saved.chosen === alt.id ? "is-selected" : ""}" data-alt="${alt.id}">
      <span class="alt-letter">${alt.id.toUpperCase()}</span>
      <span class="alt-text">${escapeHtml(alt.text)}</span>
    </button>
  `).join("");

  El.quizAlternatives.querySelectorAll(".alt-option").forEach(btn => {
    btn.addEventListener("click", () => selectAlternative(q.id, btn.dataset.alt));
  });

  El.btnFlagReview.classList.toggle("is-flagged", !!(saved && saved.flagged));
  El.btnFlagReview.querySelector(".alt-text");
  El.btnFlagReview.lastChild.textContent = saved && saved.flagged ? " Marcada para revisão" : " Marcar para revisão";

  El.btnQuizPrev.disabled = sim.index === 0;
  El.btnQuizNext.textContent = sim.index === sim.questionIds.length - 1 ? "Finalizar simulado" : "Próxima";

  renderQuizNavTrack();
}

function selectAlternative(qid, altId) {
  const sim = state.currentSimulado;
  const prev = sim.answers[qid] || {};
  sim.answers[qid] = { chosen: altId, flagged: !!prev.flagged };
  saveState();
  renderQuizQuestion();
}

function toggleFlag() {
  const sim = state.currentSimulado;
  const q = getQuestionById(sim.questionIds[sim.index]);
  const prev = sim.answers[q.id] || {};
  sim.answers[q.id] = { chosen: prev.chosen || null, flagged: !prev.flagged };
  saveState();
  renderQuizQuestion();
}

function renderQuizNavTrack() {
  const sim = state.currentSimulado;
  El.quizNavTrack.innerHTML = sim.questionIds.map((qid, i) => {
    const a = sim.answers[qid];
    const classes = ["qnav-dot"];
    if (i === sim.index) classes.push("is-current");
    if (a && a.chosen) classes.push("is-answered");
    if (a && a.flagged) classes.push("is-flagged");
    return `<button class="${classes.join(" ")}" data-goto="${i}">${i + 1}</button>`;
  }).join("");
  El.quizNavTrack.querySelectorAll("[data-goto]").forEach(btn => {
    btn.addEventListener("click", () => {
      sim.index = parseInt(btn.dataset.goto, 10);
      renderQuizQuestion();
    });
  });
  const currentDot = El.quizNavTrack.querySelector(".is-current");
  if (currentDot) currentDot.scrollIntoView({ block: "nearest", inline: "center" });
}

function goPrevQuestion() {
  const sim = state.currentSimulado;
  if (sim.index > 0) { sim.index--; renderQuizQuestion(); }
}

function goNextQuestion() {
  const sim = state.currentSimulado;
  if (sim.index < sim.questionIds.length - 1) {
    sim.index++;
    renderQuizQuestion();
  } else {
    confirmFinishSimulado();
  }
}

function confirmFinishSimulado() {
  const sim = state.currentSimulado;
  const answeredCount = Object.values(sim.answers).filter(a => a.chosen).length;
  const total = sim.questionIds.length;
  const missing = total - answeredCount;
  const msg = missing > 0
    ? `Você respondeu ${answeredCount} de ${total} questões. Ainda faltam ${missing}. Deseja finalizar mesmo assim?`
    : `Você respondeu todas as ${total} questões. Deseja finalizar o simulado?`;
  showConfirm("Finalizar simulado?", msg, "Finalizar", () => finalizeSimulado());
}

function confirmExitQuiz() {
  showConfirm(
    "Sair do simulado?",
    "Seu progresso será salvo e você poderá continuar de onde parou mais tarde.",
    "Sair",
    () => { stopQuizTimer(); showScreen("dashboard"); }
  );
}

function finalizeSimulado() {
  stopQuizTimer();
  const sim = state.currentSimulado;
  const bySubject = {};
  let correct = 0;
  const wrongIds = [];

  sim.questionIds.forEach(qid => {
    const q = getQuestionById(qid);
    const a = sim.answers[qid];
    const isCorrect = !!a && a.chosen === q.correct;
    if (isCorrect) correct++; else wrongIds.push(qid);

    if (!bySubject[q.subject]) bySubject[q.subject] = { correct: 0, total: 0 };
    bySubject[q.subject].total++;
    if (isCorrect) bySubject[q.subject].correct++;

    state.answers[qid] = {
      chosen: a ? a.chosen : null,
      correct: isCorrect,
      simId: sim.id,
      reviewed: false,
      answeredAt: new Date().toISOString()
    };
  });

  const total = sim.questionIds.length;
  const percent = Math.round((correct / total) * 100);
  const record = {
    id: sim.id,
    name: sim.name,
    date: new Date().toISOString(),
    total, correct, wrong: total - correct, percent,
    timeSeconds: sim.timerSeconds,
    bySubject,
    questionIds: sim.questionIds,
    wrongIds,
    answersSnapshot: sim.answers
  };

  state.history.push(record);
  state.lastResultId = record.id;
  state.currentSimulado = null;
  saveState();
  showScreen("result");
}

/* =====================================================================
   10. RESULTADO
   ===================================================================== */
function getLastResult() {
  return state.history.find(h => h.id === state.lastResultId) || state.history[state.history.length - 1];
}

function renderResultScreen() {
  const result = getLastResult();
  if (!result) { showScreen("dashboard"); return; }

  El.resultTitle.textContent = result.percent >= 60 ? "Muito bem, simulado concluído!" : "Simulado concluído — vamos revisar?";

  const circumference = 2 * Math.PI * 60;
  const offset = circumference * (1 - result.percent / 100);
  El.scoreRingFg.style.strokeDasharray = `${circumference}`;
  El.scoreRingFg.style.strokeDashoffset = `${offset}`;
  El.scoreRingFg.style.stroke = result.percent >= 60 ? "var(--success)" : result.percent >= 40 ? "var(--warning)" : "var(--danger)";
  El.scorePercent.textContent = `${result.percent}%`;

  El.resultCorrect.textContent = result.correct;
  El.resultWrong.textContent = result.wrong;
  El.resultTime.textContent = formatDuration(result.timeSeconds);

  El.resultSubjectChart.innerHTML = Object.entries(result.bySubject).map(([subject, v]) => {
    const pct = Math.round((v.correct / v.total) * 100);
    const cls = pct < 50 ? "is-low" : pct < 75 ? "is-mid" : "is-high";
    return `
      <div class="bar-row">
        <span class="bar-name">${escapeHtml(subject)}</span>
        <div class="bar-track"><div class="bar-fill ${cls}" style="width:${pct}%"></div></div>
        <span class="bar-value">${pct}%</span>
      </div>`;
  }).join("");

  if (result.wrongIds.length) {
    El.resultWrongList.innerHTML = result.wrongIds.map(qid => {
      const q = getQuestionById(qid);
      return `
        <div class="wrong-item">
          <div>
            <div class="wrong-item-text">${escapeHtml(q.statement.slice(0, 90))}${q.statement.length > 90 ? "…" : ""}</div>
            <div class="wrong-item-sub">${escapeHtml(q.subject)} · ${escapeHtml(q.topic)}</div>
          </div>
        </div>`;
    }).join("");
  } else {
    El.resultWrongList.innerHTML = `<p class="empty-hint">Você acertou todas as questões deste simulado. Excelente!</p>`;
  }
}

function redoSimulado() {
  const result = getLastResult();
  if (!result) return;
  createAndStartSimulado(result.name + " (repetição)", shuffle(result.questionIds));
}

/* =====================================================================
   11. REVISÃO DE QUESTÕES
   ===================================================================== */
function renderReviewScreen() {
  const result = getLastResult();
  if (!result || !result.wrongIds.length) {
    El.reviewList.innerHTML = `<p class="empty-hint">Nenhuma questão para revisar neste simulado. 🎉</p>`;
    return;
  }
  El.reviewList.innerHTML = result.wrongIds.map(qid => {
    const q = getQuestionById(qid);
    const a = result.answersSnapshot[qid];
    const chosen = a ? a.chosen : null;
    const reviewed = state.answers[qid] && state.answers[qid].reviewed;
    return `
      <div class="review-card" data-qid="${qid}">
        <div class="review-card-head">
          <div>
            <span class="tag">${escapeHtml(q.subject)}</span>
            <span class="tag tag-muted">${escapeHtml(q.topic)}</span>
          </div>
          <span class="status-pill ${reviewed ? "status-correta" : "status-pendente"}">${reviewed ? "Revisada" : "Pendente"}</span>
        </div>
        <p class="review-statement">${escapeHtml(q.statement)}</p>
        ${q.alternatives.map(alt => {
          let cls = "";
          if (alt.id === q.correct) cls = "is-correct";
          else if (alt.id === chosen) cls = "is-chosen-wrong";
          return `<div class="review-alt ${cls}"><span class="review-alt-letter">${alt.id.toUpperCase()}</span><span>${escapeHtml(alt.text)}</span></div>`;
        }).join("")}
        <div class="review-explanation"><strong>Explicação:</strong> ${escapeHtml(q.explanation)}</div>
        <div class="review-footer">
          <span class="empty-hint">${chosen ? "Sua resposta: " + chosen.toUpperCase() : "Você não respondeu esta questão."}</span>
          <button class="btn btn-secondary btn-sm" data-mark-reviewed="${qid}">${reviewed ? "Desmarcar revisão" : "Marcar como revisada"}</button>
        </div>
      </div>`;
  }).join("");

  El.reviewList.querySelectorAll("[data-mark-reviewed]").forEach(btn => {
    btn.addEventListener("click", () => {
      const qid = btn.dataset.markReviewed;
      if (!state.answers[qid]) state.answers[qid] = { chosen: null, correct: false };
      state.answers[qid].reviewed = !state.answers[qid].reviewed;
      saveState();
      renderReviewScreen();
    });
  });
}

/* =====================================================================
   12. BANCO DE QUESTÕES (TELA)
   ===================================================================== */
function getQuestionStatus(qid) {
  const a = state.answers[qid];
  if (!a) return "pendente";
  return a.correct ? "correta" : "errada";
}

function renderBankScreen() {
  const subject = El.bSubject.value;
  const topic = El.bTopic.value;
  const difficulty = El.bDifficulty.value;
  const status = El.bStatus.value;

  let pool = QUESTIONS.slice();
  if (subject !== "todas") pool = pool.filter(q => q.subject === subject);
  if (topic !== "todos") pool = pool.filter(q => q.topic === topic);
  if (difficulty !== "todas") pool = pool.filter(q => q.difficulty === difficulty);
  if (status !== "todas") {
    const map = { "nao-respondida": "pendente", "respondida": "correta", "errada": "errada" };
    pool = pool.filter(q => getQuestionStatus(q.id) === map[status]);
  }

  El.bankCount.textContent = `${pool.length} questão(ões) encontrada(s)`;
  El.bankList.innerHTML = pool.map(q => {
    const st = getQuestionStatus(q.id);
    const label = { pendente: "Não respondida", correta: "Respondida", errada: "Errada" }[st];
    return `
      <div class="bank-item" data-qid="${q.id}">
        <div class="bank-item-main">
          <span class="bank-item-statement">${escapeHtml(q.statement.slice(0, 110))}${q.statement.length > 110 ? "…" : ""}</span>
          <div class="bank-item-meta">
            <span class="status-pill status-pendente">${escapeHtml(q.subject)}</span>
            <span class="status-pill status-pendente">${escapeHtml(q.topic)}</span>
            <span class="status-pill status-pendente">${q.difficulty}</span>
          </div>
        </div>
        <span class="status-pill status-${st}">${label}</span>
      </div>`;
  }).join("") || `<p class="empty-hint">Nenhuma questão encontrada com esses filtros.</p>`;

  El.bankList.querySelectorAll(".bank-item").forEach(item => {
    item.addEventListener("click", () => openQuestionPreview(item.dataset.qid));
  });
}

function openQuestionPreview(qid) {
  const q = getQuestionById(qid);
  const html = `
    <div style="margin-bottom:10px;">
      <span class="tag">${escapeHtml(q.subject)}</span> <span class="tag tag-muted">${escapeHtml(q.topic)}</span>
    </div>
    <p style="font-weight:600;color:var(--text);">${escapeHtml(q.statement)}</p>
    ${q.alternatives.map(alt => `
      <div class="review-alt ${alt.id === q.correct ? "is-correct" : ""}">
        <span class="review-alt-letter">${alt.id.toUpperCase()}</span><span>${escapeHtml(alt.text)}</span>
      </div>`).join("")}
    <div class="review-explanation"><strong>Explicação:</strong> ${escapeHtml(q.explanation)}</div>
  `;
  showModal({
    title: "Questão " + qid.replace("q", "#"),
    message: html,
    html: true,
    actions: [{ label: "Fechar", className: "btn-primary" }]
  });
}

/* =====================================================================
   13. ESTATÍSTICAS
   ===================================================================== */
function renderStatsScreen() {
  const stats = computeGlobalStats();
  El.statsSummary.innerHTML = `
    <div class="stat-card"><span class="stat-icon">📝</span><span class="stat-value">${stats.totalAnswered}</span><span class="stat-label">Questões respondidas</span></div>
    <div class="stat-card"><span class="stat-icon">🎯</span><span class="stat-value">${stats.accuracy}%</span><span class="stat-label">Aproveitamento geral</span></div>
    <div class="stat-card"><span class="stat-icon">✅</span><span class="stat-value">${stats.completed}</span><span class="stat-label">Simulados concluídos</span></div>
    <div class="stat-card"><span class="stat-icon">🔥</span><span class="stat-value">${stats.streak}</span><span class="stat-label">Dias seguidos</span></div>
  `;

  renderEvolutionChart();

  El.historyList.innerHTML = state.history.length
    ? state.history.slice().reverse().map(renderRecentItemHtml).join("")
    : `<p class="empty-hint">Nenhum simulado concluído ainda.</p>`;

  const perf = computeSubjectPerformance();
  El.statsSubjectChart.innerHTML = perf.length ? perf.map(p => `
    <div class="bar-v-col">
      <span class="bar-v-value">${p.pct}%</span>
      <div class="bar-v-track"><div class="bar-v-fill ${p.pct < 50 ? "is-low" : p.pct >= 75 ? "is-high" : ""}" style="height:${p.pct}%"></div></div>
      <span class="bar-v-label">${escapeHtml(p.subject)}</span>
    </div>
  `).join("") : `<p class="empty-hint">Ainda não há dados suficientes.</p>`;

  renderWorstTopics();
}

function renderEvolutionChart() {
  if (!state.history.length) {
    El.evolutionChart.innerHTML = `<p class="empty-hint">Conclua simulados para ver sua evolução aqui.</p>`;
    return;
  }
  const points = state.history.slice(-12);
  const w = Math.max(320, points.length * 60);
  const h = 160;
  const padding = 20;
  const stepX = points.length > 1 ? (w - padding * 2) / (points.length - 1) : 0;
  const coords = points.map((p, i) => {
    const x = padding + i * stepX;
    const y = padding + (100 - p.percent) * ((h - padding * 2) / 100);
    return { x, y, p };
  });
  const polyline = coords.map(c => `${c.x},${c.y}`).join(" ");
  const dots = coords.map(c => `<circle cx="${c.x}" cy="${c.y}" r="4" fill="var(--blue-500)"><title>${c.p.name}: ${c.p.percent}%</title></circle>`).join("");

  El.evolutionChart.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="min-width:${w}px;">
      <polyline points="${polyline}" fill="none" stroke="var(--blue-500)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      ${dots}
    </svg>`;
}

function renderWorstTopics() {
  const counts = {};
  state.history.forEach(h => {
    h.wrongIds.forEach(qid => {
      const q = getQuestionById(qid);
      if (!q) return;
      counts[q.topic] = (counts[q.topic] || 0) + 1;
    });
  });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  El.statsWorstTopics.innerHTML = sorted.length ? sorted.map(([topic, n]) => `
    <div class="topic-error-row"><span>${escapeHtml(topic)}</span><span class="topic-error-count">${n} erro(s)</span></div>
  `).join("") : `<p class="empty-hint">Nenhum erro registrado ainda.</p>`;
}

/* =====================================================================
   14. CONFIGURAÇÕES
   ===================================================================== */
function renderSettingsScreen() {
  El.sName.value = state.studentName;
  El.sTheme.checked = state.theme === "dark";
  El.sTimer.checked = state.timerEnabled;
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
}

function saveStudentName() {
  const name = El.sName.value.trim();
  state.studentName = name || "Estudante";
  saveState();
  showToast("Nome atualizado.");
}

function toggleTheme(isDark) {
  state.theme = isDark ? "dark" : "light";
  applyTheme();
  saveState();
}

function toggleTimerSetting(enabled) {
  state.timerEnabled = enabled;
  saveState();
}

function clearHistory() {
  showConfirm(
    "Limpar histórico?",
    "Isso vai remover todos os simulados concluídos e as estatísticas de desempenho. As questões continuam disponíveis no banco.",
    "Limpar histórico",
    () => {
      state.history = [];
      state.answers = {};
      state.lastResultId = null;
      saveState();
      showToast("Histórico limpo.");
      renderDashboard();
    },
    true
  );
}

function resetProgress() {
  showConfirm(
    "Reiniciar todo o progresso?",
    "Isso vai apagar respostas, histórico e metas salvas neste navegador. Essa ação não pode ser desfeita.",
    "Reiniciar tudo",
    () => {
      const keep = { studentName: state.studentName, theme: state.theme, timerEnabled: state.timerEnabled };
      state = Object.assign(defaultState(), keep);
      saveState();
      showToast("Progresso reiniciado.");
      showScreen("dashboard");
    },
    true
  );
}

function addGoalFlow() {
  const html = `<input type="text" id="modal-goal-input" class="text-input" style="width:100%;margin-top:8px;" placeholder="Ex: Terminar Matemática até sexta" maxlength="80">`;
  showModal({
    title: "Nova meta de estudo",
    message: html,
    html: true,
    actions: [
      { label: "Cancelar", className: "btn-ghost" },
      {
        label: "Adicionar", className: "btn-primary", keepOpen: true,
        onClick: () => {
          const input = document.getElementById("modal-goal-input");
          const text = input.value.trim();
          if (!text) { input.focus(); return; }
          state.goals.push({ id: uid("goal"), text, done: false });
          saveState();
          renderGoals();
          closeModal();
        }
      }
    ]
  });
  setTimeout(() => document.getElementById("modal-goal-input")?.focus(), 50);
}

/* =====================================================================
   15. INICIALIZAÇÃO
   ===================================================================== */
function bindEvents() {
  document.querySelectorAll("[data-nav]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.nav;
      if (currentScreen === "quiz" && state.currentSimulado) {
        showConfirm("Sair do simulado?", "Seu progresso será salvo. Deseja sair mesmo assim?", "Sair", () => {
          stopQuizTimer();
          showScreen(target);
        });
      } else {
        showScreen(target);
      }
    });
  });

  El.navToggle.addEventListener("click", () => {
    const open = El.mainNav.classList.toggle("is-open");
    El.navToggle.setAttribute("aria-expanded", String(open));
  });

  El.btnAddGoal.addEventListener("click", addGoalFlow);

  El.modeTabs.querySelectorAll(".mode-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      El.modeTabs.querySelectorAll(".mode-tab").forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      selectMode = tab.dataset.mode;
      renderSelectScreen();
    });
  });

  El.fSubject.addEventListener("change", () => {
    populateFilterTopics(El.fSubject.value, El.fTopic);
    updateSelectSummary();
  });
  [El.fTopic, El.fCount, El.fDifficulty, El.fStatus].forEach(el => el.addEventListener("change", updateSelectSummary));

  El.btnStartSimulado.addEventListener("click", () => {
    const pool = buildFilteredPool();
    if (!pool.length) { showToast("Nenhuma questão encontrada com esses filtros. Tente ampliar a busca."); return; }
    const name = selectMode === "completo" ? "Simulado completo" :
      selectMode === "disciplina" ? `Simulado — ${El.fSubject.value}` :
      selectMode === "assunto" ? `Simulado — ${El.fTopic.value}` : "Simulado personalizado";
    createAndStartSimulado(name, pool.map(q => q.id));
  });

  El.btnQuizExit.addEventListener("click", confirmExitQuiz);
  El.btnQuizPrev.addEventListener("click", goPrevQuestion);
  El.btnQuizNext.addEventListener("click", goNextQuestion);
  El.btnFlagReview.addEventListener("click", toggleFlag);

  El.btnResultHome.addEventListener("click", () => showScreen("dashboard"));
  El.btnResultRedo.addEventListener("click", redoSimulado);
  El.btnResultReview.addEventListener("click", () => showScreen("review"));

  El.bSubject.addEventListener("change", () => { populateFilterTopics(El.bSubject.value, El.bTopic); renderBankScreen(); });
  [El.bTopic, El.bDifficulty, El.bStatus].forEach(el => el.addEventListener("change", renderBankScreen));

  El.btnSaveName.addEventListener("click", saveStudentName);
  El.sTheme.addEventListener("change", () => toggleTheme(El.sTheme.checked));
  El.sTimer.addEventListener("change", () => toggleTimerSetting(El.sTimer.checked));
  El.btnClearHistory.addEventListener("click", clearHistory);
  El.btnResetProgress.addEventListener("click", resetProgress);

  document.getElementById("btn-brand").addEventListener("click", () => showScreen("dashboard"));

  El.modalOverlay.addEventListener("click", (e) => {
    if (e.target === El.modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !El.modalOverlay.hidden) closeModal();
  });

  window.addEventListener("beforeunload", () => { saveState(); });
}

function initApp() {
  state = loadState();
  cacheDom();
  applyTheme();
  populateFilterSubjects();
  bindEvents();
  showScreen("dashboard");
}

document.addEventListener("DOMContentLoaded", initApp);
