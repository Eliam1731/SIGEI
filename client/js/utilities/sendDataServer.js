// utilities/sendDataServer.js
export const sendDataServer = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Leemos como texto para ver TODO lo que devuelve PHP
    const text = await response.text();
    console.log(`⮑ RAW response from ${url}:`, text);

    // Intentamos parsear JSON
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error(`❌ JSON.parse failed for response from ${url}:`, err);
      throw new Error(`Invalid JSON from ${url}: ${text}`);
    }

  } catch (error) {
    console.error('sendDataServer Error:', error);
    throw error;
  }
};
