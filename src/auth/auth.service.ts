import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // あとでPromiseの型をちゃんとしたやつに変更する
  async signUp(dto: AuthDto): Promise<any> {
    const bcryptHashedPassword = await bcrypt.hash(dto.password, 10);
    try {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: bcryptHashedPassword,
        },
      });
      return 'success';
    } catch (error) {
      // エラーハンドリングの正しい書き方を調べる
      return error;
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (isValid) {
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: AuthDto): Promise<any> {
    // payloadに含めるべき情報を考える
    const payload = { email: dto.email };
    return this.jwtService.sign(payload);
  }
}
