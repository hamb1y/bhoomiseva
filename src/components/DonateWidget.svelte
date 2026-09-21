<script lang="ts">
  import { untrack } from "svelte";

  interface Cause {
    value: string;
    label: string;
    amounts: number[];
  }

  interface Labels {
    cause: string;
    amount: string;
    upi: string;
    copy: string;
    copied: string;
    qr: string;
    qrPending: string;
    or: string;
    otherMethods: string;
    confirmTitle: string;
    confirmBody: string;
    causeNote: string;
    unverified: string;
    whatsapp: string;
  }

  let {
    causes,
    labels,
    upi,
    paytm,
    gpay,
    verified,
    whatsapp,
    email,
  }: {
    causes: Cause[];
    labels: Labels;
    upi: string;
    paytm: string;
    gpay: string;
    verified: boolean;
    whatsapp: string;
    email: string;
  } = $props();

  // Props are static here, so read the default once without tracking.
  const fallback = untrack(() => causes[causes.length - 1]);
  let cause = $state(fallback?.value ?? "any");
  let amount = $state<number | null>(fallback?.amounts[1] ?? null);
  let custom = $state("");
  let copied = $state(false);

  const activeCause = $derived(causes.find((c) => c.value === cause));
  const chosenAmount = $derived(custom ? Number(custom) : amount);

  $effect(() => {
    const c = causes.find((x) => x.value === cause);
    amount = c?.amounts[1] ?? c?.amounts[0] ?? null;
    custom = "";
  });

  async function copyUpi() {
    try {
      await navigator.clipboard.writeText(upi);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      copied = false;
    }
  }

  const confirmLink = $derived.by(() => {
    const parts = [
      `Donation`,
      `Cause: ${activeCause?.label ?? cause}`,
      chosenAmount ? `Amount: ₹${chosenAmount}` : null,
    ].filter(Boolean);
    return `${whatsapp}?text=${encodeURIComponent(parts.join("\n"))}`;
  });

  const format = (n: number) => `₹${n.toLocaleString("en-IN")}`;
</script>

