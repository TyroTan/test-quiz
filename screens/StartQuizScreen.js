import React, { Component } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Card } from "react-native-elements";
import Question from "components/Question";
import CardTransition from "components/CardTransition";
import { connect } from "react-redux";
import * as questionsActions from "reduxFolder/questions/actions";
import * as userAnswersActions from "reduxFolder/user-answers/actions";
import autobind from "autobind-decorator";
import StopWatch from "components/StopWatch";

class StartQuizScreen extends Component {
  static navigationOptions = {
    title: "Start Quiz"
  };

  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0
    };
  }

  componentDidMount() {
    this.props.fetchQuestions();
    this.props.startTime();
  }

  @autobind
  onAnswer(answer_) {
    const { currentQuestionIndex } = this.state;
    const item = this.props?.questions?.questionsList?.[currentQuestionIndex];
    this.props.pushUserAnswer({ ...item, users_answer: answer_ });

    if (currentQuestionIndex === 9) {
      this.props.setCurrentRecord({
        ...this.props.questions,
        endTime: new Date().toISOString()
      });
      this.props.navigation.goBack();
      return this.props.navigation.navigate("Results");
    }
    this.setState({ currentQuestionIndex: 1 + currentQuestionIndex });
  }

  render() {
    return <CardTransition {...this.props}>{this.renderMain()}</CardTransition>;
  }

  renderMain() {
    const { currentQuestionIndex } = this.state;
    const { startTime } = this.props;
    const item =
      this.props?.questions?.questionsList?.[currentQuestionIndex] || {};

    return (
      <ImageBackground
        style={styles.container}
        source={require("../assets/images/color_bg2.jpg")}
      >
        <View style={styles.timer}>
          <StopWatch />
        </View>
        <Card
          title={<Text>Question {currentQuestionIndex + 1} out of 10</Text>}
        >
          <View>
            <Question
              startTime={startTime}
              onAnswer={this.onAnswer}
              item={item}
            />
          </View>
        </Card>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({ questions: state.questions }),
  {
    fetchQuestions: questionsActions.fetchQuestions,
    startTime: questionsActions.startTime,
    endTime: questionsActions.endTime,
    pushUserAnswer: userAnswersActions.pushUserAnswer,
    setCurrentRecord: userAnswersActions.setCurrentRecord
  }
)(StartQuizScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    flex: 1,
    resizeMode: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  timer: {
    alignItems: "center",
    margin: 0,
    padding: 0
  }
});
