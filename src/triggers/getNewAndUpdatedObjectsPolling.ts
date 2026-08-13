import { messages } from 'elasticio-node';
import Client from '../client';

export async function processTrigger(msg, cfg, snapshot = {
  startTime: undefined
}) {
  this.logger.info('"Get Pets By Status" trigger started');
const client = new Client(this, cfg);
const status = cfg.petStatus || 'available';

const { data: pets } = await client.apiRequest({
  url: `/pet/findByStatus?status=${status}`,
  method: 'GET',
});

this.logger.info(`Found ${pets.length} pets with status "${status}"...`);

for (const pet of pets) {
  await this.emit('data', messages.newMessageWithBody(pet));
}

this.logger.info('Polling complete.');
}

module.exports.process = processTrigger;
