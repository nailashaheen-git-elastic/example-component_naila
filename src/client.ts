import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class Client {
  private cfg: any;

  private logger: any;

  constructor(context: any, cfg: any) {
    this.logger = context.logger;
    this.cfg = cfg;
  }

  async apiRequest(opts: AxiosRequestConfig): Promise<AxiosResponse> {
    const baseURL = (this.cfg.url || 'https://petstore.elastic.io/v2').replace(/\/$/, '');
    const apiKey = this.cfg.apiKey;

    const response = await axios({
      ...opts,
      baseURL,
      headers: {
        ...(apiKey ? { 'api-key': apiKey } : {}),
        ...opts.headers,
      },
      validateStatus: () => true,
    });

    if (response.status >= 400) {
      const error: any = new Error(`Request failed with status ${response.status}`);
      error.response = response;
      throw error;
    }

    return response;
  }
}