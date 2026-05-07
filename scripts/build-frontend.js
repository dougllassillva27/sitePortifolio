import fs from "node:fs";
import path from "node:path";

const origem = path.resolve("frontend");
const destino = path.resolve("dist");

function copiarDiretorio(origemAtual, destinoAtual) {
  fs.mkdirSync(destinoAtual, { recursive: true });

  for (const item of fs.readdirSync(origemAtual)) {
    const caminhoOrigem = path.join(origemAtual, item);
    const caminhoDestino = path.join(destinoAtual, item);
    const estado = fs.statSync(caminhoOrigem);

    if (estado.isDirectory()) {
      copiarDiretorio(caminhoOrigem, caminhoDestino);
    } else {
      fs.copyFileSync(caminhoOrigem, caminhoDestino);
    }
  }
}

if (fs.existsSync(destino)) {
  fs.rmSync(destino, { recursive: true, force: true });
}

copiarDiretorio(origem, destino);

console.log("Frontend copiado para dist/.");
