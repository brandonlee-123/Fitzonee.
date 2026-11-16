/* =====================================================
   FitZone — JavaScript puro
   Organização do arquivo:
   1. Dados (exercícios) e constantes
   2. Funções de salvar/carregar (localStorage)
   3. Navegação entre páginas
   4. Dashboard
   5. Biblioteca de exercícios
   6. Montagem de treinos
   7. Cronograma semanal
   8. Cronômetro
   9. Evolução
   10. Perfil e IMC
   11. Inicialização
   ===================================================== */


/* =====================================================
   1. DADOS E CONSTANTES
   ===================================================== */

// Lista de exercícios da biblioteca (cada um pertence a um grupo muscular)
const EXERCICIOS = [
  // PEITO
  { id: 1,  nome: "Supino reto",            grupo: "Peito",   series: 4, reps: "8-12",  descricao: "Deitado no banco, empurre a barra para cima até estender os braços." },
  { id: 2,  nome: "Supino inclinado",       grupo: "Peito",   series: 3, reps: "8-12",  descricao: "Igual ao supino reto, mas com o banco inclinado. Foca na parte superior do peito." },
  { id: 3,  nome: "Crucifixo com halteres", grupo: "Peito",   series: 3, reps: "10-12", descricao: "Abra e feche os braços com halteres, mantendo os cotovelos levemente dobrados." },
  { id: 4,  nome: "Flexão de braço",        grupo: "Peito",   series: 3, reps: "10-15", descricao: "Apoie mãos e pés no chão e desça o corpo até quase tocar o solo." },
  { id: 5,  nome: "Crossover",              grupo: "Peito",   series: 3, reps: "12-15", descricao: "Puxe os cabos da polia alta para frente, juntando as mãos na frente do corpo." },

  // COSTAS
  { id: 6,  nome: "Puxada na frente",       grupo: "Costas",  series: 4, reps: "8-12",  descricao: "Sentado, puxe a barra da polia alta até a altura do peito." },
  { id: 7,  nome: "Remada curvada",         grupo: "Costas",  series: 4, reps: "8-10",  descricao: "Com o tronco inclinado, puxe a barra em direção ao abdômen." },
  { id: 8,  nome: "Remada baixa",           grupo: "Costas",  series: 3, reps: "10-12", descricao: "Sentado na máquina, puxe o triângulo em direção ao corpo." },
  { id: 9,  nome: "Barra fixa",             grupo: "Costas",  series: 3, reps: "6-10",  descricao: "Pendurado na barra, puxe o corpo até o queixo passar da barra." },
  { id: 10, nome: "Levantamento terra",     grupo: "Costas",  series: 4, reps: "5-8",   descricao: "Levante a barra do chão mantendo a coluna reta. Exige técnica." },

  // PERNAS
  { id: 11, nome: "Agachamento livre",      grupo: "Pernas",  series: 4, reps: "8-12",  descricao: "Com a barra nas costas, agache até as coxas ficarem paralelas ao chão." },
  { id: 12, nome: "Leg press 45°",          grupo: "Pernas",  series: 4, reps: "10-12", descricao: "Empurre a plataforma com os pés sem travar totalmente os joelhos." },
  { id: 13, nome: "Cadeira extensora",      grupo: "Pernas",  series: 3, reps: "12-15", descricao: "Sentado, estenda as pernas para trabalhar a frente da coxa." },
  { id: 14, nome: "Mesa flexora",           grupo: "Pernas",  series: 3, reps: "10-12", descricao: "Deitado de bruços, dobre as pernas para trabalhar a parte de trás da coxa." },
  { id: 15, nome: "Panturrilha em pé",      grupo: "Pernas",  series: 4, reps: "15-20", descricao: "Suba na ponta dos pés e desça devagar para alongar a panturrilha." },

  // OMBROS
  { id: 16, nome: "Desenvolvimento com halteres", grupo: "Ombros", series: 4, reps: "8-12",  descricao: "Sentado, empurre os halteres acima da cabeça." },
  { id: 17, nome: "Elevação lateral",       grupo: "Ombros",  series: 3, reps: "12-15", descricao: "Levante os halteres para os lados até a altura dos ombros." },
  { id: 18, nome: "Elevação frontal",       grupo: "Ombros",  series: 3, reps: "10-12", descricao: "Levante os halteres à frente do corpo até a altura dos olhos." },
  { id: 19, nome: "Crucifixo inverso",      grupo: "Ombros",  series: 3, reps: "12-15", descricao: "Inclinado, abra os braços para trás para trabalhar o ombro posterior." },
  { id: 20, nome: "Encolhimento de ombros", grupo: "Ombros",  series: 3, reps: "12-15", descricao: "Segure halteres e eleve os ombros em direção às orelhas." },

  // BÍCEPS
  { id: 21, nome: "Rosca direta",           grupo: "Bíceps",  series: 3, reps: "8-12",  descricao: "Em pé, flexione os cotovelos levantando a barra até o peito." },
  { id: 22, nome: "Rosca alternada",        grupo: "Bíceps",  series: 3, reps: "10-12", descricao: "Levante um halter de cada vez, girando o punho durante o movimento." },
  { id: 23, nome: "Rosca martelo",          grupo: "Bíceps",  series: 3, reps: "10-12", descricao: "Rosca com as palmas das mãos viradas uma para a outra." },
  { id: 24, nome: "Rosca concentrada",      grupo: "Bíceps",  series: 3, reps: "10-12", descricao: "Sentado, apoie o cotovelo na coxa e levante o halter com um braço." },
  { id: 25, nome: "Rosca scott",            grupo: "Bíceps",  series: 3, reps: "10-12", descricao: "Com os braços apoiados no banco scott, flexione os cotovelos." },

  // TRÍCEPS
  { id: 26, nome: "Tríceps pulley",         grupo: "Tríceps", series: 3, reps: "10-15", descricao: "Na polia alta, empurre a barra para baixo estendendo os cotovelos." },
  { id: 27, nome: "Tríceps testa",          grupo: "Tríceps", series: 3, reps: "8-12",  descricao: "Deitado, desça a barra em direção à testa e estenda os braços." },
  { id: 28, nome: "Tríceps francês",        grupo: "Tríceps", series: 3, reps: "10-12", descricao: "Segure um halter atrás da cabeça e estenda os braços para cima." },
  { id: 29, nome: "Mergulho no banco",      grupo: "Tríceps", series: 3, reps: "10-15", descricao: "Com as mãos apoiadas no banco, desça e suba o corpo dobrando os cotovelos." },
  { id: 30, nome: "Tríceps coice",          grupo: "Tríceps", series: 3, reps: "12-15", descricao: "Inclinado, estenda o braço para trás com o halter." },

  // ABDÔMEN
  { id: 31, nome: "Abdominal reto",         grupo: "Abdômen", series: 3, reps: "15-20", descricao: "Deitado, eleve o tronco em direção aos joelhos." },
  { id: 32, nome: "Prancha",                grupo: "Abdômen", series: 3, reps: "30-60s", descricao: "Apoiado nos antebraços e pontas dos pés, mantenha o corpo reto." },
  { id: 33, nome: "Elevação de pernas",     grupo: "Abdômen", series: 3, reps: "12-15", descricao: "Deitado, levante as pernas esticadas até formar 90 graus com o tronco." },
  { id: 34, nome: "Abdominal bicicleta",    grupo: "Abdômen", series: 3, reps: "20",    descricao: "Leve o cotovelo ao joelho oposto alternando os lados." },
  { id: 35, nome: "Abdominal infra",        grupo: "Abdômen", series: 3, reps: "15",    descricao: "Eleve o quadril do chão trazendo os joelhos ao peito." }
];

