<script lang="ts">
  import { ChevronDown } from "lucide-svelte";

  interface Item {
    label: string;
    href: string;
  }

  let {
    label,
    href,
    items,
    active = false,
    menuLabel = "Submenu",
  }: {
    label: string;
    href: string;
    items: Item[];
    active?: boolean;
    menuLabel?: string;
  } = $props();

  let open = $state(false);
  let root = $state<HTMLElement | null>(null);

  function onDocumentClick(event: MouseEvent) {
    if (!open) return;
    if (root && !root.contains(event.target as Node)) open = false;
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && open) {
      open = false;
      (root?.querySelector(".toggle") as HTMLElement | null)?.focus();
    }
  }

  function onFocusOut(event: FocusEvent) {
    if (!root) return;
    const next = event.relatedTarget as Node | null;
    if (next && !root.contains(next)) open = false;
  }
</script>

<svelte:document onclick={onDocumentClick} />
<svelte:window onkeydown={onKeydown} />

<li class="has-menu" bind:this={root} onfocusout={onFocusOut}>
  <a class="label" class:active {href} aria-current={active ? "page" : undefined}>{label}</a>
  <button
    class="toggle"
    type="button"
    aria-expanded={open}
    aria-haspopup="true"
    aria-label={menuLabel}
    onclick={() => (open = !open)}
  >
    <ChevronDown size={15} strokeWidth={1.8} aria-hidden="true" />
  </button>

  {#if open}
    <ul class="menu">
      {#each items as item (item.href)}
        <li><a href={item.href} onclick={() => (open = false)}>{item.label}</a></li>
      {/each}
    </ul>
  {/if}
</li>

<style>
  .has-menu {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.15rem;
  }
  .label {
    position: relative;
    text-decoration: none;
    font-size: var(--step-0);
    color: var(--ink-2);
    padding-block: 0.35rem;
  }
  .label::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--dur-2) var(--ease-out);
  }
  .label:hover,
  .label.active {
    color: var(--ink);
  }
  .label:hover::after,
  .label.active::after {
    transform: scaleX(1);
  }
  .toggle {
    display: grid;
    place-items: center;
    width: 1.4rem;
    height: 1.4rem;
    padding: 0;
    border: 0;
    background: none;
    color: var(--ink-3);
    border-radius: var(--r-1);
  }
  .toggle:hover {
    color: var(--ink);
  }
  .menu {
    position: absolute;
    top: calc(100% + 0.55rem);
    left: -0.75rem;
    min-width: 15rem;
    list-style: none;
    margin: 0;
    padding: var(--s-2);
    background: var(--paper-raised);
    border: 1px solid var(--rule);
    border-radius: var(--r-3);
    box-shadow: var(--shadow-lift);
    z-index: 80;
  }
  .menu a {
    display: block;
    padding: 0.5rem 0.7rem;
    border-radius: var(--r-2);
    text-decoration: none;
    color: var(--ink-2);
    font-size: var(--step-0);
  }
  .menu a:hover {
    background: var(--ink-wash);
    color: var(--ink);
  }
</style>
