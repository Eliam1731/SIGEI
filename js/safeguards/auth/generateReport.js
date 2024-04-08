const pathFile = '../js/safeguards/auth/autorizacion_resguardo.pdf'
const pathServer = '../server/data/emails.php';
const emailUsersSystem = {
    irving: 'Irodriguez@grupoopc.com',
    bladimir: 'egutierrez@grupoopc.com',
    // ssantiago@grupoopc.com
}

const sendReportToBackend = async( file, emailUser) => {
    const formData = new FormData();

    formData.append('file', file, 'output.pdf');
    formData.append('emailUser', emailUser);
    formData.append('emailAssistant', emailUsersSystem.irving);
    formData.append('emailBoss', emailUsersSystem.bladimir);

    try {
        const response = await fetch(pathServer, {
            method: 'POST',
            body: formData
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

    } catch(error) {
        console.log(error);
    }
}

export const generateReportSafeguards = ( work, amount, code, description, employee, email) => {
    const now = new Date();
    const date = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`;

    fetch(pathFile).then( res => res.arrayBuffer()).then( async arrayBuffer => {
        const { PDFDocument, StandardFonts, rgb } = PDFLib;
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const secondPage = pages[1];

        firstPage.drawText( date.toString(), { x: 198, y: 737,  size: 11, font: helveticaFont, color: rgb(0, 0, 0) });
        firstPage.drawText( date.toString(), { x: 198,  y: 345, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });
        firstPage.drawText( work.toString(), { x: 300, y: 737, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });
        firstPage.drawText( work.toString(), { x: 300, y: 345, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });

        for (let i = 0; i < code.length; i++) {
            const y1 = 737 - i * 13.5; // Ajusta el '30' según la separación que quieras entre registros
            const y2 = 345 - i * 14;

            firstPage.drawText( amount.toString(), { x: 37, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
            firstPage.drawText( code[i].toString(), { x: 90, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
            firstPage.drawText( description[i].toString(), { x: 200, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });

            firstPage.drawText( amount.toString(), { x: 37, y: y2 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
            firstPage.drawText( code[i].toString(), { x: 90, y: y2 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
            firstPage.drawText( description[i].toString(), { x: 200, y: y2 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
        }

        secondPage.drawText( date.toString(), { x: 198, y: 727,  size: 11, font: helveticaFont, color: rgb(0, 0, 0) });
        secondPage.drawText( work.toString(), { x: 300, y: 727, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });

        for (let i = 0; i < code.length; i++) {
            const y1 = 727 - i * 13.5; // Ajusta el '30' según la separación que quieras entre registros

            secondPage.drawText( amount.toString(), { x: 37, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
            secondPage.drawText( code[i].toString(), { x: 90, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
            secondPage.drawText( description[i].toString(), { x: 200, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
        }


        firstPage.drawText( employee.toString(), { x: 35, y: 425, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });
        firstPage.drawText( employee.toString(), { x: 35, y: 32, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });
        secondPage.drawText(employee.toString(), { x: 35, y: 417, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], {type: "application/pdf"});
        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = `${work}-${employee}-${date}.pdf`;
        link.click();

        const response = await sendReportToBackend(blob, email);

        console.log(response);
    })
};