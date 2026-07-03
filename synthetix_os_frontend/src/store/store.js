import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import workflowsReducer from './slices/workflowSlice';
import agentsReducer from './slices/agentsSlice';
import personaReducer from './slices/personaSlice';
import emailAgentReducer from './slices/emailAgentSlice'
import adminDashboardReducer from './slices/adminDashboardStaticsSlice'
import workflowExecutionReducer from './slices/workFlowExecutionSlice';
import aiUsageDashboardReducer from './slices/aiUsageDashboardSlice';
import emailActivityStreamReducer from './slices/emailActivityStreamSlice';
import userRegistryReducer from './slices/userRegistrySlice';
import userReducer from './slices/userRegistrySlice2';
import builtInAgentsReducer from './slices/builtInAgentsSlice'
import dashboardReducer from './slices/dashboardSlice'


// Persist config - automatically saves auth to localStorage
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
reducer: {
  auth: persistedAuthReducer,
  agents: agentsReducer,
  workflows: workflowsReducer,
  persona: personaReducer,
  emailAgent: emailAgentReducer,
  adminDashboard: adminDashboardReducer,
  workflowExecution: workflowExecutionReducer,
  aiUsageDashboard: aiUsageDashboardReducer,
  emailActivityStream: emailActivityStreamReducer,
  userRegistry: userRegistryReducer,
  users: userReducer,
  builtInAgents: builtInAgentsReducer,
  dashboard: dashboardReducer
},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);