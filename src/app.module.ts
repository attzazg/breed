import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';


@Module({
  imports: [
    UserModule,
    ProjectsModule,
    ConfigModule.forRoot( { 
      isGlobal : true,
      envFilePath : '.local.env',
      //envFilePath : '.production.env',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/usersDB'),
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
