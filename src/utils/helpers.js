/**
 * ConsBlock Utility Functions
 */

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncate(str, len = 40) {
    return str.length > len ? str.slice(0, len) + '...' : str;
}

export function timestamp() {
    return new Date().toISOString();
}

export function formatAddress(addr) {
    if (!addr || addr.length < 10) return addr;
    return addr.slice(0, 6) + '...' + addr.slice(-4);
}
