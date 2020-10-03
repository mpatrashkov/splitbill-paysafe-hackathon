import { AsyncStorage } from "react-native"

export const authHeaders = async () => {
    const token = await AsyncStorage.getItem("@jwt")

    return {
        Authorization: "Bearer " + token,
    }
}
