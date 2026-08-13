import { messages } from 'elasticio-node';
import Client from '../client';

export async function processAction(msg: any, cfg: any) {
  this.logger.info('"Lookup Object By ID" action started');
  const client = new Client(this, cfg);
  const { objectType } = cfg;
  const { idValue } = msg.body;
  if (!idValue) {
    throw new Error('No "ID Value" provided!');
  }

  let url: string;
  switch (objectType) {
    case 'pet':
      url = `/pet/${idValue}`;
      break;
    case 'order':
      url = `/store/order/${idValue}`;
      break;
    default:
      throw new Error(`Object type "${objectType}" is not supported!`);
  }
  const { data } = await client.apiRequest({
    method: 'GET',
    url,
  });
  this.logger.info('"Lookup Object By ID" action is done, emitting...');
  return messages.newMessageWithBody(data);
}

module.exports.process = processAction;
