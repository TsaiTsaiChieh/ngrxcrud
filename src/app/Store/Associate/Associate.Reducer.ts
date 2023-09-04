// https://ngrx.io/guide/store/reducers

import { createReducer, on } from '@ngrx/store';
import { AssociateState } from './Associate.State';
import {
  addassociatesuccess,
  loadassociatefail,
  loadassociatesuccess,
} from './Associate.Action';

const _AssociateReducer = createReducer(
  AssociateState,
  on(loadassociatesuccess, (state, action) => {
    return { ...state, list: [...action.list], errormessage: '' };
  }),
  on(loadassociatefail, (state, action) => {
    return { ...state, list: [], errormessage: action.errormessage };
  }),
  on(addassociatesuccess, (state, action) => {
    const _maxid = Math.max(...state.list.map((o) => o.id));
    const _newdata = { ...action.inputdata };
    _newdata.id = _maxid + 1;
    return {
      ...state,
      list: [...state.list, _newdata],
      errormessage: '',
    };
  })
);
export function AssociateReducer(state: any, action: any) {
  return _AssociateReducer(state, action);
}
