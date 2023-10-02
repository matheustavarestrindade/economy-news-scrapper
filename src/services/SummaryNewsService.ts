import { stringSimilarity } from "string-similarity-js";
import OpenAIService from "./OpenAIService";

class SummaryNewsService {
    private static readonly SUMMARIZE_NEWS_THRESHOLD = 0.7;
    private static readonly SUMMARIZE_NEWS_PROMPT = `
        A notícia abaixo e util em alguns pontos para investidores do mercado de ações.
        Escreva um sumário extraindo informações que sejam uteis para investidores.
        O Sumário deve ser feito sobre a notícia abaixo em bullet points.
        Título: {{title}}
        Notícia:
        {{content}}
    `;

    public static async summarizeNews(
        title: string,
        news: string
    ): Promise<{
        summary: string;
        plagiarism: boolean;
    }> {
        const prompt = this.SUMMARIZE_NEWS_PROMPT.replace("{{title}}", title).replace("{{content}}", news);
        const response = await OpenAIService.getCompletion(prompt);
        if (!response || !response.message?.content)
            return {
                summary: "",
                plagiarism: false,
            };

        const summaryGeneratedWithChatGPT = response.message?.content;

        return {
            summary: summaryGeneratedWithChatGPT,
            plagiarism: this.isPlagiarism(summaryGeneratedWithChatGPT, news, title),
        };
    }

    private static isPlagiarism(summary: string, news: string, title: string): boolean {
        const similarity = stringSimilarity(summary, news);
        const isPlagiarism = similarity > this.SUMMARIZE_NEWS_THRESHOLD;
        if (isPlagiarism)
            console.log(`Summarized news: ${title} is plagiarism`, {
                similarity,
            });
        return isPlagiarism;
    }
}

export default SummaryNewsService;
