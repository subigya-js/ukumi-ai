import React, { useState, useEffect } from 'react'
import { Button } from "./ui/button"

const options = [
  "Captions",
  "Generate Transcript",
  "QnA with transcript",
  "Generate Prompts",
  "Generate Shorts",
  "Trans"
]

export function AutomatedVideoCreation() {
  const [activeOption, setActiveOption] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOption((prev) => (prev + 1) % options.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="container mx-auto px-4 py-20">
      <h3 className="text-2xl font-sans font-bold mb-4">Automated short-form video creation</h3>
      <div className="bg-gray-900 p-6  rounded-lg flex flex-wrap justify-between items-center">
        {options.map((option, index) => (
          <div
            key={option}
            className={`m-2 p-2 rounded transition-all duration-300 ${index === activeOption
              ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white'
              : 'bg-gray-800 text-gray-400'
              }`}
          >
            {option}
          </div>
        ))}
      </div>
    </section>
  )
}