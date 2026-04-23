"use client";

const C = "#16a34a";
const sw = "1.4";
const sc = "round";

function Avocado({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 5C19 5 11 13 11 25C11 36 17 44 24 44C31 44 37 36 37 25C37 13 29 5 24 5Z"
        stroke={C} strokeWidth={sw} strokeLinecap={sc} strokeLinejoin={sc} />
      <ellipse cx="24" cy="30" rx="6.5" ry="7.5" stroke={C} strokeWidth={sw} />
    </svg>
  );
}

function Leaf({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 43C24 43 5 29 5 17C5 7 13 3 24 3C35 3 43 7 43 17C43 29 24 43 24 43Z"
        stroke={C} strokeWidth={sw} strokeLinecap={sc} strokeLinejoin={sc} />
      <line x1="24" y1="3" x2="24" y2="43" stroke={C} strokeWidth="1" strokeLinecap={sc} />
      <path d="M24 17L14 22" stroke={C} strokeWidth="0.9" strokeLinecap={sc} />
      <path d="M24 26L12 31" stroke={C} strokeWidth="0.9" strokeLinecap={sc} />
      <path d="M24 17L34 22" stroke={C} strokeWidth="0.9" strokeLinecap={sc} />
      <path d="M24 26L36 31" stroke={C} strokeWidth="0.9" strokeLinecap={sc} />
    </svg>
  );
}

function CitrusSlice({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="19" stroke={C} strokeWidth={sw} />
      <circle cx="24" cy="24" r="13" stroke={C} strokeWidth="1" />
      <line x1="24" y1="11" x2="24" y2="37" stroke={C} strokeWidth="0.9" strokeLinecap={sc} />
      <line x1="11" y1="24" x2="37" y2="24" stroke={C} strokeWidth="0.9" strokeLinecap={sc} />
      <line x1="15" y1="15" x2="33" y2="33" stroke={C} strokeWidth="0.9" strokeLinecap={sc} />
      <line x1="33" y1="15" x2="15" y2="33" stroke={C} strokeWidth="0.9" strokeLinecap={sc} />
      <circle cx="24" cy="24" r="2.5" stroke={C} strokeWidth="1" />
    </svg>
  );
}

function Apple({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 14C24 14 12 14 8 24C5 32 8 42 16 44C20 45 22 43 24 43C26 43 28 45 32 44C40 42 43 32 40 24C36 14 24 14 24 14Z"
        stroke={C} strokeWidth={sw} strokeLinecap={sc} strokeLinejoin={sc} />
      <path d="M24 14C24 10 26 6 30 4" stroke={C} strokeWidth={sw} strokeLinecap={sc} />
      <path d="M16 14C16 14 12 8 16 5" stroke={C} strokeWidth="1" strokeLinecap={sc} />
    </svg>
  );
}

function WheatStalk({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <line x1="24" y1="44" x2="24" y2="6" stroke={C} strokeWidth={sw} strokeLinecap={sc} />
      <ellipse cx="24" cy="8" rx="4" ry="7" stroke={C} strokeWidth="1.2" />
      <ellipse cx="17" cy="16" rx="4" ry="6" transform="rotate(-30 17 16)" stroke={C} strokeWidth="1" />
      <ellipse cx="31" cy="16" rx="4" ry="6" transform="rotate(30 31 16)" stroke={C} strokeWidth="1" />
      <ellipse cx="14" cy="26" rx="3.5" ry="5.5" transform="rotate(-25 14 26)" stroke={C} strokeWidth="1" />
      <ellipse cx="34" cy="26" rx="3.5" ry="5.5" transform="rotate(25 34 26)" stroke={C} strokeWidth="1" />
    </svg>
  );
}

function Broccoli({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="20" y="28" width="8" height="15" rx="3" stroke={C} strokeWidth={sw} strokeLinecap={sc} />
      <line x1="24" y1="28" x2="18" y2="23" stroke={C} strokeWidth="1.2" strokeLinecap={sc} />
      <line x1="24" y1="28" x2="30" y2="23" stroke={C} strokeWidth="1.2" strokeLinecap={sc} />
      <circle cx="24" cy="16" r="8" stroke={C} strokeWidth={sw} />
      <circle cx="14" cy="20" r="6" stroke={C} strokeWidth={sw} />
      <circle cx="34" cy="20" r="6" stroke={C} strokeWidth={sw} />
    </svg>
  );
}

