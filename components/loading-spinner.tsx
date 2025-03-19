const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="animate-bounce">
        <div className="w-16 h-16 bg-red-500 rounded-full border-4 border-white flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
export default LoadingSpinner
