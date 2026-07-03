import { useState, useEffect, useCallback } from 'react';
import { getAgents, getAgent } from '../api/agents';
import { getWorkflows, getWorkflow, getWorkflowRuns } from '../api/workflows';
import { getEvents } from '../api/events';
import { getIntegrationStatus } from '../api/integrations';

/**
 * Hook for fetching agents
 */
export const useAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAgents();
      setAgents(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  return { agents, loading, error, refetch: fetchAgents };
};

/**
 * Hook for fetching a single agent
 */
export const useAgent = (agentId) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgent = useCallback(async () => {
    if (!agentId) return;
    
    try {
      setLoading(true);
      const response = await getAgent(agentId);
      setAgent(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch agent');
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    fetchAgent();
  }, [fetchAgent]);

  return { agent, loading, error, refetch: fetchAgent };
};

/**
 * Hook for fetching workflows
 */
export const useWorkflows = (params = {}) => {
  const [workflows, setWorkflows] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkflows = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getWorkflows(params);
      setWorkflows(response.data.results || response.data);
      setPagination({
        count: response.data.count || 0,
        next: response.data.next,
        previous: response.data.previous
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch workflows');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  return { workflows, pagination, loading, error, refetch: fetchWorkflows };
};

/**
 * Hook for fetching a single workflow
 */
export const useWorkflow = (workflowId) => {
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkflow = useCallback(async () => {
    if (!workflowId) return;
    
    try {
      setLoading(true);
      const response = await getWorkflow(workflowId);
      setWorkflow(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch workflow');
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => {
    fetchWorkflow();
  }, [fetchWorkflow]);

  return { workflow, loading, error, refetch: fetchWorkflow };
};

/**
 * Hook for fetching workflow runs
 */
export const useWorkflowRuns = (workflowId, params = {}) => {
  const [runs, setRuns] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRuns = useCallback(async () => {
    if (!workflowId) return;
    
    try {
      setLoading(true);
      const response = await getWorkflowRuns(workflowId, params);
      setRuns(response.data.results || response.data);
      setPagination({
        count: response.data.count || 0,
        next: response.data.next,
        previous: response.data.previous
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch workflow runs');
    } finally {
      setLoading(false);
    }
  }, [workflowId, JSON.stringify(params)]);

  useEffect(() => {
    fetchRuns();
  }, [fetchRuns]);

  return { runs, pagination, loading, error, refetch: fetchRuns };
};

/**
 * Hook for fetching events
 */
export const useEvents = (params = {}) => {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEvents(params);
      setEvents(response.data.results || response.data);
      setPagination({
        count: response.data.count || 0,
        next: response.data.next,
        previous: response.data.previous
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, pagination, loading, error, refetch: fetchEvents };
};

/**
 * Hook for integration status
 */
export const useIntegrations = () => {
  const [integrations, setIntegrations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIntegrations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getIntegrationStatus();
      setIntegrations(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch integrations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIntegrations();
  }, [fetchIntegrations]);

  return { integrations, loading, error, refetch: fetchIntegrations };
};