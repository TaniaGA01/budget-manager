export const quantityFormat = (quantity: unknown|number) => {
    return Number(quantity).toLocaleString('es-US', {
        style:'currency',
        currency:'USD'
    })
}