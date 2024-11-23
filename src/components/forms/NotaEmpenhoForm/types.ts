import { z } from "zod";

export const itemSchema = z.object({
  nome_item: z.string().min(1, "Nome do item é obrigatório"),
  quantidade_total: z.number().min(1, "Quantidade deve ser maior que zero"),
  valor_total: z.number().min(0.01, "Valor deve ser maior que zero"),
});

export const formSchema = z.object({
  num_nota_empenho: z.string().min(1, "Número da nota de empenho é obrigatório"),
  num_pregao: z.string().min(1, "Número do pregão é obrigatório"),
  nome_orgao: z.string().min(1, "Nome do órgão é obrigatório"),
  local_da_entrega: z.string().min(1, "Local de entrega é obrigatório"),
  data_cadastro: z.string().min(1, "Data de cadastro é obrigatória"),
  itens: z.array(itemSchema).min(1, "Adicione pelo menos um item"),
});

export type FormValues = z.infer<typeof formSchema>;