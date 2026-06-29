"use client"

import { useEffect, useState } from "react"
import { sans } from "../fonts"

type Heading = {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("article h2[id], article h3[id]"),
    ).map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: Number(el.tagName[1]),
    }))

    setHeadings(elements)

    if (elements.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        }
        // Highlight the first heading (in document order) currently in view.
        const current = elements.find((h) => visible.has(h.id))
        if (current) setActiveId(current.id)
      },
      { rootMargin: "0px 0px -70% 0px" },
    )

    for (const heading of elements) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className="fixed top-32 left-[calc(50%+22rem)] hidden w-52 xl:block"
    >
      <p className={[sans.className, "mb-3 text-xs font-black uppercase tracking-wide text-gray-500"].join(" ")}>
        On this page
      </p>
      <ul className="space-y-2 border-l border-gray-200 dark:border-gray-700">
        {headings.map((heading) => {
          const isActive = heading.id === activeId
          return (
            <li
              key={heading.id}
              style={{ paddingLeft: heading.level === 3 ? "1.5rem" : "0.75rem" }}
            >
              <a
                href={`#${heading.id}`}
                className={[
                  "-ml-px block border-l-2 py-0.5 text-[13px] leading-snug transition-colors",
                  isActive
                    ? "border-[--purple] font-semibold text-[--purple]"
                    : "border-transparent text-gray-500 hover:text-[--text] dark:hover:text-gray-200",
                ].join(" ")}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
