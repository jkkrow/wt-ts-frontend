import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { ReactComponent as VideoIcon } from 'assets/icons/video.svg';
import { VideoTree } from 'store/types/video';
import { getAutoGeneratedThumbnail } from 'util/video';
import './VideoThumbnail.scss';

interface VideoThumbnailProps {
  video: VideoTree;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ video }) => {
  const navigate = useNavigate();

  const thumbnailUrl = useMemo(() => {
    let src = getAutoGeneratedThumbnail(video.root);

    if (video.thumbnail) {
      src = `${process.env.REACT_APP_SOURCE_URL}/${video.thumbnail}`;
    }

    return src;
  }, [video]);

  const watchVideoHandler = () => {
    navigate(`/video/${video._id}`);
  };

  return (
    <div className="video-thumbnail" onClick={watchVideoHandler}>
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt={video.title} />
      ) : (
        <VideoIcon />
      )}
    </div>
  );
};

export default VideoThumbnail;
