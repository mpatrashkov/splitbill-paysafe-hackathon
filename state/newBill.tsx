import { User } from "../types/user"
import React, { createContext, FunctionComponent, useReducer } from "react"
import { Action } from "../types/types"

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
