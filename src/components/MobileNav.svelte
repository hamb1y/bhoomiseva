<script lang="ts">
  import { Menu, X, ArrowRight } from "lucide-svelte";

  interface Link {
    label: string;
    href: string;
    accent?: string;
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

<svelte:window {onkeydown} />

<button
  class="toggle"
  class:open
  type="button"
  aria-expanded={open}
  aria-controls="mobile-nav"
  onclick={() => (open = !open)}
>
  {#if open}
    <X size={22} strokeWidth={1.8} aria-hidden="true" />
    <span class="sr">{closeLabel}</span>
  {:else}
    <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
    <span class="sr">{menuLabel}</span>
  {/if}
</button>

{#if open}
  <div class="panel" id="mobile-nav" bind:this={panel}>
    <nav aria-label={menuLabel}>
      <ul>
        {#each links as link, i (link.href)}
          <li style={`--i:${i}`}>
            <a href={link.href} onclick={() => (open = false)}>{link.label}</a>
            {#if link.children?.length}
              <ul class="sub">
                {#each link.children as child (child.href)}
                  <li>
                    <a
                      href={child.href}
                      class={child.accent ? `dot-${child.accent}` : ""}
                      onclick={() => (open = false)}>{child.label}</a
                    >
                  </li>
                {/each}
              </ul>
            {/if}
          </li>
        {/each}
      </ul>
    </nav>
    <div class="foot">
      <a class="donate" href={donateHref} onclick={() => (open = false)}>
        {donateLabel}
        <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
      </a>
      <a class="lang" href={langHref} aria-label={langAria}>{langLabel}</a>
    </div>
  </div>
{/if}

<style>
  .toggle {
    display: inline-grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--rule-strong);
    border-radius: var(--r-3);
    background: transparent;
    color: var(--ink);
    position: relative;
    z-index: 2;
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
    inset: var(--head-h) 0 0 0;
    z-index: 60;
    background: var(--soil);
    color: var(--on-soil);
    padding: var(--s-6) var(--gutter) max(var(--s-6), env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--s-7);
    overflow-y: auto;
    animation: open var(--dur-3) var(--ease-out);
  }
  @keyframes open {
    from {
      clip-path: inset(0 0 100% 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  nav > ul > li {
    border-bottom: 1px solid var(--soil-rule);
    animation: rise var(--dur-3) var(--ease-out) both;
    animation-delay: calc(80ms + var(--i) * 45ms);
  }
  @keyframes rise {
    from {
      opacity: 0;
      translate: 0 8px;
    }
  }
  nav > ul > li > a {
    display: block;
    font-family: var(--font-display);
    font-variation-settings:
      "opsz" 72,
      "WONK" 1,
      "SOFT" 50;
    font-weight: 520;
    font-size: clamp(2rem, 9vw, 2.75rem);
    letter-spacing: -0.03em;
    line-height: 1.1;
    text-decoration: none;
    padding: var(--s-4) 0;
  }
  .sub {
    padding: 0 0 var(--s-4);
    display: grid;
    gap: var(--s-1);
  }
  .sub a {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-size: var(--step-1);
    color: var(--on-soil-2);
    text-decoration: none;
    padding: var(--s-2) 0;
  }
  .dot-education {
    --dot: var(--turmeric);
  }
  .dot-farmers {
    --dot: #6f9e7f;
  }
  .dot-children {
    --dot: #6d93b5;
  }
  .sub a:hover,
  nav a:hover {
    color: var(--clay-bright);
  }
  .foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--s-4);
  }
  .donate {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--clay);
    color: #fff8f1;
    text-decoration: none;
    padding: 1em 1.4em;
    border-radius: var(--r-3);
    font-weight: 600;
  }
  .lang {
    font-weight: 600;
    color: var(--on-soil);
    text-decoration: none;
    padding: 0.5rem 0.9rem;
    text-decoration: underline;
    text-underline-offset: 0.3em;
  }
</style>
