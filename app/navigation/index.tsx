/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
// import 'react-native-gesture-handler'
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Linking } from 'react-native';
import { Text } from '../components/Themed'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import ThemesScreen from '../screens/Themes';
import PartsScreen from '../screens/Parts'
import SetsScreen from '../screens/Sets';
import SetScreen from '../screens/Set';
import { RootStackParamList, RootDrawerParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
 const Stack = createNativeStackNavigator<RootStackParamList>();

 const Drawer = createDrawerNavigator<RootDrawerParamList>()

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      documentTitle={{
        formatter: (options, route) =>
          `${options?.title ?? route?.name} - Brick Tools for Lego`,
      }}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={DrawerNav} options={{ headerShown: false }} />
        <Stack.Screen name="Set" component={SetScreen} options={{ }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MenuButton = ({navigation}: any) => {
  const colorScheme = useColorScheme();
  console.log(colorScheme, Colors, Colors[colorScheme])
  return  <Pressable
    onPress={() => navigation.toggleDrawer()}
    style={({ pressed }) => ({opacity: pressed ? 0.5 : 1})}>
    <MaterialIcons
      name="menu"
      size={25}
      style={{marginLeft: 20}}
      color={Colors[colorScheme].text}
    />
  </Pressable>
}

const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{padding: 20, fontWeight: 'bold'}}>Brick Tools for LEGO</Text>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Project Homepage"
        icon={({color}) => <AntDesign name="github" size={25} color={color} />}
        onPress={() => Linking.openURL('https://github.com/JeromeDane/brick-tools-for-lego/')}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNav = () => {
  return <Drawer.Navigator initialRouteName="Sets" drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen
      name="Sets"
      component={SetsScreen}
      options={({navigation}) => ({
        drawerIcon: ({color}) => <FontAwesome name="cubes" size={20} color={color} />,
        headerLeft: () => <MenuButton {...{navigation}} />
      })}
    />
    <Drawer.Screen
      name="Themes"
      component={ThemesScreen}
      options={({navigation}) => ({
        drawerIcon: ({color}) => <AntDesign name="picture" size={25} color={color} />,
        headerLeft: () => <MenuButton {...{navigation}} />
      })}
    />
    <Drawer.Screen
      name="Parts"
      component={PartsScreen}
      options={({navigation}) => ({
        drawerIcon: ({color}) => <MaterialCommunityIcons name="puzzle" size={25} color={color} />,
        headerLeft: () => <MenuButton {...{navigation}} />
      })}
    />
  </Drawer.Navigator>
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
