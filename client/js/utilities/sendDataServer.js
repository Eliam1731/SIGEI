export const sendDataServer = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const text = await response.text();
      
      try {
        return JSON.parse(text);
      } catch (error) {
        throw new Error('Invalid JSON: ' + text);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  }