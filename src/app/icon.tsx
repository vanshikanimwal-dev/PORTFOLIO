import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "32px",
          height: "32px",
          background: "#05010A",
          color: "#FF2E9A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: -0.5,
          border: "2px solid #FF2E9A",
        }}
      >
        VN
      </div>
    ),
    { ...size },
  );
}
