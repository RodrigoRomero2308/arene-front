export const downloadFile = (base64File: string, filename: string, mimetype: string) => {
  const downloadLink = document.createElement('a');
  const linkData = `data:${mimetype};base64,${base64File}`;
  downloadLink.href = linkData;
  downloadLink.download = filename;
  downloadLink.click();
}