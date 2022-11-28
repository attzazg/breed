import { Get, HttpStatus, Inject, Injectable, Post, Request, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose } from 'mongoose';
import { ReturnClass } from 'src/returnClass';// import class
import { UsersCollection } from 'src/users/schema/users.schema';
import { ProjectDto } from './dto/project.dto';
import { ProjectCollection } from './schema/projects.schema';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(ProjectCollection.name) private projectModel: Model<ProjectCollection>,
    @Inject(ReturnClass) private returnClass: ReturnClass,
   ) {//create obj of import class

  }

  async create(@Request() data: ProjectDto) {

    try {
      const userid = new mongoose.Types.ObjectId(data.userid);
      const updatedDataObject = {...data, userid}
      const result = await new this.projectModel(updatedDataObject).save();
      console.log(result);

      if (result != null) {

        return this.returnClass.successorNotFoundMessage(result)

      } else {

        return this.returnClass.successorNotFoundMessage(result,'notfound')

      }

    } catch (error) {

      return this.returnClass.errorMessage(error);

    }


  }

  @Get()

  async findAll() {
    try {
      const result = await this.projectModel.find()
      .sort({_id: 1}) //order by id DESC 
      .skip(0)
      .limit(0);//limit 1 

      if (result[0] != null) {

        return this.returnClass.successorNotFoundMessage(result)

      } else {

        return this.returnClass.successorNotFoundMessage(result, 'notfound')


      }



    } catch (error) {

      return this.returnClass.errorMessage(error);



    }

  }

  async findOne(id: string) {

    try {
      const result = await this.projectModel.findOne({ _id: id})
      .select('projectname createdAt')
      .populate('userid')
      .populate('teamlead', 'name username' )
      .exec();

      if (result) {

        return this.returnClass.successorNotFoundMessage(result)

      } else {

        return this.returnClass.successorNotFoundMessage(result, 'notfound')

      }


    } catch (error) {

      return this.returnClass.errorMessage(error);


    }


  }

  async update(id: string, data: ProjectDto) {
    try {

      const result = await this.projectModel.updateOne({ _id: id }, data);

      if (result.matchedCount != 0) {

        return this.returnClass.successorNotFoundMessage(result)

      } else {

        return this.returnClass.successorNotFoundMessage(result, 'notfound')

      }

    } catch (error) {

      return this.returnClass.errorMessage(error);


    }


  }




  async remove(id: string) {

    try {


      const result = await this.projectModel.deleteOne({ _id: id });

      if (result.deletedCount != 0) {

        return this.returnClass.successorNotFoundMessage(result)

      } else {

        return this.returnClass.successorNotFoundMessage(result, 'notfound')


      }

    } catch (error) {

      return this.returnClass.errorMessage(error);

    }


  }


  async findAllbyUsers(id){
    
    try {
      const newId = new mongoose.Types.ObjectId(id)

      const result = await this.projectModel.find({userid: newId})
      .populate('userid','name username')
      .populate('teamlead','name username active')

      // console.log(result)


      if (result) {

        return this.returnClass.successorNotFoundMessage(result)

      } else {

        return this.returnClass.successorNotFoundMessage(result, 'notfound')


      }
     
    } catch (error) {

      return this.returnClass.errorMessage(error);
    }

  }
}
