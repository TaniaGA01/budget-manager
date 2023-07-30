export const quantityFormat = (quantity: unknown|number) => {
    return Number(quantity).toLocaleString('es-US', {
        style:'currency',
        currency:'USD'
    })
}

export const idGenerator = () => {
    const date = Date.now().toString()
    const random = Math.random().toString(36).substring(2)
    return random + date
}

export const dateFormat = (date: string | number | Date) => {
    const newDate = new Date(date)
    const options:Intl.DateTimeFormatOptions = {//typescript
        year: 'numeric',
        month: 'long',
        day:'2-digit'
    }
    return newDate.toLocaleDateString("en-US", options)
}