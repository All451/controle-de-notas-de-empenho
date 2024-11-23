import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ItemForm } from "@/components/forms/NotaEmpenhoForm/ItemForm";
import { ConfirmationDialog } from "@/components/forms/NotaEmpenhoForm/ConfirmationDialog";
import { FormValues, formSchema } from "@/components/forms/NotaEmpenhoForm/types";

export default function CadastroNotaEmpenho() {
  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      num_nota_empenho: "",
      num_pregao: "",
      nome_orgao: "",
      local_da_entrega: "",
      data_cadastro: new Date().toISOString().split('T')[0],
      itens: [{ nome_item: "", quantidade_total: 0, valor_total: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itens",
  });

  const handleSubmit = (values: FormValues) => {
    setIsConfirmationOpen(true);
  };

  const handleConfirm = () => {
    toast.success("Nota de empenho cadastrada com sucesso!");
    navigate("/notas");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Cadastrar Nova Nota de Empenho</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-2xl">
            <FormField
              control={form.control}
              name="num_nota_empenho"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número da Nota de Empenho</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o número da nota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="num_pregao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Pregão</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o número do pregão" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nome_orgao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Órgão</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do órgão" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="local_da_entrega"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local de Entrega</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o local de entrega" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data_cadastro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Cadastro</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Itens</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ nome_item: "", quantidade_total: 0, valor_total: 0 })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>

              {fields.map((field, index) => (
                <ItemForm
                  key={field.id}
                  index={index}
                  form={form}
                  onRemove={() => remove(index)}
                  isRemoveDisabled={fields.length === 1}
                />
              ))}
            </div>

            <Button type="submit">Cadastrar Nota de Empenho</Button>
          </form>
        </Form>

        <ConfirmationDialog
          isOpen={isConfirmationOpen}
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirmationOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}