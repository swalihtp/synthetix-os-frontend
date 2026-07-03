const variants = {
  verified: 'bg-green-100 text-green-700',
  unverified: 'bg-gray-100 text-gray-600',
  mfa: 'bg-violet-100 text-violet-700',
  role: 'bg-blue-100 text-blue-700',
  norole: 'bg-gray-100 text-gray-500'
}

export default function Badge ({ children, variant }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
