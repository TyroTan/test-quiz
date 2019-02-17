import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Question from "components/Question";
import { connect } from "react-redux";
import rtt from 'reactotron-react-native';
import * as questionsActions from "reduxFolder/questions/actions";

class StartQuizScreen extends Component {
  static navigationOptions = {
    title: "StartQuiz"
  };

  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0
    }
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  render() {
    const item = this.props?.questions?.questionsList?.[this.state.currentQuestionIndex]

    return (
      <ScrollView style={styles.container}>
        <View style={styles.timer}>
          <Text>Timer: 00:04</Text>
        </View>
        <View style={styles.questionsStatus}>
          <Text>Question 1 out of 10</Text>
        </View>
        <View style={styles.question}>
          <Question item={item} />
        </View>
        <View style={styles.answersWrapper}>
          <Text>A OR B OR C OR d</Text>
        </View>
        <View>
          <Text>?</Text>
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  state => ({ questions: state.questions }),
  {
    fetchQuestions: questionsActions.fetchQuestions,
  }
)(StartQuizScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
