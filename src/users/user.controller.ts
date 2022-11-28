import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { addressDTo, userSignIn, uservalidation, uservalidationUpdate } from './user.dto';
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
    description: "User Login Successfully!"

  })

  signIn(@Body() data: userSignIn) {

    return this.userService.signIn(data);
  }


  @Post("/address/:id")
  @ApiAcceptedResponse({
    description: "address update Successfully!"

  })

  address(@Param('id') id: string, @Body() data: addressDTo) {

    return this.userService.addressUpdate(id, data);
  }
 
  

}



