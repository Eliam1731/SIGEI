function getBase64Image(imgUrl, callback) {
    var img = new Image();

    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL("image/jpeg");

        callback(dataURL);
    };

    img.src = imgUrl;
}

function generatePDF() {
    getBase64Image('../images/img_QR.jpg', function(base64Image) {
        var doc = new window.jspdf.jsPDF();

        doc.text('Hola, mundo!', 50, 20);
        doc.addImage(base64Image, 'JPEG', 10, 10, 20, 20);

        //Tabla 1
        var columns = ['FECHA', 'AREA/OBRA', 'CATEGORIA', 'NOMBRE'];
        var data = [
            ["3/26/2024", "8405", "Auxiliar de sistemas", "Lucas Dalto Herrera"],
        ];

        doc.autoTable({
            head: [columns],
            body: data,
            startY: 35,
            styles: { fillColor: [255, 0, 0] }, // Cambia el color de fondo de las celdas a rojo
            headStyles: { fillColor: [162, 113, 28] }, // Cambia el color de fondo de las celdas del encabezado a verde
            bodyStyles: { fillColor: [0, 0, 255] }, // Cambia el color de fondo de las celdas del cuerpo a azul
        });

        //Tabla 2
        const columns1 = ['CANT.', 'UNIDAD', 'CODIGO', 'DESCRIPCIÓN DEL ARTICULO'];
        const data2 = [
            ['1', 'Pza', 'OPCIC-COM-00098', 'Laptop Huawei Intel core i3, 8 RAM, 1 TB'],
            ['1', 'Pza', 'OPCIC-COM-00012', 'Monitor Acer, Modelo BoDE-DH9, NS: 12134VBSMK']
        ]

        doc.autoTable({
            head: [columns1],
            body: data2,
            startY: 70,
            styles: { fillColor: [255, 0, 0] }, // Cambia el color de fondo de las celdas a rojo
            headStyles: { fillColor: [162, 113, 28] }, // Cambia el color de fondo de las celdas del encabezado a verde
            bodyStyles: { fillColor: [212, 207, 197] }, // Cambia el color de fondo de las celdas del cuerpo a azul
        });

        doc.save('sample.pdf');
    });
}

generatePDF();