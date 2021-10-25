import { memo } from 'react';

interface TimeProps {
  time: string;
}

const Time: React.FC<TimeProps> = ({ time }) => (
  <time className="vp-controls__time" dateTime={time}>
    {time}
  </time>
);

export default memo(Time);
