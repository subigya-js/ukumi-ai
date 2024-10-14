import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="container mx-auto px-4 py-6 flex justify-between items-center border-t border-gray-800">
      <div>Ukumi.ai</div>
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="https://www.linkedin.com/company/ukumi-ai" className="hover:text-purple-400 font-sans">Privacy Policy</Link></li>
          <li><Link href="https://www.linkedin.com/company/ukumi-ai" className="hover:text-purple-400 font-sans">Terms and Conditions</Link></li>
        </ul>
      </nav>
    </footer>
  )
}