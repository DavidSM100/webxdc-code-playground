<script lang="ts">
  import { onDestroy } from "svelte";
  import { exists, readFile, writeFile } from "@zenfs/core/promises";

  let url: string | null = $state(null);

  async function setSavedIcon() {
    let path: string | undefined;
    if (await exists("/icon.png")) {
      path = "/icon.png";
    } else if (await exists("/icon.jpg")) {
      path = "/icon.jpg";
    }
    if (path) {
      const content = await readFile(path);
      url = URL.createObjectURL(new Blob([new Uint8Array(content)]));
    }
  }

  async function importIcon() {
    const file = (
      await window.webxdc.importFiles({ extensions: [".png", ".jpg"] })
    )[0];
    if (!file) return;
    let ext;
    if (file.name.endsWith(".png")) {
      ext = ".png";
    } else if (file.name.endsWith("jpg")) {
      ext = ".jpg";
    }
    if (!ext) return;
    await writeFile("/icon" + ext, new Uint8Array(await file.arrayBuffer()));
    if (url) {
      URL.revokeObjectURL(url);
    }
    url = URL.createObjectURL(file);
  }

  onDestroy(() => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  });
</script>

{#await setSavedIcon() then}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div tabindex="0" role="button" class="container" onclick={importIcon}>
    {#if url}
      <img src={url} alt="webxdc icon" />
    {:else}
      Click to import icon
    {/if}
  </div>
{/await}

<style>
  img {
    max-width: 100%;
    max-height: 100%;
  }

  .container {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
</style>
