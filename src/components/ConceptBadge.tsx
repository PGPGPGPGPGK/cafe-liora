/** Discreet, always-visible reminder that this is a speculative concept. */
export default function ConceptBadge({ dark }: { dark: boolean }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[0.5rem] font-light uppercase tracking-[0.18em] transition-colors ${
        dark ? 'border-espresso/30 text-espresso/70' : 'border-ivory/40 text-ivory/80'
      }`}
    >
      Concept preview
    </span>
  );
}
