import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import Icon from 'react-native-vector-icons/Feather'

import { converterMinutes } from "../../hook/converterMinutes";

import theme from "../../theme";

interface NumericInputProps {
    value: number;
    handlePlus: () => void;
    handleMinus: () => void;
}

export default function NumericInput({ value, handlePlus, handleMinus }: NumericInputProps) {
    return (
        <View style={styles.container}>
            <Button type='plus' onPress={handlePlus} />
            <View style={styles.content}>
                <Text style={styles.textValue}>
                    {converterMinutes(value)}
                </Text>
            </View>
            <Button type='minus' onPress={handleMinus} />
        </View>
    )
}

interface ButtonProps extends TouchableOpacityProps {
    type: 'plus' | 'minus'
}

function Button({ type, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} {...rest}>
            {type === 'plus' && <Icon name="plus-circle" color={theme.colors.orange} size={22} />}
            {type === 'minus' && <Icon name="minus-circle" color={theme.colors.orange} size={22} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.orange,
    },
    textValue: {
        fontSize: 18,
        color: theme.colors.white
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})