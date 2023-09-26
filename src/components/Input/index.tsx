import { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import theme from "../../theme";

interface Props extends TextInputProps {
    label: string;
    secureTextEntry?: boolean;
}

export default function Input({ label, secureTextEntry = false, ...rest }: Props) {
    const [view, setView] = useState(secureTextEntry);

    function handleSecureEye() {
        setView(!view)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.contentRow}>
                <TextInput style={styles.input} secureTextEntry={view} {...rest} />
                {secureTextEntry &&
                    <TouchableOpacity style={styles.button} onPress={handleSecureEye}>
                        {view ?
                            <Icon name="eye" color={theme.colors.darkGrey} size={20} />
                            :
                            <Icon name="eye-off" color={theme.colors.darkGrey} size={20} />
                        }
                    </TouchableOpacity>
                }
            </View>
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
    contentRow: {
        flexDirection: 'row',
        gap: 10,
        borderBottomWidth: 2,
        borderColor: theme.colors.gray
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginTop: 10,
        paddingVertical: 5,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})