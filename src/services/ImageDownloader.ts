class ImageDownloader {
    static async downloadImageAsBase64(url: string): Promise<string> {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        return base64;
    }
}

export default ImageDownloader;
