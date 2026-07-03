import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getWorkflows, 
  getWorkflow, 
  createWorkflow, 
  updateWorkflow, 
  deleteWorkflow,
  triggerWorkflow,
  getWorkflowRuns
} from '../../api/workflows';

// Async thunks
export const fetchWorkflows = createAsyncThunk(
  'workflows/fetchWorkflows',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getWorkflows(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch workflows'
      );
    }
  }
);

export const fetchWorkflow = createAsyncThunk(
  'workflows/fetchWorkflow',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getWorkflow(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch workflow'
      );
    }
  }
);

export const addWorkflow = createAsyncThunk(
  'workflows/addWorkflow',
  async (workflowData, { rejectWithValue }) => {
    try {
      const response = await createWorkflow(workflowData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create workflow'
      );
    }
  }
);

export const modifyWorkflow = createAsyncThunk(
  'workflows/modifyWorkflow',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateWorkflow(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update workflow'
      );
    }
  }
);

export const removeWorkflow = createAsyncThunk(
  'workflows/removeWorkflow',
  async (id, { rejectWithValue }) => {
    try {
      await deleteWorkflow(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete workflow'
      );
    }
  }
);

export const executeWorkflow = createAsyncThunk(
  'workflows/executeWorkflow',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await triggerWorkflow(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to trigger workflow'
      );
    }
  }
);

export const fetchWorkflowRuns = createAsyncThunk(
  'workflows/fetchWorkflowRuns',
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const response = await getWorkflowRuns(id, params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch workflow runs'
      );
    }
  }
);

const initialState = {
  items: [],
  selectedWorkflow: null,
  workflowRuns: [],
  loading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

const workflowsSlice = createSlice({
  name: 'workflows',
  initialState,
  reducers: {
    clearSelectedWorkflow: (state) => {
      state.selectedWorkflow = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch workflows
    builder
      .addCase(fetchWorkflows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkflows.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results || action.payload;
        state.pagination = {
          count: action.payload.count || 0,
          next: action.payload.next,
          previous: action.payload.previous,
        };
      })
      .addCase(fetchWorkflows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // Fetch single workflow
    builder
      .addCase(fetchWorkflow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkflow.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedWorkflow = action.payload;
      })
      .addCase(fetchWorkflow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // Add workflow
    builder
      .addCase(addWorkflow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWorkflow.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addWorkflow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // Update workflow
    builder
      .addCase(modifyWorkflow.fulfilled, (state, action) => {
        const index = state.items.findIndex(w => w.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedWorkflow?.id === action.payload.id) {
          state.selectedWorkflow = action.payload;
        }
      });
    
    // Delete workflow
    builder
      .addCase(removeWorkflow.fulfilled, (state, action) => {
        state.items = state.items.filter(w => w.id !== action.payload);
        if (state.selectedWorkflow?.id === action.payload) {
          state.selectedWorkflow = null;
        }
      });
    
    // Fetch workflow runs
    builder
      .addCase(fetchWorkflowRuns.fulfilled, (state, action) => {
        state.workflowRuns = action.payload.results || action.payload;
      });
  },
});

export const { clearSelectedWorkflow, clearError } = workflowsSlice.actions;

// Selectors
export const selectWorkflows = (state) => state.workflows.items;
export const selectSelectedWorkflow = (state) => state.workflows.selectedWorkflow;
export const selectWorkflowRuns = (state) => state.workflows.workflowRuns;
export const selectWorkflowsLoading = (state) => state.workflows.loading;
export const selectWorkflowsError = (state) => state.workflows.error;
export const selectWorkflowsPagination = (state) => state.workflows.pagination;

export default workflowsSlice.reducer;