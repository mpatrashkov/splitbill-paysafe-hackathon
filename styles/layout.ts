export const centerContainer = {
    paddingHorizontal: 10,
    flex: 1,
    marginTop: 10,
    alignItems: "center" as const,
}

export const container = {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
}

export const verticalCenterContainer = {
    ...centerContainer,
    justifyContent: "center" as const,
}
