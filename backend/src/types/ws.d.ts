declare module 'ws' {
  export default class WebSocket {
    constructor(address: string);
    on(event: string, listener: (...args: any[]) => void): this;
    send(data: string | Buffer | ArrayBuffer | Buffer[], callback?: (err?: Error) => void): void;
  }
}
