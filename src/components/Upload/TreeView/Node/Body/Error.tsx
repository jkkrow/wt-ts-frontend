import { ReactComponent as RemoveIcon } from 'assets/icons/remove.svg';
import { useAppDispatch } from 'hooks/store-hook';
import { VideoNode } from 'store/reducers/video-reducer';
import { updateNode } from 'store/actions/upload-action';

interface ErrorProps {
  currentNode: VideoNode;
  error: string | null;
}

const Error: React.FC<ErrorProps> = ({ currentNode, error }) => {
  const dispatch = useAppDispatch();

  const cancelHandler = () => {
    dispatch(updateNode(null, currentNode.id));
  };

  return error ? (
    <div className="upload-node__error">
      <div className="upload-node__error__message" style={{ color: '#ff0000' }}>
        {error}
      </div>
      <div className="upload-node__error__action">
        <RemoveIcon onClick={cancelHandler} />
      </div>
    </div>
  ) : null;
};

export default Error;
