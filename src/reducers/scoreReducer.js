const initialState = {
  score: 0,
  question: 20,
  finished: false
}

const scoreReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'INCREASE_SCORE':
      return{
        score: state.score < 100 && state.score + 5,
        questionCount: state.questionCount !== 0 && state.questionCount - 1,
        finished: state.questionCount === 0 && true
      };
    case 'DECREASE_SCORE': 
      return {
        score: state.score > 0 && state.score - 5,
        questionCount: state.questionCount !== 0 && state.questionCount - 1,
        finished: state.questionCount === 0 && true
      };
    case 'RESET_SCORE': 
      return {
        score: 0,
        questionCount: 20,
        finished: false
      };
  }
  return state;
}

export default scoreReducer;