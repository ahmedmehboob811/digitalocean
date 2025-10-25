
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

// FIX: Only initialize GoogleGenAI if the API_KEY is available to prevent errors with mock keys.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const getAIResponse = async (prompt: string): Promise<string> => {
  // FIX: Check for ai instance instead of just API_KEY.
  if (!ai) return Promise.resolve("This is a mocked AI response as the API key is not configured.");
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting AI response:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};

const summarizeText = async (text: string): Promise<string> => {
    // FIX: Check for ai instance instead of just API_KEY.
    if (!ai) return Promise.resolve("This is a mocked summary as the API key is not configured.");
    const prompt = `Summarize the following text in a few key bullet points:\n\n---\n\n${text}`;
    return getAIResponse(prompt);
};

const generateQuiz = async (text: string, count: number = 5): Promise<any> => {
    // FIX: Check for ai instance instead of just API_KEY.
    if (!ai) {
        return Promise.resolve({
            questions: Array.from({ length: count }, (_, i) => ({
                question: `This is mock question ${i + 1}?`,
                options: ["Option A", "Option B", "Option C", "Option D"],
                answer: "Option A"
            }))
        });
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a quiz with ${count} multiple-choice questions based on the following text. For each question, provide 4 options and indicate the correct answer.

            TEXT: """
            ${text}
            """`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    options: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING }
                                    },
                                    answer: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Failed to generate quiz from text.");
    }
};

const generateStudyPlan = async (subjects: string, hours: string): Promise<any> => {
    // FIX: Check for ai instance instead of just API_KEY.
    if (!ai) {
        return Promise.resolve({
            plan: {
                Monday: ["Study Mock Subject 1 (2 hours)"],
                Wednesday: ["Review Mock Subject 1 notes (1 hour)"],
                Friday: ["Take practice quiz for Mock Subject 1 (1 hour)"]
            }
        });
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a weekly study plan for a student who wants to study the following subjects: ${subjects}. The student has ${hours} available per week. Break down the plan by day and activity.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        plan: {
                            type: Type.OBJECT,
                            properties: {
                                Monday: { type: Type.ARRAY, items: { type: Type.STRING } },
                                Tuesday: { type: Type.ARRAY, items: { type: Type.STRING } },
                                Wednesday: { type: Type.ARRAY, items: { type: Type.STRING } },
                                Thursday: { type: Type.ARRAY, items: { type: Type.STRING } },
                                Friday: { type: Type.ARRAY, items: { type: Type.STRING } },
                                Saturday: { type: Type.ARRAY, items: { type: Type.STRING } },
                                Sunday: { type: Type.ARRAY, items: { type: Type.STRING } },
                            }
                        }
                    }
                }
            }
        });
        
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error generating study plan:", error);
        throw new Error("Failed to generate study plan.");
    }
};


export const geminiService = {
    getAIResponse,
    summarizeText,
    generateQuiz,
    generateStudyPlan
};
