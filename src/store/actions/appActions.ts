import { AppStateEnum } from 'enums/actions';
import { AppState } from 'types/appState';

export const updateAppStateAction = (payload: Partial<AppState>) => ({
  type: AppStateEnum.UPDATE_APP_STATE,
  payload,
});
