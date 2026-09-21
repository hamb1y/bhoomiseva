<script lang="ts">
  import { X, ChevronLeft, ChevronRight } from "lucide-svelte";

  let {
    selector = "[data-lightbox]",
    closeLabel = "Close",
    prevLabel = "Previous image",
    nextLabel = "Next image",
  }: {
    selector?: string;
    closeLabel?: string;
    prevLabel?: string;
    nextLabel?: string;
  } = $props();

  let open = $state(false);
  let index = $state(0);
  let items = $state<{ src: string; caption: string; alt: string }[]>([]);
  let dialog = $state<HTMLElement | null>(null);
  let lastFocus: HTMLElement | null = null;

  function collect(target: HTMLElement) {
    const group = target.dataset.lightboxGroup ?? "";
    const all = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const same = all.filter((el) => (el.dataset.lightboxGroup ?? "") === group);
    const list = (same.length ? same : [target]).map((el) => ({
      src: el.dataset.lightbox ?? (el as HTMLImageElement).src,
      caption: el.dataset.caption ?? "",
      alt: (el as HTMLImageElement).alt ?? "",
    }));
    const start = (same.length ? same : [target]).indexOf(target);
    return { list, start };
  }

  function onClick(event: MouseEvent) {
    const target = (event.target as HTMLElement)?.closest<HTMLElement>(selector);
    if (!target) return;
    event.preventDefault();
    const { list, start } = collect(target);
    if (!list.length) return;
    items = list;
    index = start < 0 ? 0 : start;
    lastFocus = document.activeElement as HTMLElement;
    open = true;
  }

  function close() {
    open = false;
    lastFocus?.focus?.();
  }

  function step(delta: number) {
    if (!items.length) return;
    index = (index + delta + items.length) % items.length;
  }

  function onKeydown(event: KeyboardEvent) {
    if (!open) return;
    if (event.key === "Escape") close();
    else if (event.key === "ArrowLeft") step(-1);
    else if (event.key === "ArrowRight") step(1);
    else if (event.key === "Tab") trapFocus(event);
  }

  function trapFocus(event: KeyboardEvent) {
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>("button");
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  $effect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  });
</script>

<svelte:document onclick={onClick} />
<svelte:window onkeydown={onKeydown} />

{#if open}
  <div
    class="overlay"
    role="dialog"
    aria-modal="true"
    aria-label={items[index]?.caption || items[index]?.alt || "Image"}
    bind:this={dialog}
  >
    <button class="close" type="button" onclick={close} aria-label={closeLabel}>
      <X size={22} strokeWidth={1.8} />
    </button>

    {#if items.length > 1}
      <button class="nav prev" type="button" onclick={() => step(-1)} aria-label={prevLabel}>
        <ChevronLeft size={26} strokeWidth={1.6} />
      </button>
      <button class="nav next" type="button" onclick={() => step(1)} aria-label={nextLabel}>
        <ChevronRight size={26} strokeWidth={1.6} />
      </button>
    {/if}

    <figure class="stage">
      <img src={items[index]?.src} alt={items[index]?.alt ?? ""} />
      {#if items[index]?.caption}
        <figcaption>
          {items[index].caption}
          {#if items.length > 1}
            <span class="count">{index + 1} / {items.length}</span>
          {/if}
        </figcaption>
      {/if}
    </figure>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 90;
    background: rgba(24, 16, 11, 0.92);
    display: grid;
    place-items: center;
    padding: clamp(1rem, 4vw, 3rem);
  }
  .stage {
    margin: 0;
    max-width: min(1100px, 92vw);
    max-height: 88vh;
    display: grid;
    gap: var(--s-3);
    justify-items: center;
  }
  .stage img {
    max-width: 100%;
    max-height: 78vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: var(--r-2);
  }
  figcaption {
    color: #f3ecdf;
    font-size: var(--step--1);
    text-align: center;
    display: flex;
    gap: var(--s-3);
    align-items: baseline;
  }
  .count {
    opacity: 0.6;
    font-variant-numeric: tabular-nums;
  }
  .close,
  .nav {
    position: absolute;
    background: transparent;
    color: #f3ecdf;
    border: 1px solid rgba(243, 236, 223, 0.35);
    border-radius: var(--r-2);
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
  }
  .close:hover,
  .nav:hover {
    background: rgba(243, 236, 223, 0.14);
  }
  .close {
    top: clamp(0.75rem, 2vw, 1.5rem);
    right: clamp(0.75rem, 2vw, 1.5rem);
  }
  .prev {
    left: clamp(0.75rem, 2vw, 1.5rem);
    top: 50%;
    transform: translateY(-50%);
  }
  .next {
    right: clamp(0.75rem, 2vw, 1.5rem);
    top: 50%;
    transform: translateY(-50%);
  }
</style>
