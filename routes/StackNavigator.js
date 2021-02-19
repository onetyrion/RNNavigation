import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const Logo = () => <Text>Llalala</Text>;

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Ir a detalle"
        onPress={() => navigation.navigate("Details", { titlae: "TITULO" })}
      />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: <Logo />,
  headerRight: () => (
    <Button onPress={() => alert("NOTIFICACION")} title="ALERTAGO" />
  ),
};

const DetailsScreen = ({ navigation }) => {
  const [cont, setCont] = useState(0);
  const incrementar = () => setCont(cont + 1);
  useEffect(() => {
    navigation.setParams({ incrementar });
  }, [cont]);
  const title = navigation.getParam("title", "DefaultText");

  return (
    <View style={styles.container}>
      <Button
        title="Volver"
        onPress={() => navigation.setParams({ title: "Usuarop" })}
      />
      <Text>Detalles {cont}!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

DetailsScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  return {
    title: navigation.getParam("title", "Cargando..."),
    headerRight: () => (
      <Button
        onPress={navigation.getParam("incrementar")}
        title="MAS 1"
        color="#444"
      />
    ),
  };
};

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#ffaacc",
      },
      headerTintColor: "#333",
      headerTitleStyle: {
        fontSize: 20,
      },
    },
  }
);

const RootStack = createStackNavigator({
  Main: AppNavigator,
  MiModal: () => <Text>LALALA</Text>
},{
  mode:'modal',
  headerMode:'none'
}) 

export default createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
