import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsersDocument = HydratedDocument<UsersCollection>;//Merge two types cat & documents


@Schema()
export class Address{

    @Prop({required: true})
    current_address: string

    @Prop()
    permanent_address : string 
}

export const AddressSchema = SchemaFactory.createForClass(Address);


@Schema()
export class UsersCollection{

    @Prop({required: true})
    name : string;

    @Prop({required: true})
    username : string;

    @Prop({required: true})
    password: string;

    @Prop({unique: true,required: true})
    email : string;

    @Prop({required: true})
    usertype : string;

    @Prop({type: AddressSchema})
    address : [Address]
}
export const UsersSchema = SchemaFactory.createForClass(UsersCollection);

