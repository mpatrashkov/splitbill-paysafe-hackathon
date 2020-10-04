import { User } from "./user"
import { Transaction } from "./transaction"

export type Bill = {
    id: number
    name: string
    amount: number
    participants: number
    users: User[]
    transactions: Transaction[]
}
