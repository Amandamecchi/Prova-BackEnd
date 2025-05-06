const PDFDocument = require("pdfkit");

const AnimalModel = require("../models/AnimalModel");

const exportAnimalPDF = async (req, res)=> {
    try {
        const animais = await AnimalModel.getAnimais();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=animais.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(30).text("Relatorio de Animais", {align: "center"});
        doc.moveDown();

        doc.fontSize(18).text("Id | Nome | Tipo", {underline: true});
        doc.moveDown(0.5);

        animais.forEach((animal) => {
            doc.text(
                `${animal.id} | ${animal.name} | ${animal.tipo}`
            );
        });
        doc.end();
    } catch (error) {
        res.status(500).json({message: "erro ao gerar o PDF"})
    }
}

module.exports = {exportAnimalPDF}