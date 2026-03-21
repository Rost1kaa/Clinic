import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(135deg, rgba(244,249,248,1) 0%, rgba(228,242,240,1) 55%, rgba(216,235,232,1) 100%)",
          color: "#123436",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "24px",
              background: "#0c8c8f",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            V
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 700 }}>მედსერვისი</div>
            <div style={{ fontSize: 20, color: "#587273" }}>სამედიცინო ჯგუფი</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: 66, lineHeight: 1.12, fontWeight: 700, maxWidth: "900px" }}>
            სახლში ვიზიტი, ონლაინ კონსულტაცია და კოორდინირებული დიაგნოსტიკა
          </div>
          <div style={{ fontSize: 28, color: "#375253", maxWidth: "850px" }}>
            მულტიდისციპლინური ექიმთა გუნდი, მოქნილი დაჯავშნა და დაცული ადმინისტრაციული არქიტექტურა
          </div>
        </div>
      </div>
    ),
    size,
  );
}
