import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native"

import theme from "../../theme";

interface Props extends TextInputProps {
    label: string;
}

export default function Textarea({ label, ...rest }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                editable
                multiline
                {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.label
    },
    input: {
        flex: 1,
        minHeight: 100,
        fontSize: 16,
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: theme.colors.darkGrey
    },
})