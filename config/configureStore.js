import { NativeModules } from "react-native";
import Reactotron from "reactotron-react-native";
import Immutable from "seamless-immutable";
import { reactotronRedux as reduxPlugin } from "reactotron-redux";
import sagaPlugin from "reactotron-redux-saga";
import url from "url";
import { createStore } from "redux";

let rt;

if (__DEV__) {
  const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);
  console.log("Reactotron Configured");
  console.log("using reactotron at " + hostname);
  // https://github.com/infinitered/reactotron for more options!
  rt = Reactotron.configure({ host: hostname, port: 9090 })

    // Reactotron.configure({ host: "192.168.1.3", port: 19001 }) // controls connection & communication settings
    // Reactotron.configure() // controls connection & communication settings
    .use(reduxPlugin({  onRestore: state => {
      Reactotron.log('STATE1', state);
      return Immutable(state)
    } }))
    // .use(reduxPlugin())
    // .use(sagaPlugin())
    // .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
}
// Reactotron.configure({ port:9090}).useReactNative().connect()

export default function configureStore(appReducer_, middlewares_) {
  if (__DEV__) {
    return rt.createStore(appReducer_, middlewares_);
  } else {
    const store = createStore(appReducer_, middlewares_);

    return store;
  }
}
