import { IPackage } from '../../interfaces/IPackage';
import { Terminal } from '../../core/Terminal';
import { PackageManager } from '../../core/PackageManager';
import { HelpCommand } from './commands/HelpCommand';
import { ClearCommand } from './commands/ClearCommand';
import { HistoryCommand } from './commands/HistoryCommand';
import { ISystemCommand } from '../../interfaces/ISystemCommand';

export class SystemPackage implements IPackage {
    public readonly name = 'system';
    public readonly version = '1.0.0';
    public readonly commands: Map<string, ISystemCommand>;
    public readonly dependencies = [];
    public readonly description = 'System package with basic commands';

    constructor(
        private readonly terminal: Terminal,
        private readonly packageManager: PackageManager
    ) {
        this.commands = new Map<string, ISystemCommand>([
            ['help', new HelpCommand(this.terminal, this.packageManager)],
            ['clear', new ClearCommand(this.terminal)],
            ['history', new HistoryCommand(this.terminal)]
        ]);
    }
}