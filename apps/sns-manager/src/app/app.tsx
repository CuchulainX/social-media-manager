import { SNSPost, SocialProvider } from '@kumi-arts/core';
import { Button, Pane } from 'evergreen-ui';
import { useRef, useState } from 'react';
import PinterestForm from './forms/pinterest-form';
import PostForm from './post-form/post-form';
import ProviderSelect from './post-form/provider-select/provider-select';
import SnsLogins from './sns-logins/sns-logins';
import {
  ProviderBool,
  ProviderStatus,
  SocialProviderContext,
  Status,
} from './social-provider-context';
import { ProviderForm } from './forms/form';
import TwitterForm from './forms/twitter-form';

export function App() {
  const [loggedIn, setLoggedIn] = useState({} as ProviderBool);
  const [status, setStatus] = useState({} as ProviderStatus);

  const [defaultPost, setDefaultPost] = useState({
    text: '',
    title: '',
    media: {
      filename: '',
    },
  } as SNSPost);
  const [providers, setProviders] = useState([] as SocialProvider[]);

  const pinterestRef = useRef(null as ProviderForm | null);
  const twitterRef = useRef(null as ProviderForm | null);

  const isSubmitting = Object.values(status).some(
    (s) => s === Status.SUBMITTING
  );
  const hasErrors = Object.values(status).some((s) => s === Status.ERROR);

  const onSubmit = () => {
    if (!hasErrors) {
      pinterestRef.current?.submit();
      twitterRef.current?.submit();
    }
  };

  const onProviderChange = (providers: SocialProvider[]) => {
    setProviders(providers);

    Object.keys(status)
      .map((p) => p as SocialProvider)
      .filter((p) => !providers.includes(p))
      .forEach((p) => (status[p] = Status.VALID));
    setStatus(status);
  };

  return (
    <Pane>
      <SocialProviderContext.Provider
        value={{
          loggedIn,
          status,
          setLoggedIn: (p, v) => setLoggedIn((s) => ({ ...s, [p]: v })),
          setStatus: (p, v) => setStatus((s) => ({ ...s, [p]: v })),
        }}
      >
        <SnsLogins />

        <Pane padding="1em">
          <PostForm
            post={defaultPost}
            onPostChange={setDefaultPost}
            disabled={isSubmitting}
          />
          <ProviderSelect selected={providers} onChange={onProviderChange} />

          {providers.includes(SocialProvider.TWITTER) && (
            <TwitterForm
              defaultPost={defaultPost}
              ref={twitterRef}
              disabled={isSubmitting}
            />
          )}

          {providers.includes(SocialProvider.PINTEREST) && (
            <PinterestForm
              defaultPost={defaultPost}
              ref={pinterestRef}
              disabled={isSubmitting}
            />
          )}

          <Button
            onClick={onSubmit}
            appearance="primary"
            disabled={hasErrors || isSubmitting}
          >
            Submit
          </Button>
        </Pane>
      </SocialProviderContext.Provider>
    </Pane>
  );
}

export default App;
