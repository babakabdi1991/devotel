import type { PropsWithChildren } from 'react'
import translation from '../../translation'
import MutationStatus from '../mutationStatus'

type LayoutProps = { isPending: boolean }

export default function Layout({ children, isPending }: PropsWithChildren<LayoutProps>) {
  return (
    <div className='h-screen bg-gray-50 flex flex-col'>
      <div className='bg-white shadow-sm border-b border-gray-200 py-4 px-6 flex-shrink-0'>
        <Header />
      </div>

      <div className='flex-1 overflow-y-auto  min-h-0'>
        <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-6'>{children}</div>
      </div>

      <div className='bg-white shadow-sm border-t border-gray-200 py-4 px-6 flex-shrink-0'>
        <Footer isPending={isPending} />
      </div>
    </div>
  )
}

function Header() {
  return <h1 className='text-2xl font-bold text-gray-900 text-center'>{translation.headerTitle}</h1>
}

function Footer({ isPending }: { isPending: boolean }) {
  return (
    <>
      <MutationStatus isPending={isPending} />
      <div className='max-w-md mx-auto'>
        <p className='text-sm text-gray-600 text-center'>Todo App - Stay organized and productive</p>
      </div>
    </>
  )
}
