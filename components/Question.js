import React, { PureComponent } from 'react';
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements';

// {
// [23:53:01]   "category": "Sports",
// [23:53:01]   "correct_answer": "Puma",
// [23:53:01]   "difficulty": "medium",
// [23:53:01]   "incorrect_answers": Array [
// [23:53:01]     "Nike",
// [23:53:01]     "Adidas",
// [23:53:01]     "Reebok",
// [23:53:01]   ],
// [23:53:01]   "question": "Which German sportswear company&#039;s logo is the &#039;Formstripe&#039;?",
// [23:53:01]   "type": "multiple",
// [23:53:01] }

export default class Question extends PureComponent {
  render() {
    const { item = `` } = this.props;

    return (
      <View>
        <Text>
          {item.question}
        </Text>
        <Button
          title="Python"
          raised
        />
      </View>
    )
  }
}
