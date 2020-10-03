import { User } from "./user"

export type Bill = {
    id: number
    name: string
    amount: number
    participants: number
    users: User[]
}
