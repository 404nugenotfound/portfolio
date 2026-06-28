'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
      setTimeout(() => {
        outline.style.left = `${e.clientX - 20}px`
        outline.style.top = `${e.clientY - 20}px`
      }, 50)
    }

    const onEnter = () => {
      outline.style.transform = 'scale(1.5)'
      outline.style.backgroundColor = 'rgba(123, 132, 184, 0.1)'
    }
    const onLeave = () => {
      outline.style.transform = 'scale(1)'
      outline.style.backgroundColor = 'transparent'
    }

    window.addEventListener('mousemove', onMove)

    const interactables = document.querySelectorAll('a, button, .glass-card, .indicator-dot')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-9999 pointer-events-none w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ boxShadow: '0 0 10px #3B82F6' }}
      />
      <div
        ref={outlineRef}
        className="fixed z-9998 pointer-events-none w-10 h-10 border border-primary/50 rounded-full transition-transform duration-150"
      />
    </>
  )
}
