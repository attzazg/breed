import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { UsersCollection } from "../../users/schema/users.schema";


export type ProjectDocument = HydratedDocument<ProjectCollection>;//Merge two types cat & documents


@Schema({timestamps: true})//timestamp for createdAt and updatedAt

export class ProjectCollection{

    @Prop({type: Types.ObjectId, ref: UsersCollection.name, required: true, index: true})
    userid: string;

    @Prop({required: true})
    projectname: string;

    @Prop({required: true})
    projectdescription: string;

    @Prop({type: Boolean, required: true, default : true})
    active: boolean
    
    // @Prop({type : String, enum: ['super','admin', 'user','guest'], default : 'guest' })
    
    @Prop({ type : mongoose.Types.ObjectId, ref : UsersCollection.name, default : "null"})
    teamlead : string

    @Prop({type: Date})
    createdAt: Date

    @Prop()
    updatedAt: Date
 
}

export const  ProjectSchema = SchemaFactory.createForClass(ProjectCollection);

//pro schema calling
ProjectSchema.pre('find', function(next) {

   // this.find({active: true})
    next()

})

