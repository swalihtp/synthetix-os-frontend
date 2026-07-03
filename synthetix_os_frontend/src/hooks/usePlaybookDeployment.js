import { useState, useCallback } from 'react'
import { deployWorkflow } from '@/services/workflowDeploymentService'
import { useNavigate } from 'react-router-dom'
import { validateField } from '@/utils/playbookValidation'

export default function usePlaybookDeployment (agent) {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const [validationErrors, setValidationErrors] = useState({})

  const navigate = useNavigate()

  const handleFieldChange = useCallback(
    (name, value) => {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))

      const field = agent?.input_schema?.find(f => f.name === name)

      if (!field) return

      const errors = validateField(field, value)

      setValidationErrors(prev => ({
        ...prev,
        [name]: errors
      }))
    },
    [agent]
  )

  const validateForm = useCallback(() => {
    if (!agent) return false

    const fields = agent?.input_schema || []

    const allErrors = {}

    fields.forEach(field => {
      const errors = validateField(field, formData[field.name])

      if (errors.length) {
        allErrors[field.name] = errors
      }
    })

    setValidationErrors(allErrors)

    return Object.keys(allErrors).length === 0
  }, [agent, formData])

  const handleCreateWorkflow = useCallback(async () => {
    if (!agent) return

    const valid = validateForm()

    if (!valid) return

    try {
      setLoading(true)

      await deployWorkflow({
        agent,
        configuration: formData
      })

      navigate('/dashboard')
    } catch (err) {
      console.error(err)

      alert('A user only have one automation')
    } finally {
      setLoading(false)
    }
  }, [agent, formData, validateForm, navigate])

  return {
    formData,
    loading,
    validationErrors,
    handleFieldChange,
    handleCreateWorkflow
  }
}
