import { DispatchType } from './../../types/store';
import { EmailSendRequest } from './../../types/contact';
import { ContactActionTypeEnum } from './../../enums/actions';
import { asyncTaskStopAction, asyncTaskStartAction } from './asyncTaskActions';
import { ApiError } from 'types/api';
import contactSvc from 'services/contact';

export const sendEmail = (body: EmailSendRequest) => {
  const taskId = ContactActionTypeEnum.SEND_EMAIL;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await contactSvc.SendEmail(body);
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
