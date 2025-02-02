import { PackageManager } from "../../../core/PackageManager";
import { Terminal } from "../../../core/Terminal";
import { ISystemCommand } from "../../../interfaces/ISystemCommand";
import { ITerminalIO } from "../../../interfaces/ITerminalIO";

export class HelpCommand implements ISystemCommand {
    public readonly isSystem = true;
    public readonly name = 'help';
    public readonly description = 'Shows available commands';

    constructor(
        private readonly terminal: Terminal,
        private readonly packageManager: PackageManager
    ) { }

    async execute(args: string[], io: ITerminalIO): Promise<void> {
        const packages = this.packageManager.getAllPackages();
        let output = 'Available commands:\n\n';

        const systemPackage = packages.find(p => p.name === 'system');
        if (systemPackage) {
            output += `System Commands (v${systemPackage.version}):\n\n`;
            output += `${systemPackage.description}\n\n`;
        }

        packages
            .forEach(pkg => {
                pkg.commands.forEach(cmd => {
                    output += `\t${pkg.name !== 'system' ? pkg.name : ''} ${cmd.name} - ${cmd.description}\n`;
                });
                output += '\n';
            });

        io.writeLine(output);
    }

    hasAccess(): boolean {
        return true;
    }

    getHelp(): string {
        return 'Usage: help [package]\nShows list of available commands. If package name is provided, shows detailed help for that package.';
    }
}