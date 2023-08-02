import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PrismaModule, AuthModule, LessonModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
