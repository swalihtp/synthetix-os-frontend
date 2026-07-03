import API from './auth';

// Get all workflows
export const getWorkflows = (params = {}) => {
  return API.get('/workflows/', { params });
};

// Get single workflow
export const getWorkflow = (id) => {
  return API.get(`/workflows/${id}/`);
};

// Create workflow
export const createWorkflow = (data) => {
  return API.post('/workflows/', data);
};

// Update workflow
export const updateWorkflow = (id, data) => {
  return API.patch(`/workflows/${id}/`, data);
};

// Delete workflow
export const deleteWorkflow = (id) => {
  return API.delete(`/workflows/${id}/`);
};

// Trigger workflow manually
export const triggerWorkflow = (id, payload = {}) => {
  return API.post(`/workflows/${id}/trigger/`, payload);
};

// Get workflow execution runs
export const getWorkflowRuns = (id, params = {}) => {
  return API.get(`/workflows/${id}/runs/`, { params });
};

// Get single workflow run
export const getWorkflowRun = (workflowId, runId) => {
  return API.get(`/workflows/${workflowId}/runs/${runId}/`);
};

// Toggle workflow active status
export const toggleWorkflow = (id, isActive) => {
  return API.patch(`/workflows/${id}/`, { is_active: isActive });
};