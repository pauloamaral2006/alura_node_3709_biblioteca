const fs = require("fs");
const trataErros = require("./erros/funcoesErro.js");

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
function quebraEmParagrafos(texto) {
  const paragrafos = texto.toLowerCase().split("\n");
  const contagem = paragrafos.reduce((acum, paragrafo) => {
    if (paragrafo) {
      return [...acum, verificaPalavrasDuplicadas(paragrafo)];
    }
    return acum;
  }, []);
  console.log(contagem);
}

function limpaPalavras(palavra) {
  return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}
function verificaPalavrasDuplicadas(texto) {
  const listaPalavras = texto.split(" ");
  const resultado = {};
  // objeto[propriedade] = valor;
  listaPalavras.forEach((palavra) => {
    if (palavra.length >= 3) {
      const palavraLimpa = limpaPalavras(palavra);
      resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
    }
  });
  return resultado;
}

fs.readFile(link, "utf-8", (erro, texto) => {
  try {
    if (erro) throw erro;
    contaPalavras(texto);
  } catch (erro) {
    trataErros(erro);
  }
});

function contaPalavras(texto) {
  const paragrafos = extraiParagrafos(texto);
  const contagem = paragrafos.flatMap((paragrafo) => {
    if (!paragrafo) return [];
    return verificaPalavrasDuplicadas(paragrafo);
  });
  console.log(contagem);
}

function extraiParagrafos(texto) {
  return texto.toLowerCase().split("\n");
}
