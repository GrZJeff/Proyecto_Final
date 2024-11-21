import { Schema } from "mongoose";
export interface IUser {
    name:string;
    email:string;
    lastNames:string,
    password:string;
    rol: "administrador" | "client";
}

export interface IQuestion {
    title: String;
    type: "radio" | "checkbox" | "select" | "text",
    isMandatory: boolean,
    questionnarieId: Schema.Types.ObjectId | string;
    }

   export interface IQuestionnaire {
        title: string;
        description: string;
        userId: Schema.Types.ObjectId | string;
      }
      

      export interface IOption {
        title: string;
        questionId: Schema.Types.ObjectId | string;
      }


      export interface IAnswer {
        QuestionnaireId: Schema. Types.ObjectId | string;
        QuestionId: Schema. Types.ObjectId | string;
        answer: string;
        }