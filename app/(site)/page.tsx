import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Video } from "lucide-react";
import { JsonLd } from "@/components/json-ld/json-ld";
import { HomeDiagnosticsSection } from "@/components/sections/home-diagnostics-section";
import { SpecialtiesNavRail } from "@/components/sections/specialties-nav-rail";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/lib/constants/site";
import { getHomePageData } from "@/lib/data/public";
import { formatPhoneHref } from "@/lib/utils/format";
import { absoluteUrl, buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  absoluteTitle: siteConfig.legalName,
  path: "/",
});

const heroPhoneNumber = "+995 555 12 34 56";

export default async function HomePage() {
  const { specialties, siteSettings } = await getHomePageData();

  const featuredSpecialties = specialties.slice(0, 6);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: siteSettings.companyName,
          url: absoluteUrl("/"),
          address: {
            "@type": "PostalAddress",
            streetAddress: siteSettings.address,
            addressCountry: "GE",
          },
          telephone: siteSettings.phone,
          email: siteSettings.email,
        }}
      />

      {/* ─── HERO ─── */}
      {/* section-shell matches the padding-block: 4.5rem used by every other page section */}
      <section
        className="hero-dark-section section-shell"
        style={{ background: "#0a3d2e", overflow: "hidden", position: "relative", minHeight: "520px" }}
      >
        {/* Decorative Georgian watermark */}
        <div
          className="pointer-events-none select-none"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(80px, 14vw, 200px)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.025)",
            whiteSpace: "nowrap",
            lineHeight: 1,
            zIndex: 0,
          }}
          aria-hidden
        >
          მედსერვისი
        </div>

        {/* container-shell: same max-width (84rem) as every other section; width: 85% narrows the hero content */}
        <div className="hero-content container-shell" style={{ position: "relative", zIndex: 5, width: "85%" }}>
          {/* hero-grid: columns + responsive behaviour live in globals.css */}
          <div className="hero-grid">
            {/* LEFT: logo + heading + subtext + buttons */}
            <div
              className="hero-left"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1.75rem",
                paddingRight: "2.5rem",
                flexShrink: 0,
                minWidth: "420px",
              }}
            >
              {/* Logo mark */}
              <div className="hero-label" style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#3dba6f", flexShrink: 0 }} />
                <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "14px", letterSpacing: "0.025em" }}>
                  მედსერვისი
                </span>
              </div>

              {/* H1 — 38px keeps the phrase on 2 lines inside the 420px column */}
              <h1 className="hero-title" style={{ fontWeight: 700, lineHeight: 1.12, fontSize: "38px", margin: 0, whiteSpace: "nowrap" }}>
                <span style={{ color: "#ffffff", display: "block" }}>სამედიცინო მომსახურება იქ,</span>
                <span style={{ color: "#4ade80" }}>სადაც თქვენ</span>{" "}
                <span style={{ color: "#ffffff" }}>ხართ</span>
              </h1>

              {/* Subtext */}
              <p className="hero-description" style={{ color: "#8bbda8", fontSize: "16px", lineHeight: 1.6, margin: 0 }}>
                სხვადასხვა დარგის სპეციალისტები, მობილური დიაგნოსტიკა და მოქნილი
                დაჯავშნა ერთ ციფრულ სივრცეში.
              </p>

              {/* Buttons — nowrap keeps button + phone side by side always */}
              <div className="hero-actions" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1.5rem", flexWrap: "nowrap" }}>
                <Link
                  href="/booking"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    background: "#3dba6f",
                    borderRadius: "50px",
                    padding: "12px 24px",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#ffffff",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  ვიზიტის დაჯავშნა
                  <span aria-hidden>→</span>
                </Link>

                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
                  <Phone style={{ width: 18, height: 18, color: "#3dba6f", flexShrink: 0 }} />
                  <div>
                    <p style={{ color: "#8bbda8", fontSize: "11px", margin: 0, whiteSpace: "nowrap" }}>გინდათ დახმარება?</p>
                    <a
                      href={formatPhoneHref(heroPhoneNumber)}
                      style={{ fontWeight: 700, color: "#ffffff", fontSize: "13px", textDecoration: "none", whiteSpace: "nowrap" }}
                    >
                      (+995 555) 12 34 56
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER: photo is position:absolute inside its own column — never overlaps neighbours */}
            <div className="hero-center hero-image-wrap">
              {/* Left edge blend */}
              <div
                style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "80px", background: "linear-gradient(to right, #0a3d2e, transparent)", zIndex: 2, pointerEvents: "none" }}
                aria-hidden
              />
              {/* Right edge blend */}
              <div
                style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "80px", background: "linear-gradient(to left, #0a3d2e, transparent)", zIndex: 2, pointerEvents: "none" }}
                aria-hidden
              />
              {/* Bottom edge blend */}
              <div
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, #0a3d2e, transparent)", zIndex: 2, pointerEvents: "none" }}
                aria-hidden
              />
              <Image
                id="hero-photo"
                src="/hero-photo.png"
                alt="ექიმი პაციენტთან კონსულტაციაზე"
                width={1270}
                height={953}
                className="hero-photo"
                priority
              />
            </div>

            {/* RIGHT: service blocks */}
            <div
              className="hero-right hero-info"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "2.5rem",
              }}
            >
              {/* Block 1 — მომსახურება ადგილზე */}
              <div style={{ paddingBottom: "1.375rem" }}>
                <MapPin style={{ width: 18, height: 18, color: "#3dba6f", marginBottom: "0.625rem", display: "block" }} />
                <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "15px", marginBottom: "0.375rem" }}>
                  მომსახურება ადგილზე
                </div>
                <p style={{ color: "#7eb89a", fontSize: "13px", lineHeight: 1.55, margin: 0 }}>
                  ექიმის, ექთნის ვიზიტი, ლაბორატორიული და ინსტრუმენტული დიაგნოსტიკა
                </p>
              </div>

              {/* Separator */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "1.375rem" }} />

              {/* Block 2 — ონლაინ კონსულტაცია */}
              <div>
                <Video style={{ width: 18, height: 18, color: "#3dba6f", marginBottom: "0.625rem", display: "block" }} />
                <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "15px", marginBottom: "0.375rem" }}>
                  ონლაინ კონსულტაცია
                </div>
                <p style={{ color: "#7eb89a", fontSize: "13px", lineHeight: 1.55, margin: 0 }}>
                  ვიდეოკონფერენციის საშუალებით, სმარტფონისა და კომპიუტერის გამოყენებით.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white/45">
        <div className="container-shell space-y-10">
          <SectionHeader
            eyebrow="სპეციალობები"
            title="ერთიანი სამედიცინო გუნდი"
            description="კოორდინირებული და მოქნილი მომსახურება ერთ სივრცეში."
            align="center"
            className="max-w-[46rem]"
          />
          <SpecialtiesNavRail specialties={featuredSpecialties} />
        </div>
      </section>
      <HomeDiagnosticsSection />
    </>
  );
}
