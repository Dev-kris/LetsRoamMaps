import * as React from 'react';
import { View, Text } from 'react-native';
import Map from '../../components/Map';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Map />
    </View>
  );
}
