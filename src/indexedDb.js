import toast from 'react-hot-toast';

// Function to store request in IndexedDB/localStorage
const storeRequestOffline = async (url, requestBody) => {
  const storedRequests = JSON.parse(localStorage.getItem('offlineRequests')) || [];
  storedRequests.push({ url, requestBody });
  localStorage.setItem('offlineRequests', JSON.stringify(storedRequests));
  toast('You are offline! Request stored.');
};

// Function to send stored requests when online
const sendStoredRequests = async () => {
  const storedRequests = JSON.parse(localStorage.getItem('offlineRequests')) || [];
  
  for (const req of storedRequests) {
    try {
      await fetch(req.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.requestBody),
      });
      toast.success('Request sent successfully!');
    } catch (error) {
      toast.error('Failed to send request.');
    }
  }
  
  // Clear stored requests after sending
  localStorage.removeItem('offlineRequests');
};

// Function to handle POST requests
const makePostRequest = async (url, requestBody) => {
  if (navigator.onLine) {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      toast.success('Request sent successfully!');
    } catch (error) {
      toast.error('Failed to send request.');
    }
  } else {
    storeRequestOffline(url, requestBody);
  }
};

// Event listener for coming back online
window.addEventListener('online', sendStoredRequests);
