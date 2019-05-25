import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { fetchDecks } from "../store/actions/decks";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
class QuizScreen extends Component {
  state = {
    questaoCorreta: 0,
    questaoIndice: 0,
    mostrarQuestao: true,
    resultado: true
  };

  componentDidMount() {
    this.props.dispatch(fetchDecks());
  }

  handleResetStatus = () => {
    this.setState(status => ({
      resultado: false,
      questaoIndice: 0,
      questaoCorreta: 0,
      mostrarQuestao: true
    }));
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
    const { decks, navigation } = this.props;
    const { questaoIndice } = this.state;

    let questionLength = Object.values(
      decks[navigation.getParam("title")].questions
    ).length;
    questaoIndice === questionLength - 1
      ? this.setState({ mostrarQuestao: false })
      : this.setState(previousState => ({
          questaoIndice: previousState.questaoIndice + 1
        }));
  };

  calculateScore = (a, b) => {
    c = (a / b) * 100;
    return parseInt(c);
  };

  render() {
    const { navigation, decks } = this.props;
    const {
      mostrarQuestao,
      resultado,
      questaoIndice,
      questaoCorreta
    } = this.state;
    let awnser = Object.values(
      decks[navigation.getParam("title")].questions[questaoIndice]
    )[1];
    let question = Object.values(
      decks[navigation.getParam("title")].questions[questaoIndice]
    )[0];
    let questionsLength = Object.values(
      decks[navigation.getParam("title")].questions
    ).length;
    console.log(questionsLength);

    return mostrarQuestao === true ? (
      <View style={styles.MainView}>
        <Text style={styles.textScore}>{`${questaoIndice +
          1} of ${questionsLength}`}</Text>
        <Text style={styles.textCard}>{resultado ? question : awnser}</Text>

        <TouchableOpacity
          style={styles.showAnswerButton}
          onPress={event => this.handleChangeStatus(event)}
        >
          <Text style={styles.showAnswerText}>
            {resultado ? "Show Awnser" : "Show Question"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.correctButton}
          onPress={() => this.sendAwnser("correct")}
        >
          <Text style={styles.textButton}>Correto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.incorrectButton}
          onPress={() => this.sendAwnser("incorrect")}
        >
          <Text style={styles.textButton}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.MainView}>
        <Text style={[styles.textViewScore, { marginTop: "50%" }]}>
          Your score: {this.calculateScore(questaoCorreta, questionsLength)}%
        </Text>

        {this.calculateScore(questaoCorreta, questionsLength) < 25 && (
          <Text style={[styles.textViewScore, { marginTop: "5%" }]}>
            Ops<Icon size={30}> 😶</Icon>
          </Text>
        )}

        {this.calculateScore(questaoCorreta, questionsLength) >= 25 &&
          this.calculateScore(questaoCorreta, questionsLength) < 50 && (
            <Text style={[styles.textViewScore, { marginTop: "5%" }]}>
              Good, keep studying<Icon size={30}> 😅</Icon>
            </Text>
          )}

        {this.calculateScore(questaoCorreta, questionsLength) >= 50 &&
          this.calculateScore(questaoCorreta, questionsLength) < 75 && (
            <Text style={[styles.textViewScore, { marginTop: "5%" }]}>
              Good, keep studying<Icon size={30}> 😁</Icon>
            </Text>
          )}

        {this.calculateScore(questaoCorreta, questionsLength) > 75 &&
          this.calculateScore(questaoCorreta, questionsLength) < 100 && (
            <Text style={[styles.textViewScore, { marginTop: "5%" }]}>
              Great Score<Icon size={30}> 😁</Icon>
            </Text>
          )}

        {this.calculateScore(questaoCorreta, questionsLength) === 100 && (
          <Text style={[styles.textViewScore, { marginTop: "5%" }]}>
            Congratulation! <Icon size={30}> 😎</Icon>
          </Text>
        )}

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.handleResetStatus()}
        >
          <Text style={styles.textButton}>Reiniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  decks: state.decks
});

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
  textButton: {
    marginTop: 10,
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  showAnswerText: {
    fontSize: 20,
    color: "#607D8B"
  },
  showAnswerButton: {
    borderBottomWidth: 0.4
  },
  correctButton: {
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200,
    height: 50,
    marginTop: "30%",
    alignItems: "center",
    backgroundColor: "#4CAF50"
  },
  incorrectButton: {
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200,
    height: 50,
    marginTop: "5%",
    alignItems: "center",
    backgroundColor: "#F44336"
  },
  textCard: {
    marginTop: "20%",
    fontSize: 35,
    color: "#0080ff"
  },
  textScore: {
    paddingTop: "10%",
    fontSize: 20,
    color: "#0080ff"
  },
  textViewScore: {
    fontSize: 20,
    color: "#0080ff"
  },
  buttonStyle: {
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200,
    height: 50,
    backgroundColor: "#0080ff",
    alignItems: "center"
  },
  buttonStyle: {
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200,
    height: 50,
    backgroundColor: "#0080ff",
    alignItems: "center"
  }
});

export default connect(mapStateToProps)(QuizScreen);
