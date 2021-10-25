import { memo } from 'react';

import { ReactComponent as FullscreenIcon } from 'assets/icons/fullscreen.svg';
import { ReactComponent as FullscreenExitIcon } from 'assets/icons/fullscreen-exit.svg';

interface FullscreenProps {
  fullscreenState: boolean;
  onToggle: () => void;
  onKey: (event: React.KeyboardEvent) => void;
}

const Fullscreen: React.FC<FullscreenProps> = ({
  fullscreenState,
  onToggle,
  onKey,
}) => (
  <div className="vp-controls__fullscreen" onClick={onToggle} onKeyDown={onKey}>
    <button className="vp-controls__btn">
      {!fullscreenState && <FullscreenIcon />}
      {fullscreenState && <FullscreenExitIcon />}
    </button>
  </div>
);

export default memo(Fullscreen);
