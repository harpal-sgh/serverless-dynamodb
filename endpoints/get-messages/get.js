import { getmessages } from './repo/dynamodb';
import { success, failure } from '../../libs/response-lib';

exports.get  = async (event, context) => {
  try {
    const data = await getmessages(13, 'messages-gsi-4', 'inbox', true, 2);
    return success(data);
  } catch (err) {
    console.log(`Error ${err}`);
    return failure({ status: false });
  }
};