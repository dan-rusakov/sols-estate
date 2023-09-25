export default function VerifyRequest() {
  return (
    <div className="m-auto flex w-full max-w-[400px] flex-col items-center rounded p-4 pb-28">
      <svg
        width="162"
        height="121"
        viewBox="0 0 162 121"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-10 fill-neutral-500"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M80 58C95.7401 58 108.5 45.2401 108.5 29.5C108.5 13.7599 95.7401 1 80 1C64.2599 1 51.5 13.7599 51.5 29.5C51.5 45.2401 64.2599 58 80 58ZM80 59C96.2924 59 109.5 45.7924 109.5 29.5H159.684L106.148 77.051C91.5301 90.0343 69.5023 90.0002 54.925 76.9717L1.80976 29.5H50.5C50.5 45.7924 63.7076 59 80 59ZM80 0C95.9577 0 108.956 12.6706 109.483 28.5H161H161.5V29V120V120.5H161H0.5H0V120V29V28.5H0.5H50.5166C51.0439 12.6706 64.0423 0 80 0ZM160.5 30.1128L110.751 74.2998L160.5 118.881V30.1128ZM159.693 119.5L109.999 74.9682L106.812 77.7986C91.8145 91.1192 69.2146 91.0843 54.2586 77.7173L51.0027 74.8074L1.79421 119.5H159.693ZM1 118.87V30.1175L50.253 74.1374L1 118.87ZM80.8763 10.6707L80.5 10.2407L80.1237 10.6707L66.1237 26.6707L65.3981 27.5H66.5H73.5V46.5V47H74H80.5H87H87.5V46.5V27.5H94.5H95.6019L94.8763 26.6707L80.8763 10.6707ZM74 26.5H67.6019L80.5 11.7593L93.3981 26.5H87H86.5V27V46H80.5H74.5V27V26.5H74Z"
        />
      </svg>
      <h1 className="mb-3 text-xl font-medium text-neutral-900">
        Check your email
      </h1>
      <p className="text-center text-sm font-normal leading-tight text-neutral-500">
        We sent an email to you.
        <br />
        Follow the link to log in to your account.
      </p>
    </div>
  );
}
