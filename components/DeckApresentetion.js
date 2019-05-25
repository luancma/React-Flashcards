import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { fetchDeck, fetchDecks } from "../store/actions/decks";

class DeckApresentetion extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchDecks());
  }
  render() {
    const param = this.props.navigation.getParam("title");
    const title = Object.values(this.props.decks).map(
      item => item === param && item.title
    );

    return (
      <View>
        <Text>{title}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    decks: state.decks
  };
};

export default connect(mapStateToProps)(DeckApresentetion);
