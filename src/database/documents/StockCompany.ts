import { model, Schema, Types } from "mongoose";

interface IStockCompany {
    _id: Types.ObjectId;

    stock: string;
    shortName: string;
    fullName?: string;
    market_cap: number | null;
    logo: string | null;
    sector: string | null;

    createdAt: Date;
    updatedAt: Date;
}

const StockCompanySchema = new Schema<IStockCompany>(
    {
        stock: { type: String, required: true, unique: true },
        shortName: { type: String, required: true },
        fullName: { type: String, required: false },
        market_cap: { type: Number, required: false },
        logo: { type: String, required: false },
        sector: { type: String, required: false },
    },
    { timestamps: true }
);

export const StockCompany = model<IStockCompany>("StockCompanies", StockCompanySchema);
