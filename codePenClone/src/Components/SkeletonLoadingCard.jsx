import React from 'react'

function SkeletonLoadingCard() {
  return (
    <div className="w-80 h-80 bg-gray-900 p-4 rounded-md flex flex-col justify-between">
          <div className="h-full bg-gray-600 rounded-md animate-pulse"></div>
          <div className="mt-4 flex items-center gap-6">
            <div className="h-8 bg-gray-600 rounded animate-pulse w-3/4"></div>
            <div className="h-8 bg-gray-600 rounded animate-pulse w-1/4"></div>
          </div>
    </div>
  )
}

export default SkeletonLoadingCard