import React, {Component} from 'react'
import {View, TextInput,StyleSheet, TouchableOpacity, Text} from 'react-native'
import { addCard } from '../store/actions/decks';
import { connect } from 'react-redux'

class AddCard extends Component {

  state ={
    pergunta: '',
    resposta: ''
  }

  handleSaveCard = () => {
    const { navigation, saveCard } = this.props
    const {pergunta, resposta} = this.state

    const title = navigation.getParam('title');
    let question = pergunta;
    let answer = resposta; 
    const card = {
      question,
      answer
    }
    saveCard(title, card)
    navigation.goBack()
  }

  handleChangeQuestion = text => {
    this.setState({ pergunta: text })
  }

  handleChangeAnswer = text => {
    this.setState({ resposta: text })
  }

  
  render(){
    const {pergunta, resposta} = this.state
    return(
      <View style={styles.MainView}>
        <TextInput 
          style={styles.inputStyle} 
          onChangeText={text => this.handleChangeQuestion(text) } 
          placeholder="Question" 
        />
        <TextInput 
          style={styles.inputStyle} 
          onChangeText={text => this.handleChangeAnswer(text) } 
          placeholder="Answer"
        />

        {pergunta === "" || resposta === "" 
          ?         
          <TouchableOpacity style={styles.buttonDisabledStyle} disabled>
            <Text style={styles.textButton}>Create card</Text>
          </TouchableOpacity> 
          : 
          <TouchableOpacity style={styles.buttonStyle} onPress={() => this.handleSaveCard()}>
            <Text style={styles.textButton}>Create card</Text>
          </TouchableOpacity>  
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainView: {
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonStyle: {
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200, 
    height: 50,
    backgroundColor: '#0080ff',
    alignItems: 'center',
  },
  buttonDisabledStyle: {
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    width: 200, 
    height: 50,
    backgroundColor: '#0080ff',
    alignItems: 'center',
    opacity: 0.4
  },
  textButton: {
    marginTop: 10, 
    fontSize:20, 
    color: 'white', 
    fontWeight: 'bold'
  },
  inputStyle: {
    marginLeft: '5%',
    marginTop: '10%',
    height: 40,
    width: 300,
    borderBottomWidth: 1,
  }
})

const mapDispatchToProps = dispatch => ({
  saveCard: (title, card) => dispatch(addCard(title, card)),
});



export default connect(null, mapDispatchToProps)(AddCard)