import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import LoadingSpinner from 'components/Common/UI/Loader/LoadingSpinner';
import { ReactComponent as FavoriteIcon } from 'assets/icons/favorite.svg';
import { ReactComponent as FavoriteActiveIcon } from 'assets/icons/favorite-active.svg';
import { useAppSelector, useAppThunk } from 'hooks/store-hook';
import { toggleFavorites } from 'store/thunks/video-thunk';
import { formatNumber } from 'util/format';
import './VideoFavorites.scss';

interface VideoFavoritesProps {
  videoId: string;
  favorites: number;
  isFavorite?: boolean;
  button?: boolean;
}

const VideoFavorites: React.FC<VideoFavoritesProps> = ({
  videoId,
  favorites,
  isFavorite = false,
  button,
}) => {
  const { userData } = useAppSelector((state) => state.user);
  const { dispatchThunk, loading } = useAppThunk();

  const [data, setData] = useState({ number: favorites, active: isFavorite });

  const history = useHistory();

  const toggleFavoritesHandler = async () => {
    if (!button) return;
    if (!userData) return history.push('/auth');

    await dispatchThunk(toggleFavorites(videoId));

    setData((prevData) => ({
      number: prevData.active ? prevData.number - 1 : prevData.number + 1,
      active: !prevData.active,
    }));
  };

  return (
    <div className={`video-favorites${button ? ' button' : ''}`}>
      <LoadingSpinner on={loading} overlay />
      {data.active && <FavoriteActiveIcon onClick={toggleFavoritesHandler} />}
      {!data.active && <FavoriteIcon onClick={toggleFavoritesHandler} />}
      <span>{formatNumber(data.number)}</span>
    </div>
  );
};

export default VideoFavorites;
