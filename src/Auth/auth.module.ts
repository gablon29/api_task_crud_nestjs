import { Module } from '@nestjs/common';
import { UserModule } from 'src/Users/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