const GRUPOS = ["Todos", "Peito", "Costas", "Pernas", "Ombros", "Bíceps", "Tríceps", "Abdômen"];
const DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

// Estado do aplicativo (fica na memória e é salvo no localStorage)
let perfil = { nome: "", idade: "", peso: "", altura: "", objetivo: "" };
let treinosSalvos = [];      // [{ id, nome, exercicios: [{ id, series, reps }] }]
let cronograma = {};         // { 0: idDoTreino, 1: idDoTreino, ... } (0 = segunda)
let historico = [];          // [{ data: "2026-11-16", treino: "Treino A" }]
let metaSemanal = 4;
let treinoEmMontagem = [];   // exercícios do treino que está sendo montado
let grupoSelecionado = "Todos";


/* =====================================================
   2. SALVAR E CARREGAR (localStorage)
   ===================================================== */

// Lê um valor do localStorage; se não existir (ou der erro), usa o valor padrão
function carregar(chave, valorPadrao) {
  try {
    const texto = localStorage.getItem(chave);
    return texto ? JSON.parse(texto) : valorPadrao;
  } catch (erro) {
    return valorPadrao;
  }
}

// Guarda um valor no localStorage (convertido para texto JSON)
function salvar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    console.warn("Não foi possível salvar os dados:", erro);
  }
}

