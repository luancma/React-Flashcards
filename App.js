import React from "react";
// importes referentes a navegação
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

//Components
import DecksScreen from "./components/DecksScreen";
import DeckScreen from "./components/DeckScreen";
import QuizScreen from "./components/QuizScreen";
import AddCard from "./components/AddCard";
import AddDeckScreen from "./components/AddDeckScreen";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// importações referentes ao redux
import reducer from "./store/reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import DeckApresentetion from "./components/DeckApresentetion";

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
export default App;

// *****************************************//
// NAVEGAÇÃO
// *****************************************//
const AppNavigator = createStackNavigator({
  Details: {
    screen: DecksScreen,
    navigationOptions: {
      header: () => null
    }
  },
  //Mostra os detalhes de 1 deck:
  DeckDetails: {
    screen: DeckScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Details of deck"
    })
  },

  QuizScreen: {
    screen: QuizScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Quiz Screen"
    })
  },
  // Add card to deck:
  AddCard: {
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({
      title: "Add Card"
    })
  }
});

// *****************************************//
// TABS DE NAVEÇÃO NA PARTE INFERIOR
// *****************************************//
const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: AppNavigator,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon color="dodgerblue" name="home-variant" size={24} />
      )
    }
  },

  "Add Deck": {
    screen: AddDeckScreen,
    navigationOptions: {
      tabBarLabel: "Create Deck",
      tabBarIcon: ({ tintColor }) => (
        <Icon color="dodgerblue" name="plus" size={24} />
      )
    }
  }
});
const AppContainer = createAppContainer(TabNavigator);
