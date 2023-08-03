import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Switch from '@meksiabdou/react-native-switch';

export default function App() {
  const [value, setValue] = React.useState({
    0: true,
    1: false,
    2: false,
    3: true,
  });

  return (
    <View style={styles.container}>
      <View>
        <Switch
          value={value['0']}
          width={75}
          onValueChange={(_value) => setValue({ ...value, 0: _value })}
          activeText="حلال"
          inActiveText="حرام"
          backgroundInActive={'#ff0000'}
          circleInActiveColor={'#fff'}
          circleSize={25}
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Switch
          value={value['1']}
          width={140}
          onValueChange={(_value) => setValue({ ...value, 1: _value })}
          activeText="Accepted"
          inActiveText="Unaccepted"
          switchBorderRadius={30}
          switchPaddingLeft={2}
          switchPaddingRight={2}
          circleInActiveColor='#ff5454'
          switchStyle={{ paddingVertical: 4 }}
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Switch
          value={value['2']}
          width={70}
          onValueChange={(_value) => setValue({ ...value, 2: _value })}
          activeText="ON"
          inActiveText="OFF"
          circleSize={24}
          textStyle={{ fontSize: 13 }}
          disabled={false}
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Switch
          value={value['3']}
          width={80}
          onValueChange={(_value) => setValue({ ...value, 3: _value })}
          activeText=""
          inActiveText=""
          circleSize={30}
          textStyle={{ fontSize: 13 }}
          disabled={false}
          circleChildrenInActive={
            <View>
              <Image
                source={require('./assets/images/dark.png')}
                style={styles.icon}
              />
            </View>
          }
          circleChildrenActive={
            <View>
              <Image
                source={require('./assets/images/light.png')}
                style={styles.icon}
              />
            </View>
          }
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
    backgroundColor: '#ccc',
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'center',
  },
});
