import translation from '../../translation'

type MutationActionProps = {
  isCreatePending?: boolean
  isUpdatePending?: boolean
  isDeletePending?: boolean
}
export default function MutationStatus({ isCreatePending, isUpdatePending, isDeletePending }: MutationActionProps) {
  if (!isCreatePending && !isUpdatePending && !isDeletePending) return null
  let message = ''
  if (isDeletePending) message = translation.deleteAction
  if (isCreatePending) message = translation.addAction
  if (isUpdatePending) message = translation.updateAction
  return (
    <div className='mt-4 p-2 bg-blue-50 border border-blue-200 rounded-md'>
      <p className='text-sm text-blue-600 text-center'>{message}</p>
    </div>
  )
}
