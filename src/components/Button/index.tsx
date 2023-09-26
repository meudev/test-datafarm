import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import theme from "../../theme";

interface Props extends TouchableOpacityProps {
    text: string;
    loading?: boolean;
}

export default function Button({ text, loading = false, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.button} {...rest}>
            {loading ?
                <ActivityIndicator color={theme.colors.white} />
                :
                <Text style={styles.text}>{text}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.button
    },
    text: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.white
    }
})