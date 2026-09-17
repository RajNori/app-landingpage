export const APP_DOWNLOAD_SECTION_ID = 'get-the-app';

export function scrollToAppDownload(): void {
    const section = document.getElementById(APP_DOWNLOAD_SECTION_ID);

    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
