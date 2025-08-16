export default function Error() {
  return (
    <div className='min-h-screen bg-gray-50 py-8 flex items-center justify-center'>
      <div className='text-center'>
        <p className='text-red-600 mb-4'>Error loading todos</p>
        <button
          onClick={() => window.location.reload()}
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
        >
          Retry
        </button>
      </div>
    </div>
  )
}
