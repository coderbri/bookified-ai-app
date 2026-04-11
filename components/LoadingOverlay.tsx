import React from 'react'

const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-white shadow-xl">
        <div className="loading-shadow">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#663820] border-t-transparent"></div>
          <p className="loading-title">Processing your book...</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay
