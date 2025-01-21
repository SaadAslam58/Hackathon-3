import { type SchemaTypeDefinition } from "sanity";
import Product from "./product";
import Review from "./review";
import PaymentDetailSchema from "./PaymentDetailsSchema";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product, Review, PaymentDetailSchema],
};
