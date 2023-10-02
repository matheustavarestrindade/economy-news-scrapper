class Debug {
    public static log(message: string): void {
        console.log(`[LOG] ${message}`);
    }

    public static info(message: string): void {
        console.log(`[INFO] ${message}`);
    }

    public static error(message: string): void {
        console.error(`[ERROR] ${message}`);
    }

    public static warn(message: string): void {
        console.warn(`[WARN] ${message}`);
    }
}

export default Debug;
