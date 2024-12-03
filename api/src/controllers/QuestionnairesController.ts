import { Request, Response } from "express";
import { OptionModel } from "../models/OptionsModel";
import { QuestionModel } from "../models/QuestionsModel";
import { QuestionnaireModel } from "../models/QuestionnairesModel";

export const createOption = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, questionId } = req.body;

        if (!title || !questionId) {
            res.status(400).json({
                msg: "Faltan datos para crear la opción"
            });
            return;
        }

        const questionExists = await QuestionModel.findById(questionId);

        if (!questionExists) {
            res.status(404).json({
                msg: "La pregunta asociada no existe"
            });
            return;
        }

        const option = await OptionModel.create({
            title,
            questionId
        });

        res.status(200).json({
            msg: "Opción creada con éxito",
            option
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al crear la opción"
        });
    }
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, type, isMandatory, questionnarieId } = req.body;

        if (!title || !type || isMandatory === undefined || !questionnarieId) {
            res.status(400).json({
                msg: "Faltan datos para crear la pregunta"
            });
            return;
        }

        const questionnaireExists = await QuestionnaireModel.findById(questionnarieId);

        if (!questionnaireExists) {
            res.status(404).json({
                msg: "El cuestionario asociado no existe"
            });
            return;
        }

        const question = await QuestionModel.create({
            title,
            type,
            isMandatory,
            questionnarieId
        });

        res.status(200).json({
            msg: "Pregunta creada con éxito",
            question
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al crear la pregunta"
        });
    }
};

export const createQuestionnaire = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, userId } = req.body;

        if (!title || !description || !userId) {
            res.status(400).json({
                msg: "Faltan datos para crear el cuestionario"
            });
            return;
        }

        const questionnaire = await QuestionnaireModel.create({
            title,
            description,
            userId
        });

        res.status(200).json({
            msg: "Cuestionario creado con éxito",
            questionnaire
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error al crear el cuestionario"
        });
    }
};
