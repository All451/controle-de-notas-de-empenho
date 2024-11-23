import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

interface DeliveryData {
  numero_entrega: string;
  destinatario: string;
  data_entrega: string;
}

interface OrderData {
  num_nota_empenho: string;
  nome_orgao: string;
  data_cadastro: string;
}

export const generatePDF = (
  startDate: Date,
  endDate: Date,
  deliveries: DeliveryData[],
  orders: OrderData[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Add header
  doc.setFontSize(20);
  doc.text("Relatório de Entregas e Notas de Empenho", pageWidth / 2, 20, { align: "center" });
  
  // Add period
  doc.setFontSize(12);
  doc.text(
    `Período: ${format(startDate, 'dd/MM/yyyy')} - ${format(endDate, 'dd/MM/yyyy')}`,
    pageWidth / 2,
    30,
    { align: "center" }
  );

  // Add deliveries table
  doc.setFontSize(16);
  doc.text("Entregas", 14, 45);
  
  if (deliveries?.length) {
    autoTable(doc, {
      startY: 50,
      head: [["Número", "Destinatário", "Data"]],
      body: deliveries.map(d => [
        d.numero_entrega,
        d.destinatario,
        d.data_entrega
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });
  }

  // Get the final Y position of the first table
  const finalY = (doc as any).lastAutoTable.finalY || 50;

  // Add purchase orders table
  doc.setFontSize(16);
  doc.text("Notas de Empenho", 14, finalY + 15);

  if (orders?.length) {
    autoTable(doc, {
      startY: finalY + 20,
      head: [["Número", "Órgão", "Data"]],
      body: orders.map(o => [
        o.num_nota_empenho,
        o.nome_orgao,
        o.data_cadastro
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });
  }

  return doc;
};