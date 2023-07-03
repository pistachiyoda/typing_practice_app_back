import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000', // フロントエンドをデプロイした後、そのURLに変更する
  });
  await app.listen(3005);
}
bootstrap();
