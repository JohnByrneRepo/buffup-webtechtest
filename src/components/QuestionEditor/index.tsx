import { Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';
import { updateQuestionRequest } from "../../redux/actions/questionwebservice";

function QuestionEditor({ dispatch, selectedQuestion, index }) {
  console.log(dispatch, selectedQuestion);
  
  const [question, setQuestion] = useState(selectedQuestion);
  const [correctAnswer, setCorrectAnswer] = useState(selectedQuestion.correct_answer);

  useEffect(() => {
    setQuestion(selectedQuestion);
    setCorrectAnswer(selectedQuestion.correct_answer);
  }, [selectedQuestion]);

  const handleChange = (value: string) => {
    setCorrectAnswer(value);
  };

  const updateQuestion = () => {
    dispatch(updateQuestionRequest(question, correctAnswer, index));
    setQuestion({...question,
      correct_answer: correctAnswer,
      incorrect_answers: [question.correct_answer]
        .concat(question.incorrect_answers || []).filter(
          question => question !== correctAnswer
        )
    })
  }

  return (
    <Grid xs={7} item={true}>
      <h1>Editor</h1>
      {question.question &&
        <div>
          <h2>{question.question}</h2>
          <div>
            <label>
              {question.correct_answer}
              <Checkbox
                checked={correctAnswer === question.correct_answer}
                onChange={() => handleChange(question.correct_answer)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </label>
          </div>
          {question.incorrect_answers.map((answer: string, index: number) =>
            <div key={index}>
              <label>
                {answer}
                <Checkbox
                  checked={correctAnswer === answer}
                  onChange={() => handleChange(answer)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </label>
            </div>
          )}

          <Button variant="contained" color="primary" onClick={updateQuestion}>
            Save
          </Button>
        </div>}
    </Grid>
  );
}

function mapStateToProps(state: any) {
  return { index: state.quiz.index, selectedQuestion: state.quiz.selectedQuestion };
}

export default connect(mapStateToProps)(QuestionEditor)
