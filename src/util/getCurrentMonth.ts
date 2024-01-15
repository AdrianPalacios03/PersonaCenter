export const getCurrentMonth = () => {
    const date = new Date()
    const month = date.toLocaleString('en', { month: 'long' })
    const year = date.getFullYear()
    return {
        monthName: month,
        fullDate: `${month}/${year}`
    }
}