import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { userSignIn, uservalidation, uservalidationUpdate } from './user.dto';
import { UserService } from './user.service';


@ApiTags('User')
@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  getall() {
    return this.userService.getall();
  }

  @Post("/add")
  // @UseGuards(AuthGuard('local'))

  @ApiCreatedResponse({
    description: "Created User Successfully",

  })
  postall(@Body() data: uservalidation) {
    return this.userService.postall(data);
  }

  @Get("/show/:id")
  // @UseGuards(AuthGuard('local'))

  getallusers(@Param('id') id: string) {
    return this.userService.showusersbyID(id);
  }

  @Put("/update/:id")
  // @UseGuards(AuthGuard('local'))

  edituser(@Param('id') id: string, @Body() data: uservalidationUpdate) {

    return this.userService.updateuser(id, data);
  }

  @Delete("/delete/:id")
  @UseGuards(AuthGuard('local'))

  deleteuser(@Param('id') userid: string) {
    return this.userService.deleteuser(userid);
  }


  @Post("/signin")
  @ApiAcceptedResponse({

  })

  signIn(@Body() data: userSignIn) {

    return this.userService.signIn(data);
  }

   //single file uploading function - ProfilePic
   @Post('/profile')
   //FileInterceptor for Single file Uplaod and FilesInterceptor for Multipe Files 
   @UseInterceptors(FileInterceptor('file', {
     storage: diskStorage({
       destination: './files',
       filename: (req, file, callback) => {
         const filename = Date.now() + '-' + file.originalname;
         callback(null, filename)
       },
     }),
   }),
 
   )
   //UploadedFile() for Single file Uplaod and UploadedFiles() for Multipe Files 
   profile(@UploadedFile() file: Express.Multer.File, @Body() id: string) {

     return this.userService.profile(id, file);
 
   }

  // multiple file uploading function-portfolio
  @Post('/portfolio')
  //FileInterceptor for Single file Uplaod and FilesInterceptor for Multipe Files 
  @UseInterceptors(FilesInterceptor('file', 3, {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const filename = Date.now() + '-' + file.originalname;
        callback(null, filename)
      },
    }),
  }),

  )
  //UploadedFile() for Single file Uplaod and UploadedFiles() for Multipe Files 
  portfolio(@UploadedFiles() files: Array<Express.Multer.File>, @Body() id: string) {

    return this.userService.portfolio(id, files);

  }

}


