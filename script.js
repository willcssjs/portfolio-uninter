// =============================================
// script.js — Willian Fernandes
// validação do formulário, tema, menu mobile
// =============================================


// --- tema claro / escuro ---

const btnTema = document.getElementById("temaBtn");

// verifica se o usuário já escolheu um tema antes
const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "escuro") {
    document.body.classList.add("dark");
    btnTema.textContent = "☀️";
}

btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const escuro = document.body.classList.contains("dark");
    btnTema.textContent = escuro ? "☀️" : "🌙";

    // salva a preferência pra manter quando recarregar
    localStorage.setItem("tema", escuro ? "escuro" : "claro");
});


// --- menu hamburguer (mobile) ---

const menuBtn  = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("aberto");
    navLinks.classList.toggle("aberto");
});

// fecha o menu quando clicar em qualquer link
navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        menuBtn.classList.remove("aberto");
        navLinks.classList.remove("aberto");
    });
});


// --- destaca o link ativo no menu conforme a seção visível ---

const secoes = document.querySelectorAll("section[id]");
const links  = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(l => l.classList.remove("ativo"));

            const linkAtivo = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (linkAtivo) linkAtivo.classList.add("ativo");
        }
    });
}, {
    rootMargin: "-40% 0px -55% 0px"
});

secoes.forEach(sec => observer.observe(sec));


// --- validação do formulário de contato ---

const formulario    = document.getElementById("formContato");
const campoNome     = document.getElementById("nome");
const campoEmail    = document.getElementById("email");
const campoMensagem = document.getElementById("mensagem");

const erroNome     = document.getElementById("erroNome");
const erroEmail    = document.getElementById("erroEmail");
const erroMensagem = document.getElementById("erroMensagem");

// regex simples pra checar se o email tem o formato certo
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// mostra erro embaixo do campo
function mostrarErro(campo, span, msg) {
    campo.classList.add("invalido");
    span.textContent = msg;
}

// limpa o erro quando o campo tá ok
function limparErro(campo, span) {
    campo.classList.remove("invalido");
    span.textContent = "";
}

// valida ao sair de cada campo
campoNome.addEventListener("blur", () => {
    if (campoNome.value.trim() === "") {
        mostrarErro(campoNome, erroNome, "Por favor, informe seu nome.");
    } else {
        limparErro(campoNome, erroNome);
    }
});

campoEmail.addEventListener("blur", () => {
    if (campoEmail.value.trim() === "") {
        mostrarErro(campoEmail, erroEmail, "Por favor, informe seu e-mail.");
    } else if (!regexEmail.test(campoEmail.value.trim())) {
        mostrarErro(campoEmail, erroEmail, "Digite um e-mail válido (ex: nome@dominio.com).");
    } else {
        limparErro(campoEmail, erroEmail);
    }
});

campoMensagem.addEventListener("blur", () => {
    if (campoMensagem.value.trim() === "") {
        mostrarErro(campoMensagem, erroMensagem, "Por favor, escreva sua mensagem.");
    } else {
        limparErro(campoMensagem, erroMensagem);
    }
});

// valida tudo de novo quando clica em enviar
formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    let valido = true;

    if (campoNome.value.trim() === "") {
        mostrarErro(campoNome, erroNome, "Por favor, informe seu nome.");
        valido = false;
    } else {
        limparErro(campoNome, erroNome);
    }

    if (campoEmail.value.trim() === "") {
        mostrarErro(campoEmail, erroEmail, "Por favor, informe seu e-mail.");
        valido = false;
    } else if (!regexEmail.test(campoEmail.value.trim())) {
        mostrarErro(campoEmail, erroEmail, "Digite um e-mail válido (ex: nome@dominio.com).");
        valido = false;
    } else {
        limparErro(campoEmail, erroEmail);
    }

    if (campoMensagem.value.trim() === "") {
        mostrarErro(campoMensagem, erroMensagem, "Por favor, escreva sua mensagem.");
        valido = false;
    } else {
        limparErro(campoMensagem, erroMensagem);
    }

    // se tudo ok, abre o modal de confirmação e limpa o form
    if (valido) {
        abrirModal();
        formulario.reset();
    }
});


// --- modal de confirmação ---

const modal      = document.getElementById("modal");
const btnFechar  = document.getElementById("modalFechar");

function abrirModal() {
    modal.classList.add("visivel");
    btnFechar.focus();
}

function fecharModal() {
    modal.classList.remove("visivel");
}

// fecha pelo botão
btnFechar.addEventListener("click", fecharModal);

// fecha clicando fora da caixa
modal.addEventListener("click", function(e) {
    if (e.target === modal) fecharModal();
});

// fecha com Escape também
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.classList.contains("visivel")) {
        fecharModal();
    }
});


// =====================================
// Efeito de digitação
// =====================================

const nomeElemento = document.getElementById("nomeDigitado");

if (nomeElemento) {

    const texto = "Willian Fernandes";

    let i = 0;

    function digitar() {

        if (i < texto.length) {

            nomeElemento.textContent += texto.charAt(i);

            i++;

            setTimeout(digitar, 100);

        } else {

            nomeElemento.classList.add(
                "digitacao-finalizada"
            );
        }
    }

    digitar();
}