export function getImgBeforeUpload(file: File) {
    if (file) {
        const url = URL.createObjectURL(file);
        return String(url);
    }
    return '';
}
