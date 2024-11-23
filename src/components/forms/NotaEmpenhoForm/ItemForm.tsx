import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

interface ItemFormProps {
  index: number;
  form: UseFormReturn<FormValues>;
  onRemove: () => void;
  isRemoveDisabled: boolean;
}

export const ItemForm = ({ index, form, onRemove, isRemoveDisabled }: ItemFormProps) => {
  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Item {index + 1}</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          disabled={isRemoveDisabled}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

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
        name={`itens.${index}.quantidade_total`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantidade Total</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Digite a quantidade"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`itens.${index}.valor_total`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valor Total</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                placeholder="Digite o valor total"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};