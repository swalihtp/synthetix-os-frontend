import API from './auth';

// Get all events
export const getEvents = (params = {}) => {
  return API.get('/events/', { params });
};

// Get single event
export const getEvent = (id) => {
  return API.get(`/events/${id}/`);
};

// Get workflow events
export const getWorkflowEvents = (workflowId, params = {}) => {
  return API.get('/events/', {
    params: { workflow: workflowId, ...params }
  });
};

// Get agent events
export const getAgentEvents = (agentId, params = {}) => {
  return API.get('/events/', {
    params: { agent: agentId, ...params }
  });
};

// Filter events by type
export const getEventsByType = (eventType, params = {}) => {
  return API.get('/events/', {
    params: { event_type: eventType, ...params }
  });
};

// Get recent events
export const getRecentEvents = (hours = 24) => {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  return API.get('/events/', {
    params: { created_at__gte: since, ordering: '-created_at' }
  });
};

// Delete event
export const deleteEvent = (id) => {
  return API.delete(`/events/${id}/`);
};