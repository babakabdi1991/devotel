import type { ReactNode } from 'react'
import translation from '../../translation'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-6'>
        <Header />
        {children}
      </div>
    </div>
  )
}

function Header() {
  return <h1 className='text-2xl font-bold text-gray-900 mb-6 text-center'>{translation.headerTitle}</h1>
}
