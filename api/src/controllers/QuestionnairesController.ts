import { Request, Response } from "express";
import { OptionModel } from "../models/OptionsModel";
import { QuestionModel } from "../models/QuestionsModel";
import { QuestionnaireModel } from "../models/QuestionnairesModel";
import { UserModel } from "../models/UsersModel";
import { IQuestionnaire } from "../GlobalTypes";

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

export const getMetrics = async (req: Request, res:Response): Promise<void> => {
    try {
        const numberOfUsers = await UserModel.find({ rol: "client"}).countDocuments();
        const numberOfQuestionnaires = await QuestionnaireModel.find().countDocuments();
        res.status(200).json({msg: "Datos obtenidos con exito", numberOfQuestionnaires, numberOfUsers});
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Hubo un error al crear el cuestionario"})
        return
    }



    
}

export const createQuizz = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        if (!body.description || !body.title || !body.userId) {
            res.status(400).json({ msg: "Faltan datos para crear un cuestionario" })
        }
        const questionnaire: IQuestionnaire = {
            description: body.description,
            title: body.title,
            userId: body.userId
        }

        let isInvalidQuestion = false;
        for (const question of body.questions) {
            if (!question.title || !question.type || typeof question.isMandatory == "undefined") {
                isInvalidQuestion = true;
            }
            if (question.options.length <= 0 || !question.options[0] || question.options[0].length <= 0) {
                isInvalidQuestion = true
            }
        }

        if (isInvalidQuestion) {
            res.status(400).json({ msg: "Faltan datos para crear un cuestionario (en preguntas)" })
            return
        }
        const createdQuestionnaire = await QuestionnaireModel.create(questionnaire);
        for (const question of body.questions) {
            const objQuestion = {
                title: question.title,
                type: question.type,
                isMandatory: question.isMandatory,
                questionnaireId: createdQuestionnaire._id
            };
            const createdQuestion = await QuestionModel.create(objQuestion);
            for (const option of question.options) {
                const objOption = {
                    title: option,
                    questionId: createdQuestion._id
                }
                await OptionModel.create(objOption);
            }
        }
        res.status(200).json({ msg: "Cuestionario creado con exito" })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error al crear el cuestionario" })
        return
    }
}

export const getQuestionnaires = async (req: Request, res: Response): Promise<void> => {
    try {
        const questionnaires = await QuestionnaireModel.find();
        res.status(200).json({ msg:"Cuestionarios obtenidos con exito", questionnaires})
    } catch (error) {
        console.log(error)
            res.status(500).json({ msg: "Hubo un error al obtener los cuestionarios"})
            return
        }
    }
