# @meksiabdou/react-native-switch

Customisable switch component for React Native

![bundlephobia](https://badgen.net/bundlephobia/minzip/@meksiabdou/react-native-switch)
![downloads](https://badgen.net/npm/dt/@meksiabdou/react-native-switch)
![npm](https://badgen.net/npm/v/@meksiabdou/react-native-switch)
![license](https://badgen.net/github/license/meksiabdou/react-native-switch)
[![Known Vulnerabilities](https://snyk.io/test/github/meksiabdou/react-native-switch/badge.svg?targetFile=package.json)](https://snyk.io/test/github/meksiabdou/react-native-switch?targetFile=package.json)

[![Watch the video](https://imgur.com/TNLNDgt.jpg)](https://i.imgur.com/TNLNDgt.mp4)

## Requirements

- [react-native-reanimated v2.2.0 or higher](https://github.com/software-mansion/react-native-reanimated)

## Installation

```sh
npm install @meksiabdou/react-native-switch
```

```sh
yarn add @meksiabdou/react-native-switch
```

## Usage

```tsx
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Switch from '@meksiabdou/react-native-switch';

export default function App() {
  const [value, setValue] = React.useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Switch
          value={value}
          width={70}
          onValueChange={() => setValue(!value)}
          activeText="ON"
          inActiveText="OFF"
          circleSize={24}
          textStyle={{ fontSize: 13 }}
          disabled={false}
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
});
```

### Switch Props

| name                | type      | default   |
| ------------------- | --------- | --------- |
| width               | number    | 100       |
| value               | boolean   | false     |
| onValueChange       | function  | undefined |
| disabled            | boolean   | false     |
| activeText          | string    | ON        |
| inActiveText        | string    | OFF       |
| circleSize          | number    | 30        |
| switchBorderRadius  | number    | 30        |
| switchPaddingRight  | number    | 2         |
| switchPaddingLeft   | number    | 2         |
| backgroundActive    | string    | #249c00   |
| backgroundInActive  | string    | #333      |
| circleActiveColor   | string    | #fff      |
| circleInActiveColor | string    | #fff      |
| textStyle           | TextStyle | undefined |
| switchStyle         | ViewStyle | undefined |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
