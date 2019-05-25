import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { addDeck, fetchDecks } from "../store/actions/decks";
import { connect } from "react-redux";

class AddDeckScreen extends Component {
  state = {
    title: ""
  };

  saveDeck = title => {
    this.props.dispatch(addDeck(title));
    this.props.navigation.navigate("DeckDetails", { title });
  };

  render() {
    return (
      <View style={styles.MainView}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={text => this.setState({ title: text })}
          placeholder="Title"
        />
        {this.state.title === "" ? (
          <TouchableOpacity style={styles.buttonDisabledStyle} disabled>
            <Text style={styles.textButton}>Create Deck</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.saveDeck(this.state.title)}
          >
            <Text style={styles.textButton}>Create Deck</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainView: {
    width: "90%",
    flexDirection: "column",
    alignItems: "center"
  },
  buttonStyle: {
    marginLeft: "10%",
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200,
    height: 50,
    backgroundColor: "#0080ff",
    alignItems: "center"
  },
  buttonDisabledStyle: {
    marginLeft: "10%",
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200,
    height: 50,
    backgroundColor: "#0080ff",
    alignItems: "center",
    opacity: 0.4
  },
  textButton: {
    marginTop: 10,
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  inputStyle: {
    textAlign: "center",
    fontSize: 20,
    marginLeft: "10%",
    marginTop: "10%",
    height: 40,
    width: 300,
    borderBottomWidth: 1
  }
});

export default connect()(AddDeckScreen);
