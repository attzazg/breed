import { HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException, Logger, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersCollection, UsersDocument } from './schema/users.schema';
import { uservalidation } from './user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtsecretKey } from './jwtsecretKey';
import { ReturnClass } from 'src/returnClass';// import class



@Injectable()
export class UserService extends PassportStrategy(Strategy, 'local') {
  private logger = new Logger(UserService.name);
  constructor(@InjectModel(UsersCollection.name) private usersModel: Model<UsersDocument>,
    @Inject(ReturnClass) private returnClass: ReturnClass,

    private jwtService: JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtsecretKey.secret,
    });
  }

  //DTO instance
  //public users : UserType[] =[]; 


  async getall() {

    const result = await this.usersModel.find();

    console.log(result);

    return result;

  }


  async postall(data) {

    try {


      let { username, email, password } = data;

      const usernameLower = username.toLowerCase();
      const emailLower = email.toLowerCase();
      const saltOrRounds = 10;
      const passwordEncrypted = await bcrypt.hash(password, saltOrRounds);

      const result = await new this.usersModel({ ...data, username: usernameLower, email: emailLower, password: passwordEncrypted }).save();

      if (result != null) {

        return this.returnClass.successorNotFoundMessage(result)

      } else {

        return this.returnClass.successorNotFoundMessage(result, 'notfound')
      }


    } catch (error) {

      return error;


    }


  }

  //Show user service  
  async showusersbyID(id) { //Local Instance
    const result = await this.usersModel.findOne({ _id: id });
    // console.log("Services Print=", result);
    return result;

  }


  //Update user service
  async updateuser(id, data) {
    try {


      let { name, username, password, usertype } = data;

      username = username.toLowerCase();
      const saltOrRounds = 10;
      password = await bcrypt.hash(password, saltOrRounds);


      const address = { current_address: data.current_address, permanent_address: data.permanent_address }

      const data1 = { name, username, password, usertype, address };



      const result = await this.usersModel.updateOne({ _id: id }, data1);


      if (result != null) {

        return this.returnClass.successorNotFoundMessage(result)

      } else {

        return this.returnClass.successorNotFoundMessage(result, 'notfound')
      }


    } catch (error) {

      return this.returnClass.emailalreadyExist(error)


    }


  }

  //delete user BY ID
  async deleteuser(id) { //Local Instance
    const result = await this.usersModel.deleteOne({ _id: id });//deleteOne or deleteMany
    return result;
  }


  lowerCase_function(data_array) {

    const result = data_array.map(function (v) {
      return v.toLowerCase();
    });

    return result;

  }


  async signIn(data) {

    const { email, password } = data;

    //findOne return row & get data.password
    //find return array & get data[0].password
    /*if u find multiples records, run data.foreach((row)){console.log(row.password);}*/

    try {

      //const user = await this.validateUser(email, password);
      var user = await this.usersModel.findOne({ email: email });

      if (!user) {
        console.log("Invalid Email");
        return { status: HttpStatus.UNAUTHORIZED, message: "Invalid Email " };

      }

      const matched = await bcrypt.compare(password, user.password);

      if (!matched) {
        console.log("Invalid Password");
        return { status: HttpStatus.UNAUTHORIZED, message: "Invalid Password " };
      }


      console.log("User Login Successfully");

      const payload = { username: user.username, sub: user._id };

      const token = this.jwtService.sign(payload, jwtsecretKey);

      //const verify = this.jwtService.verify(token,jwtsecretKey); //.Verify(), .decode(),.sign()

      return {
        accessToken: token
      };


    } catch (error) {

      console.log(error)
      throw new UnauthorizedException({

        status: HttpStatus.UNAUTHORIZED,
        error: error,
        message: 'UnAuthorized! Please Try Again',
        data: null
      });

    }

  }

  async validateUser(email, password): Promise<any> {

    var user = await this.usersModel.findOne({ email: email });


    if (!user) {
      console.log("Invalid Email");
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: "Invalid Email "
      };

    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {

      console.log("Invalid Password");

      return {
        status: HttpStatus.UNAUTHORIZED,
        message: "Invalid Password ",
        data: null,
      };
    }

    console.log("User Login Successfully");

    return this.returnClass.successorNotFoundMessage(user)
  }


  async addressUpdate(id, data) {
    const addressId = Number("63845d66d3741fde7069ec5a");
    try {

      const user_data = await this.usersModel.findById(id);

      // user_data.address;
      console.log(user_data.address);

      const address = { data }
      console.log(address);

    } catch (error) {
      return this.returnClass.errorMessage(error);
    }

  }
  // single file uploading function- profile Pic
  async profile(id, files) {

    const result = await this.usersModel.updateOne(id, { profile: files.originalname });

    console.log(result);

    return result;

  }

  // multiple file uploading function
  async portfolio(id, files) {

    var title = {};

    const filesdata = await files.map(file => {

      title = {
        name: file.originalname,

      };

      return title;


    });
    // console.log(result1);
    // return result1;

    const result = await this.usersModel.updateOne(id, { portfolio: filesdata });

    console.log(result);

    return result;



  }


}


