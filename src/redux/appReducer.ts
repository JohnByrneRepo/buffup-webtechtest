
import { createStore, combineReducers, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/rootSaga';

import * as sportwebservice from './actions/questionwebservice';

import { Question } from '../types/Question';

export interface QuizState {
  questions: Question[]
  index: number
  selectedQuestion: Question
}

const initialQuizState: QuizState = {
  questions: [],
  index: 0,
  selectedQuestion: {
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  },
};

function questionReduxReducer(state = initialQuizState, action) {
  switch (action.type) {
    case sportwebservice.Types.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: [
          ...action.payload.results,
          ...state.questions
        ]
      };
    case sportwebservice.Types.DELETE_QUESTION_REQUEST:
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, action.payload.index),
          ...state.questions.slice(action.payload.index + 1)
        ],
      };
    case sportwebservice.Types.EDIT_QUESTION_REQUEST:
      return {
        ...state,
        index: action.payload.index,
        selectedQuestion: state.questions[action.payload.index]
      }
    case sportwebservice.Types.UPDATE_QUESTION_REQUEST:
      return {
        ...state,
        questions: [...state.questions].map((question, index) => ({
          ...question,
          correct_answer: action.payload.index === index ? action.payload.answer : question.correct_answer,
          incorrect_answers: action.payload.index === index ? [question.correct_answer]
            .concat(question.incorrect_answers || []).filter(
              question => question !== action.payload.answer
            ) : question.incorrect_answers
        })),
      }
    default:
      return state;
  }
}

const overallReducer = combineReducers({
  quiz: questionReduxReducer
});

// Sage Middleware is used for fetching external resources.
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  overallReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export { store };
