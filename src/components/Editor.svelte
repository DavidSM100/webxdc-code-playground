<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { basicSetup, EditorView } from "codemirror";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { html } from "@codemirror/lang-html";
  import { css } from "@codemirror/lang-css";
  import { javascript } from "@codemirror/lang-javascript";
  import localforage from "localforage";

  let {
    name,
    hidden,
    value = $bindable(),
  }: { name: string; hidden: boolean; value: string } = $props();

  // svelte-ignore non_reactive_update
  let lang: Function | undefined;
  if (name.endsWith(".html")) {
    lang = html;
  } else if (name.endsWith(".css")) {
    lang = css;
  } else if (name.endsWith(".js")) {
    lang = javascript;
  }

  function onValueChange(value: string) {
    localforage.setItem(name, value);
  }

  function onReady(view: EditorView) {
    view.contentDOM.setAttribute("spellcheck", "false");
    view.contentDOM.setAttribute("autocorrect", "off");
    view.contentDOM.setAttribute("autocapitalize", "off");
    view.contentDOM.setAttribute("autocomplete", "off");
  }
</script>

<div style="height: 100%;" {hidden}>
  <CodeMirror
    styles={{
      "&": { height: "100%" },
      ".cm-scroller": { "overflow-y": "auto" },
    }}
    extensions={[basicSetup]}
    lineWrapping={true}
    theme={oneDark}
    lang={lang && lang()}
    bind:value
    onchange={onValueChange}
    onready={onReady}
  />
</div>
