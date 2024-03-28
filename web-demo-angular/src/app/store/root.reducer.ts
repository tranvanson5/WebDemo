import { ActionReducerMap } from '@ngrx/store';
import {authReducer, AuthState} from "./reducer/auth/auth.reducer";

export interface RootState {
  auth: AuthState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  auth: authReducer
};
