import { ChatConnection } from "./ChatConnection";

class ConnectionManager {
    private chatConnection?: ChatConnection;
    private uuid: string;
    private playUri: string;
    private authToken?: string;
    private setTimeout?: NodeJS.Timeout;

    constructor() {
        this.uuid = "";
        this.playUri = "";
    }

    init(playUri: string, uuid: string, authToken?: string) {
        this.uuid = uuid;
        this.authToken = authToken;
        this.playUri = playUri;

        this.start();
    }

    get connectionOrFail(): ChatConnection {
        if (!this.chatConnection) {
            throw new Error("No chat connection with XMPP server!");
        }
        return this.chatConnection;
    }

    get connection(): ChatConnection | undefined {
        return this.chatConnection;
    }

    public start() {
        this.chatConnection = new ChatConnection(this.authToken ?? "", this.playUri, this.uuid);
    }

    get isClose(): boolean {
        return this.chatConnection == undefined || this.chatConnection.isClose;
    }
}
export const connectionManager = new ConnectionManager();