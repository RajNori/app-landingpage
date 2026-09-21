export const APP_DOWNLOAD_SECTION_ID = 'get-the-app';

function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToId(id: string): void {
    const section = document.getElementById(id);
    if (!section) {
        return;
    }
    section.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
    });
}

export function scrollToAppDownload(): void {
    scrollToId(APP_DOWNLOAD_SECTION_ID);
}
