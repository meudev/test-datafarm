import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import Icon from 'react-native-vector-icons/Feather'

import theme from "../../theme";

interface Props extends TextInputProps {
    value: string;
}

export default function InputSearch({ value, ...rest }: Props) {
    return (
        <View style={styles.container}>
            <Icon name="search" color={theme.colors.darkGrey} size={18} />
            <TextInput
                style={styles.input}
                cursorColor={theme.colors.darkGrey}
                placeholderTextColor={theme.colors.darkGrey}
                value={value}
                {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        height: 40,
        borderRadius: 5,
        backgroundColor: theme.colors.gray
    },
    input: {
        height: 40,
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.black,
    },
})