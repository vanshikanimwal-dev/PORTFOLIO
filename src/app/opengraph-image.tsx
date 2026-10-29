import { ImageResponse } from "next/og";

export const alt = "Vanshika Nimwal — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "#070312",
          color: "#F5E9FF",
          border: "16px solid #3CFF9E",
        }}
      >
        <div style={{ color: "#FFE94D", fontSize: 28 }}>2026</div>
        <div style={{ fontSize: 72, marginTop: 12, color: "#FF2E9A" }}>PORTFOLIO</div>
        <div style={{ fontSize: 36, marginTop: 12 }}>Vanshika Nimwal</div>
        <div style={{ fontSize: 28, marginTop: 8, color: "#3CFF9E" }}>Software Developer</div>
      </div>
    ),
    { ...size },
  );
}
