import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import ScheduleReducer from './schedule-reducer';

const rootReducer = combineReducers({
  schedule:ScheduleReducer,
  form: formReducer
});

export default rootReducer;
