import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { content } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { hero } = content.en;
  const dmSerif = await readFile(join(process.cwd(), "src/assets/fonts/dmserif-normal.ttf"));
  const geist = await readFile(join(process.cwd(), "src/assets/fonts/geist-500.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f4ef",
          padding: "80px 88px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#3c5468",
            fontFamily: "Geist",
          }}
        >
          {hero.kicker}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              lineHeight: 1,
              color: "#a19e99",
              fontFamily: "DM Serif Text",
            }}
          >
            {hero.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              maxWidth: 820,
              lineHeight: 1.4,
              color: "#838180",
              fontFamily: "Geist",
            }}
          >
            {hero.subtitle}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Serif Text", data: dmSerif, style: "normal", weight: 400 },
        { name: "Geist", data: geist, style: "normal", weight: 500 },
      ],
    }
  );
}
