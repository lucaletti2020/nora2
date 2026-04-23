export default function PearIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Pear body */}
      <path d="M12 4C14.5 4 15.5 6.5 15 9.5C17.5 11 18 16 15 18.5C13.5 19.5 10.5 19.5 9 18.5C6 16 6.5 11 9 9.5C8.5 6.5 9.5 4 12 4Z" />
      {/* Stem */}
      <path d="M12 4L12 2C12 1.2 13 0.8 13.5 1.3" />
      {/* Leaf */}
      <path d="M12 3C13 2 15 2.5 14.5 4" />
    </svg>
  );
}
