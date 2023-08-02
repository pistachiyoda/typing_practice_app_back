import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LessonService } from './lesson.service';

@UseGuards(JwtAuthGuard)
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}
  @Post('result')
  postResult(@Req() req) {
    return this.lessonService.postResult({ ...req.body, ...req.user });
  }
}
