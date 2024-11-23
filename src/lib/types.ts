export interface Delivery {
  id: number;
  numero_entrega: string;
  destinatario: string;
  endereco: string;
  data_entrega: string;
  itens: string;
}

export interface PurchaseOrderItem {
  id: number;
  nota_id: number;
  nome_item: string;
  quantidade_total: number;
  valor_total: number;
  status: string;
}

export interface PurchaseOrder {
  id: number;
  num_nota_empenho: string;
  num_pregao: string;
  nome_orgao: string;
  local_da_entrega: string;
  data_cadastro: string;
  status: string;
}