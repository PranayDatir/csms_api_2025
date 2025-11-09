import mongoose, { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    token: string;
    description: string;
    interfacetype: "android" | "web" | "ios";
}

const productSchema: Schema = new Schema<IProduct>({
    
    name: { type: String, require: true, unique: true },
    token: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    interfacetype: { type: String, enum: ["android", "web", "ios"], require: true }
});

const Product = model<IProduct>('Product', productSchema);

export default { Product };