<div class="widget">
  <div class="group" role="radiogroup" aria-labelledby="cause-label">
    <p class="label" id="cause-label">{labels.cause}</p>
    <div class="chips">
      {#each causes as c (c.value)}
        <label class="chip" class:active={cause === c.value}>
          <input type="radio" name="cause" value={c.value} bind:group={cause} />
          <span>{c.label}</span>
        </label>
      {/each}
    </div>
  </div>

  <div class="amount-block">
    <p class="label">{labels.amount}</p>
    <div class="amounts">
      {#each activeCause?.amounts ?? [] as a (a)}
        <label class="chip chip--amount" class:active={!custom && amount === a}>
          <input
            type="radio"
            name="amount"
            value={a}
            bind:group={amount}
            onchange={() => (custom = "")}
          />
          <span>{format(a)}</span>
        </label>
      {/each}
      <div class="chip chip--amount" class:active={Boolean(custom)}>
        <span>₹</span>
        <input
          class="custom"
          type="number"
          min="1"
          inputmode="numeric"
          placeholder="Other"
          aria-label="Custom amount"
          bind:value={custom}
          onfocus={() => (amount = null)}
        />
      </div>
    </div>
  </div>

  {#if !verified}
    <p class="notice" role="note">{labels.unverified}</p>
  {/if}

  <div class="pay">
    <div class="pay-main">
      <p class="label">{labels.upi}</p>
      <div class="upi">
        <code>{upi}</code>
        <button type="button" class="copy" onclick={copyUpi}
          >{copied ? labels.copied : labels.copy}</button
        >
      </div>
      <p class="alt-methods">
        {labels.otherMethods}: Paytm {paytm} · Google Pay {gpay}
      </p>
    </div>

    <div class="qr">
      <div class="qr-box" role="img" aria-label={labels.qr}>
        <span>{labels.qrPending}</span>
      </div>
      <p class="label">{labels.qr}</p>
    </div>
  </div>

  <div class="confirm">
    <h2>{labels.confirmTitle}</h2>
    <p>{labels.confirmBody}</p>
    <p class="cause-note">{labels.causeNote}</p>
    <div class="confirm-actions">
      <a class="btn btn--primary" href={confirmLink}>{labels.whatsapp}</a>
      <a class="link" href={`mailto:${email}`}>{email}</a>
    </div>
  </div>
</div>

<style>
  .widget {
    display: grid;
    gap: var(--s-6);
  }
  .group {
    display: grid;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-2);
  }
  .label {
    font-family: var(--font-mono);
    font-size: var(--step--1);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-3);
    padding: 0;
    margin: 0 0 var(--s-3);
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: var(--s-2);
    border: 1px solid var(--rule-strong);
    border-radius: 999px;
    padding: 0.5em 1em;
    cursor: pointer;
    background: var(--paper-raised);
    transition:
      border-color var(--dur-1) var(--ease-out),
      background var(--dur-1) var(--ease-out);
  }
  .chip:hover {
    border-color: var(--ink-3);
  }
  .chip.active {
    border-color: var(--clay);
    background: var(--clay-wash);
  }
  .chip input[type="radio"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .chip:has(input:focus-visible) {
    outline: 2px solid var(--clay);
    outline-offset: 2px;
  }
  .amount-block {
    padding-top: var(--s-2);
  }
  .amounts {
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-2);
  }
  .chip--amount {
    font-variant-numeric: tabular-nums;
    font-family: var(--font-mono);
    font-size: var(--step--1);
  }
  .custom {
    border: 0;
    background: transparent;
    width: 7ch;
    padding: 0;
    font-family: var(--font-mono);
    font-size: var(--step--1);
    color: var(--ink);
  }
  .custom:focus-visible {
    outline: 0;
  }

  .notice {
    margin: 0;
    background: var(--turmeric-wash);
    border: 1px solid var(--rule);
    border-left: 3px solid var(--turmeric);
    border-radius: var(--r-2);
    padding: var(--s-4);
    color: var(--ink-2);
    font-size: var(--step--1);
  }

  .pay {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--s-6);
    align-items: center;
    border: 1px solid var(--rule);
    border-radius: var(--r-3);
    background: var(--paper-raised);
    padding: var(--s-5);
  }
  .upi {
    display: flex;
    align-items: center;
    gap: var(--s-3);
    flex-wrap: wrap;
  }
  .upi code {
    font-family: var(--font-mono);
    font-size: var(--step-1);
    background: var(--paper-sunk);
    padding: 0.35em 0.6em;
    border-radius: var(--r-2);
  }
  .copy {
    border: 1px solid var(--ink);
    background: transparent;
    color: var(--ink);
    border-radius: var(--r-2);
    padding: 0.4em 0.9em;
    font-size: var(--step--1);
    font-weight: 550;
  }
  .copy:hover {
    background: var(--ink);
    color: var(--paper-raised);
  }
  .alt-methods {
    margin: var(--s-4) 0 0;
    font-size: var(--step--1);
    color: var(--ink-3);
    font-family: var(--font-mono);
  }
  .qr {
    display: grid;
    gap: var(--s-2);
    justify-items: center;
    text-align: center;
  }
  .qr-box {
    width: 9rem;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    text-align: center;
    padding: var(--s-3);
    border: 1px dashed var(--rule-strong);
    border-radius: var(--r-2);
    background: var(--paper-sunk);
    color: var(--ink-3);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    line-height: 1.3;
  }
  .qr .label {
    margin: 0;
  }

  .confirm {
    border-top: 1px solid var(--rule-strong);
    padding-top: var(--s-5);
  }
  .confirm h2 {
    font-size: var(--step-2);
    margin: 0 0 var(--s-3);
  }
  .confirm p {
    color: var(--ink-2);
    margin: 0 0 var(--s-2);
    max-width: 52ch;
  }
  .cause-note {
    font-family: var(--font-mono);
    font-size: var(--step--1);
    color: var(--ink-3);
  }
  .confirm-actions {
    display: flex;
    align-items: center;
    gap: var(--s-4);
    flex-wrap: wrap;
    margin-top: var(--s-4);
  }
  .link {
    color: var(--ink-2);
    font-size: var(--step--1);
  }
  @media (max-width: 40rem) {
    .pay {
      grid-template-columns: 1fr;
    }
  }
</style>
