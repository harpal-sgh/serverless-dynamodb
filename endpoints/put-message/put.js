import { putmessages } from './repo/dynamodb';
import { success, failure } from '../../libs/response-lib';

exports.put  = async (event, context) => {
  try {
    const message = {
        "message_id": 32,
        "user_id": 13,
        "messagefor": "inbox",
        "subject": "message 33",
        "messagebody": "message 33 body",
        "created_date":new Date().toISOString(),
        "isread": true,
        "messagefor-created_date": "inbox-" + new Date().toISOString()
        };
    const data = await putmessages('messages-gsi-4', message);
    return success(data);
  } catch (err) {
    console.log(`Error ${err}`);
    return failure({ status: false });
  }
};