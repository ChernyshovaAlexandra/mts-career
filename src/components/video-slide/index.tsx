import { PlayButton, VideoWrapper } from "./style";

interface VideoSlideProps {
  src: string;
  title: string;
  onPlay?: () => void;
}

export const VideoSlide: React.FC<VideoSlideProps> = ({
  src,
  title,
  onPlay,
}) => {
  return (
    <div>
      <VideoWrapper>
        {/* Заглушка, можно заменить <video poster=... /> */}
        <video
          src={src}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "16px",
            objectFit: "cover",
          }}
          muted
        />

        {/* Кнопка Play */}
        <PlayButton aria-label={`Смотреть видео: ${title}`} onClick={onPlay}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="98"
            height="98"
            viewBox="0 0 98 98"
            fill="none"
          >
            <g opacity="0.8">
              <path
                d="M28 70.3458V28.0833C28 26.9264 28.4083 25.9559 29.225 25.1719C30.0417 24.3879 30.9944 23.9973 32.0833 24C32.4236 24 32.7816 24.0504 33.1572 24.1511C33.5329 24.2518 33.8895 24.4056 34.2271 24.6125L67.5062 45.7438C68.1187 46.1521 68.5788 46.6625 68.8864 47.275C69.194 47.8875 69.3465 48.534 69.3438 49.2146C69.341 49.8952 69.1886 50.5417 68.8864 51.1542C68.5843 51.7667 68.1242 52.2771 67.5062 52.6854L34.2271 73.8167C33.8868 74.0208 33.5302 74.1747 33.1572 74.2781C32.7843 74.3815 32.4263 74.4319 32.0833 74.4292C30.9944 74.4292 30.0417 74.0372 29.225 73.2532C28.4083 72.4692 28 71.5001 28 70.3458Z"
                fill="white"
              />
            </g>
          </svg>
        </PlayButton>
      </VideoWrapper>
    </div>
  );
};
