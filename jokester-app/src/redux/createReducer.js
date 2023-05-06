export default function createReducer(state, diff) {
  return { ...state, ...diff }
}