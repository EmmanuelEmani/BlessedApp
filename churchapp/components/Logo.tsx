export default function Logo() {
  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 100 100"
        className="w-16 h-16 text-white"
        fill="currentColor"
      >
        <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"/>
        <path d="M50 20c-16.5 0-30 13.5-30 30s13.5 30 30 30 30-13.5 30-30-13.5-30-30-30zm0 50c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z"/>
        <circle cx="50" cy="50" r="10"/>
      </svg>
      <h1 className="text-2xl font-bold mt-2">BLESSED</h1>
      <p className="text-sm text-gray-300">Pray, Give, Love</p>
    </div>
  )
}

