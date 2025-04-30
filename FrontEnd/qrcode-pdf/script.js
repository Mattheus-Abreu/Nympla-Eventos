function makeQrCode(url) {

    let qrcodeDiv = document.querySelector("#qrcode")

    var qrcode = new QRCode(qrcodeDiv, {
        text: "Testando geracao",
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function makePdf() {
    let doc  = document.querySelector("#pdf")

    var opt = {
        margin:       1,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      // New Promise-based usage:
      html2pdf().set(opt).from(doc).toPdf().get("pdf").then((pdf) => {
          window.open(pdf.output("bloburl"));   
      });
}
makeQrCode()