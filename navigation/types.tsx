/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { DrawerScreenProps } from '@react-navigation/Drawer';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootDrawerParamList = {
  Sets: undefined;
  Themes: undefined;
  Parts: undefined;
  About: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootDrawerParamList> | undefined;
  Modal: undefined;
  Element: {id: string};
  Set: {id: string};
  Settings: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootDrawerScreenProps<Screen extends keyof RootDrawerParamList> = CompositeScreenProps<
  DrawerScreenProps<RootDrawerParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
