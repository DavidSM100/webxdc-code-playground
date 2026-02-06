import { format } from "prettier";
import estree from "prettier/plugins/estree";
import html from "prettier/plugins/html";
import postcss from "prettier/plugins/postcss";
import babel from "prettier/plugins/babel";

export async function formatFile(source: string, path: string) {
  return await format(source, {
    filepath: path,
    plugins: [html, postcss, babel, estree],
  });
}
