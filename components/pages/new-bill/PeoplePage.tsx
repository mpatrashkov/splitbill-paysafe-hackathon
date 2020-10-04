import axios from "axios"
import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, StyleSheet, FlatList, CheckBox } from "react-native"
import { Colours, Layout } from "../../../styles"
import { TextInput } from "react-native-gesture-handler"

import { Ionicons } from "@expo/vector-icons"
import { splitBillApi } from "../../../http/splitBillApi"
import { User } from "../../../types/user"
import { authHeaders } from "../../../lib/headers"
import { BillPerson } from "../../BillPerson"
import { CustomButton } from "../../CustomButton"
import { NewBillStackNavigationProps } from "../../../types/navigation"
import { NewBillContext } from "../../../state/newBill"

let timeout: number | null = null

const Person: FunctionComponent<{
    user: User
    checked: boolean
    onChange: (value: boolean) => void
}> = ({ user, checked, onChange }) => {
    return (
        <View style={personStyles.container}>
            <BillPerson size={40} user={user} />
            <Text style={personStyles.name}>{user.name}</Text>
            <View style={personStyles.checkboxContainer}>
                <CheckBox value={checked} onValueChange={onChange} />
            </View>
        </View>
    )
}

const personStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    checkboxContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
})

export const PeoplePage: FunctionComponent<NewBillStackNavigationProps<
    "People"
>> = ({ navigation }) => {
    const { state, dispatch } = useContext(NewBillContext)
    const [results, setResults] = useState<User[]>([])

    const onPersonSelectChange = (user: User, value: boolean) => {
        if (value) {
            dispatch({
                type: "ADD_USER",
                payload: {
                    user,
                },
            })
        } else {
            dispatch({
                type: "REMOVE_USER",
                payload: {
                    user,
                },
            })
        }
    }

    const deselectedUsers = () => {
        const a = results.filter((result) => {
            return !state.users.find((user) => user.id === result.id)
        })

        return a
    }

    const onSearchChange = (text: string) => {
        if (timeout) {
            clearInterval(timeout)
        }

        if (!text) {
            setResults([])
            return
        }

        timeout = setTimeout(async () => {
            timeout = null

            const headers = await authHeaders()

            splitBillApi
                .get("/auth/search?search=" + text, {
                    headers,
                    data: {
                        search: text,
                    },
                })
                .then(({ data }) => {
                    if (!data.error) {
                        setResults(data)
                    }
                })
        }, 300)
    }

    const onFinishClick = async () => {
        const headers = await authHeaders()

        console.log({
            name: state.name,
            participants: state.users.map((user) => user.id),
        })

        splitBillApi
            .post(
                "/bills",
                {
                    name: state.name,
                    participants: state.users.map((user) => user.id),
                },
                {
                    headers,
                }
            )
            .then(({ data }) => {
                navigation.replace("Bill", {
                    id: data.id,
                })
            })
    }

    return (
        <View style={Layout.container}>
            <View style={styles.search}>
                <Ionicons name="ios-search" size={20} />
                <TextInput
                    onChangeText={onSearchChange}
                    style={styles.input}
                    placeholder="Search"
                />
            </View>
            <View>
                <FlatList
                    data={state.users}
                    renderItem={({ item }) => (
                        <Person
                            user={item}
                            checked
                            onChange={(value) =>
                                onPersonSelectChange(item, value)
                            }
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.selected}
                />

                <FlatList
                    data={deselectedUsers()}
                    renderItem={({ item }) => (
                        <Person
                            user={item}
                            checked={false}
                            onChange={(value) =>
                                onPersonSelectChange(item, value)
                            }
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <CustomButton
                colour="primary"
                text="Finish"
                onPress={onFinishClick}
                type="fab"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: Colours.background,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    input: {
        marginLeft: 10,
        height: 40,
        flex: 1,
    },
    selected: {
        borderBottomWidth: 1,
        borderBottomColor: Colours.primary,
        paddingBottom: 20,
        marginBottom: 20,
        marginTop: 20,
    },
})
