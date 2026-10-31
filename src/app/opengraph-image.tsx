import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AH | Ameer Hosein";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#100e0c",
          color: "#f6f1ea",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 42, letterSpacing: 8 }}>AH</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1 }}>Ameer Hosein</div>
          <div style={{ marginTop: 18, fontSize: 28, color: "#ff4d5a" }}>
            Photographer | Content Creator | Leader
          </div>
        </div>
      </div>
    ),
    size,
  );
}
