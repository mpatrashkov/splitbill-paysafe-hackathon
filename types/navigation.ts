import { StackScreenProps } from "@react-navigation/stack"

export type RootStackParamList = {
    Home: undefined
    Login: undefined
    Register: undefined
}

export type RootStackNavigationProps<
    T extends keyof RootStackParamList
> = StackScreenProps<RootStackParamList, T>
