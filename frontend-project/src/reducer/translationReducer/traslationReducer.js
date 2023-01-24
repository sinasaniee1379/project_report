const initialState = {
  isTraslate: false,
};

export const TranslateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TRANSLATE":
      return { isTraslate: !state.isTraslate };
    default:
      return state;
  }
};
