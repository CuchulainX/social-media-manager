import { useContext, useState } from 'react';
import { SocialProviderContext, Tokens } from '../social-provider-context';
import './post-form.module.scss';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocialProvider } from '@kumi-arts/core';
import { ImgurClient } from '../imgur';

/* eslint-disable-next-line */
export interface PostFormProps {}

export function PostForm(props: PostFormProps) {
  const tokens: Tokens = useContext(SocialProviderContext);

  const [text, setText] = useState('');
  const [images, setImages] = useState([] as File[]);

  const imgurToken = tokens[SocialProvider.IMGUR];
  const imgurClient = new ImgurClient(imgurToken || '');

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(Array.from(event.target.files || []));
  };

  const onSubmit = async () => {
    console.log('Submit');
    if (images.length > 0 && imgurToken) {
      imgurClient.credits();
      const link = await imgurClient.uploadImage(images[0]);
      console.log(link);
    }
  };

  return (
    <div>
      <div>
        <div>
          <label>Text</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div>
          <label>
            Image
            <FontAwesomeIcon
              title="Imgur is needed for image uploads"
              icon={faInfo}
            />
          </label>
          <input
            type="file"
            multiple
            onChange={onFileUpload}
            disabled={!tokens[SocialProvider.IMGUR]}
          />
        </div>
      </div>

      <div>
        {Object.keys(tokens)
          .filter((t) => !!tokens[t as SocialProvider])
          .map((t) => {
            return (
              <span key={t}>
                <input id={t} type="checkbox" />
                <label htmlFor={t}>{t}</label>
              </span>
            );
          })}
      </div>

      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default PostForm;
