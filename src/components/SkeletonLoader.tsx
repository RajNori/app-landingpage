export default function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      {/* Navigation skeleton */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo skeleton */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-xl mr-3"></div>
              <div className="w-20 h-6 bg-gray-200 rounded"></div>
            </div>
            
            {/* Navigation items skeleton */}
            <div className="hidden md:flex items-center space-x-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
            
            {/* Cart & CTA skeleton */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="w-20 h-8 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Content skeleton */}
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Hero section skeleton */}
            <div className="text-center">
              <div className="w-64 h-8 bg-gray-200 rounded mx-auto mb-4"></div>
              <div className="w-96 h-6 bg-gray-200 rounded mx-auto mb-8"></div>
              <div className="w-32 h-10 bg-gray-200 rounded-xl mx-auto"></div>
            </div>
            
            {/* Content blocks skeleton */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
