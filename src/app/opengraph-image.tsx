import { ImageResponse } from "next/og";

export const alt = "Vanshika Nimwal — CSE Student";
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
          background: "#060A1C",
          color: "#FFFFFF",
          border: "16px solid #FF4FA3",
        }}
      >
        <div style={{ color: "#FF4FA3", fontSize: 28, letterSpacing: 4 }}>STARTING MY NEXT LEVEL</div>
        <div style={{ fontSize: 72, marginTop: 16 }}>VANSHIKA</div>
        <div style={{ fontSize: 72, color: "#FF6EC7" }}>NIMWAL</div>
        <div style={{ fontSize: 28, marginTop: 12, color: "#22D3EE" }}>DREAM CODE BUILD</div>
      </div>
    ),
    { ...size },
  );
}
