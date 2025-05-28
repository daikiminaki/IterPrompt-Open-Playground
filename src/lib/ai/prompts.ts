import { Model } from "../core/IModel";



export const createEvaluationPrompt = (model: Model, prompt: string, evaluationCount: number=10) => {
    
    return `
    You are a helpful assistant that evaluates the quality of a given text.

    Given the following prompt:
    ${prompt}

    Create ${evaluationCount} different evaluation input and output pairs to test the model's capabilities.

    Output should be a JSON array of objects with the following structure:
    {
        "input": "The input to the model",
        "output": "The output of the model"
    }

    The input should be a different variation of the prompt.
    `;
};
