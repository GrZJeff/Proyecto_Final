import { Schema, model } from "mongoose";

interface IOption {
  title: string;
  questionId: Schema.Types.ObjectId | string;
}

const OptionSchema = new Schema<IOption>({
  title: {
    type: String,
    required: true,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "questions",
    required: true,
  },
});

export const OptionModel = model("options", OptionSchema);
