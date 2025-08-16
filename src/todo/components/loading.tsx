import translation from '../translation'

export default function Loading() {
  return (
    <div className='min-h-screen bg-gray-50 py-8 flex items-center justify-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
        <p className='text-gray-600'>{translation.loading}</p>
      </div>
    </div>
  )
}
