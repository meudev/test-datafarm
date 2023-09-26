import { ActivityIndicator, StyleSheet, View } from "react-native";

import theme from "../../theme";

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.black,
        opacity: .5,
        zIndex: 999999
    }
})