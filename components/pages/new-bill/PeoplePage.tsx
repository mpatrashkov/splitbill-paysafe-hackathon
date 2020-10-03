import axios from "axios"
import React, { FunctionComponent, useContext, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { NewBillContext } from "../NewBillPage"
import { Colours, Layout } from "../../../styles"
import { TextInput } from "react-native-gesture-handler"

import { Ionicons } from "@expo/vector-icons"
import { splitBillApi } from "../../../http/splitBillApi"
import { User } from "../../../types/user"
import { authHeaders } from "../../../lib/headers"

let timeout: number | null = null

export const PeoplePage: FunctionComponent = () => {
    const { state, dispatch } = useContext(NewBillContext)

    const [results, setResults] = useState<User[]>([])

    const onSearchChange = (text: string) => {
        if (timeout) {
            clearInterval(timeout)
        }

        if (!text) {
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
                    console.log(data)
                    setResults(data)
                })
        }, 300)
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
                {results.map((result) => (
                    <Text key={result.id}>{result.name}</Text>
                ))}
            </View>
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
})
