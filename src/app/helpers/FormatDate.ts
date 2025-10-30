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

export const toShortDateString = (dateStr: string, locale = 'en-GB') => {
    const date = new Date(dateStr.replace(' ', 'T')+'T00:00:00')
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    })
}


export const getISODate = (dateStr: string): string => {
    const d = new Date(dateStr.replace(' ', 'T'))
    if (isNaN(d.getTime())) return ''
    return d.toISOString().slice(0, 10)
}


export const formatLogDateTime = (dateStr: string, locale = 'en-GB') => {
    const date = new Date(dateStr.replace(' ', 'T'))
    if (isNaN(date.getTime())) return ''
    return `${date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })}, ${date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    })}`
  }
  