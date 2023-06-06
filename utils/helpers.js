export function filterData(filterBy, rows, filterValue) {
    const filtered = rows.filter(row => row[filterBy].toLowerCase().includes(filterValue.toLowerCase()))
    return filtered
}

export const truncateAddress = (address, start, end) => address ? `${address.slice(0, start || 8)}...${address.slice(end || 33)}` : ''

export const relativeTime = (oldTimestamp) => {
    const seconds = Date.now();
    const difference = Math.floor((seconds - parseInt(oldTimestamp)) / 1000);
    let output = ``;
    if (difference < 60) {
        // Less than a minute has passed:
        output = `${difference} seconds ago`;
    } else if (difference < 3600) {
        // Less than an hour has passed:
        output = `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
        // Less than a day has passed:
        output = `${Math.floor(difference / 3600)} hours ago`;
    } else if (difference < 2620800) {
        // Less than a month has passed:
        output = `${Math.floor(difference / 86400)} days ago`;
    } else if (difference < 31449600) {
        // Less than a year has passed:
        output = `${Math.floor(difference / 2620800)} months ago`;
    } else {
        // More than a year has passed:
        output = `${Math.floor(difference / 31449600)} years ago`;
    }
    return output;
};

export const localeDate = (echo) => {
    return echo == 0 ? '' : new Date(echo * 1000).toLocaleDateString();
}

export const numberFormat = (value) => {
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(value);
}
