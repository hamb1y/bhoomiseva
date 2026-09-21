<script lang="ts">
  interface Field {
    name: string;
    label: string;
    type?: "text" | "email" | "tel" | "textarea" | "select";
    required?: boolean;
    placeholder?: string;
    options?: string[];
  }

  interface Props {
    fields: Field[];
    /** If set, POST JSON here. Otherwise fall back to WhatsApp / email handoff. */
    endpoint?: string;
    fallbackWhatsapp?: string;
    fallbackEmail?: string;
    submitLabel: string;
    sendingLabel: string;
    successMessage: string;
    errorMessage: string;
    invalidEmailMessage: string;
    orContactLabel?: string;
    contactEmail?: string;
    contactWhatsapp?: string;
    formName: string;
  }

  let {
    fields,
    endpoint,
    fallbackWhatsapp,
    fallbackEmail,
    submitLabel,
    sendingLabel,
    successMessage,
    errorMessage,
    invalidEmailMessage,
    orContactLabel,
    contactEmail,
    contactWhatsapp,
    formName,
  }: Props = $props();

  let values = $state<Record<string, string>>({});
  let status = $state<"idle" | "sending" | "success" | "error">("idle");
  let errors = $state<Record<string, string>>({});
  let honeypot = $state("");

  function composeMessage(): string {
    const lines = fields.filter((f) => values[f.name]).map((f) => `${f.label}: ${values[f.name]}`);
    return `[${formName}]\n${lines.join("\n")}`;
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = (values[field.name] ?? "").trim();
      if (field.required && !value) next[field.name] = field.label;
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        next[field.name] = invalidEmailMessage;
      }
    }
    errors = next;
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (honeypot) return;
    if (!validate()) return;

    status = "sending";
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ form: formName, ...values }),
        });
        if (!response.ok) throw new Error("Request failed");
      } else {
        const message = composeMessage();
        const target = fallbackWhatsapp
          ? `${fallbackWhatsapp}?text=${encodeURIComponent(message)}`
          : fallbackEmail
            ? `mailto:${fallbackEmail}?subject=${encodeURIComponent(formName)}&body=${encodeURIComponent(message)}`
            : null;
        if (target) window.open(target, "_blank", "noopener");
      }
      status = "success";
    } catch {
      status = "error";
    }
  }
</script>

<form onsubmit={handleSubmit} novalidate>
  {#each fields as field (field.name)}
    <div class="field" class:has-error={errors[field.name]}>
      <label for={`${formName}-${field.name}`}>
        {field.label}{#if field.required}<span class="req" aria-hidden="true">*</span>{/if}
      </label>

      {#if field.type === "textarea"}
        <textarea
          id={`${formName}-${field.name}`}
          bind:value={values[field.name]}
          placeholder={field.placeholder ?? ""}
          rows="5"
          required={field.required}
          aria-invalid={errors[field.name] ? "true" : undefined}></textarea>
      {:else if field.type === "select"}
        <select
          id={`${formName}-${field.name}`}
          bind:value={values[field.name]}
          required={field.required}
          aria-invalid={errors[field.name] ? "true" : undefined}
        >
          <option value=""></option>
          {#each field.options ?? [] as option (option)}
            <option value={option}>{option}</option>
          {/each}
        </select>
      {:else}
        <input
          id={`${formName}-${field.name}`}
          type={field.type ?? "text"}
          bind:value={values[field.name]}
          placeholder={field.placeholder ?? ""}
          required={field.required}
          aria-invalid={errors[field.name] ? "true" : undefined}
        />
      {/if}

      {#if errors[field.name]}
        <p class="error">{errors[field.name]}</p>
      {/if}
    </div>
  {/each}

  <div class="hp" aria-hidden="true">
    <label for={`${formName}-company`}>Company</label>
    <input id={`${formName}-company`} tabindex="-1" autocomplete="off" bind:value={honeypot} />
  </div>

  <div class="submit-row">
    <button class="btn btn--primary" type="submit" disabled={status === "sending"}>
      {status === "sending" ? sendingLabel : submitLabel}
    </button>

    {#if status === "success"}
      <p class="note success" role="status">{successMessage}</p>
    {:else if status === "error"}
      <p class="note error" role="alert">{errorMessage}</p>
    {/if}
  </div>

  {#if orContactLabel && (contactEmail || contactWhatsapp)}
    <p class="alt">
      {orContactLabel}
      {#if contactWhatsapp}<a href={contactWhatsapp}>WhatsApp</a>{/if}
      {#if contactWhatsapp && contactEmail}<span> · </span>{/if}
      {#if contactEmail}<a href={`mailto:${contactEmail}`}>{contactEmail}</a>{/if}
    </p>
  {/if}
</form>

<style>
  form {
    display: grid;
    gap: var(--s-5);
    max-width: 42rem;
  }
  .field {
    display: grid;
    gap: var(--s-2);
  }
  label {
    font-family: var(--font-mono);
    font-size: var(--step--1);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-2);
  }
  .req {
    color: var(--clay);
    margin-left: 0.2em;
  }
  input,
  textarea,
  select {
    width: 100%;
    background: var(--paper-raised);
    border: 1px solid var(--rule-strong);
    border-radius: var(--r-2);
    padding: 0.7em 0.85em;
    font-family: var(--font-body);
    font-size: var(--step-0);
    color: var(--ink);
    transition: border-color var(--dur-1) var(--ease-out);
  }
  textarea {
    resize: vertical;
  }
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%235c4b3d' stroke-width='1.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.9rem center;
    padding-right: 2.4em;
  }
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--clay);
    outline-offset: 1px;
    border-color: var(--clay);
  }
  .has-error input,
  .has-error textarea,
  .has-error select {
    border-color: var(--rose);
  }
  .error {
    margin: 0;
    color: var(--rose);
    font-size: var(--step--1);
  }
  .submit-row {
    display: flex;
    align-items: center;
    gap: var(--s-4);
    flex-wrap: wrap;
  }
  .btn[disabled] {
    opacity: 0.6;
    cursor: progress;
  }
  .note {
    margin: 0;
    font-size: var(--step--1);
  }
  .note.success {
    color: var(--leaf-deep);
  }
  .note.error {
    color: var(--rose);
  }
  .alt {
    margin: 0;
    font-size: var(--step--1);
    color: var(--ink-3);
  }
  .alt a {
    color: var(--ink-2);
  }
  .hp {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }
</style>
