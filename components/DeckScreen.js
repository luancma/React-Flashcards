import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import { connect } from "react-redux";
import { fetchDeck } from "../store/actions/decks";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { clearLocalNotification, setLocalNotification } from "../notification";
class DeckScreen extends Component {
  state = {
    fadeValue: new Animated.Value(0)
  };

  componentDidMount() {
    console.log("DidMount");
    const { navigation, dispatch } = this.props;
    dispatch(fetchDeck(navigation.getParam("title")));
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.deck.title);
    const { navigation, dispatch } = this.props;
    if (navigation.getParam("title") !== prevProps.deck.title) {
      dispatch(fetchDeck(navigation.getParam("title")));
    }
  }

  startQuiz = () => {
    const { navigation, deck } = this.props;
    const deckTitle = deck.title;
    clearLocalNotification().then(setLocalNotification);
    navigation.navigate("QuizScreen", { title: deckTitle });
  };

  render() {
    const { navigation } = this.props;
    const deckTitle = this.props.navigation.getParam("title");
    const { questions } = this.props.deck;
    console.log(this.props.deck.title);

    const hasQuestions =
      Array.isArray(questions) && questions.length >= 1 ? true : false;
    console.log(hasQuestions);

    return (
      <Animated.View
        style={[styles.MainView, { opacity: this.state.fadeValue }]}
      >
        <Text style={styles.textCardTitle}>
          {this.props.navigation.getParam("title")}
        </Text>
        <Text style={styles.textCardLength}>
          {hasQuestions ? questions.length : 0} cards
          <Icon name="cards-playing-outline" size={30} />
        </Text>

        {hasQuestions ? (
          <TouchableOpacity
            onPress={() => this.startQuiz()}
            style={styles.quizButton}
          >
            <View>
              <Text style={styles.textButton}>Quiz</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled style={styles.quizDisabledButton}>
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
