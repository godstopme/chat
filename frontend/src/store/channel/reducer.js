import field from '../common/field'
import { createReducer } from 'redux-act';
import { setChannel } from './actions';

const channel = field({}, setChannel)