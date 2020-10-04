import React, { FunctionComponent } from "react"
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Text,
} from "react-native"
import { RootStackNavigationProps } from "../../types/navigation"
import { BankId, BankInfo } from "../../types/bankInfo"
import { PressEvent } from "../../types/types"
import { Colours } from "../../styles"
import { CustomButton } from "../CustomButton"
import { authHeaders } from "../../lib/headers"
import { splitBillApi } from "../../http/splitBillApi"

export const BankListItem: FunctionComponent<{
    bankInfo: BankInfo
    onPress: PressEvent
}> = ({ bankInfo, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={bankListItemStyles.container}>
                <Image
                    source={{
                        uri: bankInfo.image,
                    }}
                    style={bankListItemStyles.image}
                />
                <Text style={bankListItemStyles.text}>{bankInfo.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const bankListItemStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: Colours.darkgray,
        padding: 10,
        backgroundColor: Colours.white,
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
})

export const LinkAccountPage: FunctionComponent<RootStackNavigationProps<
    "LinkAccount"
>> = ({ navigation }) => {
    const onBankClick = async (bankId: BankId) => {
        const headers = await authHeaders()
        const data = (
            await splitBillApi.get(`/bank/${bankId}/authenticate`, {
                headers,
            })
        ).data

        if (!data.error) {
            navigation.push("LoginToBank", {
                url: data,
            })
        }
    }

    const banksInfo: BankInfo[] = [
        {
            id: "fibank",
            image: "fibank_logo.png",
            name: "Fibank",
        },
        {
            id: "unicredit",
            image: "unicredit_logo.jpg",
            name: "Unicredit Bulbank",
        },
        {
            id: "dsk",
            image: "dsk_logo.png",
            name: "DSK Bank",
        },
        {
            id: "reif",
            image: "reiffeisen_logo.png",
            name: "Reiffeisen Bank",
        },
    ]

    return (
        <View style={styles.container}>
            <FlatList
                data={banksInfo}
                renderItem={(item) => (
                    <BankListItem
                        bankInfo={item.item}
                        onPress={() => onBankClick(item.item.id)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />

            <CustomButton
                colour="primary"
                text="Next"
                type="fab"
                onPress={() => {}}
                fullWidth
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
