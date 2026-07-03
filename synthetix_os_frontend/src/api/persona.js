import API from './auth'

// Get persona
export const getPersona = () => {
  return API.get('/persona/')
}

// Create / Update persona
export const savePersona = data => {
  return API.post('/persona/', data)
}

// Update partially
export const updatePersona = data => {
  return API.patch('/persona/1/', data)
}

// Delete persona
export const deletePersona = () => {
  return API.delete('/persona/1/')
}

// Get completion status
export const getPersonaCompletion = () => {
  return API.get('/persona/completion/')
}

export const getPersonaMetadata = () => {
  return API.get('/persona/metadata/')
}
