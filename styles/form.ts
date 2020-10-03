import { darkgray } from "./colours"

export const input = {
    borderBottomWidth: 1,
    borderBottomColor: darkgray,
}

export const wideInput = {
    ...input,
    alignSelf: "stretch" as const,
}
