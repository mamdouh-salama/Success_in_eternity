export default function IslamicPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.07"
    >
      <defs>
        <pattern id="islamic-star" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Octagonal star */}
          <polygon points="50,5 61,20 80,11 73,31 95,31 80,44 91,63 73,58 73,80 58,67 50,88 42,67 27,80 27,58 9,63 20,44 5,31 27,31 20,11 39,20" />
          {/* Inner octagon */}
          <polygon points="50,20 61,31 73,31 73,42 80,50 73,58 73,69 61,69 50,80 39,69 27,69 27,58 20,50 27,42 27,31 39,31" />
          {/* Center diamond */}
          <polygon points="50,35 58,50 50,65 42,50" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#islamic-star)" />
    </svg>
  );
}
