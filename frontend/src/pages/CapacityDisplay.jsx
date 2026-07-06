const CapacityDisplay = ({ registered, capacity }) => {
  if (!capacity) return null;

  const pct = Math.min(100, Math.round((registered / capacity) * 100));
  const spotsLeft = Math.max(0, capacity - registered);

  const status =
    pct >= 100
      ? { label: "Full", badge: "bg-maroon/10 text-maroon", bar: "bg-maroon" }
      : pct >= 80
      ? { label: "Almost full", badge: "bg-amber-50 text-amber-700", bar: "bg-amber-500" }
      : { label: "Open", badge: "bg-green-50 text-green-700", bar: "bg-green-600" };

  return (
    <div className="rounded-2xl border border-line bg-paper overflow-hidden">
      <div className="px-5 py-3 bg-cream border-b border-line">
        <span className="text-sm font-medium text-ink">Details</span>
      </div>

      <div className="px-5 py-4 flex items-center justify-between border-b border-line">
        <span className="text-sm text-ink-soft">Status</span>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.badge}`}>
          {status.label}
        </span>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-ink-soft">Seats filled</span>
          <span className="text-sm font-medium text-ink">
            {registered} of {capacity}
          </span>
        </div>
        <div className="h-2 rounded-full bg-line overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${status.bar}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-ink-soft">
          {spotsLeft === 0 ? "No spots left" : `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left`}
        </p>
      </div>
    </div>
  );
};

export default CapacityDisplay;