function carregarTudo() {
  perfil        = carregar("fitzone_perfil", perfil);
  treinosSalvos = carregar("fitzone_treinos", []);
  cronograma    = carregar("fitzone_cronograma", {});
  historico     = carregar("fitzone_historico", []);
  metaSemanal   = carregar("fitzone_meta", 4);
}

// ----- Funções auxiliares de data -----

// Devolve a data no formato AAAA-MM-DD usando o horário local
function dataParaTexto(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return ano + "-" + mes + "-" + dia;
}

// Índice do dia na nossa semana (0 = segunda ... 6 = domingo)
function indiceDaSemana(data) {
  return (data.getDay() + 6) % 7;
}

// Devolve a data da segunda-feira da semana de uma data qualquer
function inicioDaSemana(data) {
  const segunda = new Date(data.getFullYear(), data.getMonth(), data.getDate());
  segunda.setDate(segunda.getDate() - indiceDaSemana(segunda));
  return segunda;
}

// Datas (texto) dos 7 dias da semana atual, de segunda a domingo
function datasDaSemanaAtual() {
  const segunda = inicioDaSemana(new Date());
  const lista = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(segunda);
    d.setDate(segunda.getDate() + i);
    lista.push(dataParaTexto(d));
  }
  return lista;
}

// Quantos treinos foram feitos na semana atual
function treinosDaSemana() {
  const datas = datasDaSemanaAtual();
  return historico.filter(item => datas.includes(item.data)).length;
}

// "2026-11-16" -> "16/11/2026"
function formatarData(texto) {
  const partes = texto.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Evita que texto digitado pelo usuário vire código HTML
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function buscarExercicio(id) {
  return EXERCICIOS.find(ex => ex.id === id);
}


/* =====================================================
   3. NAVEGAÇÃO ENTRE PÁGINAS
   ===================================================== */

function irParaPagina(nome) {
  // Esconde todas as páginas e mostra só a escolhida
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page-" + nome).classList.add("active");

  // Marca o botão do menu correspondente
  document.querySelectorAll(".menu-item").forEach(b => {
    b.classList.toggle("active", b.dataset.page === nome);
  });

  // Fecha o menu no celular
  document.getElementById("sidebar").classList.remove("aberto");

  // Atualiza o conteúdo da página que foi aberta
  atualizarPagina(nome);
  window.scrollTo(0, 0);
}

function atualizarPagina(nome) {
  if (nome === "dashboard")  atualizarDashboard();
  if (nome === "biblioteca") mostrarBiblioteca();
  if (nome === "treinos")    { mostrarListaEscolha(); mostrarTreinoAtual(); mostrarTreinosSalvos(); }
  if (nome === "cronograma") mostrarCronograma();
  if (nome === "evolucao")   atualizarEvolucao();
  if (nome === "perfil")     preencherFormularioPerfil();
}

function configurarNavegacao() {
  document.querySelectorAll(".menu-item").forEach(botao => {
    botao.addEventListener("click", () => irParaPagina(botao.dataset.page));
  });

  // Botão ☰ do celular
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("aberto");
  });
}


/* =====================================================
   4. DASHBOARD
   ===================================================== */

