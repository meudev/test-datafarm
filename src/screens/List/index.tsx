import { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { listStopRegisterOffiline } from "../../databases/offline/repository/Repository";
import { removeAccents } from "../../hook/removeAccents";

import ItemStopRegister from "../../components/ItemStopRegister";
import InputSearch from "../../components/InputSearch";

import { IStopRegister } from "../../model/StopRegister";

import theme from "../../theme";

export default function List() {
    const { navigate } = useNavigation<any>();
    const isFocused = useIsFocused();
    const [listStopRegisters, setListStopRegisters] = useState<IStopRegister[]>([]);
    const [listStopRegistersFoundSearch, setListStopRegistersFoundSearch] = useState<IStopRegister[]>([]);
    const [textSearch, setTextSearch] = useState('');

    function handleSearch() {
        if (textSearch.length > 2) {
            let registerStop: IStopRegister[] = [];

            listStopRegisters.find(item => {
                if (removeAccents(item.farm.name).toUpperCase().includes(removeAccents(textSearch).toUpperCase())) {
                    registerStop.push(item);
                }
            })

            setListStopRegistersFoundSearch(registerStop)
        } else {
            setListStopRegistersFoundSearch(listStopRegisters)
        }
    }

    async function initialLoad() {
        try {
            const list = await listStopRegisterOffiline();
            setListStopRegisters(list.toJSON())
            setListStopRegistersFoundSearch(list.toJSON())
        } catch (error) {
            Alert.alert('Atenção', 'Falha ao carregar os dados!')
            return navigate('Home')
        }
    }

    useEffect(() => {
        initialLoad()
    }, [isFocused])

    useEffect(() => {
        handleSearch()
    }, [textSearch]);

    return (
        <View style={styles.container}>
            <View style={styles.contentHeader}>
                <InputSearch
                    placeholder='Localizar registros'
                    onChangeText={setTextSearch}
                    value={textSearch}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {listStopRegistersFoundSearch.map((item, index) => {
                    return (
                        <ItemStopRegister
                            key={index}
                            item={item}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 70 : StatusBar.currentHeight && StatusBar.currentHeight + 20,
        backgroundColor: theme.colors.white
    },
    contentHeader: {
        paddingHorizontal: 16,
        backgroundColor: theme.colors.white
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 30,
        backgroundColor: theme.colors.white
    }
})