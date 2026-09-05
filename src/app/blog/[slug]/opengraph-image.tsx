import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import meta from "@/data/meta.json";
import { getPosts, getPost, formatDate } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post by Mikheil Berishvili";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

const asset = (file: string) => join(process.cwd(), "src/app/_og-fonts", file);

export default async function PostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, regular, bold] = await Promise.all([
    getPost(slug),
    readFile(asset("DMSans-Regular.ttf")),
    readFile(asset("DMSans-Bold.ttf")),
  ]);

  const title = post?.title ?? "Blog";
  const tags = post?.tags.slice(0, 4).join("  ·  ") ?? "";
  const date = post ? formatDate(post.date) : "";

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
            justifyContent: "space-between",
            fontSize: 22,
            fontWeight: 500,
            color: "#3B5B8C",
          }}
        >
          <div style={{ display: "flex", letterSpacing: 2 }}>ARTICLE</div>
          <div style={{ display: "flex", color: "#9C958D" }}>{date}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 46 ? 62 : 74,
            fontWeight: 700,
            color: "#1A1A1A",
            letterSpacing: -2,
            lineHeight: 1.12,
            maxWidth: 1010,
          }}
        >
          {title}
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
            <div style={{ display: "flex" }}>{tags}</div>
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
