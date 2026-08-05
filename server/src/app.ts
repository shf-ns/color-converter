import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';

const app: Express = express();

// 解析前端发来的 JSON 请求体（比如 { color: "#dddfe2" }）
app.use(express.json());

// CORS 跨域：允许前端（localhost:5173）调用后端（localhost:3000）
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST']
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
