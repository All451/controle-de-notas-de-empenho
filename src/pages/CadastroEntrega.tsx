import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  nota_id: z.number().min(1, "ID da nota é obrigatório"),
  itens: z.array(z.object({
    id: z.number(),
    quantidade: z.number().min(1, "Quantidade deve ser maior que zero"),
    nome_item: z.string().min(1, "Nome do item é obrigatório"),
    quantidade_disponivel: z.number()
  })),
  data_prevista: z.string().min(1, "Data prevista é obrigatória"),
  data_cadastro: z.string(),
  destinatario: z.string().min(1, "Destinatário é obrigatório"),
  endereco_entrega: z.string().min(1, "Endereço é obrigatório"),
  status: z.enum(["COMPLETO", "PARCIAL"])
});

type FormValues = z.infer<typeof formSchema>;

export default function CadastroEntrega() {
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nota_id: 0,
      itens: [{
        id: 1,
        quantidade: 0,
        nome_item: "",
        quantidade_disponivel: 0
      }],
      data_prevista: "",
      data_cadastro: new Date().toISOString().split('T')[0],
      destinatario: "",
      endereco_entrega: "",
      status: "PARCIAL"
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Here you would typically make an API call to save the data
      console.log(values);
      toast.success("Entrega cadastrada com sucesso!");
      navigate("/entregas");
    } catch (error) {
      toast.error("Erro ao cadastrar entrega");
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Cadastrar Nova Entrega</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
            <FormField
              control={form.control}
              name="nota_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID da Nota de Empenho</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Digite o ID da nota" 
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destinatario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destinatário</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do destinatário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endereco_entrega"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço de Entrega</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o endereço completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="data_prevista"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Prevista</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status da Entrega</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="COMPLETO">Completo</SelectItem>
                      <SelectItem value="PARCIAL">Parcial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Itens da Entrega</h3>
              {form.watch('itens').map((item, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <FormField
                    control={form.control}
                    name={`itens.${index}.nome_item`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Item</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o nome do item" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`itens.${index}.quantidade`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Digite a quantidade"
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`itens.${index}.quantidade_disponivel`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade Disponível</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Digite a quantidade disponível"
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <Button type="submit">Cadastrar Entrega</Button>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
}