import { apiRoutesEnum } from 'enums/routes';
import { NotificationResponse } from 'types/notification';
import AXIOS from './axios';

async function GetNotifications(): Promise<NotificationResponse> {
  return AXIOS.get(apiRoutesEnum.GET_MY_NOTIFICATIONS);
}

async function MarkAsSeenNotification() {
  return AXIOS.put(`${apiRoutesEnum.GET_MY_NOTIFICATIONS}/mark-as-seen`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetNotifications,
  MarkAsSeenNotification,
};
