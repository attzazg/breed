import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, isArray, IsEmail, IsNotEmpty, IsNumber, isString, IsString, ValidateNested, ValidationTypes } from "class-validator";

export interface UserType {

    name: string,
    username: string,
    password: string
    email: string,
    usertype: string
}

export class Address {


    @ApiProperty({
        example: "rawalpindi",
        description: "Insert Current address"

    })

    @IsString()
    // @IsNotEmpty()

    current_address: string;


    @ApiProperty({
        example: "rawalpindi",
        description: "Insert Permanent address"

    })

    @IsString()
    // @IsNotEmpty()

    permanent_address: string;


}

export class userSignIn {

    @ApiProperty({
        example: "attzazg@gmail.com",
        description: "Insert Valid E-mail ID"

    })

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: "123",
        description: "Insert Valid Password"

    })

    @IsString()
    @IsNotEmpty()
    password: string;

}

export class uservalidation {

    @ApiProperty({
        example: "Muhammad Attzaz Khan",
        description: "Add Your Name",

    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "attzazkhan",
        description: "Add username",

    })

    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        example: "attzaz@123",
        description: "Add Your Password - HASHED"

    })


    @IsString()
    @IsNotEmpty()
    password: string;


    @ApiProperty({
        example: "attzaz@gmail.com",
        description: "Add Your E-mail ID"

    })

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: "admin",
        description: "Add user role admin or user"

    })

    @IsString()
    // @IsNotEmpty()
    usertype: string;



    @ApiProperty({
        type: [Address]

    })

    @IsArray()
    @ValidateNested()
    @Type(() => Address)
    address: Address;




}

export class uservalidationUpdate {

    @ApiProperty({
        example: "Muhammad Attzaz Khan",
        description: "Add Your Name",

    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "attzazkhan",
        description: "Add username",

    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        example: "attzaz@123",
        description: "Add Your Password - HASHED"

    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: "admin",
        description: "Add user role admin or user"

    })

    @IsString()
    // @IsNotEmpty()
    usertype: string;


    @ApiProperty({
        example: "rawalpindi",
        description: "Insert Current address"

    })
    @IsString()
    // @IsNotEmpty()
    current_address: string;


    @ApiProperty({
        example: "rawalpindi",
        description: "Insert Permanent address"

    })
    @IsString()
    // @IsNotEmpty()
    permanent_address: string;


}

export class addressDTo {


    @ApiProperty({
        type: [Address]

    })

    @ValidateNested()
    address: Address

}



