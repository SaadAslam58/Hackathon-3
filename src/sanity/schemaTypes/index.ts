import { type SchemaTypeDefinition } from "sanity";
import Product from "./product";
import PaymentInfo from "./PaymentInfo";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product,PaymentInfo],
}; 
