interface LogoSVGProps {
  inkColor?: string
  subColor?: string
  height?: number
}

export default function LogoSVG({
  inkColor = '#1b3554',
  subColor = '#5f6672',
  height = 36,
}: LogoSVGProps) {
  const width = (180 / 40) * height

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 40"
      fill="none"
      width={width}
      height={height}
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path
        d="M8 4 L22 4 L16 14 L24 14 L10 36 L13 22 L5 22 Z"
        fill={inkColor}
        stroke="none"
      />
      <text
        x="32"
        y="28"
        fontFamily="'Bodoni Moda', 'Georgia', serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="0.06em"
        fill={inkColor}
      >
        ESSOR
      </text>
      <text
        x="33"
        y="38"
        fontFamily="'DM Mono', 'Courier New', monospace"
        fontSize="7"
        fontWeight="400"
        letterSpacing="0.22em"
        fill={subColor}
      >
        CONSULTING
      </text>
    </svg>
  )
}
