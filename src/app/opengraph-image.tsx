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
          background: "#05010A",
          color: "#F5E9FF",
        }}
      >
        <div style={{ color: "#FF6EC7", fontSize: 28, letterSpacing: 6 }}>VN// CYBERPUNK DEVELOPER</div>
        <div style={{ fontSize: 84, marginTop: 16, color: "#FF2E9A" }}>Vanshika Nimwal</div>
        <div style={{ fontSize: 32, marginTop: 12, color: "#CDB6E8" }}>Software Developer · Greater Noida</div>
      </div>
    ),
    { ...size },
  );
}
