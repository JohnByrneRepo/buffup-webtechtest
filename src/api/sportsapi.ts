async function getQuestionData() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple');
  const data = await response.json();
  return data;
}

export const getQuestions = () => {
  return getQuestionData().then(data => {
    return data;
  });
}
