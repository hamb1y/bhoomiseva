<script lang="ts">
  interface Option {
    value: string;
    label: string;
  }

  let {
    programmeLabel,
    yearLabel,
    allLabel,
    programmes,
    years,
    countTemplate,
  }: {
    programmeLabel: string;
    yearLabel: string;
    allLabel: string;
    programmes: Option[];
    years: Option[];
    countTemplate: string;
  } = $props();

  let selectedProgram = $state("all");
  let selectedYear = $state("all");

  function apply() {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-story]"));
    let visible = 0;
    for (const el of items) {
      const show =
        (selectedProgram === "all" || el.dataset.program === selectedProgram) &&
        (selectedYear === "all" || el.dataset.year === selectedYear);
      el.hidden = !show;
      if (show) visible += 1;
    }
    const empty = document.querySelector<HTMLElement>("[data-empty]");
    if (empty) empty.hidden = visible > 0;
    const count = document.querySelector<HTMLElement>("[data-count]");
    if (count) count.textContent = countTemplate.replace("{n}", String(visible));
  }

  $effect(() => {
    selectedProgram;
    selectedYear;
    apply();
  });
</script>

<div class="filters" role="group">
  <label class="field">
    <span class="label">{programmeLabel}</span>
    <select bind:value={selectedProgram}>
      <option value="all">{allLabel}</option>
      {#each programmes as option (option.value)}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </label>

  <label class="field">
    <span class="label">{yearLabel}</span>
    <select bind:value={selectedYear}>
      <option value="all">{allLabel}</option>
      {#each years as option (option.value)}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </label>
</div>

<style>
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-5);
    align-items: end;
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
  select:hover {
    border-color: var(--ink-3);
  }
</style>
