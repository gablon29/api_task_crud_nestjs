import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateToken(token: string): Promise<boolean> {
    // Here you should validate the token
    const secret = process.env.JWT_SECRET;
    const validateToken = this.jwtService.verifyAsync(token, { secret });
    if (!validateToken) {
      return false;
    }
    return true;
  }
}
