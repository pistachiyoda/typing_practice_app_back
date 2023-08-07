import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  // デプロイ後、デプロイ環境に合わせてhttpsOptionsを変更する(削除？)
  // const httpsOptions = {
  //   key: fs.readFileSync('localhost-key.pem'),
  //   cert: fs.readFileSync('localhost.pem'),
  // };

  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
    // httpsOptions,
  });
  app.enableCors({
    credentials: true,
    origin: [
      'https://localhost:3001', // フロントエンドをデプロイした後、そのURLに変更する
      'https://typing-practice-app-front.vercel.app/',
    ],
  });
  app.use(cookieParser());
  const port = process.env.PORT || 3005;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
