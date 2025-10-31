export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent notable-regular">
          NerdHub
        </h1>
        {children}
      </div>
    </div>
  )
}
