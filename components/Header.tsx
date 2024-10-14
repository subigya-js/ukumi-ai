import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="container mx-auto px-6 py-6 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link href="/">
          <img src="/images/logo2.svg" alt="Ukumi AI Logo" className='h-20 w-auto max-sm:h-16' />
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li><Link href="https://www.linkedin.com/company/ukumi-ai" className="hover:text-purple-400">About Us</Link></li>
          <li><Link href="mailto:connect@ukumi.ai" className="hover:text-purple-400">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}