function atualizarDashboard() {
  const feitosSemana = treinosDaSemana();
  const percentual = Math.min(100, Math.round((feitosSemana / metaSemanal) * 100));

  document.getElementById("dashNome").textContent = perfil.nome || "Atleta";
  document.getElementById("dashTotalTreinos").textContent = historico.length;
  document.getElementById("dashSemana").textContent = feitosSemana;
  document.getElementById("dashTreinosSalvos").textContent = treinosSalvos.length;

  // IMC
  const imc = calcularIMC(perfil.peso, perfil.altura);
  document.getElementById("dashImc").textContent = imc ? imc.toFixed(1) : "--";
  document.getElementById("dashImcTexto").textContent = imc ? classificarIMC(imc) : "IMC não calculado";

  // Meta semanal
  document.getElementById("dashMetaTexto").textContent = feitosSemana + " de " + metaSemanal + " treinos";
  document.getElementById("dashBarra").style.width = percentual + "%";
  document.getElementById("dashBarraPercent").textContent = percentual + "% da meta";

  // Objetivo
  document.getElementById("dashObjetivo").textContent = perfil.objetivo || "Defina seu objetivo no perfil.";

  // Resumo da semana: um quadradinho por dia
  const datas = datasDaSemanaAtual();
  const hoje = dataParaTexto(new Date());
  const resumo = document.getElementById("dashSemanaResumo");
  resumo.innerHTML = "";
  datas.forEach((data, i) => {
    const fez = historico.some(item => item.data === data);
    const div = document.createElement("div");
    div.className = "dia-bolinha" + (fez ? " feito" : "") + (data === hoje ? " hoje" : "");
    div.textContent = DIAS_SEMANA[i].slice(0, 3) + (fez ? " ✔" : "");
    resumo.appendChild(div);
  });

  // Treino planejado para hoje
  const divHoje = document.getElementById("dashHoje");
  const treinoHoje = buscarTreinoPorId(cronograma[indiceDaSemana(new Date())]);
  if (treinoHoje) {
    divHoje.innerHTML = "<p class='objetivo'>" + escapar(treinoHoje.nome) + "</p>" +
      "<p class='pequeno'>" + treinoHoje.exercicios.length + " exercícios planejados</p>";
  } else {
    divHoje.innerHTML = "<p class='vazio'>Nenhum treino planejado para hoje. Use o cronograma!</p>";
  }
}

function buscarTreinoPorId(id) {
  if (id === undefined || id === null || id === "") return null;
  return treinosSalvos.find(t => String(t.id) === String(id)) || null;
}


/* =====================================================
   5. BIBLIOTECA DE EXERCÍCIOS
   ===================================================== */

function criarFiltros() {
  const caixa = document.getElementById("filtrosGrupos");
  caixa.innerHTML = "";
  GRUPOS.forEach(grupo => {
    const botao = document.createElement("button");
    botao.className = "filtro" + (grupo === grupoSelecionado ? " ativo" : "");
    botao.textContent = grupo;
    botao.addEventListener("click", () => {
      grupoSelecionado = grupo;
      criarFiltros();
      mostrarBiblioteca();
    });
    caixa.appendChild(botao);
  });
}

// Filtra a lista de exercícios pelo texto e pelo grupo
function filtrarExercicios(texto, grupo) {
  const busca = texto.trim().toLowerCase();
  return EXERCICIOS.filter(ex => {
    const grupoOk = grupo === "Todos" || ex.grupo === grupo;
    const textoOk = ex.nome.toLowerCase().includes(busca) || ex.grupo.toLowerCase().includes(busca);
    return grupoOk && textoOk;
  });
}

function mostrarBiblioteca() {
  const texto = document.getElementById("buscaExercicio").value;
  const lista = filtrarExercicios(texto, grupoSelecionado);
  const caixa = document.getElementById("listaExercicios");
  caixa.innerHTML = "";

  if (lista.length === 0) {
    caixa.innerHTML = "<p class='vazio'>Nenhum exercício encontrado.</p>";
    return;
  }

  lista.forEach(ex => {
    const card = document.createElement("div");
    card.className = "card exercicio";
    card.innerHTML =
      "<h3>" + ex.nome + "</h3>" +
      "<span class='tag'>" + ex.grupo + "</span>" +
      "<p>" + ex.descricao + "</p>" +
      "<p class='info'>" + ex.series + " séries × " + ex.reps + " repetições</p>";

    const botao = document.createElement("button");
    botao.className = "btn btn-pequeno";
    botao.textContent = "+ Adicionar ao treino";
    botao.addEventListener("click", () => {
      adicionarAoTreino(ex.id);
      botao.textContent = "✔ Adicionado!";
      setTimeout(() => { botao.textContent = "+ Adicionar ao treino"; }, 1200);
    });
    card.appendChild(botao);
    caixa.appendChild(card);
  });
}


/* =====================================================
   6. MONTAGEM DE TREINOS
   ===================================================== */

