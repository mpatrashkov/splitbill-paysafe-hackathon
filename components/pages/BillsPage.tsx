import React, { FunctionComponent } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Typography, Layout } from "../../styles"
import { BillOverview } from "../BillOverview"
import { CustomButton } from "../CustomButton"
import { ScrollView } from "react-native-gesture-handler"

export const BillsPage: FunctionComponent = () => {
    return (
        <ScrollView>
            <View style={Layout.container}>
                <View>
                    <Text style={Typography.sectionHeader}>Current Bills</Text>
                    <BillOverview style={styles.bill} />
                    <BillOverview style={styles.bill} />
                    <BillOverview style={styles.bill} />

                    <CustomButton
                        colour="primary"
                        onPress={() => {}}
                        text="New Bill"
                        style={styles.button}
                    />
                </View>

                <View>
                    <Text style={Typography.sectionHeader}>Past Bills</Text>
                    <BillOverview style={styles.bill} />
                    <BillOverview style={styles.bill} />
                    <BillOverview style={styles.bill} />
                    <BillOverview style={styles.bill} />
                    <BillOverview style={styles.bill} />
                    <BillOverview style={styles.bill} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bill: {
        marginVertical: 5,
    },
    button: {
        marginVertical: 5,
    },
})
