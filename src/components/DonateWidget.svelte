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
    chosenAmount ? labels.payUpi.replace("{amount}", format(chosenAmount)) : labels.payUpiNoAmount,
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
  <div class="choose">
    <div class="field">
      <h2 class="field-title" id="purpose-label">{labels.purpose}</h2>
      <ul class="options causes" role="radiogroup" aria-labelledby="purpose-label">
        {#each causes as c (c.value)}
          <li>
            <label class:active={cause === c.value} data-cause={c.value}>
              <input type="radio" name="cause" value={c.value} bind:group={cause} />
              <span class="opt-dot" aria-hidden="true"></span>
              <span class="opt-label">{c.label}</span>
              <span class="opt-tick" aria-hidden="true"></span>
            </label>
          </li>
        {/each}
      </ul>
    </div>

    <div class="field">
      <h2 class="field-title" id="amount-label">{labels.amount}</h2>
      <ul class="options amounts" role="radiogroup" aria-labelledby="amount-label">
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
            </label>
          </li>
        {/each}
        <li class="custom-li">
          <label class="custom-label" class:active={Boolean(custom)}>
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

  <aside class="slip">
    <p class="total">
      <span class="total-label">{labels.total}</span>
      <strong class="num">{chosenAmount ? format(chosenAmount) : "—"}</strong>
      <span class="total-cause">{activeCause?.label}</span>
    </p>

    <a class="pay-btn" href={link}>{payLabel}</a>

    <div class="pay">
      <div class="qr" role="img" aria-label={labels.qr}>
        {@html qrSvg}
      </div>
      <div class="pay-side">
        <span class="qr-cap">{labels.qr}</span>
        <p class="side-label">{labels.upi}</p>
        <p class="upi-row">
          <code>{upi}</code>
          <button type="button" class="copy" onclick={copyUpi} aria-live="polite">
            {copied ? labels.copied : labels.copy}
          </button>
        </p>
      </div>
    </div>

    <p class="alt">{labels.otherMethods}: Paytm {paytm} · Google Pay {gpay}</p>

    {#if !verified}
      <p class="notice" role="note">{labels.unverified}</p>
    {/if}
  </aside>
</div>

<div class="paybar">
  <a class="paybar-btn" href={link}>{payLabel}</a>
</div>

<style>
  .receipt {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 4.5rem);
    align-items: start;
  }
  .choose {
    display: grid;
    gap: var(--s-8);
  }
  .field-title {
    font-family: var(--font-display);
    font-variation-settings:
      "opsz" 40,
      "WONK" 1,
      "SOFT" 60;
    font-size: var(--step-2);
    font-weight: 540;
    color: var(--ink);
    margin: 0 0 var(--s-5);
  }

  .options {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--s-3);
  }
  .causes {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 13rem), 1fr));
  }
  .amounts {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 8.5rem), 1fr));
  }
  .options label {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--s-3);
    min-height: 3.6rem;
    padding: var(--s-3) var(--s-4);
    background: var(--paper-raised);
    border: 1.5px solid var(--rule);
    border-radius: var(--r-4);
    cursor: pointer;
    font-weight: 600;
    transition:
      border-color var(--dur-1) var(--ease-out),
      background var(--dur-1) var(--ease-out),
      transform var(--dur-1) var(--ease-out);
  }
  .options label:hover {
    border-color: var(--rule-strong);
    transform: translateY(-1px);
  }
  .options label.active {
    border-color: var(--clay);
    background: var(--clay-wash);
    box-shadow: inset 0 0 0 1px var(--clay);
  }
  .amounts label {
    justify-content: center;
    font-size: var(--step-1);
  }
  .opt-dot {
    inline-size: 0.7rem;
    block-size: 0.7rem;
    border-radius: 50%;
    background: var(--dot, var(--clay));
    flex: none;
  }
  [data-cause="education"] {
    --dot: var(--turmeric);
  }
  [data-cause="farmers"],
  [data-cause="cow"] {
    --dot: var(--leaf);
  }
  [data-cause="children"] {
    --dot: var(--indigo);
  }
  .opt-label {
    flex: 1;
    line-height: 1.25;
  }
  .amounts .opt-label {
    flex: none;
  }
  .opt-tick {
    inline-size: 1.15rem;
    block-size: 1.15rem;
    border: 1.5px solid var(--rule-strong);
    border-radius: 50%;
    flex: none;
    transition:
      background var(--dur-1) var(--ease-out),
      border-color var(--dur-1) var(--ease-out);
  }
  .options label.active .opt-tick {
    border-color: var(--clay);
    background: var(--clay)
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 8.5l2.5 2.5L12 5.5' fill='none' stroke='%23fff8f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center / 80% no-repeat;
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
  .custom-li {
    grid-column: span 2;
  }
  .custom-label {
    justify-content: flex-start;
    cursor: text !important;
  }
  .rup {
    color: var(--ink-2);
    font-size: var(--step-1);
  }
  .custom {
    border: 0;
    background: transparent;
    inline-size: 100%;
    padding: 0;
    font: inherit;
    font-size: var(--step-1);
    color: var(--ink);
    -moz-appearance: textfield;
  }
  .custom::-webkit-outer-spin-button,
  .custom::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .custom:focus-visible {
    outline: 0;
  }
  .custom-label:has(.custom:focus-visible) {
    border-color: var(--clay);
  }
  .num {
    font-variant-numeric: tabular-nums;
  }

  /* ---- the slip ---- */
  .slip {
    position: sticky;
    top: calc(var(--head-h) + var(--s-5));
    display: grid;
    gap: var(--s-5);
    padding: clamp(1.5rem, 3.5vw, 2.5rem);
    background: var(--soil);
    color: var(--on-soil);
    border-radius: var(--r-4);
    box-shadow: var(--shadow-deep);
  }
  .total {
    display: grid;
    gap: var(--s-1);
    margin: 0;
    padding-bottom: var(--s-5);
    border-bottom: 1px dashed var(--soil-rule);
  }
  .total-label {
    font-size: var(--step--1);
    font-weight: 600;
    color: var(--on-soil-3);
  }
  .total strong {
    font-family: var(--font-display);
    font-variation-settings:
      "opsz" 144,
      "WONK" 1,
      "SOFT" 80;
    font-weight: 560;
    font-size: clamp(3rem, 2rem + 4vw, 5rem);
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .total-cause {
    font-family: var(--font-mono);
    font-size: var(--step--1);
    color: var(--clay-bright);
  }
  .pay-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.05em 1.4em;
    background: var(--clay);
    color: #fff8f1;
    border-radius: var(--r-3);
    text-decoration: none;
    font-weight: 650;
    font-size: var(--step-1);
    transition:
      background var(--dur-2) var(--ease-out),
      transform var(--dur-2) var(--ease-out);
  }
  .pay-btn:hover {
    background: var(--clay-bright);
    transform: translateY(-2px);
  }
  .pay {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--s-5);
    align-items: center;
  }
  .qr {
    inline-size: 8.5rem;
    padding: var(--s-3);
    background: #fff;
    border-radius: var(--r-3);
  }
  .qr :global(svg) {
    inline-size: 100%;
    block-size: auto;
  }
  .qr-cap {
    display: block;
    font-weight: 600;
    margin-bottom: var(--s-4);
  }
  .side-label {
    font-size: var(--step--1);
    color: var(--on-soil-3);
    margin: 0 0 var(--s-2);
  }
  .upi-row {
    display: flex;
    align-items: center;
    gap: var(--s-2);
    flex-wrap: wrap;
    margin: 0;
  }
  .upi-row code {
    font-family: var(--font-mono);
    font-size: var(--step--1);
    background: var(--soil-2);
    border: 1px solid var(--soil-rule);
    padding: 0.35em 0.6em;
    border-radius: var(--r-2);
  }
  .copy {
    border: 1px solid var(--on-soil-3);
    background: transparent;
    color: var(--on-soil);
    border-radius: var(--r-2);
    padding: 0.35em 0.8em;
    font: inherit;
    font-size: var(--step--1);
    font-weight: 600;
  }
  .copy:hover {
    background: var(--on-soil);
    color: var(--soil);
  }
  .alt {
    margin: 0;
    font-size: var(--step--1);
    color: var(--on-soil-3);
  }
  .slip :global(:focus-visible) {
    outline-color: var(--clay-bright);
  }

  .notice {
    margin: 0;
    background: color-mix(in oklab, var(--turmeric) 22%, var(--soil));
    border-radius: var(--r-3);
    padding: var(--s-4);
    color: var(--on-soil);
    font-size: var(--step--1);
  }

  .after {
    padding: var(--s-6);
    background: var(--paper-sunk);
    border-radius: var(--r-4);
  }
  .after h2 {
    font-size: var(--step-2);
    margin: 0 0 var(--s-3);
  }
  .after p {
    color: var(--ink-2);
    margin: 0 0 var(--s-3);
    max-width: 58ch;
  }
  .after .note {
    font-size: var(--step--1);
    color: var(--ink-2);
  }
  .after-actions {
    display: flex;
    align-items: center;
    gap: var(--s-3) var(--s-5);
    flex-wrap: wrap;
    margin: var(--s-4) 0 0 !important;
  }
  .wa {
    display: inline-flex;
    padding: 0.7em 1.1em;
    border-radius: var(--r-3);
    background: var(--leaf);
    color: #fff8f1;
    font-weight: 600;
    text-decoration: none;
  }
  .wa:hover {
    background: var(--leaf-deep);
  }
  .mail {
    color: var(--ink);
    font-size: var(--step--1);
    font-weight: 600;
  }

  /* The pay bar is a phone convenience: the one action never scrolls away. */
  .paybar {
    display: none;
  }
  @media (max-width: 58rem) {
    .receipt {
      grid-template-columns: 1fr;
    }
    .slip {
      position: static;
      order: -1;
    }
    .choose {
      display: contents;
    }
    .choose > .field {
      order: -2;
    }
  }
  @media (max-width: 40rem) {
    .pay-btn {
      display: none;
    }
    .pay {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
    }
    .upi-row {
      justify-content: center;
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
      box-shadow: 0 -12px 24px -20px rgba(36, 26, 19, 0.6);
    }
    .paybar-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.95em 1.4em;
      background: var(--clay);
      color: #fff8f1;
      border-radius: var(--r-3);
      text-decoration: none;
      font-weight: 650;
    }
  }
</style>
