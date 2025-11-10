import { twMerge } from 'tailwind-merge'

const UserCardSkeleton = () => {
  return (
    <div
      className={twMerge(
        'bg-bg-primary rounded-xl p-4 shadow-md animate-pulse'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-300" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-gray-300 rounded" />
          <div className="h-3 w-24 bg-gray-300 rounded" />
        </div>
        <div className="h-4 w-16 bg-gray-300 rounded" />
      </div>
    </div>
  )
}

export default UserCardSkeleton