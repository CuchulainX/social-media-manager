import axios from 'axios';
import { nanoid } from 'nanoid';
import {
  OAuthOptions,
  OAuthLogin,
  OAuthLoginCallback,
  OAuthCallbackResponse,
  SNSAuthService,
  validateCallbackState,
} from './sns-auth';

export class RedditAuthService implements SNSAuthService {
  constructor(private options: OAuthOptions) {}

  async getLoginUrl(redirect: string): Promise<OAuthLogin> {
    const { clientId } = this.options;
    const state = nanoid();
    const url = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirect}&duration=temporary&scope=identity+submit`;
    return { url, state };
  }

  async handleCallback(
    callback: OAuthLoginCallback
  ): Promise<OAuthCallbackResponse> {
    validateCallbackState(callback);

    const { clientId, clientSecret } = this.options;

    const body = `grant_type=authorization_code&code=${callback.code}&redirect_uri=${callback.redirect}`;
    const encoded = btoa(`${clientId}:${clientSecret}`);
    const { data, status } = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      body,
      {
        headers: { Authorization: `Basic ${encoded}` },
      }
    );

    if (status !== 200) {
      throw new Error(`${status} - ${data}`);
    }

    return { token: data.access_token };
  }
}
