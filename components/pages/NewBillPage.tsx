import React, { FunctionComponent, createContext, useReducer } from "react"
import { User } from "../../types/user"
import { Action } from "../../types/types"
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import { NewBillStackParamList } from "../../types/navigation"
import { NamePage } from "./new-bill/NamePage"
import { PeoplePage } from "./new-bill/PeoplePage"

const Stack = createStackNavigator<NewBillStackParamList>()

type NewBillState = {
    name: string
    users: User[]
}

const initialState: NewBillState = {
    name: "",
    users: [],
}

export const NewBillContext = createContext<{
    state: NewBillState
    dispatch: Function
}>({
    state: initialState,
    dispatch: Function,
})

export const NewBillContextProvider: FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(
        (state: typeof initialState, action: Action) => {
            switch (action.type) {
                case "SET_NAME":
                    return {
                        ...state,
                        name: action.payload.name,
                    }
                case "ADD_USER":
                    return {
                        ...state,
                        users: [...state.users, action.payload.user],
                    }
                case "REMOVE_USER":
                    return {
                        ...state,
                        users: state.users.filter(
                            (user: User) => user.id !== action.payload.user.id
                        ),
                    }
                default:
                    return state
            }
        },
        initialState
    )

    return (
        <NewBillContext.Provider value={{ state, dispatch }}>
            {children}
        </NewBillContext.Provider>
    )
}

const options = {
    ...TransitionPresets.FadeFromBottomAndroid,
}

export const NewBillPage: FunctionComponent = () => {
    return (
        <NewBillContextProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="Name"
                    component={NamePage}
                    options={{
                        ...options,
                        headerTitle: "New Bill",
                    }}
                />
                <Stack.Screen
                    name="People"
                    component={PeoplePage}
                    options={{
                        ...options,
                        headerTitle: "Add People to Bill",
                    }}
                />
            </Stack.Navigator>
        </NewBillContextProvider>
    )
}
