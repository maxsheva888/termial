import { ITerminalOutput } from "./ITerminalOutput";

export interface ITerminalIO {
    write(content: string): void;
    writeLine(content: string): void;
    clear(): void;
    output(content: ITerminalOutput): Promise<void>;
}
