const SvgComponent = (props: any) => (
  <svg
    width={168}
    height={168}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M168 84c0-46.392-37.608-84-84-84S0 37.608 0 84s37.608 84 84 84 84-37.608 84-84Z"
      fill="url(#a)"
    />
    <path
      d="M84 .5c46.116 0 83.5 37.384 83.5 83.5s-37.384 83.5-83.5 83.5S.5 130.116.5 84 37.884.5 84 .5Z"
      stroke="#000"
      strokeOpacity={0.1}
    />
    <defs>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(111.649 40.92) scale(126.488)"
      >
        <stop offset={0.156} stopColor="#EDFCF8" />
        <stop offset={0.396} stopColor="#86EED3" />
        <stop offset={0.729} stopColor="#1980E1" />
        <stop offset={0.906} stopColor="#1259B5" />
        <stop offset={1} stopColor="#1259B5" />
      </radialGradient>
    </defs>
  </svg>
)

export default SvgComponent
