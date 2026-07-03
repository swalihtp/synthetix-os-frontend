export function validateField (field, value) {
  const errors = []

  const isEmpty =
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)

  // Required
  if (field.required && isEmpty) {
    errors.push(`${field.label} is required`)
    return errors
  }

  if (isEmpty) {
    return errors
  }

  // String validations

  if (
    typeof value === 'string' &&
    field.min_length &&
    value.length < field.min_length
  ) {
    errors.push(
      `${field.label} must be at least ${field.min_length} characters`
    )
  }

  if (
    typeof value === 'string' &&
    field.max_length &&
    value.length > field.max_length
  ) {
    errors.push(`${field.label} cannot exceed ${field.max_length} characters`)
  }

  // URL validation

  if (field.type === 'url' && value) {
    try {
      new URL(value)
    } catch {
      errors.push(`${field.label} must be a valid URL`)
    }
  }

  // Dynamic URL List

  if (field.type === 'dynamic_url_list' && Array.isArray(value)) {
    value.forEach(url => {
      try {
        new URL(url)
      } catch {
        errors.push(`Invalid competitor URL: ${url}`)
      }
    })
  }

  // File validation

  if (field.type === 'file_upload' && Array.isArray(value)) {
    if (field.max_files && value.length > field.max_files) {
      errors.push(`Maximum ${field.max_files} files allowed`)
    }

    value.forEach(file => {
      const extension = '.' + file.name.split('.').pop().toLowerCase()

      if (
        field.accepted_formats &&
        !field.accepted_formats.includes(extension)
      ) {
        errors.push(`${file.name} has unsupported format`)
      }

      const sizeMB = file.size / 1024 / 1024

      if (field.max_file_size_mb && sizeMB > field.max_file_size_mb) {
        errors.push(`${file.name} exceeds ${field.max_file_size_mb}MB`)
      }
    })
  }

  return errors
}
