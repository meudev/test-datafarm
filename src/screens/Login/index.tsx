import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { login } from "../../databases/online/useCases/UseCases";

import Input from "../../components/Input";
import Button from "../../components/Button";

import theme from "../../theme";

export default function Login() {
    const { navigate } = useNavigation<any>();
    const isFocused = useIsFocused();
    const { isConnected } = useNetInfo();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('aferreira@comercialra.com.br');
    const [password, setPassword] = useState('TeaztMKfOPmv65bm@m0Data@2023');

    async function handleLogin() {
        setLoading(true)
        const response = await login(email, password);

        setTimeout(() => {
            if (response?.status === 200) {
                navigate('Root')
            } else {
                Alert.alert('Atenção','Email e/ou Senha inválido.')
                setLoading(false)
            }
        }, 1000);
    }

    async function connectionOffline() {
        Alert.alert('Atenção', 'Você está offline!', [{ onPress: () => validateToken() }])
    }

    async function validateToken() {
        const token = await AsyncStorage.getItem('Token');

        if (token == null) {
            return Alert.alert('Atenção', 'Você precisa estar conectado no primeiro acesso!');
        } else {
            return navigate('Root')
        }
    }

    useEffect(() => {
        if (isFocused) {
            if (isConnected === false) {
                connectionOffline();
            }
        }
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/logo-datafarm.png')}
            />
            <View style={styles.contentInfo}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subTitle}>Acesse o aplicativo</Text>
            </View>
            <Input label='Email' value={email} onChangeText={setEmail} />
            <Input label='Senha' value={password} onChangeText={setPassword} secureTextEntry />
            <Button
                text='Entrar'
                onPress={handleLogin}
                loading={loading}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.white
    },
    logo: {
        maxHeight: 100,
        resizeMode: 'contain'
    },
    contentInfo: {
        width: '100%',
        marginTop: 70,
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
        color: theme.colors.black
    },
    subTitle: {
        fontSize: 18,
        color: theme.colors.darkGrey
    }
})