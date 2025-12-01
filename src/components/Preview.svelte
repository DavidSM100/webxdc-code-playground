<script lang="ts">
  import eruda from "eruda?raw";
  import { readFile } from "@zenfs/core/promises";

  async function getHtml() {
    const entry = await readFile("/index.html", { encoding: "utf-8" });
    const dom = new DOMParser().parseFromString(entry, "text/html");
    if (!dom.head) {
      dom.documentElement.append(dom.createElement("head"));
    }
    const erudaScript = dom.createElement("script");
    erudaScript.textContent = eruda;
    const startErudaScript = dom.createElement("script");
    startErudaScript.textContent = "eruda.init();";
    dom.head.prepend(startErudaScript);
    dom.head.prepend(erudaScript);

    const links = Object.values(dom.getElementsByTagName("link"));
    for (const link of links) {
      if (!link.href) continue;
      const path = new URL(link.href).pathname;
      if (path === "/index.css") {
        const style = dom.createElement("style");
        const content = await readFile("/index.css", { encoding: "utf-8" });
        style.textContent = content;
        link.replaceWith(style);
      }
    }

    const scripts = Object.values(dom.getElementsByTagName("script"));
    for (const script of scripts) {
      if (!script.src) continue;
      const path = new URL(script.src).pathname;
      if (path === "/webxdc.js") {
        script.removeAttribute("src");
        script.textContent = "window.webxdc = window.parent.webxdc;";
      }
      if (path === "/index.js") {
        script.removeAttribute("src");
        const content = await readFile("/index.js", { encoding: "utf-8" });
        script.textContent = content;
      }
    }

    return `<!DOCTYPE html>\n` + dom.documentElement.outerHTML;
  }
</script>

{#await getHtml() then html}
  <iframe
    title="Preview"
    srcdoc={html}
    frameborder="0"
    width="100%"
    height="100%"
  ></iframe>
{/await}
