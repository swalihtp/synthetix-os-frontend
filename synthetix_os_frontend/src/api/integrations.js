import API from './auth';

// Get integration status
export const getIntegrationStatus = () => {
  return API.get('/integrations/status/');
};

// Gmail integration
export const getGmailConnectUrl = (data) => {
  console.log('Requesting Gmail connect URL with data:', data);
  return API.post('/integrations/gmail/connect/',data);
};

export const handleGmailCallback = (code, state) => {
  return API.get('/integrations/gmail/callback/', {
    params: { code, state }
  });
};

export const watchGmail = () => {
  return API.post('/integrations/gmail/watch/');
};

export const disconnectGmail = () => {
  return API.post('/integrations/gmail/disconnect/');
};

// Google Calendar integration
export const getCalendarConnectUrl = () => {
  return API.get('/integrations/calendar/connect/');
};

export const handleCalendarCallback = (code, state) => {
  return API.get('/integrations/calendar/callback/', {
    params: { code, state }
  });
};

export const disconnectCalendar = () => {
  return API.post('/integrations/calendar/disconnect/');
};

// Telegram integration
export const connectTelegram = (data) => {
  return API.post('/integrations/telegram/connect/', data);
};

export const disconnectTelegram = () => {
  return API.post('/integrations/telegram/disconnect/');
};

// Test integration
export const testIntegration = (type) => {
  return API.post(`/integrations/${type}/test/`);
};