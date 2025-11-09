export default class Logging {
    public static info = (...args: any[]) =>
        console.log(`[${new Date().toLocaleString()}] [INFO]`, args);
    public static warning = (...args: any[]) =>
        console.log(`[${new Date().toLocaleString()}] [WARN]`, args);
    public static error = (...args: any[]) =>
        console.log(`[${new Date().toLocaleString()}] [ERROR]`, args);
    public static success = (...args: any[]) =>
        console.log(`[${new Date().toLocaleString()}] [SUCCESS]`, args);
}
