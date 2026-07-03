export function exportCSV(users) {
  const headers = [
    'ID',
    'Email',
    'Full Name',
    'Role',
    'Verified',
    'MFA',
    'Joined'
  ]

  const rows = users.map(user => [
    user.id,
    user.email,
    user.full_name || '',
    user.role_name || '',
    user.is_verified,
    user.mfa_enabled,
    user.created_at
  ])

  const csv = [headers, ...rows]
    .map(row => row.map(value => `"${value}"`).join(','))
    .join('\n')

  const link = document.createElement('a')

  link.href =
    'data:text/csv;charset=utf-8,' +
    encodeURIComponent(csv)

  link.download = 'user_registry.csv'

  link.click()
}