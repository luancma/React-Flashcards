import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { fetchDeck } from "../store/actions/decks";

class DeckApresentetion extends React.Component {
  componentDidMount() {
    deckTitle = this.props.navigation.getParam("title");
    this.props.dispatch(fetchDeck(deckTitle));
  }

  state = {
    questaoCorreta: 0,
    questaoIndice: 0,
    mostrarQuestao: true,
    resultado: true
  };

  handleChangeStatus = e => {
    e.preventDefault();
    this.setState(status => ({ resultado: !status.resultado }));
  };

  sendAwnser = status => {
    status === "correct" &&
      this.setState(previousState => ({
        questaoCorreta: previousState.questaoCorreta + 1
      }));
    this.nextQuestion();
  };

  nextQuestion = () => {
    const { deck } = this.props;
    const { questaoIndice } = this.state;

    let questionLength = deck.questions.length;
    questaoIndice === questionLength - 1
      ? this.setState({ mostrarQuestao: false })
      : this.setState(previousState => ({
          questaoIndice: previousState.questaoIndice + 1
        }));
  };
  render() {
    console.log(`Tamanho : ${this.props.deck.questions.length}`);
    let allAwnser = this.props.deck.questions;
    console.log(allAwnser);
    let awnser = this.props.deck.questions[this.state.questaoIndice].question;
    return (
      <View>
        <Text>{awnser}</Text>
        <Button title="Next Question" onPress={() => this.nextQuestion()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    deck: state.deck
  };
};

export default connect(mapStateToProps)(DeckApresentetion);
