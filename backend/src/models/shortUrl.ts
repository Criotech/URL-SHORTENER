import { Document, Model, model, Schema } from "mongoose";
import shortid from "shortid";

export interface IShortURL extends Document {
    fullUrl: string;
    short: string;
    clicks: number;
}

const shortURLSchema: Schema<IShortURL> = new Schema(
    {
        fullUrl: {
            type: String,
            required: true
        },
        short: {
            type: String,
            required: true,
            default: shortid.generate
        },
        clicks: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const ShortUrl: Model<IShortURL> = model("ShortUrl", shortURLSchema);

export default ShortUrl;