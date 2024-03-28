// auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const setAccessToken = createAction(
  '[Auth] Set Access Token',
  props<{ accessToken: string }>()
);

export const removeAccessToken = createAction('[Auth] Remove Access Token');
