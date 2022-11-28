import { HttpStatus, Injectable } from "@nestjs/common"

@Injectable()
export class ReturnClass{

    successorNotFoundMessage = (data, objnotfound? ) => {
     

      if(objnotfound == 'notfound' || objnotfound == 'yes' ){

        var status =  HttpStatus.NOT_FOUND;
         var message = "Not Found";
        
      }


    return {
    
      status: status || HttpStatus.ACCEPTED || 200,
      message : message || "Successful",
      error : null,
      data : data 
      
    }
  
  }

  
  
    errorMessage = (error) => {
    return {
      status: HttpStatus.BAD_REQUEST || 400,
      message : "Error Found",
      error : error,
      data : null 
      
    }

  
}

emailalreadyExist = (error, message?) => {
     
return  {

      status: HttpStatus.CONFLICT || 400,
      message : message || "E-mail Already Exist",
      error : error,
      data : null 
  
}

}

}