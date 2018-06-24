// Action Types
const GAME_START = 'GAME_START';
const GAME_OVER = 'GAME_OVER';
const SET_SCORE = 'SET_SCORE';
const ADD_CROWN = 'ADD_CROWN';
const ADD_STEP = 'ADD_STEP';

// Action Creators
export const gameStart = () => ({ type: GAME_START });
export const gameOver = () => ({ type: GAME_OVER });
export const setScore = score => ({ type: SET_SCORE, payload: { score } });
export const addCrown = crown => ({ type: ADD_CROWN, payload: { crown } });
export const addStep = () => ({ type: ADD_STEP });

const initState = {
  isGameOver: false,
  score: 0,
  crown: 0,
  step: 0,
};

// Reducer
export default function app(state = initState, action) {
  switch (action.type) {
    case GAME_START:
      return initState;

    case GAME_OVER:
      return {
        ...state,
        isGameOver: true,
      };

    case SET_SCORE:
      return {
        ...state,
        score: action.payload.score,
      };

    case ADD_CROWN:
      return {
        ...state,
        crown: state.crown + action.payload.crown,
      };

    case ADD_STEP:
      return {
        ...state,
        step: state.step + 1,
      };

    default:
      return state;
  }
}
