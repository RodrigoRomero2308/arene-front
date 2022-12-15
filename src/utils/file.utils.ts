export const downloadFile = (
  base64File: string,
  filename: string,
  mimetype: string
) => {
  const downloadLink = document.createElement("a");
  const linkData = `data:${mimetype};base64,${base64File}`;
  downloadLink.href = linkData;
  downloadLink.download = filename;
  downloadLink.click();
  downloadLink.remove();
};

export const redirectToContactPageMail = (
  body: string,
  name: string,
  email: string,
  phoneNumber: string
) => {
  const mailtoLink = document.createElement("a");
  const mailBody = `Via formulario de contacto de AReNe:\n\n${body}\n\nDatos de contacto:\nNombre: ${name}\nNúmero de teléfono: ${phoneNumber}\nEmail: ${email}`;
  mailtoLink.href = `mailto:institutoarene@gmail.com?subject=Correo desde formulario de contacto de AReNe&body=${encodeURI(
    mailBody
  )}`;
  mailtoLink.click();
  mailtoLink.remove();
};
