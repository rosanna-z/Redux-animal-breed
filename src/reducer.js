const initialState = {
  breeds: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BREEDS':
      return {
        ...state,
        breeds: action.breeds,
    };
    default:
      return state;
  }
};

export default reducer;