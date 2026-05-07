import test from "node:test";
import assert from "node:assert/strict";
import { formatarDinheiro } from "./formatadores.js";

test("formata dinheiro em reais", () => {
  assert.ok(formatarDinheiro(4500).includes("45,00"));
});
