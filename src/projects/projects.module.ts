import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectCollection, ProjectSchema } from './schema/projects.schema';
import { ReturnClass } from 'src/returnClass';
//import { UsersCollection, UsersSchema } from './schema/users.schema';

@Module({
  imports: [MongooseModule.forFeature( [ { name: ProjectCollection.name, schema : ProjectSchema }])
],
  controllers: [ProjectsController],
  providers: [ProjectsService, ReturnClass]
})
export class ProjectsModule {}