function Cherry({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M16 34C16 22 24 14 28 8" stroke={C} strokeWidth={sw} strokeLinecap={sc} />
      <path d="M32 34C32 22 24 14 28 8" stroke={C} strokeWidth={sw} strokeLinecap={sc} />
      <path d="M28 8C28 4 32 3 34 5" stroke={C} strokeWidth="1.2" strokeLinecap={sc} />
      <circle cx="16" cy="37" r="6" stroke={C} strokeWidth={sw} />
      <circle cx="32" cy="37" r="6" stroke={C} strokeWidth={sw} />
    </svg>
  );
}

function Carrot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M20 12L28 12L32 40L24 44L16 40Z"
        stroke={C} strokeWidth={sw} strokeLinecap={sc} strokeLinejoin={sc} />
      <path d="M18 20L30 20" stroke={C} strokeWidth="0.9" strokeLinecap={sc} />
      <path d="M17 28L31 28" stroke={C} strokeWidth="0.9" strokeLinecap={sc} />
      <path d="M20 12C18 8 14 4 12 4" stroke={C} strokeWidth={sw} strokeLinecap={sc} />
      <path d="M24 12C24 8 24 4 24 2" stroke={C} strokeWidth={sw} strokeLinecap={sc} />
      <path d="M28 12C30 8 34 4 36 4" stroke={C} strokeWidth={sw} strokeLinecap={sc} />
    </svg>
  );
}

function Seed({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 44C14 44 6 36 6 24C6 12 14 4 24 4C24 4 44 8 44 24C44 36 34 44 24 44Z"
        stroke={C} strokeWidth={sw} strokeLinecap={sc} strokeLinejoin={sc} />
      <path d="M24 44C24 44 30 30 24 16" stroke={C} strokeWidth="1" strokeLinecap={sc} />
      <path d="M24 16C28 22 36 20 36 20" stroke={C} strokeWidth="1" strokeLinecap={sc} />
    </svg>
  );
}

type IconName = "avocado" | "leaf" | "citrus" | "apple" | "wheat" | "broccoli" | "cherry" | "carrot" | "seed";

function Icon({ name, size }: { name: IconName; size: number }) {
  switch (name) {
    case "avocado":  return <Avocado size={size} />;
    case "leaf":     return <Leaf size={size} />;
    case "citrus":   return <CitrusSlice size={size} />;
    case "apple":    return <Apple size={size} />;
    case "wheat":    return <WheatStalk size={size} />;
    case "broccoli": return <Broccoli size={size} />;
    case "cherry":   return <Cherry size={size} />;
    case "carrot":   return <Carrot size={size} />;
    case "seed":     return <Seed size={size} />;
  }
}

const ITEMS: [IconName, number, number, number, number, number][] = [
  // [icon, left%, top%, size, rotateDeg, opacity]
  ["avocado",  4,   8,  56, -18, 0.09],
  ["leaf",    93,  10,  46,  22, 0.10],
  ["citrus",  88,  32,  52,  12, 0.07],
  ["wheat",    5,  38,  50,   8, 0.08],
  ["broccoli", 3,  70,  48, -10, 0.07],
  ["cherry",  91,  68,  54,  -8, 0.08],
  ["carrot",   8,  88,  42,  15, 0.08],
  ["apple",   88,  86,  58,  -5, 0.07],
  ["seed",    50,   4,  36,  20, 0.07],
  ["leaf",    46,  93,  42, -22, 0.08],
  ["citrus",  28,  20,  34,  30, 0.06],
  ["avocado", 68,  14,  40, -30, 0.07],
  ["wheat",   75,  50,  44,  18, 0.06],
  ["cherry",  18,  52,  36, -15, 0.07],
  ["broccoli",62,  76,  50,   5, 0.06],
  ["apple",   38,  68,  32, -25, 0.07],
  ["carrot",  72,  88,  38,  25, 0.07],
  ["seed",    20,  82,  30,  10, 0.06],
  ["citrus",  55,  30,  28, -35, 0.05],
  ["leaf",    35,  44,  26,  40, 0.05],
];

export default function FoodBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {ITEMS.map(([icon, left, top, size, rotate, opacity], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            opacity,
          }}
        >
          <Icon name={icon} size={size} />
        </div>
      ))}
    </div>
  );
}
