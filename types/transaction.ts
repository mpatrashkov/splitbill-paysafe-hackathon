import { User } from "./user"

export type Transaction = {
    id: number
    creditor: string
    debtor: string
    amount: number
    description: string
    user: User
}
