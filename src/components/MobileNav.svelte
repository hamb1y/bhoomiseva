<script lang="ts">
  import { Menu, X } from "lucide-svelte";

  interface Link {
    label: string;
    href: string;
    children?: Link[];
  }

  let {
    links,
    donateHref,
    donateLabel,
    menuLabel,
    closeLabel,
    langHref,
    langLabel,
    langAria,
  }: {
    links: Link[];
    donateHref: string;
    donateLabel: string;
    menuLabel: string;
    closeLabel: string;
    langHref: string;
    langLabel: string;
    langAria: string;
  } = $props();

  let open = $state(false);
  let panel = $state<HTMLElement | null>(null);

  $effect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  });

  $effect(() => {
    if (open && panel) {
      const first = panel.querySelector<HTMLElement>("a, button");
      first?.focus();
    }
  });

  function onkeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && open) open = false;
  }
</script>

<svelte:window onkeydown={onkeydown} />

<button
  class="toggle"
  type="button"
  aria-expanded={open}
  aria-controls="mobile-nav"
  onclick={() => (open = !open)}
>
  {#if open}
    <X size={22} strokeWidth={1.7} aria-hidden="true" />
    <span class="sr">{closeLabel}</span>
  {:else}
    <Menu size={22} strokeWidth={1.7} aria-hidden="true" />
    <span class="sr">{menuLabel}</span>
  {/if}
</button>

{#if open}
  <div class="panel" id="mobile-nav" bind:this={panel}>
    <nav aria-label={menuLabel}>
      <ul>
        {#each links as link (link.href)}
          <li>
            <a href={link.href} onclick={() => (open = false)}>{link.label}</a>
            {#if link.children?.length}
              <ul class="sub">
                {#each link.children as child (child.href)}
                  <li>
                    <a href={child.href} onclick={() => (open = false)}>{child.label}</a>
                  </li>
                {/each}
              </ul>
            {/if}
          </li>
        {/each}
      </ul>
    </nav>
    <a class="donate" href={donateHref} onclick={() => (open = false)}>{donateLabel}</a>
    <a class="lang" href={langHref} aria-label={langAria}>{langLabel}</a>
  </div>
{/if}

<style>
  .toggle {
    display: inline-grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border: 1px solid var(--rule-strong);
    border-radius: var(--r-2);
    background: transparent;
    color: var(--ink);
  }
  .toggle:hover {
    background: var(--ink-wash);
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .panel {
    position: fixed;
    inset: 0;
    z-index: 60;
    background: var(--paper);
    padding: 6.5rem var(--gutter) 3rem;
    display: flex;
    flex-direction: column;
    gap: var(--s-6);
    overflow-y: auto;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  nav > ul > li {
    border-bottom: 1px solid var(--rule);
  }
  nav > ul > li > a {
    display: block;
    font-family: var(--font-display);
    font-variation-settings: "opsz" 40, "WONK" 1;
    font-size: var(--step-2);
    text-decoration: none;
    padding: var(--s-4) 0;
  }
  .sub {
    padding: 0 0 var(--s-4) var(--s-4);
  }
  .sub a {
    display: block;
    font-family: var(--font-body);
    font-size: var(--step-0);
    color: var(--ink-2);
    text-decoration: none;
    padding: var(--s-2) 0;
  }
  .sub a:hover,
  nav a:hover {
    color: var(--clay);
  }
  .donate {
    display: inline-flex;
    justify-content: center;
    background: var(--clay);
    color: #fff6ee;
    text-decoration: none;
    padding: 0.85em 1.2em;
    border-radius: var(--r-2);
    font-weight: 550;
    align-self: flex-start;
  }
  .lang {
    font-family: var(--font-mono);
    font-size: var(--step--1);
    color: var(--ink-2);
    text-underline-offset: 0.2em;
  }
</style>
