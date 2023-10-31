import React, { useRef } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import PageImage from "./src/screens/PageImage";
import PageHome from "./src/screens/PageHome";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from "expo-font";

export default function App() {
   useFonts({
    'Nunito-Black': require("./assets/fonts/Nunito-Black.ttf"),
    "Nunito-ExtraLight": require("./assets/fonts/Nunito-ExtraLight.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "Nunito-BoldItalic": require("./assets/fonts/Nunito-BoldItalic.ttf"),
    "Nunito-ExtraBold": require("./assets/fonts/Nunito-ExtraBold.ttf"),
    "Nunito-Medium": require("./assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
  });
  const pagerRef = useRef(null);
  const goToPage = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />

        <PagerView
          style={styles.viewPager}
          initialPage={0}
          scrollEnabled={true}
          orientation="vertical"
          ref={pagerRef}
        >
          <PageHome key={"1"} onPressed={() => goToPage(1)} />
          <PageImage backPagePress={() => goToPage(0)} key="2" />
        </PagerView>

      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
