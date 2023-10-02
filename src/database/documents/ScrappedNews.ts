import { model, Schema, Types } from "mongoose";

interface IScrappedNews {
    _id: Types.ObjectId;
    from: string;
    url: string;
    title: string;

    image?: string;
    content?: string;

    content_summary?: string;
    isPlagiarism?: boolean;

    stockCompanies?: Types.ObjectId[];
    cryptoAssets?: Types.ObjectId[];

    createdAt: Date;
    updatedAt: Date;
}

const ScrappedNewsSchema = new Schema<IScrappedNews>(
    {
        url: { type: String, required: true, unique: true },

        from: { type: String, required: true },
        title: { type: String, required: true },

        image: { type: String, required: false },

        content: { type: String, required: true },
        content_summary: { type: String, required: false },
        isPlagiarism: { type: Boolean, required: false },

        stockCompanies: [{ type: Types.ObjectId, ref: "StockCompany" }],
        cryptoAssets: [{ type: Types.ObjectId, ref: "CryptoCoin" }],
    },
    { timestamps: true }
);

export const ScrappedNews = model<IScrappedNews>("ScrappedNews", ScrappedNewsSchema);
