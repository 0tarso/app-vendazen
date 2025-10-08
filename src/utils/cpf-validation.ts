export function cpfValidation(cpf: string): boolean {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // CPF deve conter 11 digítos, não sendo eles os mesmos
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  // Validar a primeira soma 
  let sum = 0;

  // Para os 9 primeiros dígitos do CPF, multiplica cada dígito por um peso decrescente (de 10 a 2)
  // e acumula o resultado em 'sum'. Essa soma será usada para calcular o primeiro dígito verificador.
  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i);
  }

  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10 || firstCheck === 11) firstCheck = 0;
  if (firstCheck !== Number(cpf[9])) return false;

  // Validar segundo dígito
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i);
  }
  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10 || secondCheck === 11) secondCheck = 0;
  if (secondCheck !== Number(cpf[10])) return false;

  return true;
}