import { NotificationActionTypeEnum } from 'enums/actions';
import notificationSvc from 'services/notification';
import { ApiError } from 'types/api';
import { NotificationResponse } from 'types/notification';
import { DispatchType } from 'types/store';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getNotificationsSuccessAction = (
  payload: NotificationResponse,
) => {
  return {
    type: NotificationActionTypeEnum.GET_MY_NOTIFICATIONS,
    payload,
  };
};

export const updateNotificationsNotSeenSuccessAction = (payload: {
  totalNotSeen: number;
}) => {
  return {
    type: NotificationActionTypeEnum.UPDATE_TOTAL_NOT_SEEN,
    payload,
  };
};

export const getNotificationsAction = () => {
  const taskId = NotificationActionTypeEnum.GET_MY_NOTIFICATIONS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await notificationSvc.GetNotifications();
      dispatch(getNotificationsSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const updateSeenNotification = () => {
  const taskId = NotificationActionTypeEnum.MARK_AS_SEEN;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await notificationSvc.MarkAsSeenNotification();
      const data = await notificationSvc.GetNotifications();
      dispatch(getNotificationsSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
