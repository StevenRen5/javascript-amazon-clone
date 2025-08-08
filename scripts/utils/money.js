export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency; // export the function as default so it can be imported without curly braces