// Lista da esquerda: exercícios disponíveis para escolher
function mostrarListaEscolha() {
  const texto = document.getElementById("buscaTreino").value;
  const lista = filtrarExercicios(texto, "Todos");
  const caixa = document.getElementById("listaEscolha");
  caixa.innerHTML = "";

  lista.forEach(ex => {
    const item = document.createElement("div");
    item.className = "item-escolha";
    item.innerHTML = "<div><strong>" + ex.nome + "</strong><small>" + ex.grupo +
      " • " + ex.series + "x" + ex.reps + "</small></div>";

    const botao = document.createElement("button");
    botao.className = "btn btn-pequeno";
    botao.textContent = "+";
    botao.title = "Adicionar ao treino";
    botao.addEventListener("click", () => adicionarAoTreino(ex.id));
    item.appendChild(botao);
    caixa.appendChild(item);
  });
}

// Adiciona um exercício ao treino em montagem (sem repetir)
function adicionarAoTreino(idExercicio) {
  if (treinoEmMontagem.some(item => item.id === idExercicio)) return;
  const ex = buscarExercicio(idExercicio);
  // Séries e repetições começam com o valor sugerido da biblioteca
  treinoEmMontagem.push({ id: ex.id, series: ex.series, reps: String(ex.reps) });
  mostrarTreinoAtual();
}

function removerDoTreino(idExercicio) {
  treinoEmMontagem = treinoEmMontagem.filter(item => item.id !== idExercicio);
  mostrarTreinoAtual();
}

// Lista da direita: treino que o usuário está montando
function mostrarTreinoAtual() {
  const caixa = document.getElementById("treinoAtual");
  caixa.innerHTML = "";

  if (treinoEmMontagem.length === 0) {
    caixa.innerHTML = "<p class='vazio'>Nenhum exercício adicionado ainda.</p>";
    return;
  }

  treinoEmMontagem.forEach(item => {
    const ex = buscarExercicio(item.id);
    const div = document.createElement("div");
    div.className = "item-treino";
    div.innerHTML =
      "<div class='linha'><strong>" + ex.nome + "</strong></div>" +
      "<div class='campos'>" +
        "<div><label>Séries</label><input type='number' min='1' max='10' value='" + item.series + "' data-campo='series'></div>" +
        "<div><label>Repetições</label><input type='text' value='" + item.reps + "' data-campo='reps'></div>" +
      "</div>";

    // Atualiza séries/repetições quando o usuário digita
    div.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", () => {
        item[input.dataset.campo] = input.value;
      });
    });

    const botaoRemover = document.createElement("button");
    botaoRemover.className = "btn btn-pequeno btn-perigo";
    botaoRemover.textContent = "Remover";
    botaoRemover.addEventListener("click", () => removerDoTreino(item.id));
    div.querySelector(".linha").appendChild(botaoRemover);

    caixa.appendChild(div);
  });
}

function salvarTreino() {
  const nome = document.getElementById("nomeTreino").value.trim();

  if (nome === "") {
    alert("Dê um nome ao treino antes de salvar.");
    return;
  }
  if (treinoEmMontagem.length === 0) {
    alert("Adicione pelo menos um exercício ao treino.");
    return;
  }

  treinosSalvos.push({
    id: Date.now(),
    nome: nome,
    // copia os exercícios para que mudanças futuras não afetem o treino salvo
    exercicios: treinoEmMontagem.map(item => ({ id: item.id, series: item.series, reps: item.reps }))
  });
  salvar("fitzone_treinos", treinosSalvos);

  limparTreino();
  mostrarTreinosSalvos();
  alert("Treino salvo com sucesso! ✅");
}

function limparTreino() {
  treinoEmMontagem = [];
  document.getElementById("nomeTreino").value = "";
  mostrarTreinoAtual();
}

function mostrarTreinosSalvos() {
  const caixa = document.getElementById("treinosSalvos");
  caixa.innerHTML = "";

  if (treinosSalvos.length === 0) {
    caixa.innerHTML = "<p class='vazio'>Você ainda não salvou nenhum treino.</p>";
    return;
  }

  treinosSalvos.forEach(treino => {
    const div = document.createElement("div");
    div.className = "treino-salvo";

    let itens = "";
    treino.exercicios.forEach(item => {
      const ex = buscarExercicio(item.id);
      if (ex) itens += "<li>" + ex.nome + " — " + item.series + " × " + escapar(String(item.reps)) + "</li>";
    });
    div.innerHTML = "<strong>" + escapar(treino.nome) + "</strong><ul>" + itens + "</ul>";

    const botaoEditar = document.createElement("button");
    botaoEditar.className = "btn btn-pequeno btn-cinza";
    botaoEditar.textContent = "Editar";
    botaoEditar.style.marginRight = "8px";
    botaoEditar.addEventListener("click", () => editarTreino(treino.id));

    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "btn btn-pequeno btn-perigo";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", () => excluirTreino(treino.id));

    div.appendChild(botaoEditar);
    div.appendChild(botaoExcluir);
    caixa.appendChild(div);
  });
}

