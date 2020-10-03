import React, { FunctionComponent } from "react"
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack"
import { NewBillStackParamList } from "../../types/navigation"
import { NamePage } from "./new-bill/NamePage"
import { PeoplePage } from "./new-bill/PeoplePage"
import { NewBillContextProvider } from "../../state/newBill"

const Stack = createStackNavigator<NewBillStackParamList>()

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
