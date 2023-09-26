import { StyleSheet, Text, View } from 'react-native';
import { Dropdown as DropdownList } from 'react-native-element-dropdown';

import theme from '../../theme';

export interface IDropdown {
    label: string;
    value: any;
}

interface Props {
    label: string;
    data: any;
    value: any;
    onChange: (item: any) => void;
}

export default function Dropdown({ label, data, value, onChange }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.contentRow}>
                <DropdownList
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={styles.itemContainerStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder=""
                    searchPlaceholder="Pesquisar..."
                    value={value}
                    onChange={onChange}
                />
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
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        borderBottomWidth: 2,
        borderColor: theme.colors.gray
    },
    dropdown: {
        width: '100%',
        paddingVertical: 5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: theme.colors.black
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    itemContainerStyle: {
        color: theme.colors.black
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: theme.colors.orange
    },
})