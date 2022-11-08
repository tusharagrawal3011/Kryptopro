let studentName = document.getElementById('name');
let submit = document.getElementById('submit');

submit.addEventListener('click',()=>{
    let credentialUser = Math.ceil(Math.random()*10000);
    let str = "TSStudetn2020"+credentialUser.toString();
    generetPdf(studentName.value,str);
    studentName.value = '';
});


const generetPdf = async (studentName,cr)=>{

    const {PDFDocument,rgb} = PDFLib;
    const exBytes = await fetch("./Certificate.pdf").then((res)=>{
        return res.arrayBuffer()
    });

    const exFont = await fetch('./Ubuntu-Regular.ttf').then((res)=>{
        return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);
    const pages = pdfDoc.getPages();
    const firstP = pages[0];

    firstP.drawText(studentName,{
        x:100,
        y:70,
        size:40,
        font:myFont,
        color: rgb(.2, 0.84, 0.67)
    });

    firstP.drawText(cr,{
        x:100,
        y:50,
        size:20,
        font:myFont,
        color: rgb(0, 0.76, 0.8)
    });

    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    saveAs(uri,`Certificate_${studentName}.pdf`,{autoBom:true})
};