// Carrega um treino salvo de volta para a área de montagem (e remove o antigo)
function editarTreino(id) {
  const treino = buscarTreinoPorId(id);
  if (!treino) return;
  treinoEmMontagem = treino.exercicios.map(item => ({ id: item.id, series: item.series, reps: String(item.reps) }));
  document.getElementById("nomeTreino").value = treino.nome;
  removerTreinoDaLista(id);
  mostrarTreinoAtual();
  window.scrollTo(0, 0);
}

function excluirTreino(id) {
  if (!confirm("Excluir este treino?")) return;
  removerTreinoDaLista(id);
}

// Remove o treino da lista e também do cronograma
function removerTreinoDaLista(id) {
  treinosSalvos = treinosSalvos.filter(t => String(t.id) !== String(id));
  Object.keys(cronograma).forEach(dia => {
    if (String(cronograma[dia]) === String(id)) delete cronograma[dia];
  });
  salvar("fitzone_treinos", treinosSalvos);
  salvar("fitzone_cronograma", cronograma);
  mostrarTreinosSalvos();
}


/* =====================================================
   7. CRONOGRAMA SEMANAL
   ===================================================== */

function mostrarCronograma() {
  const grade = document.getElementById("gridCronograma");
  grade.innerHTML = "";
  const hoje = indiceDaSemana(new Date());

  DIAS_SEMANA.forEach((nomeDia, i) => {
    const card = document.createElement("div");
    card.className = "card dia-card" + (i === hoje ? " hoje" : "");

    const titulo = document.createElement("h3");
    titulo.textContent = nomeDia + (i === hoje ? " (hoje)" : "");

    // Caixa de seleção com os treinos salvos
    const select = document.createElement("select");
    select.className = "campo";
    select.innerHTML = "<option value=''>— Descanso —</option>";
    treinosSalvos.forEach(t => {
      const opcao = document.createElement("option");
      opcao.value = t.id;
      opcao.textContent = t.nome;
      if (String(cronograma[i]) === String(t.id)) opcao.selected = true;
      select.appendChild(opcao);
    });

    const resumo = document.createElement("p");
    resumo.className = "resumo";
    resumo.textContent = textoResumoDia(cronograma[i]);

    // Salva a escolha assim que o usuário muda a caixa de seleção
    select.addEventListener("change", () => {
      if (select.value === "") delete cronograma[i];
      else cronograma[i] = select.value;
      salvar("fitzone_cronograma", cronograma);
      resumo.textContent = textoResumoDia(cronograma[i]);
    });

    card.appendChild(titulo);
    card.appendChild(select);
    card.appendChild(resumo);
    grade.appendChild(card);
  });

  if (treinosSalvos.length === 0) {
    const aviso = document.createElement("p");
    aviso.className = "vazio";
    aviso.textContent = "Dica: salve um treino na página 'Montar Treino' para poder escolher aqui.";
    grade.appendChild(aviso);
  }
}

function textoResumoDia(idTreino) {
  const treino = buscarTreinoPorId(idTreino);
  return treino ? treino.exercicios.length + " exercícios" : "Dia livre";
}


/* =====================================================
   8. CRONÔMETRO
   ===================================================== */

let segundos = 0;            // tempo mostrado na tela
let intervalo = null;        // guarda o setInterval (null = parado)
let modoRegressivo = false;  // false = conta pra cima, true = contagem regressiva

function formatarTempo(total) {
  const min = String(Math.floor(total / 60)).padStart(2, "0");
  const seg = String(total % 60).padStart(2, "0");
  return min + ":" + seg;
}

function mostrarTempo() {
  const tela = document.getElementById("tempoCronometro");
  tela.textContent = formatarTempo(segundos);
}

function iniciarCronometro() {
  if (intervalo !== null) return;                    // já está rodando
  if (modoRegressivo && segundos === 0) return;      // nada para contar
  document.getElementById("tempoCronometro").classList.remove("acabou");
  document.getElementById("msgCronometro").textContent = "";

  intervalo = setInterval(() => {
    if (modoRegressivo) {
      segundos--;
      if (segundos <= 0) {
        segundos = 0;
        pausarCronometro();
        fimDoDescanso();
      }
    } else {
      segundos++;
    }
    mostrarTempo();
  }, 1000);
}

