import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_CONFIGURATION = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(OPENAI_CONFIGURATION);

class OpenAIService {
    public static async getCompletion(prompt: string, retries = 3): Promise<any> {
        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo-0613",
                messages: [{ role: "user", content: prompt }],
            });
            return response.data.choices[0];
        } catch (error) {
            if ("response" in (error as any)) {
                const response = (error as { response: any }).response;
                console.error("ERROR OPENAI", JSON.stringify(response.data, null, 2));
                if (retries > 0) {
                    await new Promise((resolve) => setTimeout(resolve, (5 - retries) * 5000));
                    return await this.getCompletion(prompt, retries - 1);
                }
            } else {
                console.error("ERROR OPENAI sem response", error);
            }
        }
    }
}

export default OpenAIService;
