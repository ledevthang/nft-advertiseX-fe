import {
  NotificationActionTypes,
  NotificationResponse,
} from 'types/notification';
import { NotificationActionTypeEnum } from '../../enums/actions';

export const initialNotifications: NotificationResponse = {
  data: {
    Latest: [],
    Yesterday: [],
    'Past 7 days': [],
    'Past 30 days': [],
  },
  totalNotSeen: 0,
};

export const notificationReducer = (
  state = initialNotifications,
  action: NotificationActionTypes,
) => {
  switch (action.type) {
    case NotificationActionTypeEnum.GET_MY_NOTIFICATIONS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case NotificationActionTypeEnum.UPDATE_TOTAL_NOT_SEEN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
