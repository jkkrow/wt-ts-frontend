import { memo, useCallback, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useOutsideClickHander } from 'hooks/common/outside-click';
import { VideoNode } from 'store/types/video';
import { getAutoGeneratedThumbnail } from 'util/video';
import './RecordsModal.scss';

interface RecordsModalProps {
  on: boolean;
  records: VideoNode[];
  onClose: () => void;
  onSelect: (id: string) => void;
}

const RecordsModal: React.FC<RecordsModalProps> = ({
  on,
  records,
  onClose,
  onSelect,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const modalRef = useOutsideClickHander<HTMLDivElement>(onClose, isMounted);

  const modalEnteredHandler = useCallback(() => {
    setIsMounted(true);
  }, []);

  const modalExitedHandler = useCallback(() => {
    setIsMounted(false);
  }, []);

  return (
    <CSSTransition
      in={on}
      classNames="vp-modal"
      timeout={200}
      mountOnEnter
      unmountOnExit
      onEntered={modalEnteredHandler}
      onExited={modalExitedHandler}
    >
      <div className="vp-controls__records__modal" ref={modalRef}>
        <Swiper
          modules={[Navigation]}
          className="vp-controls__records__modal__container"
          slidesPerView={2}
          slidesPerGroup={1}
          breakpoints={{
            700: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
            1100: {
              slidesPerView: 4,
              slidesPerGroup: 2,
            },
            1500: {
              slidesPerView: 5,
              slidesPerGroup: 2,
            },
            1900: {
              slidesPerView: 6,
              slidesPerGroup: 3,
            },
          }}
          spaceBetween={60}
          dir="rtl"
          centeredSlides
          navigation
        >
          {records.map((record) =>
            record.url ? (
              <SwiperSlide
                key={record._id}
                className="vp-controls__records__modal__item btn"
                onClick={() => onSelect(record._id)}
              >
                <div className="vp-controls__records__modal__image">
                  <img
                    src={getAutoGeneratedThumbnail(record)}
                    alt={record.label}
                  />
                </div>
                <div>{record.level === 0 ? 'First Video' : record.label}</div>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
    </CSSTransition>
  );
};

export default memo(RecordsModal);
