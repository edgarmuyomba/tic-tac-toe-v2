export default class WebSocketHandler {
    private websocket: WebSocket | null = null;
    private isConnected: boolean = false;
    private connectPromise: Promise<void>;

    constructor(private url: string) {
        this.connectPromise = this.connect();
    }

    // Establish the WebSocket connection
    private connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.websocket = new WebSocket(this.url);

            this.websocket.onopen = () => {
                this.isConnected = true;
                resolve();
            };

            this.websocket.onerror = (error) => {
                reject(`WebSocket connection error: ${error}`);
            };

            this.websocket.onclose = () => {
                this.isConnected = false;
                console.log("WebSocket connection closed");
            };
        });
    }

    // Ensure the WebSocket is connected before sending a message
    public async sendMessage(message: string): Promise<void> {
        await this.connectPromise;

        if (this.isConnected && this.websocket) {
            this.websocket.send(message);
            console.log("Message sent:", message);
        } else {
            throw new Error("WebSocket is not connected");
        }
    }

    // Optionally handle incoming messages
    public onMessage(callback: (data: any) => void): void {
        if (this.websocket) {
            this.websocket.onmessage = (event) => {
                callback(event);
            };
        } else {
            console.warn("WebSocket is not initialized");
        }
    }

    // Close the WebSocket connection
    public close(): void {
        if (this.websocket) {
            this.websocket.close();
        }
    }
}
