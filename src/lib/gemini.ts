// src/lib/gemini.ts (Fixed for 2025 Models)
import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { Presentation } from '../types/ppt';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY ?? '');

const presentationSchema = {
    type: 'object',
    properties: {
        title: { type: 'string', description: 'Overall title of the presentation.' },
        slides: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    title: { type: 'string', description: 'Title of the slide.' },
                    content: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Main content/bullet points for the slide.',
                    },
                    layout: {
                        type: 'string',
                        enum: ['TITLE', 'TEXT', 'TITLE_AND_CONTENT'],
                        description: 'Suggested layout type for the slide.',
                        nullable: true,
                    },
                },
                required: ['title', 'content'],
            },
        },
    },
    required: ['title', 'slides'],
} as const;

function cleanJson(text: string): string {
    return text.replace(/```(?:json)?|```/g, '').trim();
}

async function fileToPart(file: File): Promise<Part> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve({
                inlineData: {
                    mimeType: file.type || 'image/jpeg',
                    data: base64,
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

const MODEL_MAP: Record<string, string> = {
    '2.5 flash': 'gemini-2.5-flash',
    '1.5 pro': 'gemini-1.5-pro',
    '2.0 flash-lite': 'gemini-2.0-flash-lite',
};

export async function listAvailableModels(): Promise<string[]> {
    try {
        const models = await genAI.getGenerativeModels();
        return models
            .filter((m: any) => m.name?.includes('gemini-') && m.supportedGenerationMethods?.includes('generateContent'))
            .map((m: any) => m.name!.split('/').pop()!)
            .sort();
    } catch (error) {
        console.error('Failed to list models:', error);
        return [];
    }
}

export async function generatePresentation(
    userPrompt: string,
    currentPresentation?: Presentation,
    imageFiles?: File[],
    uiModelName: string = '2.5 Flash'
): Promise<Presentation> {
    const modelName = MODEL_MAP[uiModelName.toLowerCase()] || 'gemini-2.5-flash';
    console.log(`Using model: ${modelName}`);

    const systemInstruction = `You are an expert presentation generator.

        Your task is to either create a new presentation or modify the existing one based on the user's request.
        ALWAYS respond with a valid JSON object that strictly adheres to this schema:
        ${JSON.stringify(presentationSchema, null, 2)}
        Rules:
        - If user says "create" or gives a new topic, generate a fresh presentation.
        - If user says "edit slide 2", "add a slide", or references existing content, modify the current one.
        - Current presentation (if any): ${currentPresentation ? JSON.stringify(currentPresentation) : 'NONE'
                }
        - If images are provided, analyze them and incorporate insights (e.g., charts, diagrams, photos) into relevant slides.
    `;

    try {
        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction,
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: presentationSchema,
                temperature: 0.7,
            },
        });

        const parts: Part[] = [{ text: userPrompt }];
        if (imageFiles && imageFiles.length > 0) {
            for (const file of imageFiles) {
                const part = await fileToPart(file);
                parts.push(part);
            }
        }

        const result = await model.generateContent(parts);
        const jsonText = result.response.text();
        const cleanText = cleanJson(jsonText);

        const generatedPresentation: Presentation = JSON.parse(cleanText);
        return generatedPresentation;

    } catch (error: any) {
        console.error('Gemini API Error:', error);
        if (error.message.includes('not found') || error.status === 404) {
            console.log('Tip: Run listAvailableModels() to verify supported models.');
        }

        return {
            title: 'Generation Failed',
            slides: [
                {
                    title: 'Error',
                    content: [
                        'Failed to generate presentation.',
                        error.message || 'Unknown error',
                        'Check model name (use gemini-2.5-flash) or API key.',
                    ],
                },
            ],
        };
    }
}