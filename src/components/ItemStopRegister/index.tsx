import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from 'react-native-svg';

import { IStopRegister } from "../../model/StopRegister";

import theme from "../../theme";

interface Props {
    item: IStopRegister;
}

export default function ItemStopRegister({ item }: Props) {
    return (
        <View style={styles.container}>
            <Svg width={40} height={40}>
                <Path d={item.reason.icon} stroke="black" scale={.035} fill={theme.colors.black} />
            </Svg>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>{item.farm.name}</Text>
                    <Text style={styles.textDate}>{item.createdAt.toLocaleString('en-GB', { hour12: false })}</Text>
                </View>
                <Text style={styles.textDescription}>{item.reason.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 10,
        borderBottomWidth: 1,
        borderColor: theme.colors.darkGrey
    },
    content: {
        flex: 1,
        gap: 5,
        paddingBottom: 10,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.black
    },
    textDate: {
        fontSize: 12,
        color: theme.colors.darkGrey
    },
    textDescription: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.darkGrey
    }
})