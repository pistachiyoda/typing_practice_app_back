import { Injectable } from '@nestjs/common';
import { LessonResult } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async postResult(lessonResult: {
    email: string;
    lessonNo: number;
    missCount: number;
    time: number;
    speed: number;
  }): Promise<LessonResult> {
    const user = await this.prisma.user.findUnique({
      where: { email: lessonResult.email },
    });
    return this.prisma.lessonResult.create({
      data: {
        userId: user.id,
        lessonNo: lessonResult.lessonNo,
        missCount: lessonResult.missCount,
        time: lessonResult.time,
        speed: lessonResult.speed,
      },
    });
  }
}
