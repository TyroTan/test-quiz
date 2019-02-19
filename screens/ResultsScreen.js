import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AirbnbRating, Button, Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { getHumanReadableTime } from "utils/js-util";
import autobind from "autobind-decorator";
import rtt from "reactotron-react-native";

class ResultsScreen extends Component {
  static navigationOptions = {
    title: "Results"
  };

  @autobind
  onPlayAgain() {
    this.props.navigation.navigate("StartQuiz");
  }

  calculateResults() {
    const { userAnswers = {} } = this.props;
    const { currentRecord = {} } = userAnswers;
    const { answers = [] } = currentRecord;
    const seconds =
      (new Date(currentRecord.endTime).getTime() -
        new Date(currentRecord.startTime).getTime()) /
      1000;

    const score = answers
      .slice(-10)
      .reduce((a, c) => (c.correct_answer === c.users_answer ? a + 1 : a), 0);
    let stars = 1;
    if (score > 5) {
      stars++;

      if (score >= 9 && seconds <= 100) {
        stars++;
      }
    }

    return {
      score,
      stars,
      time: getHumanReadableTime(seconds).replace(/\.(.)+/, "")
    };
  }

  render() {
    if (!this?.props?.userAnswers?.answers?.length) {
      return (
        <View>
          <Text>Game is not finished yet</Text>
        </View>
      );
    }
    const img1 = require("../assets/images/robot-prod.png");
    const results = this.calculateResults();

    return (
      <Card>
        <AirbnbRating
          buttonStyle={styles.rating}
          ratingCount={3}
          count={results.stars}
          reviews={["Your Score"]}
          size={20}
        />
        <Button
          buttonStyle={styles.score}
          icon={<Icon name="check" size={15} color="white" />}
          title={<Text>{results.score}/10</Text>}
        />
        <Button
          buttonStyle={styles.time}
          icon={
            <Icon
              type="material-community"
              name="alarm"
              size={15}
              color="white"
            />
          }
          title={<Text>{results.time}</Text>}
        />

        <Button
          onPress={this.onPlayAgain}
          buttonStyle={styles.playAgain}
          title="Play Again?"
        />
      </Card>
    );
  }
}

export default connect(state => state)(ResultsScreen);

const styles = StyleSheet.create({
  rating: {
    marginVertical: 5
  },
  score: {
    marginVertical: 5
  },
  time: {
    marginVertical: 5
  },
  playAgain: {
    marginVertical: 5
  }
});
