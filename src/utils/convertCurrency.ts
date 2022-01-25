export const convertCurrency = (value: number) => {
  return (value).toLocaleString('pr-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}