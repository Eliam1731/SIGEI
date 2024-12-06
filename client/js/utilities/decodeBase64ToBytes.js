export const decodeBase64ToBytes = (base64) => {
    const bytes = atob(base64);
    const byteNumbers = new Array(bytes.length);
  
    for (let i = 0; i < bytes.length; i++) {
      byteNumbers[i] = bytes.charCodeAt(i);
    }
  
    return byteNumbers;
}

export const createBlobFromBytes = (bytes) => {
    const blob = new Blob([new Uint8Array(bytes)], {type: 'application/pdf'});
    return blob;
}

export const configureDownloadLink = (url) => {
    window.open(url, '_blank');
};