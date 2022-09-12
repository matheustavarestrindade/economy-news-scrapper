import { model, Schema, Types } from "mongoose";

interface IScrappedNews {
    _id: Types.ObjectId;
    from: string;
    url: string;
    title: string;

    image?: string;
    content?: string;

    createdAt: Date;
    updatedAt: Date;
}

const ScrappedNewsSchema = new Schema<IScrappedNews>(
    {
        url: { type: String, required: true, unique: true },
        from: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export const ScrappedNews = model<IScrappedNews>("ScrappedNews", ScrappedNewsSchema);
