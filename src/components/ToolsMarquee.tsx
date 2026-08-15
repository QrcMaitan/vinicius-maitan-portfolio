type TagItem = { label: string; active?: boolean };

export default function ToolsMarquee({ items }: { items: TagItem[] }) {
  const track = [...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-white py-6">
      <div className="flex w-max items-center gap-4 animate-marquee has-[:hover]:[animation-play-state:paused]">
        {track.map((item, i) => (
          <span
            key={`${item.label}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-sm tracking-[-0.02em] transition-colors hover:border-blue-300 hover:bg-blue-300 hover:text-white ${
              item.active ? "border-blue-200 text-blue-200" : "border-hairline text-lg-subtitle"
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
