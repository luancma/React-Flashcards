import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import { connect } from "react-redux";
import { fetchDecks, fetchDeck } from "../store/actions/decks";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { clearLocalNotification, setLocalNotification } from "../notification";
class DeckScreen extends Component {
  state = {
    fadeValue: new Animated.Value(0)
  };
  componentDidMount() {
    this.props.dispatch(fetchDeck(this.props.navigation.getParam("title")));
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  startQuiz = () => {
    const deckTitle = this.props.navigation.getParam("title");

    clearLocalNotification().then(setLocalNotification);

    this.props.navigation.navigate("QuizScreen", { title: deckTitle });
  };

  render() {
    const deckTitle = this.props.navigation.getParam("title");
    const { deck, navigation } = this.props;
    const { questions } = this.props.deck;
    const validDeck = questions && questions;
    const deckLength = validDeck && validDeck.length;

    console.log(this.props.deck);

    return (
      <Animated.View
        style={[styles.MainView, { opacity: this.state.fadeValue }]}
      >
        <Text style={styles.textCardTitle}>{deckTitle}</Text>
        <Text style={styles.textCardLength}>
          {deckLength === undefined ? 0 : deckLength} cards
          <Icon name="cards-playing-outline" size={30} />
        </Text>

        {deckLength == 0 ? (
          <TouchableOpacity disabled style={styles.quizDisabledButton}>
            <View>
              <Text style={styles.textButton}>Quiz</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => this.startQuiz()}
            style={styles.quizButton}
          >
            <View>
              <Text style={styles.textButton}>Quiz</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("AddCard", { title: deckTitle })}
          style={styles.createButton}
        >
          <View>
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                color: "white",
                fontWeight: "bold"
              }}
            >
              Create Card
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  AnimatedView: {
    width: 100,
    backgroundColor: "red"
  },
  MainView: {
    marginTop: "5%",
    marginLeft: "10%",
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    height: "90%"
  },
  quizButton: {
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200,
    height: 50,
    alignItems: "center",
    backgroundColor: "#0080ff",
    marginTop: "50%"
  },
  quizDisabledButton: {
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200,
    height: 50,
    alignItems: "center",
    backgroundColor: "#0080ff",
    marginTop: "50%",
    opacity: 0.3
  },
  createButton: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200,
    height: 50,
    backgroundColor: "#0080ff",
    alignItems: "center"
  },
  textButton: {
    marginTop: 10,
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  textCardTitle: {
    paddingTop: "15%",
    fontSize: 35,
    color: "#0080ff"
  },
  textCardLength: {
    fontSize: 30,
    color: "#0080ff"
  }
});

const mapStateToProps = state => {
  return {
    deck: state.deck
  };
};

export default connect(mapStateToProps)(DeckScreen);
