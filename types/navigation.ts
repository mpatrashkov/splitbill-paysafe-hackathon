import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack"
import { CompositeNavigationProp } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

export type RootStackParamList = {
    Home: undefined
    Login: undefined
    Register: undefined
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
