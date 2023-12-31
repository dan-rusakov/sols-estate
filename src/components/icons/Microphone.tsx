interface MicrophoneProps {
  className?: string;
}

export default function Microphone(props: MicrophoneProps) {
  const { className } = props;

  return (
    <svg
      width="37"
      height="36"
      viewBox="0 0 37 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        id="Vector"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.6667 36H12.6667V34.5H17.9167V29.973C12.4717 29.589 8.16666 25.0425 8.16666 19.5V16.5H9.66666V19.515C9.67416 24.4755 13.7047 28.5 18.6667 28.5C23.6332 28.5 27.6667 24.4665 27.6667 19.5V16.5H29.1667V19.5C29.1667 25.0425 24.8617 29.589 19.4167 29.973V34.5H24.6667V36ZM11.1667 7.5C11.1667 3.36 14.5267 0 18.6667 0C22.8067 0 26.1667 3.36 26.1667 7.5V19.5C26.1667 23.64 22.8067 27 18.6667 27C14.5267 27 11.1667 23.64 11.1667 19.5V7.5ZM24.6667 7.5C24.6667 4.188 21.9787 1.5 18.6667 1.5C15.3547 1.5 12.6667 4.188 12.6667 7.5V19.5C12.6667 22.812 15.3547 25.5 18.6667 25.5C21.9787 25.5 24.6667 22.812 24.6667 19.5V7.5Z"
        fill="#4D1CD6"
      />
    </svg>
  );
}
