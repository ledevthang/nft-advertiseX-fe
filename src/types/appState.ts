import { AppStateEnum } from 'enums/actions';

export interface AppState {
  isScrolling: boolean;
  isLoaded: boolean;
  isShowSnack: boolean;
  snackContent: string;
  type: 'error' | 'warning' | 'info' | 'success';
  snackLabel?: string;
  snackClass?: string;
}

export interface UpdateAppStateAction {
  type: typeof AppStateEnum.UPDATE_APP_STATE;
  payload: Partial<AppState>;
}

export type AppActionTypes = UpdateAppStateAction;
