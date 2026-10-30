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
          background: "#060A1C",
          color: "#FF4FA3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          border: "2px solid #3CFF9E",
        }}
      >
        ♥
      </div>
    ),
    { ...size },
  );
}
