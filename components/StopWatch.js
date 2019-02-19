import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import { getHumanReadableTime } from "utils/js-util";
import autobind from 'autobind-decorator';

export default class StopWatch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentCount: this.props.start || 0 };
  }

  @autobind
  timer() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer, 1000);
  }


  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <View>
        <Text>{getHumanReadableTime(this.state.currentCount)}</Text>
      </View>
    );
  }
}
