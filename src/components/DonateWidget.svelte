<script lang="ts">
  import { untrack } from "svelte";
  import { renderSVG } from "uqr";
  import { upiLink } from "../utils/upi";

  interface Cause {
    value: string;
    label: string;
    amounts: number[];
  }

  interface Labels {
    purpose: string;
    amount: string;
    total: string;
    upi: string;
    copy: string;
    copied: string;
    qr: string;
    payUpi: string;
    payUpiNoAmount: string;
    confirmTitle: string;
    confirmBody: string;
    causeNote: string;
    unverified: string;
    otherMethods: string;
    whatsapp: string;
  }

  let {
    causes,
    labels,
    upi,
    payeeName,
    paytm,
    gpay,
    verified,
    whatsapp,
    email,
  }: {
    causes: Cause[];
    labels: Labels;
    upi: string;
    payeeName: string;
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

  // One link drives both the QR code and the pay button, so they can never
  // disagree. The purpose is carried in the transaction note.
  const link = $derived(
    upiLink({
      upi,
      payeeName,
      amount: chosenAmount,
      note: activeCause?.label ?? "",
    }),
  );
  const qrSvg = $derived(renderSVG(link, { border: 0 }));

  const format = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  const payLabel = $derived(
    chosenAmount
      ? labels.payUpi.replace("{amount}", format(chosenAmount))
      : labels.payUpiNoAmount,
  );

  const confirmLink = $derived.by(() => {
    const parts = [
      "Donation",
      `Cause: ${activeCause?.label ?? cause}`,
      chosenAmount ? `Amount: ₹${chosenAmount}` : null,
    ].filter(Boolean);
    return `${whatsapp}?text=${encodeURIComponent(parts.join("\n"))}`;
  });
</script>

<div class="receipt">
  <div class="field">
    <h2 class="field-title" id="purpose-label">{labels.purpose}</h2>
    <ul class="options" role="radiogroup" aria-labelledby="purpose-label">
      {#each causes as c (c.value)}
        <li>
          <label class:active={cause === c.value}>
            <input type="radio" name="cause" value={c.value} bind:group={cause} />
            <span class="opt-label">{c.label}</span>
            <span class="opt-tick" aria-hidden="true"></span>
          </label>
        </li>
      {/each}
    </ul>
  </div>

  <div class="field">
    <h2 class="field-title" id="amount-label">{labels.amount}</h2>
    <ul class="options" role="radiogroup" aria-labelledby="amount-label">
      {#each activeCause?.amounts ?? [] as a (a)}
        <li>
          <label class:active={!custom && amount === a}>
            <input
              type="radio"
              name="amount"
              value={a}
              bind:group={amount}
              onchange={() => (custom = "")}
            />
            <span class="opt-label num">{format(a)}</span>
            <span class="opt-tick" aria-hidden="true"></span>
          </label>
        </li>
      {/each}
      <li>
        <label class:active={Boolean(custom)}>
          <span class="rup">₹</span>
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
        </label>
      </li>
    </ul>
  </div>

  <p class="total">
    <span>{labels.total}</span>
    <strong class="num">{chosenAmount ? format(chosenAmount) : "—"}</strong>
  </p>

  <div class="pay">
    <div class="qr" role="img" aria-label={labels.qr}>
      {@html qrSvg}
      <span class="qr-cap">{labels.qr}</span>
    </div>

    <div class="pay-side">
      <p class="side-label">{labels.upi}</p>
      <p class="upi-row">
        <code>{upi}</code>
        <button type="button" class="copy" onclick={copyUpi}>
          {copied ? labels.copied : labels.copy}
        </button>
      </p>
      <p class="alt">{labels.otherMethods}: Paytm {paytm} · Google Pay {gpay}</p>
      <a class="pay-btn" href={link}>{payLabel}</a>
    </div>
  </div>

  {#if !verified}
    <p class="notice" role="note">{labels.unverified}</p>
  {/if}

  <div class="after">
    <h2>{labels.confirmTitle}</h2>
    <p>{labels.confirmBody}</p>
    <p class="note">{labels.causeNote}</p>
    <p class="after-actions">
      <a class="wa" href={confirmLink}>{labels.whatsapp}</a>
      <a class="mail" href={`mailto:${email}`}>{email}</a>
    </p>
  </div>
</div>

<div class="paybar">
  <a class="paybar-btn" href={link}>{payLabel}</a>
</div>

<style>
  .receipt {
    max-width: 42rem;
    margin-inline: auto;
    background: var(--paper-raised);
    border: 1px solid var(--rule-strong);
    border-radius: var(--r-2);
    padding: clamp(var(--s-5), 4vw, var(--s-7));
    box-shadow: var(--shadow-lift);
  }

  .field + .field {
    margin-top: var(--s-6);
  }
  .field-title {
    font-family: var(--font-body);
    font-size: var(--step-0);
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 var(--s-3);
  }

  .options {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--rule);
  }
  .options li {
    border-bottom: 1px solid var(--rule);
  }
  .options label {
    display: flex;
    align-items: center;
    gap: var(--s-3);
    padding: var(--s-3) var(--s-2);
    cursor: pointer;
  }
  .options label:hover {
    background: var(--ink-wash);
  }
  .options label.active {
    background: var(--clay-wash);
  }
  .opt-label {
    flex: 1;
  }
  .opt-tick {
    inline-size: 0.85rem;
    block-size: 0.85rem;
    border: 1px solid var(--rule-strong);
    border-radius: var(--r-1);
  }
  .options label.active .opt-tick {
    background: var(--clay);
    border-color: var(--clay);
  }
  .options input[type="radio"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .options label:has(input:focus-visible) {
    outline: 2px solid var(--clay);
    outline-offset: 2px;
  }
  .rup {
    color: var(--ink-2);
  }
  .custom {
    border: 0;
    background: transparent;
    inline-size: 10ch;
    padding: 0;
    font: inherit;
    color: var(--ink);
  }
  .custom:focus-visible {
    outline: 0;
  }
  .num {
    font-variant-numeric: tabular-nums;
  }

  .total {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--s-4);
    margin: var(--s-6) 0 0;
    padding-block: var(--s-4);
    border-top: 2px solid var(--ink);
    border-bottom: 1px solid var(--rule-strong);
    font-weight: 600;
  }
  .total strong {
    font-family: var(--font-display);
    font-size: var(--step-3);
    line-height: 1;
  }

  .pay {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--s-6);
    align-items: start;
    margin-top: var(--s-6);
  }
  .qr {
    inline-size: 9.5rem;
    display: grid;
    gap: var(--s-2);
    justify-items: center;
    padding: var(--s-3);
    background: #fff;
    border: 1px solid var(--rule);
    border-radius: var(--r-1);
  }
  .qr :global(svg) {
    inline-size: 100%;
    block-size: auto;
  }
  .qr-cap {
    font-size: var(--step--1);
    color: var(--ink-3);
    text-align: center;
  }
  .side-label {
    font-size: var(--step--1);
    color: var(--ink-3);
    margin: 0 0 var(--s-1);
  }
  .upi-row {
    display: flex;
    align-items: center;
    gap: var(--s-3);
    flex-wrap: wrap;
    margin: 0;
  }
  .upi-row code {
    font-family: var(--font-mono);
    font-size: var(--step-0);
    background: var(--paper-sunk);
    padding: 0.3em 0.55em;
    border-radius: var(--r-1);
  }
  .copy {
    border: 1px solid var(--ink);
    background: transparent;
    color: var(--ink);
    border-radius: var(--r-2);
    padding: 0.35em 0.8em;
    font: inherit;
    font-size: var(--step--1);
  }
  .copy:hover {
    background: var(--ink);
    color: var(--paper-raised);
  }
  .alt {
    margin: var(--s-3) 0 0;
    font-size: var(--step--1);
    color: var(--ink-3);
  }
  .pay-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: var(--s-4);
    padding: 0.7em 1.4em;
    background: var(--clay);
    color: var(--paper-raised);
    border-radius: var(--r-2);
    text-decoration: none;
    font-weight: 600;
  }
  .pay-btn:hover {
    background: var(--clay-deep);
  }

  .notice {
    margin: var(--s-5) 0 0;
    background: var(--turmeric-wash);
    border: 1px solid var(--rule);
    border-radius: var(--r-2);
    padding: var(--s-4);
    color: var(--ink-2);
    font-size: var(--step--1);
  }

  .after {
    margin-top: var(--s-6);
    padding-top: var(--s-5);
    border-top: 1px dashed var(--rule-strong);
  }
  .after h2 {
    font-size: var(--step-1);
    margin: 0 0 var(--s-2);
  }
  .after p {
    color: var(--ink-2);
    margin: 0 0 var(--s-2);
    max-width: 54ch;
  }
  .after .note {
    font-size: var(--step--1);
    color: var(--ink-3);
  }
  .after-actions {
    display: flex;
    align-items: center;
    gap: var(--s-4);
    flex-wrap: wrap;
    margin-top: var(--s-3);
  }
  .wa {
    color: var(--clay-deep);
    font-weight: 600;
  }
  .mail {
    color: var(--ink-2);
    font-size: var(--step--1);
  }

  /* The pay bar is a phone convenience: the one action never scrolls away. */
  .paybar {
    display: none;
  }
  @media (max-width: 40rem) {
    .pay {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
    }
    .pay-side {
      text-align: center;
    }
    .upi-row {
      justify-content: center;
    }
    .pay-btn {
      display: none;
    }
    .paybar {
      display: block;
      position: fixed;
      inset: auto 0 0 0;
      z-index: 60;
      padding: var(--s-3) var(--gutter);
      padding-bottom: max(var(--s-3), env(safe-area-inset-bottom));
      background: var(--paper-raised);
      border-top: 1px solid var(--rule-strong);
    }
    .paybar-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.8em 1.4em;
      background: var(--clay);
      color: var(--paper-raised);
      border-radius: var(--r-2);
      text-decoration: none;
      font-weight: 600;
    }
  }
</style>
