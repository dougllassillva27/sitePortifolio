import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const raiz = path.resolve("dist");
const porta = Number(process.env.PORT || 4173);

const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
};

const servidor = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${porta}`);
  let caminho = path.join(raiz, url.pathname);

  if (url.pathname === "/" || !path.extname(caminho)) {
    caminho = path.join(raiz, "index.html");
  }

  if (!caminho.startsWith(raiz) || !fs.existsSync(caminho)) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Arquivo não encontrado.");
    return;
  }

  const extensao = path.extname(caminho);
  res.writeHead(200, { "content-type": tipos[extensao] || "application/octet-stream" });
  res.end(fs.readFileSync(caminho));
});

servidor.listen(porta, () => {
  console.log(`Frontend local em http://localhost:${porta}`);
});
