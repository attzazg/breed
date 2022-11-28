import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ProjectDto {


    @ApiProperty({
        example : "637c70a42f456393a6a6ffe7",
        description : "USER ID",

    })   
    @IsString()
    // @IsNotEmpty()
    userid: string;


    @ApiProperty({
        example : "Management System",
        description : "Project Name",

    })   
    @IsString()
    // @IsNotEmpty()
    projectname: string;


    @ApiProperty({
        example : "MIS",
        description : "Inventory Management System",

    })   
    @IsString()
    // @IsNotEmpty()
    projectdescription: string;



}
