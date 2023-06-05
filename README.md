# React Native Apps in 30 minutes

# Good to know

For the drawer navigator to work add the react-native-reanimated/plugin plugin in babel.config.js:

```json
module.exports = function (api) {
  api.cache(true);
  return {
    ...
    plugins: ["react-native-reanimated/plugin"],
    ...
  };
};
```

Any changes to babel.config.js require a restart with clearing the cache:

```bash
npx expo start --clear
```

Issues:

- I notice some strange behaviour related to image scaling. Somehow you need to set both the width and height of an image. I would expect that setting one will be sufficient if you use a resizeMode that maintains the aspect ratio, but for some reason it does not work.
