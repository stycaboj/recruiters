export function getDate(date: string): string {
    const startDate = new Date(date);
    const day = startDate.getDate().toString().padStart(2, '0');
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const year = startDate.getFullYear();

    return `${day}.${month}.${year}`;
}