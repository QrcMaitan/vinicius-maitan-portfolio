import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const frauncesItalic = await readFile(
    join(process.cwd(), "src/assets/fonts/fraunces-italic.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0a",
          color: "#f1eee6",
          fontSize: 17,
          fontFamily: "Fraunces",
          letterSpacing: "-0.5px",
        }}
      >
        vm
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: frauncesItalic, style: "italic", weight: 400 }],
    }
  );
}
