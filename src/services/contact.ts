import { apiRoutesEnum } from 'enums/routes';
import { EmailSendRequest } from 'types/contact';
import AXIOS from './axios';

async function SendEmail(body: EmailSendRequest) {
  return AXIOS.post(apiRoutesEnum.MAILS, {
    ...body,
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  SendEmail,
};
