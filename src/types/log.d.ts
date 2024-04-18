import {
  Timestamp,
} from "firebase/firestore"
import { UserType } from "./user"

export type LogType = {
  id?: string
  title: string
  description: string
  author?: string | UserType
  keywords?: string[]
  createdAt?: Date | Timestamp | null
}