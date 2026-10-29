export function Marquee({ text }: { text: string }) {
  const chunk = `${text} ★ `;
  const line = chunk.repeat(10);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  );
}
