<script lang="ts">
  import { ChevronDown } from "lucide-svelte";

  interface Item {
    label: string;
    href: string;
    accent?: string;
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

<li class="has-menu" class:open bind:this={root} onfocusout={onFocusOut}>
  <a class="label" class:active {href} aria-current={active ? "page" : undefined}>{label}</a>
  <button
    class="toggle"
    type="button"
    aria-expanded={open}
    aria-haspopup="true"
    aria-label={menuLabel}
    onclick={() => (open = !open)}
  >
    <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
  </button>

  {#if open}
    <ul class="menu">
      {#each items as item (item.href)}
        <li>
          <a
            href={item.href}
            class={item.accent ? `dot-${item.accent}` : ""}
            onclick={() => (open = false)}>{item.label}</a
          >
        </li>
      {/each}
    </ul>
  {/if}
</li>

<style>
  .has-menu {
    position: relative;
    display: inline-flex;
    align-items: center;
    border-radius: var(--r-3);
    transition: background var(--dur-1) var(--ease-out);
  }
  .has-menu:hover,
  .has-menu.open {
    background: var(--ink-wash);
  }
  .label {
    text-decoration: none;
    font-size: var(--step-0);
    font-weight: 500;
    color: var(--ink-2);
    padding: 0.45rem 0.2rem 0.45rem 0.75rem;
    border-radius: var(--r-3);
  }
  .label:hover,
  .label.active {
    color: var(--ink);
  }
  .label.active {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 0.35em;
    text-decoration-color: var(--clay);
  }
  .toggle {
    display: grid;
    place-items: center;
    width: 1.9rem;
    height: 2.2rem;
    padding: 0 0.35rem 0 0.1rem;
    border: 0;
    background: none;
    color: var(--ink-3);
    border-radius: var(--r-3);
  }
  .toggle :global(svg) {
    transition: transform var(--dur-2) var(--ease-out);
  }
  .open .toggle :global(svg) {
    transform: rotate(180deg);
  }
  .toggle:hover {
    color: var(--ink);
  }
  .menu {
    position: absolute;
    top: calc(100% + 0.6rem);
    left: 0;
    min-width: 17rem;
    list-style: none;
    margin: 0;
    padding: var(--s-2);
    background: var(--paper-raised);
    border-radius: var(--r-4);
    box-shadow: var(--shadow-deep);
    z-index: 80;
    animation: drop var(--dur-2) var(--ease-out);
  }
  @keyframes drop {
    from {
      opacity: 0;
      translate: 0 -4px;
    }
  }
  .menu a {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.65rem 0.8rem;
    border-radius: var(--r-3);
    text-decoration: none;
    color: var(--ink);
    font-size: var(--step-0);
    font-weight: 500;
  }
  .menu a::before {
    content: "";
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: var(--dot, var(--clay));
    flex: none;
  }
  .dot-education {
    --dot: var(--turmeric);
  }
  .dot-farmers {
    --dot: var(--leaf);
  }
  .dot-children {
    --dot: var(--indigo);
  }
  .menu a:hover {
    background: var(--ink-wash);
  }
</style>
