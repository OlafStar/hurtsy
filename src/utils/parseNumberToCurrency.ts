export const parseNumberToCurrency = (number: string | number) => {
    const amount = parseFloat(String(number));
    const formatted = new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
    }).format(amount);
    return formatted;
};
