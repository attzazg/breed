import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UsersCollection, UsersSchema } from './schema/users.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtsecretKey } from './jwtsecretKey';
import { ReturnClass } from 'src/returnClass';


@Module({
  imports: [MongooseModule.forFeature( [ { name: UsersCollection.name, schema : UsersSchema }]),
  PassportModule, 
  JwtModule.register({
    secret: jwtsecretKey.secret,
    signOptions: { expiresIn: '60s' },
  }),
 ],

 controllers: [UserController],
  providers: [
    UserService,
    ReturnClass,
    JwtService],
})

export class UserModule {}
