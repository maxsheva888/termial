import { Terminal } from "../../../core/Terminal";
import { ISystemCommand } from "../../../interfaces/ISystemCommand";
import { ITerminalIO } from "../../../interfaces/ITerminalIO";

export class HistoryCommand implements ISystemCommand {
    public readonly isSystem = true;
    public readonly name = 'history';
    public readonly description = 'Shows command history';

    constructor(private readonly terminal: Terminal) { }

    async execute(args: string[], io: ITerminalIO): Promise<void> {
        const history = this.terminal.getHistory();

        await io.output({
          render: (container: HTMLElement) => {
            container.innerHTML = `
              <div class="history-container">
                ${history.map((entry, index) => `
                  <div class="history-entry">
                    <span class="history-number">${index + 1}</span>
                    <span class="history-time">${entry.timestamp.toLocaleTimeString()}</span>
                    <span class="history-command">${entry.command}</span>
                  </div>
                `).join('')}
              </div>
            `;
          }
        });
    }

    hasAccess(): boolean {
        return true;
    }

    getHelp(): string {
        return `
    Usage: history [n]
    Shows the command history.

    Options:
      n    Number of entries to show (optional, shows all if not specified)

    Examples:
      history    Shows all command history
      history 10 Shows last 10 commands
        `.trim();
      }
}
