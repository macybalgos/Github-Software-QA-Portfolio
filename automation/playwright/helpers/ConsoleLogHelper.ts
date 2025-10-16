
export class ConsoleLogHelper {
    private static instance: ConsoleLogHelper;
    private allConsoleLogs: { type: string; message: string }[] = [];
    private allApiCalls: { method: string; url: string; status: number; duration: number }[] = [];

    private constructor() { } // prevent direct instantiation

    public static getInstance(): ConsoleLogHelper {
        if (!ConsoleLogHelper.instance) {
            ConsoleLogHelper.instance = new ConsoleLogHelper();
            ConsoleLogHelper.instance.init();
        }
        return ConsoleLogHelper.instance;
    }

    private init() {
    }

    public addPageData(consoleLogs: { type: string; message: string }[],
        apiCalls: { method: string; url: string; status: number; duration: number }[]) {
        this.allConsoleLogs.push(...consoleLogs);
        this.allApiCalls.push(...apiCalls);
    }

    public getAllConsoleLogs(): { type: string; message: string }[] {
        return this.allConsoleLogs;
    }

    public getAllApiCalls(): { method: string; url: string; status: number; duration: number }[] {
        return this.allApiCalls;
    }

    public reset() {
        this.allConsoleLogs = [];
        this.allApiCalls = [];
    }
}
