export const getCurrentDateText = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return now.toLocaleDateString('en-EN', options)
}

export const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export const waitAndFormatTimestamp = (timestamp: string): Promise<string> => {
    const targetDate = new Date(timestamp);
    const now = new Date();
    const delay = targetDate.getTime() - now.getTime();

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            );
        }, delay > 0 ? delay : 0);
    });
};
