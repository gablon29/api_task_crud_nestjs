import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Roles } from './roles.enum';

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
    validateToken.then((res) => {
      res.iat = new Date(res.iat * 1000);
      res.exp = new Date(res.exp * 1000);
      res.roles = [Roles.ADMIN];
    });
    console.log(validateToken);
    return true;
  }
}
