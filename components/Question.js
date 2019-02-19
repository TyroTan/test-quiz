import React, { Component } from "react";
import { Animated, ScrollView, StyleSheet, Text } from "react-native";
import { Button as ButtonEl } from "react-native-elements";
import { getShuffle1_4 } from "utils/js-util";
import autobind from "autobind-decorator";
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

const { View } = Animated;

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1)
    };
  }

  componentDidUpdate(newProps) {
    const isLoading = newProps?.item?.incorrect_answers ? false : true;
  }


  componentDidMount() {
  }

  startAnimate() {
    Animated.timing(
      this.state.fadeAnim, // The value to drive
      { duration: 1000, toValue: 1 } // Configuration
    ).start();
  }

  @autobind
  onButtonPress(c) {
    const { onAnswer } = this.props;
    this.setState(
      {
        fadeAnim: new Animated.Value(0)
      },
      () => {
        onAnswer(c);
        this.startAnimate();
      }
    );
  }

  renderChoices() {
    const { item = {} } = this.props,
      { correct_answer = "", incorrect_answers = [] } = item,
      choices = getShuffle1_4([...incorrect_answers, correct_answer]);
    const isLoading = this.props?.item?.incorrect_answers ? false : true;

    return (
      <ScrollView>
        {choices.map((c, i) => (
          <View
            style={{
              paddingVertical: 5,
              opacity: this.state.fadeAnim.interpolate({
                inputRange: [0, 0.3, 1],
                outputRange: [0, 0.3 - (0.1 * i) , 1]
              })
            }}
          >
            <ButtonEl
              key={c}
              onPress={() => this.onButtonPress(c)}
              loading={isLoading}
              title={`${c}`}
            />
          </View>
        ))}
      </ScrollView>
    );
  }

  render() {
    const { item = {} } = this.props;

    return (
      <View>
        <Text>{entities.decode(item.question)}</Text>
        {this.renderChoices()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10
  }
})
