import React, { Component } from 'react'
import { View, Text, ScrollView, Button, TouchableOpacity, AsyncStorage, StyleSheet} from 'react-native'
import { deKey } from '../api';
import { connect } from 'react-redux'
import {  fetchDecks } from '../store/actions/decks';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setLocalNotification, notKey } from '../notification';


class DecksScreen extends Component {
  componentDidMount(){
    AsyncStorage.getItem(notKey)
    setLocalNotification();
    this.props.dispatch(fetchDecks());  
  }

  handleCleanAsync = () => {
    AsyncStorage.clear()
  }
  render() {
    //Destruct 
    
    const {decks, navigation} = this.props

    console.log(
      Object.keys(decks).map(item =>  console.log(item))
    );
    
    return (
      <ScrollView style={styles.ScrollStyle}>
        {decks && Object.values(decks).map(item => (
            <TouchableOpacity
                style={styles.MainView}
                key={item.title}
                onPress={() => navigation.navigate('DeckDetails',
                    { title: item.title })}
            >
                <View key={item.title} >
                    <Text style={styles.TextItens}>{item.title}</Text>
                    <Text style={styles.TextItens}>{item.questions ? item.questions.length : 0} cards <Icon name="cards-playing-outline" size={40} /> </Text>
                </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  ScrollStyle: {
    paddingBottom: '10%'
  },
  MainView: {
    borderBottomWidth: 0.5,
    flex: 1,
    padding: '20%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderStyle: 'dotted',
  },
  TextItens: {
    textAlign: 'center',
    color: '#0080ff',
    fontWeight: 'bold',
    fontSize: 20,
  }
});

const mapStateToProps = state => {
  return{
    decks: state.decks  
  }
}
export default connect(mapStateToProps)(DecksScreen)
