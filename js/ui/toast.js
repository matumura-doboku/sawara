// Toast notifications. This module provides a simple way to display
// temporary messages to the user. Toasts appear for a short period
// and then fade out. Here we implement a basic toast mechanism.

/**
 * Show a toast message. Creates a toast element, inserts it into
 * the document body and removes it after the specified duration.
 *
 * @param {string} message The message to display.
 * @param {number} duration The time in milliseconds before the toast
 *        disappears (default: 3000 ms).
 */
export function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '1rem';
    toast.style.right = '1rem';
    toast.style.backgroundColor = 'rgba(0,0,0,0.8)';
    toast.style.color = '#fff';
    toast.style.padding = '0.5rem 1rem';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, duration);
}