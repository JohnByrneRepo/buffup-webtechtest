import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionEditor from './index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('QuestionEditor', () => {
  test('renders QuestionEditor component', () => {
    const question = {
      category: "Sports",
      type: "multiple",
      difficulty: "medium",
      question: "Which nation hosted the FIFA World Cup in 2006?",
      correct_answer: "Liverpool",
      incorrect_answers: [
        "United Kingdom",
        "South Africa",
        "Germany",
        "Brazil"
      ]
    }

    let mockedStore = configureStore([])({
      quiz: { selectedQuestion: question }
    });

    render(<Provider store={mockedStore}>
      <QuestionEditor />
    </Provider>);

    expect(screen.getByText('Which nation hosted the FIFA World Cup in 2006?')).toBeInTheDocument();
  });
});
