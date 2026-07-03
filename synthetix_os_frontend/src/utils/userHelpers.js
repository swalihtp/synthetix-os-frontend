export function getInitials(fullName, email) {
  if (fullName?.trim()) {
    return fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(name => name[0])
      .join('')
      .toUpperCase()
  }

  return email[0].toUpperCase()
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}