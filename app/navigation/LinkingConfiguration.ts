/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('https://jeromedane.github.io/')],
  config: {
    screens: {
      Root: {
        path: 'brick-tools-for-lego',
        screens: {
          Parts: 'parts',
          Themes: 'themes',
          Sets: 'sets',
          About: 'about',
        },
      },
      Set: 'brick-tools-for-lego/set/:id',
      Modal: 'brick-tools-for-lego/modal',
      NotFound: '*',
    },
  },
};

export default linking;
