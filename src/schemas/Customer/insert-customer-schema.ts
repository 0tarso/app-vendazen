import { z } from "zod";
import { cpfValidation } from "../../utils/cpf-validation";

export const createCustomerSchema = z.object({
  name: z.string()
    .min(4, "Nome deve conter no mínimo 4 caracteres")
    .max(30, "Nome deve conter no máximo 30 caracteres"),
  phone: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string()
      .min(10, "Telefone deve conter no mínimo 10 dígitos")
      .max(11, "Telefone deve conter no máximo 11 dígitos")
      .regex(/^\d{10,15}$/, "Telefone deve conter apenas números")
      .optional()),
  cpf: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string()
      .length(11, "CPF deve conter 11 dígitos")
      .regex(/^\d{11}$/, "CPF deve conter apenas números")
      .refine((cpf) => {
        return cpfValidation(cpf);
      }, { message: "CPF inválido" })
      .optional())

});

export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;

