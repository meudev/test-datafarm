import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Svg, { Path } from 'react-native-svg';

import { IReason } from "../../model/Reason";

import theme from "../../theme";

interface Props {
    label: string;
    data: Array<IReason>;
    value: IReason;
    onPress: (item: IReason) => void;
}

export default function ListReasons({ label, data, value, onPress }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.content}>
                {data.map((item, index) => {
                    const selected = item.id === value.id;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.button, selected && styles.buttonSelected]}
                            onPress={() => onPress(item)}
                        >
                            <Svg width={30} height={30}>
                                <Path d={item.icon} stroke="black" scale={.025} fill={theme.colors.black}/>
                            </Svg>
                            <Text style={styles.text}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
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
    content: {
        padding: 10,
        marginTop: 10,
        minHeight: 100,
        borderWidth: 2,
        borderColor: theme.colors.gray
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        gap: 20,
    },
    buttonSelected: {
        backgroundColor: theme.colors.selected,
    },
    icon: {
        maxWidth: 40,
        maxHeight: 40,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.black
    }
})