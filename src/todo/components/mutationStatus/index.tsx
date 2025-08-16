import translation from '../../translation'

type MutationActionProps = {
  isPending: boolean
}
export default function MutationStatus({ isPending }: MutationActionProps) {
  if (!isPending) return null
  return (
    <div className='mt-4 p-2 bg-blue-50 border border-blue-200 rounded-md'>
      <p className='text-sm text-blue-600 text-center'>{translation.pendingAction}</p>
    </div>
  )
}
