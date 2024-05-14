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

export const generateReportSafeguards = async (work, amount, code, description, employee, email) => {
    const now = new Date();
    const date = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`;

    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const maxItemsPerPage = 15;
    const pagesCount = Math.ceil(code.length / maxItemsPerPage);

    for (let pageIndex = 0; pageIndex < pagesCount; pageIndex++) {
        const start = pageIndex * maxItemsPerPage;
        const end = start + maxItemsPerPage;
        const pageCodes = code.slice(start, end);
        const pageDescriptions = description.slice(start, end);

        const arrayBuffer = await fetch(pathFile).then(res => res.arrayBuffer());
        const srcDoc = await PDFDocument.load(arrayBuffer);
        const [firstPage, secondPage] = await pdfDoc.copyPages(srcDoc, [0, 1]);

        firstPage.drawText(date.toString(), { x: 198, y: 737, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });
        firstPage.drawText(work.toString(), { x: 300, y: 737, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });

        for (let i = 0; i < pageCodes.length; i++) {
            const y1 = 737 - i * 13.5;
            const y2 = 345 - i * 14;

            firstPage.drawText(amount.toString(), { x: 37, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
            firstPage.drawText(pageCodes[i].toString(), { x: 90, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
            firstPage.drawText(pageDescriptions[i].toString(), { x: 200, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
        }

        secondPage.drawText(date.toString(), { x: 198, y: 727, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });
        secondPage.drawText(work.toString(), { x: 300, y: 727, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });

        for (let i = 0; i < pageCodes.length; i++) {
            const y1 = 727 - i * 13.5;

            secondPage.drawText(amount.toString(), { x: 37, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
            secondPage.drawText(pageCodes[i].toString(), { x: 90, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
            secondPage.drawText(pageDescriptions[i].toString(), { x: 200, y: y1 - 33, size: 10, font: helveticaFont, color: rgb(0, 0, 0) });
        }

        firstPage.drawText(employee.toString(), { x: 35, y: 425, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });
        secondPage.drawText(employee.toString(), { x: 35, y: 417, size: 11, font: helveticaFont, color: rgb(0, 0, 0) });

        pdfDoc.addPage(firstPage);
        pdfDoc.addPage(secondPage);
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], {type: "application/pdf"});
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = `${work}-${employee}-${date}.pdf`;
    link.click();

    const response = await sendReportToBackend(blob, email);
};