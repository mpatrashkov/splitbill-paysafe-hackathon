export type BankInfo = {
    name: string
    image: string
    id: BankId
}

export type BankId = "dsk" | "fibank" | "unicredit" | "reif"
