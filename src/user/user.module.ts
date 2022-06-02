import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/auth/constants';
@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3600s' },
  }),
  ],
  providers: [UserService,JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
