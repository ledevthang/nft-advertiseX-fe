import { NotificationActionTypeEnum } from 'enums/actions';

export enum NotificationType {
  ItemAdded = 'itemAdded',
  ItemSold = 'itemSold',
  NewOffer = 'newOffer',
  MovedUp = 'movedUp',
  MovedDown = 'movedDown',
}

export interface Notification {
  id: number;
  content: string;
  status: 'seen' | 'not seen';
  type: NotificationType;
  userId: string;
  createdAt: Date;
}

export interface NotificationResponse {
  data: {
    Latest: Notification[];
    Yesterday: Notification[];
    'Past 7 days': Notification[];
    'Past 30 days': Notification[];
  };
  totalNotSeen: number;
}

export interface GetNotificationsAction {
  type: typeof NotificationActionTypeEnum.GET_MY_NOTIFICATIONS;
  payload: NotificationResponse;
}

export interface UpdateNotificationsNotSeenAction {
  type: typeof NotificationActionTypeEnum.UPDATE_TOTAL_NOT_SEEN;
  payload: { totalNotSeen: number };
}

export type NotificationActionTypes =
  | GetNotificationsAction
  | UpdateNotificationsNotSeenAction;
