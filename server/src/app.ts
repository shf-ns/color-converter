import express, { type Express, type Request, type Response } from "express";
import type { RGB, HSL, HSV, CMYK } from "./types/index.ts";
import cors from "cors";
import {
  rgbToHex,
  rgbToCmyk,
  rgbToHsv,
  rgbToHsl,
} from "./utils/rgbCovertOther.ts";
import { hexToRgb, hslToRgb, hsvToRgb, cmykToRgb } from "./utils/covertRgb.ts";

const app: Express = express();

// 解析前端发来的 JSON 请求体（比如 { color: "#dddfe2" }）
app.use(express.json());

// CORS 跨域：允许前端（localhost:5173）调用后端（localhost:3000）
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }),
);

app.post("/api/convert", (req: Request, res: Response) => {
  const { type, value } = req.body;

  let rgb: RGB | null = null;
  let hex: string = "";
  let cmyk: CMYK = { c: 0, m: 0, y: 0, k: 0 };
  let hsl: HSL = { h: 0, s: 0, l: 0 };
  let hsv: HSV = { h: 0, s: 0, v: 0 };

  switch (type) {
    case "hex":
      hex = value;
      rgb = hexToRgb(value);
      break;
    case "rgb":
      const rgbValues: string[] | null = value.split(",");
      const r: number = Number(rgbValues?.[0].slice(4));
      const g: number = Number(rgbValues?.[1].trim());
      const b: number = Number(rgbValues?.[2].trim().slice(0, -1));
      rgb = { r, g, b };
      break;
    case "hsl":
      const hslValues: string[] | null = value.split(",");
      hsl = {
        h: Number(hslValues?.[0].slice(4)),
        s: Number(hslValues?.[1].trim().slice(0, -1)),
        l: Number(hslValues?.[2].trim().slice(0, -2)),
      };
      rgb = hslToRgb(hsl);
      break;
    case "hsv":
      const hsvValues: string[] | null = value.split(",");
      hsv = {
        h: Number(hsvValues?.[0].slice(4)),
        s: Number(hsvValues?.[1].trim().slice(0, -1)),
        v: Number(hsvValues?.[2].trim().slice(0, -2)),
      };
      rgb = hsvToRgb(hsv);
      break;
    case "cmyk":
      const cmykValues: string[] | null = value.split(",");
      cmyk = {
        c: Number(cmykValues?.[0].slice(5, -1)),
        m: Number(cmykValues?.[1].trim().slice(0, -1)),
        y: Number(cmykValues?.[2].trim().slice(0, -1)),
        k: Number(cmykValues?.[3].trim().slice(0, -2)),
      };
      rgb = cmykToRgb(cmyk);
      break;
    default:
      res.status(400).json({ error: "不支持的颜色类型" });
      return;
  }

  if (!rgb) {
    res.status(400).json({ error: "颜色值格式错误" });
    return;
  }

  if (!hex) hex = rgbToHex(rgb);
  if (!hsl.h && !hsl.s && !hsl.l) hsl = rgbToHsl(rgb);
  if (!hsv.h && !hsv.s && !hsv.v) hsv = rgbToHsv(rgb);
  if (!cmyk.c && !cmyk.m && !cmyk.y && !cmyk.k) cmyk = rgbToCmyk(rgb);

  const result = { hex, rgb, cmyk, hsl, hsv };

  res.json(result);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
