interface FloralDecorationProps {
  className?: string
}

export function FloralDecoration({ className }: FloralDecorationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sage green leaves */}
      <path
        d="M100 180 Q60 140 80 100 Q90 80 100 60 Q110 80 120 100 Q140 140 100 180Z"
        fill="hsl(145 25% 55%)"
        opacity="0.6"
      />
      <path
        d="M60 150 Q40 120 50 90 Q55 70 70 50 Q80 75 85 95 Q95 130 60 150Z"
        fill="hsl(145 30% 45%)"
        opacity="0.5"
      />
      <path
        d="M140 150 Q160 120 150 90 Q145 70 130 50 Q120 75 115 95 Q105 130 140 150Z"
        fill="hsl(145 25% 50%)"
        opacity="0.5"
      />
      
      {/* Blush pink petals */}
      <ellipse
        cx="100"
        cy="45"
        rx="20"
        ry="25"
        fill="hsl(10 60% 80%)"
        opacity="0.7"
      />
      <ellipse
        cx="85"
        cy="55"
        rx="15"
        ry="20"
        fill="hsl(10 50% 85%)"
        opacity="0.6"
        transform="rotate(-20 85 55)"
      />
      <ellipse
        cx="115"
        cy="55"
        rx="15"
        ry="20"
        fill="hsl(10 50% 85%)"
        opacity="0.6"
        transform="rotate(20 115 55)"
      />
      
      {/* Small accent flowers */}
      <circle cx="50" cy="60" r="8" fill="hsl(10 70% 90%)" opacity="0.5" />
      <circle cx="150" cy="60" r="8" fill="hsl(10 70% 90%)" opacity="0.5" />
      <circle cx="70" cy="35" r="6" fill="hsl(45 80% 95%)" opacity="0.6" />
      <circle cx="130" cy="35" r="6" fill="hsl(45 80% 95%)" opacity="0.6" />
      
      {/* Stems */}
      <path
        d="M100 60 Q98 80 100 100"
        stroke="hsl(145 30% 40%)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M70 50 Q75 70 85 95"
        stroke="hsl(145 30% 40%)"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M130 50 Q125 70 115 95"
        stroke="hsl(145 30% 40%)"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  )
}
