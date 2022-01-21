import { useContext, useState } from 'react';
import { SocialProviderContext } from '../social-provider-context';
import './post-form.module.scss';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* eslint-disable-next-line */
export interface PostFormProps {}

export function PostForm(props: PostFormProps) {
  const { imgur } = useContext(SocialProviderContext);

  const [text, setText] = useState('');
  const [images, setImages] = useState([] as File[]);

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(Array.from(event.target.files || []));
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
            disabled={!imgur}
          />
        </div>
      </div>

      <div>
        <button>Submit</button>
      </div>
    </div>
  );
}

export default PostForm;
