import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE: // SSRì íìí action
      console.log('HYDRATE:', action.type);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
