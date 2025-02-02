import { ITerminalIO } from "./ITerminalIO";

export interface ICommand {
    name: string;
    description: string;
    execute(args: string[], io: ITerminalIO): Promise<void>;
    hasAccess(): boolean;
    getHelp(): string;
}