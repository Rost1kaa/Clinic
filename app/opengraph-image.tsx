import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function OgBrandMark() {
  return (
    <svg viewBox="0 0 320 320" width="72" height="72" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="og-brand-clip">
          <circle cx="160" cy="160" r="108" />
        </clipPath>
      </defs>
      <circle cx="160" cy="160" r="112" fill="none" stroke="#2ac83e" strokeWidth="4" />
      <circle cx="160" cy="160" r="108" fill="#2ac83e" />
      <polyline
        points="60,160 95,160 115,120 138,200 158,100 178,220 198,160 260,160"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#og-brand-clip)"
      />
    </svg>
  );
}

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
            "linear-gradient(135deg, rgba(248,252,248,1) 0%, rgba(234,248,235,1) 55%, rgba(223,241,226,1) 100%)",
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <OgBrandMark />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 700 }}>მედსერვისი</div>
            <div style={{ fontSize: 20, color: "#5b7360" }}>სამედიცინო ჯგუფი</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: 66, lineHeight: 1.12, fontWeight: 700, maxWidth: "900px" }}>
            სახლში ვიზიტი, ონლაინ კონსულტაცია და კოორდინირებული დიაგნოსტიკა
          </div>
          <div style={{ fontSize: 28, color: "#35503b", maxWidth: "850px" }}>
            მულტიდისციპლინური ექიმთა გუნდი, მოქნილი დაჯავშნა და დაცული ადმინისტრაციული
            არქიტექტურა
          </div>
        </div>
      </div>
    ),
    size,
  );
}
