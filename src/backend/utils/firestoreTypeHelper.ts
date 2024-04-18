import { FieldPath } from "firebase/firestore";

export type WhereFilterOperator = "<"|"<="|"=="|"<"|"<="|"!=";

export interface IGlobalFindProps {
  limit?: number
  filters?: {
    fieldPath: string | FieldPath
    opStr: WhereFilterOperator
    value: unknown
  }[],
  orderBys?: {
    fieldPath: string | FieldPath
    directionStr: "asc" | "desc"
  }[],
}