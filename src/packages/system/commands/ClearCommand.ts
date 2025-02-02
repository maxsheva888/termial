import { Terminal } from "../../../core/Terminal";
import { ISystemCommand } from "../../../interfaces/ISystemCommand";
import { ITerminalIO } from "../../../interfaces/ITerminalIO";

export class ClearCommand implements ISystemCommand {
    public readonly isSystem = true;
    public readonly name = 'clear';
    public readonly description = 'Clears terminal output';

    constructor(private readonly terminal: Terminal) { }

    async execute(args: string[], io: ITerminalIO): Promise<void> {
        io.clear();
    }

    hasAccess(): boolean {
        return true;
    }

    getHelp(): string {
        return `
    \t\t\tUsage: clear
    \t\t\t\tClears the terminal screen and removes all output.

    \t\t\tOptions:
      \t\t\t\tNo options available for this command.
        `.trim();
      }
}
