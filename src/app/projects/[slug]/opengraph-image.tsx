import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import meta from "@/data/meta.json";
import { pagedProjects, getProjectBySlug } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project by Mikheil Berishvili";

export function generateStaticParams() {
  return pagedProjects.map((p) => ({ slug: p.slug }));
}

const asset = (file: string) => join(process.cwd(), "src/app/_og-fonts", file);

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // params is a Promise in Next 15+; reading .slug off it directly yields
  // undefined and silently renders the fallback card for every project.
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const [regular, bold] = await Promise.all([
    readFile(asset("DMSans-Regular.ttf")),
    readFile(asset("DMSans-Bold.ttf")),
  ]);

  const title = project?.title ?? "Projects";
  const tagline = project?.tagline ?? "";
  const stack = project?.technologies.slice(0, 5).join(" · ") ?? "";

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
          PROJECT
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          {tagline && (
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 32,
                color: "#6B6560",
                lineHeight: 1.35,
                maxWidth: 940,
              }}
            >
              {tagline}
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
            <div style={{ display: "flex" }}>{stack}</div>
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
