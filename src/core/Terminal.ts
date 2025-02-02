import { IEventBus } from "../interfaces/IEventBus";
import { ITerminalHistory } from "../interfaces/ITerminalHistory";
import { ITerminalIO } from "../interfaces/ITerminalIO";
import { ITerminalOutput } from "../interfaces/ITerminalOutput";
import { CommandParser } from "./CommandParser";
import { PackageManager } from "./PackageManager";
import { TerminalView } from "./TerminalView";

export class Terminal {
    private history: ITerminalHistory[] = [];
    private readonly activeOutputs: Map<HTMLElement, ITerminalOutput> = new Map();

    constructor(
        private readonly terminalView: TerminalView,
        private readonly eventBus: IEventBus,
        private readonly packageManager: PackageManager,
        private readonly commandParser: CommandParser,
    ) {
    }

    clear(): void {
        Array.from(this.activeOutputs.entries()).forEach(([container, output]) => {
            output.destroy?.();
            container.remove();
        });
        this.activeOutputs.clear();
        this.terminalView.clear();
    }

    getHistory(): ITerminalHistory[] {
        return [...this.history];
    }

    getTerminalView(): TerminalView {
        return this.terminalView;
    }

    async executeCommand(input: string): Promise<void> {
        const parsedCommand = this.commandParser.parse(input);
        const pkg = this.packageManager.getPackage(parsedCommand.packageName);

        const startTime = Date.now();
        const containerId = this.terminalView.createOutputContainer();

        if (!input.trim()) {
            this.terminalView.write(containerId, '');
            return;
        }

        if (!pkg) {
            this.terminalView.renderError(
                containerId,
                new Error(`Package ${parsedCommand.packageName} not found`)
            );

            return;
        }

        const command = pkg.commands.get(parsedCommand.commandName);
        if (!command) {
            this.terminalView.renderError(
                containerId,
                new Error(`Command ${parsedCommand.commandName} not found in package ${parsedCommand.packageName}`)
            );

            return;
        }

        if (!command.hasAccess()) {
            this.terminalView.renderError(
                containerId,
                new Error(`Access denied to command ${parsedCommand.commandName}`)
            );

            return;
        }


        this.eventBus.emit('command:start', {
          command: parsedCommand,
          startTime,
          containerId
        });

        try {
          const commandIO: ITerminalIO = {
            write: (text: string) => this.terminalView.write(containerId, text),
            writeLine: (text: string) => this.terminalView.writeLine(containerId, text),
            clear: () => this.terminalView.clear(),
            output: async (output: ITerminalOutput) => {
              try {
                await this.terminalView.renderOutput(containerId, output);
                this.activeOutputs.set(
                    this.terminalView.getOutputContainer(containerId),
                    output
                );
              } catch (err) {
                console.error('Error rendering output:', err);
                throw err;
              }
            }
          };

          await command.execute(parsedCommand.args, commandIO);

          this.history.push({
            timestamp: new Date(),
            command: input,
            container: this.terminalView.getOutputContainer(containerId)
          });

        } catch (error) {
          this.terminalView.renderError(containerId, error as Error);
          throw error;
        } finally {
          const endTime = Date.now();

          this.eventBus.emit('command:end', {
            command: parsedCommand,
            startTime,
            endTime,
            executionTime: endTime - startTime,
            containerId
          });
        }
    }

    async clearOutput(container: HTMLElement): Promise<void> {
        const output = this.activeOutputs.get(container);
        if (output) {
            await output.destroy?.();
            this.activeOutputs.delete(container);
            container.remove();
        }
    }

    async clearHistory(): Promise<void> {
        for (const [container, output] of this.activeOutputs.entries()) {
            await output.destroy?.();
            container.remove();
        }
        this.activeOutputs.clear();
        this.history = [];
    }
}