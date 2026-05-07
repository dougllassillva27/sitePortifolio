import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const diretorioBase = path.resolve("dist");
const extensoesAlvo = [".html", ".css", ".js", ".json", ".svg"];

function gerarHash(caminhoArquivo) {
  const conteudo = fs.readFileSync(caminhoArquivo);
  return crypto.createHash("md5").update(conteudo).digest("hex").slice(0, 8);
}

function processarUrl(url, caminhoArquivoAtual) {
  if (
    !url ||
    url.startsWith("http") ||
    url.startsWith("data:") ||
    url.startsWith("#") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  ) {
    return url;
  }

  const urlPura = url.split("?")[0].split("#")[0];
  const caminhoFisico = urlPura.startsWith("/")
    ? path.join(diretorioBase, urlPura)
    : path.join(path.dirname(caminhoArquivoAtual), urlPura);

  if (!fs.existsSync(caminhoFisico) || !fs.statSync(caminhoFisico).isFile()) {
    return url;
  }

  const hash = gerarHash(caminhoFisico);
  const regexVersao = /([?&])v=[^&#]*/;

  if (regexVersao.test(url)) {
    return url.replace(regexVersao, `$1v=${hash}`);
  }

  const separador = url.includes("?") ? "&" : "?";

  if (url.includes("#")) {
    return url.replace("#", `${separador}v=${hash}#`);
  }

  return `${url}${separador}v=${hash}`;
}

function processarConteudo(conteudo, caminhoArquivo) {
  let novoConteudo = conteudo.replace(/((?:href|src)\s*=\s*)(["'])(.*?)\2/gi, (_, prefixo, aspas, url) => {
    return `${prefixo}${aspas}${processarUrl(url, caminhoArquivo)}${aspas}`;
  });

  novoConteudo = novoConteudo.replace(/url\((["']?)(.*?)\1\)/gi, (_, aspas, url) => {
    return `url(${aspas}${processarUrl(url, caminhoArquivo)}${aspas})`;
  });

  return novoConteudo;
}

function varrer(diretorio) {
  if (!fs.existsSync(diretorio)) {
    console.error(`Diretório não encontrado: ${diretorio}`);
    process.exit(1);
  }

  for (const item of fs.readdirSync(diretorio)) {
    const caminhoCompleto = path.join(diretorio, item);
    const estado = fs.statSync(caminhoCompleto);

    if (estado.isDirectory()) {
      varrer(caminhoCompleto);
      continue;
    }

    if (!extensoesAlvo.includes(path.extname(caminhoCompleto).toLowerCase())) {
      continue;
    }

    const original = fs.readFileSync(caminhoCompleto, "utf-8");
    const processado = processarConteudo(original, caminhoCompleto);

    if (original !== processado) {
      fs.writeFileSync(caminhoCompleto, processado, "utf-8");
      console.log(`[ATUALIZADO] ${path.relative(diretorioBase, caminhoCompleto)}`);
    }
  }
}

console.log("Iniciando versionamento de assets...");
varrer(diretorioBase);
console.log("Versionamento concluído.");
