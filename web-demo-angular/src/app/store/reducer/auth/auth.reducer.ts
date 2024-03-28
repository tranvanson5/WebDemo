// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setAccessToken, removeAccessToken } from './auth.actions';

export interface AuthState {
  accessToken: string | null;
}

export const initialAuthState: AuthState = {
  accessToken: null
};

const _authReducer = createReducer(
  initialAuthState,
  on(setAccessToken, (state, { accessToken }) => ({ ...state, accessToken })),
  on(removeAccessToken, state => ({ ...state, accessToken: null }))
);

export function authReducer(state: AuthState | undefined, action: any) {
  return _authReducer(state, action);
}
