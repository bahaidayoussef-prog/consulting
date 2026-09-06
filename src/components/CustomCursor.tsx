import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current!
    const ring = ringRef.current!

    let mouseX = 0, mouseY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' })
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.45, ease: 'power2.out' })
    }

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.8, borderColor: 'var(--blue-bright)', duration: 0.25 })
      gsap.to(dot,  { scale: 0, duration: 0.25 })
    }

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(27,53,84,0.35)', duration: 0.25 })
      gsap.to(dot,  { scale: 1, duration: 0.25 })
    }

    window.addEventListener('mousemove', onMove)

    const links = document.querySelectorAll('a, button, [role="button"], .sys-card-item, .tab-btn-inner')
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      links.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          background: 'var(--navy)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%,-50%)',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          border: '1.5px solid rgba(27,53,84,0.35)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%,-50%)',
        }}
      />
    </>
  )
}
