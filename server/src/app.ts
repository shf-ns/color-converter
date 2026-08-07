import express, { type Express, type Request, type Response } from "express";
import type { RGB, HSL, HSV, CMYK } from "./types/index.ts";
import cors from "cors";
import {
  rgbToHex,
  rgbToCmyk,
  rgbToHsv,
  rgbToHsl,
} from "./utils/rgbCovertOther.ts";
import {
  hexToRgb,
  hslToRgb,
  hsvToRgb,
  cmykToRgb,
  rgbToRgb,
} from "./utils/covertRgb.ts";

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

  let rgb: { r: number; g: number; b: number } | null = null;

  // 第一步：不管输入是什么格式，先统一转成 RGB
  switch (type) {
    case "hex":
      rgb = hexToRgb(value);
      break;
    case "rgb":
      rgb = rgbToRgb(value); // 本来就是 RGB，直接用
      break;
    case "hsl":
      rgb = hslToRgb(value);
      break;
    case "hsv":
      rgb = hsvToRgb(value);
      break;
    case "cmyk":
      rgb = cmykToRgb(value);
      break;
    default:
      res.status(400).json({ error: "不支持的颜色类型" });
      return;
  }

  if (!rgb) {
    res.status(400).json({ error: "颜色值格式错误" });
    return;
  }

  // 第二步：从 RGB 转出所有格式
  const result: { hex: string; rgb: RGB; cmyk: CMYK; hsl: HSL; hsv: HSV } = {
    hex: rgbToHex(rgb),
    rgb: rgb,
    cmyk: rgbToCmyk(rgb),
    hsl: rgbToHsl(rgb),
    hsv: rgbToHsv(rgb),
  };

  res.json(result);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
