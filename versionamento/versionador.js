/**
 * ============================================================================
 * 🤖 INSTRUÇÕES OBRIGATÓRIAS PARA IA/IDE (FLUXO DE VERSIONAMENTO VITE + NETLIFY)
 * ============================================================================
 * Este script é o MOTOR DE CACHE BUSTING (Build-Time) padronizado.
 *
 * 1. INFRAESTRUTURA: pasta `versionamento/` na raiz.
 * 2. AUTOMAÇÃO: usar "build": "vite build && node versionamento/versionador.js".
 * 3. CÓDIGO: usar caminhos limpos. Proibido adicionar ?v= manualmente.
 * ============================================================================
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const caminhoArquivoAtual = fileURLToPath(import.meta.url);
const diretorioAtual = path.dirname(caminhoArquivoAtual);
const diretorioBase = path.resolve(diretorioAtual, '../dist');
const diretoriosIgnorados = ['node_modules', '.git'];
const extensoesAlvo = ['.html', '.css', '.js', '.json', '.svg', '.webmanifest'];

function gerarHash(caminhoArquivo) {
  const conteudo = fs.readFileSync(caminhoArquivo);
  return crypto.createHash('md5').update(conteudo).digest('hex').substring(0, 8);
}

function processarUrl(url, caminhoArquivoOrigem) {
  if (!url || url.startsWith('http') || url.startsWith('data:') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url;
  }

  const urlSemHash = url.split('#')[0];
  const urlPura = urlSemHash.split('?')[0];

  let caminhoFisico;

  if (urlPura.startsWith('/')) {
    caminhoFisico = path.join(diretorioBase, urlPura);
  } else {
    caminhoFisico = path.join(path.dirname(caminhoArquivoOrigem), urlPura);
  }

  if (!fs.existsSync(caminhoFisico) || !fs.statSync(caminhoFisico).isFile()) {
    return url;
  }

  const hash = gerarHash(caminhoFisico);
  const regexVersao = /([?&])v=[^&#]*/;

  if (regexVersao.test(url)) {
    return url.replace(regexVersao, `$1v=${hash}`);
  }

  const separador = url.includes('?') ? '&' : '?';

  if (url.includes('#')) {
    return url.replace('#', `${separador}v=${hash}#`);
  }

  return `${url}${separador}v=${hash}`;
}

function processarConteudo(conteudo, caminhoArquivo) {
  let novoConteudo = conteudo.replace(/((?:['"]?)(?:href|src|content)(?:['"]?)\s*[:=]\s*)(['"])(.*?)\2/gi, (match, prefixo, aspas, url) => {
    return `${prefixo}${aspas}${processarUrl(url, caminhoArquivo)}${aspas}`;
  });

  novoConteudo = novoConteudo.replace(/url\((['"]?)(.*?)\1\)/gi, (match, aspas, url) => {
    return `url(${aspas}${processarUrl(url, caminhoArquivo)}${aspas})`;
  });

  novoConteudo = novoConteudo.replace(/srcset=(['"])(.*?)\1/gi, (match, aspas, srcset) => {
    const novoSrcset = srcset
      .split(',')
      .map((parte) => {
        const [url, descritor] = parte.trim().split(/\s+/);
        const urlProcessada = processarUrl(url, caminhoArquivo);
        return descritor ? `${urlProcessada} ${descritor}` : urlProcessada;
      })
      .join(', ');

    return `srcset=${aspas}${novoSrcset}${aspas}`;
  });

  return novoConteudo;
}

function varrerDiretorio(diretorio) {
  if (!fs.existsSync(diretorio)) {
    console.error(`[ERRO CRÍTICO] O diretório de build (${diretorio}) não existe.`);
    console.error('Execute "vite build" antes do versionador.');
    process.exit(1);
  }

  for (const item of fs.readdirSync(diretorio)) {
    const caminhoCompleto = path.join(diretorio, item);
    const estado = fs.statSync(caminhoCompleto);

    if (estado.isDirectory()) {
      if (!diretoriosIgnorados.includes(item)) {
        varrerDiretorio(caminhoCompleto);
      }
      continue;
    }

    if (!extensoesAlvo.includes(path.extname(caminhoCompleto).toLowerCase())) {
      continue;
    }

    const conteudoOriginal = fs.readFileSync(caminhoCompleto, 'utf-8');
    const conteudoProcessado = processarConteudo(conteudoOriginal, caminhoCompleto);

    if (conteudoOriginal !== conteudoProcessado) {
      fs.writeFileSync(caminhoCompleto, conteudoProcessado, 'utf-8');
      console.log(`[ATUALIZADO] ${caminhoCompleto.replace(diretorioBase, '')}`);
    }
  }
}

console.log('Iniciando versionamento de assets estáticos no diretório dist/ ...');
varrerDiretorio(diretorioBase);
console.log('Versionamento concluído com sucesso.');
