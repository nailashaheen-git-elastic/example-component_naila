import Client from './src/client';

export = async function verifyCredentials(this: any, cfg: any) {
  const client = new Client(this, cfg);
  try {
    await client.apiRequest({ method: 'GET', url: '/user/me' });
    this.logger.info('Verification completed successfully');
    return { verified: true };
  } catch (e) {
    this.logger.error('Verification failed');
    throw new Error('Invalid API key or URL');
  }
}