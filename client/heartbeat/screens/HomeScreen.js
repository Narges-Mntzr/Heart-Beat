import React from "react";
import { ScrollView, RefreshControl } from "react-native";
import styles from "../styles/HomeScreenStyles";
import useHomeScreenLogic from "./HomeScreenLogic";
import HeaderSection from "./HeaderSection";
import MainContent from "./MainContent";
import Modals from "./Modals";

export default function HomeScreen({ userId, setUserId }) {
  const logic = useHomeScreenLogic({ userId, setUserId });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={logic.refreshing} onRefresh={logic.onRefresh} />
      }
    >
      <HeaderSection logic={logic} />
      <MainContent logic={logic} />
      <Modals logic={logic} />
    </ScrollView>
  );
}
