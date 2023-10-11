interface InfoProps {
  className?: string;
}

export default function Info(props: InfoProps) {
  const { className } = props;

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_48_390)">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 0C27.9345 0 36 8.0655 36 18C36 27.9345 27.9345 36 18 36C8.0655 36 0 27.9345 0 18C0 8.0655 8.0655 0 18 0ZM18 1.5C27.1065 1.5 34.5 8.8935 34.5 18C34.5 27.1065 27.1065 34.5 18 34.5C8.8935 34.5 1.5 27.1065 1.5 18C1.5 8.8935 8.8935 1.5 18 1.5ZM18.75 27H17.25V13.5H18.75V27ZM18 9C18.699 9 19.2675 9.567 19.2675 10.2675C19.2675 10.9665 18.699 11.5335 18 11.5335C17.301 11.5335 16.7325 10.9665 16.7325 10.2675C16.7325 9.567 17.301 9 18 9Z"
          fill="#4D1CD6"
        />
      </g>
      <defs>
        <clipPath id="clip0_48_390">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
