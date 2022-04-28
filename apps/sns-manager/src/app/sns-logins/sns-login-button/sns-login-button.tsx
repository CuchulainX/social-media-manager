import './sns-login-button.module.scss';
import {
  faFacebook,
  faInstagram,
  faReddit,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { SocialProvider, User } from '@kumi-arts/core';
import { environment } from '../../../environments/environment';
import { Button } from 'evergreen-ui';
import { Client } from '../../clients/client';
import { SocialProviderContext } from '../../social-provider-context';

export interface SnsButtonProps {
  provider: SocialProvider;
  api: Client;
  icon: IconDefinition;
  profileUrl: (u: User) => string;
}

// TODO: move to props
const data = {
  [SocialProvider.INSTAGRAM]: {
    icon: faInstagram,
    profileUrl: ({ name }: User) => `https://instagram.com/${name}`,
  },
  [SocialProvider.IMGUR]: {
    icon: faImages,
    profileUrl: ({ name }: User) => `https://imgur.com/user/${name}/posts`,
  },
};

export function SnsLoginButton({
  api,
  provider,
  icon,
  profileUrl,
}: SnsButtonProps) {
  const { setLoggedIn } = useContext(SocialProviderContext);
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    api
      .getUser()
      .then((user) => {
        setUser(user);
        setLoggedIn(provider, true);
      })
      .catch((err) => {
        setUser(null);
        setLoggedIn(provider, false);
      });
  }, []);

  const buildUrl = () => {
    if (user?.id) {
      return profileUrl(user);
    } else {
      return `${environment.api}/auth/${provider}/login`;
    }
  };

  const redirectLogin = () => {
    window.location.href = buildUrl();
  };

  const text = user?.name || `${provider} login`;
  return (
    <Button
      onClick={redirectLogin}
      iconBefore={<FontAwesomeIcon icon={icon} />}
    >
      {text}
    </Button>
  );
}

export default SnsLoginButton;
