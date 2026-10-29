type Props = {
  rows: readonly string[];
  palette: Record<string, string>;
  title?: string;
  className?: string;
};

export function PixelSprite({ rows, palette, title, className }: Props) {
  const width = Math.max(...rows.map((row) => row.length));
  const height = rows.length;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className ? `pixel-sprite ${className}` : "pixel-sprite"}
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rows.map((row, y) =>
        [...row].map((cell, x) =>
          cell === "." || cell === " " ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={palette[cell] ?? "transparent"} />
          ),
        ),
      )}
    </svg>
  );
}
