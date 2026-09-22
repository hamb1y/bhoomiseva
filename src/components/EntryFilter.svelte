<script lang="ts">
  interface Option {
    value: string;
    label: string;
  }

  let {
    kinds = [],
    programs = [],
    years = [],
    kindLabel = "",
    programLabel = "",
    yearLabel = "",
    allLabel = "All",
    countTemplate = "{n}",
    countOne = "",
  }: {
    kinds?: Option[];
    programs?: Option[];
    years?: Option[];
    kindLabel?: string;
    programLabel?: string;
    yearLabel?: string;
    allLabel?: string;
    countTemplate?: string;
    countOne?: string;
  } = $props();

  let kind = $state("all");
  let program = $state("all");
  let year = $state("all");

  function apply() {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-entry]"));
    let visible = 0;
    for (const el of items) {
      const show =
        (kind === "all" || el.dataset.kind === kind) &&
        (program === "all" || el.dataset.program === program) &&
        (year === "all" || el.dataset.year === year);
      el.hidden = !show;
      if (show) visible += 1;
    }
    const empty = document.querySelector<HTMLElement>("[data-empty]");
    if (empty) empty.hidden = visible > 0;
    const count = document.querySelector<HTMLElement>("[data-count]");
    if (count)
      count.textContent = (visible === 1 && countOne ? countOne : countTemplate).replace(
        "{n}",
        String(visible),
      );
  }

  $effect(() => {
    kind;
    program;
    year;
    apply();
  });
</script>

<div class="filters" role="group">
  {#if kinds.length}
    <div class="segmented" role="radiogroup" aria-label={kindLabel}>
      {#each [{ value: "all", label: allLabel }, ...kinds] as option (option.value)}
        <label class="seg" class:active={kind === option.value}>
          <input type="radio" name="kind" value={option.value} bind:group={kind} />
          <span>{option.label}</span>
        </label>
      {/each}
    </div>
  {/if}

  {#if programs.length}
    <label class="field">
      <span class="label">{programLabel}</span>
      <select bind:value={program}>
        <option value="all">{allLabel}</option>
        {#each programs as option (option.value)}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </label>
  {/if}

  {#if years.length}
    <label class="field">
      <span class="label">{yearLabel}</span>
      <select bind:value={year}>
        <option value="all">{allLabel}</option>
        {#each years as option (option.value)}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </label>
  {/if}
</div>

<style>
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-5);
    align-items: end;
  }
  .segmented {
    display: inline-flex;
    border: 1px solid var(--rule-strong);
    border-radius: 999px;
    padding: 3px;
    background: var(--paper-raised);
  }
  .seg {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.45em 1.1em;
    cursor: pointer;
    font-size: var(--step--1);
    color: var(--ink-2);
    transition:
      background var(--dur-1) var(--ease-out),
      color var(--dur-1) var(--ease-out);
  }
  .seg.active {
    background: var(--ink);
    color: var(--paper-raised);
  }
  .seg input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .seg:has(input:focus-visible) {
    outline: 2px solid var(--clay);
    outline-offset: 2px;
  }
  .field {
    display: grid;
    gap: var(--s-2);
  }
  .label {
    font-family: var(--font-mono);
    font-size: var(--step--1);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-3);
  }
  select {
    appearance: none;
    background: var(--paper-raised)
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%235c4b3d' stroke-width='1.5'/%3E%3C/svg%3E")
      no-repeat right 0.9rem center;
    border: 1px solid var(--rule-strong);
    border-radius: var(--r-2);
    padding: 0.6em 2.4em 0.6em 0.9em;
    font-family: var(--font-body);
    font-size: var(--step-0);
    color: var(--ink);
    min-width: 12rem;
  }
</style>
