import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Switch from '@meksiabdou/react-native-switch';

export default function App() {
  const [value, setValue] = React.useState({ 0: true, 1: false, 2: false });

  return (
    <View style={styles.container}>
      <View>
        <Switch
          value={value['0']}
          width={90}
          onValueChange={(_value) => setValue({ ...value, 0: _value })}
          activeText="Halal"
          inActiveText="Haram"
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Switch
          value={value['1']}
          width={120}
          onValueChange={(_value) => setValue({ ...value, 1: _value })}
          activeText="Accepted"
          inActiveText="Unaccepted"
        />
      </View>
      <View>
        <Switch
          value={value['2']}
          width={70}
          onValueChange={(_value) => setValue({ ...value, 2: _value })}
          activeText="ON"
          inActiveText="OFF"
          circleSize={25}
          textStyle={{ fontSize: 13 }}
          disabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
