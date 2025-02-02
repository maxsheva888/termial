export interface ITerminalHistory {
    timestamp: Date;
    command: string;
    container?: HTMLElement | null;
}
