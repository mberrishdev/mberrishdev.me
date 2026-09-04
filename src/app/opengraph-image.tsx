import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import meta from "@/data/meta.json";

export const alt =
  "Mikheil Berishvili — Full-Stack Developer building scalable systems with .NET, React and cloud technologies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Assets live alongside this route: satori decodes PNG/JPEG only — not WebP. */
const asset = (file: string) => join(process.cwd(), "src/app/_og-fonts", file);

export default async function OpengraphImage() {
  const [regular, bold, avatar] = await Promise.all([
    readFile(asset("DMSans-Regular.ttf")),
    readFile(asset("DMSans-Bold.ttf")),
    readFile(asset("avatar-og.png")),
  ]);

  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F0E8",
          padding: "72px 80px",
          fontFamily: "DM Sans",
        }}
      >
        {/* Top row: avatar + availability */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            width={132}
            height={132}
            style={{ borderRadius: 132, objectFit: "cover" }}
            alt=""
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(59, 91, 140, 0.10)",
              color: "#3B5B8C",
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                marginRight: 12,
                background: "#3B5B8C",
              }}
            />
            Available for opportunities
          </div>
        </div>

        {/* Name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Mikheil Berishvili
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 34,
              color: "#6B6560",
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Full-Stack Developer building scalable systems with .NET, React and
            cloud technologies.
          </div>
        </div>

        {/* Bottom rule + domain */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 1,
              width: "100%",
              background: "rgba(0, 0, 0, 0.10)",
              marginBottom: 24,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 24,
              color: "#9C958D",
            }}
          >
            <div style={{ display: "flex", color: "#3B5B8C", fontWeight: 500 }}>
              {meta.siteUrl.replace("https://", "")}
            </div>
            <div style={{ display: "flex" }}>
              .NET · C# · React · TypeScript · Azure
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: regular, weight: 400, style: "normal" },
        { name: "DM Sans", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
