import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async validateToken(token: string): Promise<boolean> {
    // Here you should validate the token
    const secret = process.env.JWT_SECRET;
    try {
      const decoded = await this.jwtService.verify(token, { secret });
      decoded.roles = decoded.roles || [Role.USER];
      decoded.iat = new Date(decoded.iat * 1000);
      decoded.exp = new Date(decoded.exp * 1000);
      return decoded;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      throw new UnauthorizedException('token verify failed');
    }
  }
}
