import { Schema, model } from "mongoose";

interface IQuestionnaire {
  title: string;
  description: string;
  userId: Schema.Types.ObjectId | string;
}

const QuestionnaireSchema = new Schema<IQuestionnaire>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const QuestionnaireModel = model("questionnaires", QuestionnaireSchema);
