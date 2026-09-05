import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import meta from "@/data/meta.json";
import { getPosts } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog — Mikheil Berishvili";

const asset = (file: string) => join(process.cwd(), "src/app/_og-fonts", file);

export default async function BlogOgImage() {
  const [posts, regular, bold] = await Promise.all([
    getPosts(),
    readFile(asset("DMSans-Regular.ttf")),
    readFile(asset("DMSans-Bold.ttf")),
  ]);

  const topics = [...new Set(posts.flatMap((p) => p.tags))].slice(0, 5).join("  ·  ");

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
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 500,
            color: "#3B5B8C",
            letterSpacing: 2,
          }}
        >
          BLOG
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: -2,
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            Notes on SignalR, .NET and real-time systems
          </div>
          {topics && (
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 26,
                color: "#6B6560",
              }}
            >
              {topics}
            </div>
          )}
        </div>

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
              fontSize: 23,
              color: "#9C958D",
            }}
          >
            <div style={{ display: "flex", color: "#3B5B8C", fontWeight: 500 }}>
              {meta.name}
            </div>
            <div style={{ display: "flex" }}>
              {meta.siteUrl.replace("https://", "")}/blog
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