function pausarCronometro() {
  clearInterval(intervalo);
  intervalo = null;
}

function zerarCronometro() {
  pausarCronometro();
  segundos = 0;
  modoRegressivo = false;
  document.getElementById("tempoCronometro").classList.remove("acabou");
  document.getElementById("msgCronometro").textContent = "";
  mostrarTempo();
}

// Atalho de descanso: define o tempo e começa a contar para trás
function iniciarDescanso(tempo) {
  pausarCronometro();
  modoRegressivo = true;
  segundos = tempo;
  mostrarTempo();
  iniciarCronometro();
}

function fimDoDescanso() {
  document.getElementById("tempoCronometro").classList.add("acabou");
  document.getElementById("msgCronometro").textContent = "⏰ Descanso finalizado! Hora da próxima série.";
  tocarBip();
}

// Toca um som curto quando o descanso termina (se o navegador permitir)
function tocarBip() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    osc.frequency.value = 880;
    osc.connect(ctx.destination);
    osc.start();
    setTimeout(() => { osc.stop(); ctx.close(); }, 400);
  } catch (erro) {
    // sem som, tudo bem
  }
}

function configurarCronometro() {
  document.getElementById("btnIniciar").addEventListener("click", iniciarCronometro);
  document.getElementById("btnPausar").addEventListener("click", pausarCronometro);
  document.getElementById("btnZerar").addEventListener("click", zerarCronometro);

  document.querySelectorAll("[data-descanso]").forEach(botao => {
    botao.addEventListener("click", () => iniciarDescanso(Number(botao.dataset.descanso)));
  });
  mostrarTempo();
}


/* =====================================================
   9. EVOLUÇÃO
   ===================================================== */

function atualizarEvolucao() {
  document.getElementById("evoTotal").textContent = historico.length;
  document.getElementById("evoMeta").textContent = metaSemanal;
  document.getElementById("evoSemana").textContent = treinosDaSemana();
  document.getElementById("inputMeta").value = metaSemanal;

  // Lista de treinos para registrar
  const select = document.getElementById("selTreinoFeito");
  select.innerHTML = "<option value='Treino livre'>Treino livre</option>";
  treinosSalvos.forEach(t => {
    const opcao = document.createElement("option");
    opcao.value = t.nome;
    opcao.textContent = t.nome;
    select.appendChild(opcao);
  });

  mostrarGrafico();
  mostrarHistorico();
}

// Registra que o usuário treinou hoje
function registrarTreino() {
  const nome = document.getElementById("selTreinoFeito").value;
  historico.push({ data: dataParaTexto(new Date()), treino: nome });
  salvar("fitzone_historico", historico);
  document.getElementById("msgRegistro").textContent = "Treino registrado! Continue assim 💪";
  atualizarEvolucao();
}

function salvarMeta() {
  const valor = parseInt(document.getElementById("inputMeta").value, 10);
  if (isNaN(valor) || valor < 1 || valor > 7) {
    alert("A meta deve ser um número entre 1 e 7.");
    return;
  }
  metaSemanal = valor;
  salvar("fitzone_meta", metaSemanal);
  atualizarEvolucao();
}

// Gráfico de barras simples: treinos por dia nos últimos 7 dias
function mostrarGrafico() {
  const caixa = document.getElementById("graficoSemana");
  caixa.innerHTML = "";

  // monta a lista dos últimos 7 dias (do mais antigo ao de hoje)
  const dias = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const texto = dataParaTexto(d);
    dias.push({
      rotulo: DIAS_SEMANA[indiceDaSemana(d)].slice(0, 3),
      quantidade: historico.filter(item => item.data === texto).length
    });
  }

  const maior = Math.max(1, ...dias.map(d => d.quantidade));
  dias.forEach(dia => {
    const coluna = document.createElement("div");
    coluna.className = "coluna";
    // altura proporcional ao maior valor (máx. 130px)
    const altura = dia.quantidade === 0 ? 4 : Math.round((dia.quantidade / maior) * 130);
    coluna.innerHTML =
      "<span class='valor'>" + dia.quantidade + "</span>" +
      "<div class='barra-v' style='height:" + altura + "px'></div>" +
      "<span class='rotulo'>" + dia.rotulo + "</span>";
    caixa.appendChild(coluna);
  });
}

