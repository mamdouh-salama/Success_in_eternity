export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Success in Eternity logo"
    >
      {/* Outer octagonal ring */}
      <polygon
        points="24,2 34,6 42,14 46,24 42,34 34,42 24,46 14,42 6,34 2,24 6,14 14,6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner 8-pointed star */}
      <polygon
        points="24,8 28,18 38,14 32,24 38,34 28,30 24,40 20,30 10,34 16,24 10,14 20,18"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Center circle */}
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.2" fill="none" />
      {/* Center dot */}
      <circle cx="24" cy="24" r="1.5" fill="currentColor" />
    </svg>
  );
}
