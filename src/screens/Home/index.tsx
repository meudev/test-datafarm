import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
import uuid from 'react-native-uuid';

import { createStopRegisterOffiline, listFarmsOffiline, listMachineriesOffiline, listReasonsOffiline } from "../../databases/offline/repository/Repository";
import { synchronizeDatabases } from "../../databases/online/useCases/UseCases";

import Button from "../../components/Button";
import NumericInput from "../../components/NumericInput";
import Textarea from "../../components/Textarea";
import Dropdown, { IDropdown } from "../../components/Dropdown";
import ListReasons from "../../components/ListReasons";

import { IReason } from "../../model/Reason";
import { IMachine } from "../../model/Machine";
import { IFarm, IField } from "../../model/Farm";
import { IStopRegister } from "../../model/StopRegister";

import theme from "../../theme";
import Loading from "../../components/Loading";

export default function Home() {
    const { navigate } = useNavigation<any>();
    const { isConnected } = useNetInfo();
    const isFocused = useIsFocused();
    const [loading, setLoding] = useState(true);
    const [listMachineries, setListMachineries] = useState<IDropdown[]>([]);
    const [listReasons, setListReasons] = useState<IReason[]>([]);
    const [listFarms, setListFarms] = useState<IDropdown[]>([]);
    const [listFields, setListFields] = useState<IDropdown[]>([]);
    const [machine, setMachine] = useState({} as any);
    const [farm, setFarm] = useState({} as any);
    const [field, setField] = useState({} as any);
    const [reason, setReason] = useState<IReason>({} as IReason);
    const [minutes, setMinutes] = useState(0);
    const [note, setNote] = useState('');

    function handlePlusMinutes() {
        setMinutes(minutes + 1)
    }

    function handleMinusMinutes() {
        if (minutes <= 0) {
            setMinutes(0)
        } else {
            setMinutes(minutes - 1)
        }
    }

    async function changeFarm(value: any) {
        setFarm(value)
        setField({} as any)

        let array: IDropdown[] = [];

        {
            value.value.fields.map((item: IField) => {
                array.push({
                    label: item.name,
                    value: item
                })
            })
        }

        setListFields(array)
    }

    async function changeMachine(value: any) {
        const responseFarms = await listFarmsOffiline();

        setMachine(value)
        setFarm({} as any)
        setField({} as any)

        let array: IDropdown[] = [];

        {
            responseFarms.toJSON().map((item: IFarm) => {
                if (item.growerId === value.value.growerId) {
                    array.push({
                        label: item.name,
                        value: item
                    })
                }
            })
        }

        setListFarms(array)
    }

    function updateListMachines(data: IMachine[]) {
        clear()
        let array: IDropdown[] = [];

        {
            data.map((item) => {
                array.push({
                    label: item.name,
                    value: item
                })
            })
        }

        setListMachineries(array)
    }

    function clear() {
        setNote('')
        setFarm({} as IFarm)
        setField({} as IField)
        setReason({} as IReason)
        setMachine({} as IMachine)
        setMinutes(0)
    }

    async function handleSave() {
        setLoding(true)

        const id = uuid.v4();

        const body: IStopRegister = {
            uuid: String(id),
            note: note,
            farm: farm.value,
            field: field.value,
            reason: reason,
            machine: machine.value,
            minutes: minutes,
            longitude: 0,
            latitude: 0,
            createdAt: new Date()
        }

        try {
            await createStopRegisterOffiline(body);
            Alert.alert('Atenção!', 'Registro salvo com sucesso.')
            clear()
        } catch (e) {
            Alert.alert('Atenção!', 'Falha ao salvar o registro.')
        }

        setLoding(false)
    }

    async function connectionOffline() {
        const responseMachine = await listMachineriesOffiline();
        updateListMachines(responseMachine.toJSON())

        const responseReasons = await listReasonsOffiline();
        setListReasons(responseReasons.toJSON())

        setTimeout(() => {
            setLoding(false)
        }, 1000);
    }

    async function connectionOnline() {
        const response = await synchronizeDatabases();

        if (response?.status === 200) {
            return await connectionOffline();
        } else {
            Alert.alert('Atenção', response?.msg, [{ onPress: navigate('Login') }])
        }
    }

    useEffect(() => {
        if (isConnected === false) {
            connectionOffline();
        } else {
            connectionOnline();
        }
    }, [isFocused])

    return (
        <>
            {loading && <Loading />}
            <ScrollView contentContainerStyle={styles.container}>
                <Dropdown
                    label='Equipamento'
                    data={listMachineries}
                    value={machine.name}
                    onChange={item => changeMachine(item)}
                />
                <View style={styles.contentRow}>
                    <View style={{ flex: .75 }}>
                        <Dropdown
                            label='Fazenda'
                            data={listFarms}
                            value={farm}
                            onChange={item => changeFarm(item)}
                        />
                    </View>
                    <View style={{ flex: .25 }}>
                        <Dropdown
                            label='Talhão'
                            data={listFields}
                            value={field.name}
                            onChange={item => setField(item)}
                        />
                    </View>
                </View>
                <ListReasons
                    label='Motivo da Parada'
                    data={listReasons}
                    value={reason}
                    onPress={item => { setReason(item) }}
                />
                <Textarea
                    label='Nota da parada'
                    value={note}
                    onChangeText={text => setNote(text)}
                />
                <View style={styles.contentRow}>
                    <View style={{ flex: .5 }}>
                        <NumericInput
                            value={minutes}
                            handlePlus={handlePlusMinutes}
                            handleMinus={handleMinusMinutes}
                        />
                    </View>
                    <View style={{ flex: .5 }}>
                        <Button text="Salvar" onPress={handleSave} />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: theme.colors.white
    },
    contentRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
})