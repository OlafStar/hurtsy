export function getImgBeforeUpload(file: File) {
    if (file) {
        const url = URL.createObjectURL(file);
        console.log(url);
        return String(url);
    }
    return '';
}
