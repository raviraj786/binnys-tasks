import RootNavigator from "@/src/navigation/RootNavigator";
import { PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { store } from '../src/store';

export default function Index() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </StoreProvider>
  );
}
