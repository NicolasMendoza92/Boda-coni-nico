"use client"

import { useEffect, useRef, useState } from "react"

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
}

export function FadeInSection({ children, className = "" }: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Respetar prefers-reduced-motion
    // Si el usuario prefiere movimiento reducido, lo hacemos visible de inmediato
    // Usamos un setTimeout de 0 para que la llamada a setState sea asíncrona 
    // y evitar la advertencia de cascading renders de React.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      const timer = setTimeout(() => setIsVisible(true), 0)
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    const node = ref.current
    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`overflow-x-clip transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  )
}