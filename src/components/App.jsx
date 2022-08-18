import React, { Component } from 'react';
import s from './App.module.css';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Notification from './Notification/Notification';
import Statistics from './Statistics/Statistics';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    return Math.round(this.state.good / this.countTotalFeedback() * 100);
  };

  onLeaveFeedback = (feedbackType) => {
    this.setState(prev => ({ [feedbackType]: prev[feedbackType] + 1 }));
  };

  render() {
    const total = this.countTotalFeedback();

    return (
      <div className={s.container}>
        <Section title='Please leave feedback'>
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title='Statistics'>
          {!total
            ? <Notification message='There is no feedback' />
            : <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />}
        </Section>
      </div>
    );
  }
}

export default App;