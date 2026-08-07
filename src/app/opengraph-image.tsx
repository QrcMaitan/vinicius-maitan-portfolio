import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { content } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { hero } = content.en;
  const fraunces = await readFile(join(process.cwd(), "src/assets/fonts/fraunces-normal.ttf"));

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
            fontFamily: "Consolas, monospace",
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
              color: "#1c1b17",
              fontFamily: "Fraunces",
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
              color: "#5b584e",
              fontFamily: "Verdana, sans-serif",
            }}
          >
            {hero.subtitle}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: fraunces, style: "normal", weight: 400 }] }
  );
}
