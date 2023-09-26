import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'

const { Navigator, Screen } = createBottomTabNavigator();

import Home from '../screens/Home';
import List from '../screens/List';

import theme from '../theme';

export default function Root() {
    const { navigate } = useNavigation<any>();

    function handleLogout() {
        navigate('Login')
    }

    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.button,
                tabBarInactiveTintColor: theme.colors.darkGrey,
            }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Registro de Parada',
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={handleLogout}>
                            <Icon name="arrow-back" color={theme.colors.button} size={20} />
                        </TouchableOpacity>
                    ),
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="timer" color={color} size={size} />
                    ),
                }}
            />
            <Screen
                name="List"
                component={List}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="view-list" color={color} size={size} />
                    ),
                }}
            />
        </Navigator>
    );
}