function mostrarHistorico() {
  const caixa = document.getElementById("historico");
  caixa.innerHTML = "";

  if (historico.length === 0) {
    caixa.innerHTML = "<p class='vazio'>Nenhum treino registrado ainda.</p>";
    return;
  }

  // mostra os mais recentes primeiro (últimos 15)
  historico.slice().reverse().slice(0, 15).forEach(item => {
    const div = document.createElement("div");
    div.className = "historico-item";
    div.innerHTML = "<span>🏋️ " + escapar(item.treino) + "</span><span>" + formatarData(item.data) + "</span>";
    caixa.appendChild(div);
  });
}

function limparHistorico() {
  if (!confirm("Apagar todo o histórico de treinos?")) return;
  historico = [];
  salvar("fitzone_historico", historico);
  atualizarEvolucao();
}


/* =====================================================
   10. PERFIL E IMC
   ===================================================== */

// IMC = peso / (altura em metros)²   — altura vem em centímetros
function calcularIMC(peso, alturaCm) {
  const p = parseFloat(peso);
  const a = parseFloat(alturaCm) / 100;
  if (!p || !a || p <= 0 || a <= 0) return null;
  return p / (a * a);
}

// Classificação padrão da Organização Mundial da Saúde
function classificarIMC(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25)   return "Peso normal";
  if (imc < 30)   return "Sobrepeso";
  if (imc < 35)   return "Obesidade grau I";
  if (imc < 40)   return "Obesidade grau II";
  return "Obesidade grau III";
}

// Mostra o IMC na tela (chamado a cada vez que o usuário digita peso ou altura)
function mostrarIMC() {
  const imc = calcularIMC(
    document.getElementById("perfilPeso").value,
    document.getElementById("perfilAltura").value
  );
  document.getElementById("imcValor").textContent = imc ? imc.toFixed(1) : "--";
  document.getElementById("imcClasse").textContent = imc ? classificarIMC(imc) : "Preencha peso e altura";
}

function preencherFormularioPerfil() {
  document.getElementById("perfilNome").value = perfil.nome || "";
  document.getElementById("perfilIdade").value = perfil.idade || "";
  document.getElementById("perfilPeso").value = perfil.peso || "";
  document.getElementById("perfilAltura").value = perfil.altura || "";
  document.getElementById("perfilObjetivo").value = perfil.objetivo || "";
  mostrarIMC();
}

function salvarPerfil(evento) {
  evento.preventDefault();   // impede a página de recarregar
  perfil = {
    nome: document.getElementById("perfilNome").value.trim(),
    idade: document.getElementById("perfilIdade").value,
    peso: document.getElementById("perfilPeso").value,
    altura: document.getElementById("perfilAltura").value,
    objetivo: document.getElementById("perfilObjetivo").value.trim()
  };
  salvar("fitzone_perfil", perfil);
  document.getElementById("msgPerfil").textContent = "Perfil salvo com sucesso! ✅";
  mostrarIMC();
}

function configurarPerfil() {
  document.getElementById("formPerfil").addEventListener("submit", salvarPerfil);
  document.getElementById("perfilPeso").addEventListener("input", mostrarIMC);
  document.getElementById("perfilAltura").addEventListener("input", mostrarIMC);
}


/* =====================================================
   11. INICIALIZAÇÃO
   ===================================================== */

function iniciar() {
  carregarTudo();

  configurarNavegacao();
  configurarCronometro();
  configurarPerfil();

  // Pesquisa de exercícios: atualiza a lista a cada letra digitada
  document.getElementById("buscaExercicio").addEventListener("input", mostrarBiblioteca);
  document.getElementById("buscaTreino").addEventListener("input", mostrarListaEscolha);

  // Botões da montagem de treino
  document.getElementById("btnSalvarTreino").addEventListener("click", salvarTreino);
  document.getElementById("btnLimparTreino").addEventListener("click", limparTreino);

  // Botões da evolução
  document.getElementById("btnRegistrar").addEventListener("click", registrarTreino);
  document.getElementById("btnSalvarMeta").addEventListener("click", salvarMeta);
  document.getElementById("btnLimparHistorico").addEventListener("click", limparHistorico);

  criarFiltros();
  irParaPagina("dashboard");
}

// Começa quando a página terminar de carregar
document.addEventListener("DOMContentLoaded", iniciar);
