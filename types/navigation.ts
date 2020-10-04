import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack"
import { CompositeNavigationProp } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

export type RootStackParamList = {
    Home: undefined
    Login: undefined
    Register: undefined
    NewBill: undefined
    Bill: {
        id: number
    }
    AddTransaction: {
        id: number
    }
}

export type HomeTabsParamList = {
    Bills: undefined
    Notifications: undefined
    Settings: undefined
}

export type RootStackNavigationProps<
    T extends keyof RootStackParamList
> = StackScreenProps<RootStackParamList, T>

export type HomeTabsNavigationProps<T extends keyof HomeTabsParamList> = {
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<HomeTabsParamList, T>,
        StackNavigationProp<RootStackParamList>
    >
}

export type NewBillStackParamList = {
    Name: undefined
    People: undefined
    Search: undefined
}

export type NewBillStackNavigationProps<
    T extends keyof NewBillStackParamList
> = {
    navigation: CompositeNavigationProp<
        StackNavigationProp<NewBillStackParamList, T>,
        StackNavigationProp<RootStackParamList>
    >
}
