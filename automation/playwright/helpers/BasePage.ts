import { Page, BrowserContext } from '@playwright/test';
import { attachment, step } from 'allure-js-commons';
import { ReportHelper } from './ReportHelper';

export class BasePage {
    public page: Page;
    public context: BrowserContext;
    public consoleLogs: { type: string, message: string }[] = [];
    readonly apiCalls: { method: string, url: string, status: number, duration: number }[] = [];

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;

        // Capture console logs
        this.page.on('console', msg => {
            if (msg.type() === 'error' || msg.type() === 'warning') {
                this.consoleLogs.push({ type: msg.type(), message: msg.text() });
            }
        });

        // Capture API calls
        this.page.on('requestfinished', async req => {
            const resp = await req.response();
            const timing = performance.now() - (req.timing()?.startTime ?? 0);
            if (req.resourceType() === 'xhr' || req.resourceType() === 'fetch' || req.url().includes('/api/')) {
                this.apiCalls.push({
                    method: req.method(),
                    url: req.url(),
                    status: resp?.status() ?? 0,
                    duration: timing
                });
            }
        });
    }

    /**
     * Fill data for the given element
     *
     * @param {string} id - The Id of the element
     * @param {string} value - The value you want to populate the element
     * @example
     * await fillData(id, value);
     */
    async fillData(id: string, value: string) {
        
        console.log(`[${this.getClassName()}] ⏱ waitForSelector: ${id}`);
        const startTime = Date.now();
        await this.page.waitForSelector(id);
        await this.logElementLoadTime(id, startTime);

        console.log(`[${this.getClassName()}] Fill: ${id}`);
        await this.page.fill(id, value);
    }

    /**
     * Tap the given element
     *
     * @param {string} id - The Id of the element
     * @example
     * await tapButton(id);
     */
    async tapButton(id: string) {
        const btn = this.page.locator(id);
        console.log(`[${this.getClassName()}] ⏱ waitForSelector: ${id}`);
        btn.waitFor();
        await btn.click();
        console.log(`[${this.getClassName()}] ⏱ click: ${id}`);
    }

    /**
     * Retrieve the given element
     *
     * @param {string} text - The text on the element
     * @example
     * await getButton(text);
     */
    async getButton(text: string) {
        const startTime = Date.now();
        const createConsignmentBtn = this.page.getByRole('button', { name: text });
        console.log(`[${this.getClassName()}] ⏱ waitFor: ${text}`);
        await createConsignmentBtn.waitFor();
        await this.logElementLoadTime(text, startTime);
        return createConsignmentBtn;
    }

    // Helpers

    /**
     * Populate the element with the given placeholder value
     *
     * @param {string} placeholder - The placeholder value of the element
     * @param {string} newValue - The new value to be displayed on the element
     * @example
     * await populateFieldWithPlaceholder(placeholder, newValue);
     */
    async populateFieldWithPlaceholder(placeholder: string, newValue: string) {
        console.log(`[${this.getClassName()}] ⏱ waitForSelector "${placeholder}"`);
        const startTime = Date.now();
        const input = this.page.locator(`input[placeholder="${placeholder}"]`);
        await input.waitFor({ state: 'visible' });
        this.logElementLoadTime(placeholder, startTime);
        console.log(`[${this.getClassName()}] ⏱ fill "${placeholder} with ${newValue}"`);
        await input.fill(newValue);
    }

    /**
     * Populate the element with the given name
     *
     * @param {string} name - The name of the element
     * @param {string} newValue - The new value to be displayed on the element
     * @example
     * await populateFieldWithName(name, newValue);
     */
    async populateFieldWithName(name: string, newValue: string) {
        console.log(`[${this.getClassName()}] ⏱ waitForSelector "${name}"`);
        const startTime = Date.now();
        const input = this.page.locator(`input[name="${name}"]`);
        await input.waitFor({ state: 'visible' });
        this.logElementLoadTime(name, startTime);
        console.log(`[${this.getClassName()}] ⏱ fill "${name} with ${newValue}"`);
        await input.fill(newValue);
    }

    /**
     * Populate the element with the given XPath
     *
     * @param {string} xpath - The XPath of the element
     * @param {string} newValue - The new value to be displayed on the element
     * @example
     * await populateFieldByXpath(xpath, newValue);
     */
    async populateFieldByXpath(xpath: string, newValue: string) {
        console.log(`[${this.getClassName()}] ⏱ waitForSelector "${xpath}"`);
        const startTime = Date.now();
        const pickupLocationInput = this.page.locator(xpath);

        this.logElementLoadTime(xpath, startTime);
        console.log(`[${this.getClassName()}] ⏱ fill "${xpath} with ${newValue}"`);
        await pickupLocationInput.fill(newValue);
    }

    /**
     * Log the loading time of the element
     *
     * @param {string} elementId - The Id of the element
     * @param {string} startTime - The start time when the element began to load
     * @example
     * await logElementLoadTime(elementId, startTime);
     */
    async logElementLoadTime(elementId: string, startTime: number) {
        const loadTime = Date.now() - startTime;
        const msg = `[${this.getClassName()}] ⏱ Element "${elementId}" loaded in ${loadTime} ms`;
        this.logMessage(msg);
    }

    /**
     * Log a message on the console and on Playwright steps
     *
     * @param {string} message - The message to be logged
     * @example
     * await logMessage(elementId, startTime);
     */
    async logMessage(message: string) {
        console.log(message);
        await step(message, async () => { });
    }

    /**
     * Capture a screenshot with an optional delay
     *
     * @param {string} context - The name for the screenshot that will appear on the report
     * @param {boolean} withDelay - Boolean value to determined whether to add a delay before capturing a screenshot or not.
     * @example
     * await captureScreenshot(context);
     * 
     * or
     * 
     * * @example
     * await captureScreenshot(context, withDelay);
     */
    async captureScreenshot(context: string, withDelay: boolean = false) {
        if (withDelay) {
            // Let's wait for 5 second before taking a screenshot to allow the page to render properly
            await this.page.waitForTimeout(5 * 1000); // waits 5 seconds
        }


        console.log(`[${this.getClassName()}] captureScreenshot for ${context}`);
        const fullPageBuffer = await this.page.screenshot({ fullPage: true });
        await attachment(`📸 Screenshot - ${context}`, fullPageBuffer, { contentType: 'image/png' });
    }

    /**
     * Log a message on the console and on Playwright steps
     *
     * @param {string} id - The id for the captured screenshot
     * @example
     * await takeBrowserScreenshot(id);
     */
    async takeBrowserScreenshot(id: string) {
        // Get the DevTools Protocol session
        const client = await this.context.newCDPSession(this.page);

        // Capture screenshot as base64
        const screenshot = await client.send('Page.captureScreenshot', {
            format: 'png',
            fromSurface: true
        });

        // Convert base64 to Buffer
        const buffer = Buffer.from(screenshot.data, 'base64');

        // Attach the screenshot buffer to Allure
        await attachment(`📸 Screenshot - ${id}`, buffer, { contentType: 'image/png' });
    }

    /**
     * Generates report for the current page
     *
     * @example
     * await generateReport();
     */
    async reportPageContent(name: string) {
        const reportHelper = new ReportHelper();
        await reportHelper.reportPageContent(name, this.page, this.consoleLogs, this.apiCalls);
    }

    getClassName(): string {
        return this.constructor.name;
    }
}