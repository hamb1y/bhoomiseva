<script lang="ts">
  interface Option {
    value: string;
    label: string;
    accent?: string;
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
    // The lead card is only meaningful on the unfiltered list.
    const filtered = kind !== "all" || program !== "all" || year !== "all";
    document
      .querySelector<HTMLElement>("[data-entry-list]")
      ?.toggleAttribute("data-filtered", filtered);
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
    <div class="chips" role="radiogroup" aria-label={kindLabel}>
      {#each [{ value: "all", label: allLabel }, ...kinds] as option (option.value)}
        <label class="chip" class:active={kind === option.value}>
          <input type="radio" name="kind" value={option.value} bind:group={kind} />
          <span>{option.label}</span>
        </label>
      {/each}
    </div>
  {/if}

  {#if programs.length}
    <div class="group">
      <span class="label" id="filter-programme">{programLabel}</span>
      <div class="chips" role="radiogroup" aria-labelledby="filter-programme">
        {#each [{ value: "all", label: allLabel }, ...programs] as option (option.value)}
          <label class="chip" class:active={program === option.value} data-accent={option.accent}>
            <input type="radio" name="program" value={option.value} bind:group={program} />
            <span>{option.label}</span>
          </label>
        {/each}
      </div>
    </div>
  {/if}

  {#if years.length}
    <label class="group">
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
    gap: var(--s-5) var(--s-6);
    align-items: end;
  }
  .group {
    display: grid;
    gap: var(--s-2);
  }
  .label {
    font-size: var(--step--1);
    font-weight: 600;
    color: var(--ink-2);
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-2);
  }
  .chip {
    position: relative;
    display: inline-flex;
    cursor: pointer;
    padding: 0.35em 0;
    margin-right: var(--s-4);
    font-size: var(--step-0);
    font-weight: 600;
    line-height: 1.2;
    color: var(--ink-2);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-decoration-thickness: 2px;
    text-underline-offset: 0.4em;
    transition:
      color var(--dur-1) var(--ease-out),
      text-decoration-color var(--dur-1) var(--ease-out);
  }
  .chip:hover {
    color: var(--ink);
    text-decoration-color: var(--rule-strong);
  }
  .chip.active {
    color: var(--ink);
    text-decoration-color: var(--clay);
  }
  .chip input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .chip:has(input:focus-visible) {
    outline: 2px solid var(--clay);
    outline-offset: 2px;
  }
  select {
    appearance: none;
    background: var(--paper-raised)
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%235c4b3d' stroke-width='1.5'/%3E%3C/svg%3E")
      no-repeat right 0.9rem center;
    border: 1px solid var(--rule-strong);
    border-radius: var(--r-2);
    padding: 0.55em 2.4em 0.55em 1.05em;
    font-family: var(--font-body);
    font-size: var(--step--1);
    font-weight: 600;
    line-height: 1.2;
    color: var(--ink);
    min-width: 9rem;
  }
  select:hover {
    border-color: var(--ink);
  }
</style>
