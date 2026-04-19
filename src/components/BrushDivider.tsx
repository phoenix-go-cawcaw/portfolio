const BrushDivider = ({ id = "blur_ink" }: { id?: string }) => (
  <svg className="brush-divider" viewBox="0 0 800 30" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20,15 Q100,5 200,14 Q350,24 500,12 Q650,2 780,15"
      stroke="rgba(26,15,10,0.8)"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      filter={`url(#${id})`}
    />
    <defs>
      <filter id={id}>
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
    </defs>
  </svg>
);

export default BrushDivider;
