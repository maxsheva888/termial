import { ITerminalOutput } from "../interfaces/ITerminalOutput";

export class TerminalView {
    private container: HTMLDivElement | null = null;
    private readonly outputContainers: Map<string, HTMLDivElement> = new Map();
    private nextContainerId = 0;
    private rootId: string;

    constructor(rootId: string) {
        this.rootId = rootId;
    }

    private ensureContainer(): HTMLDivElement {
        if (!this.container) {
            const root = document.getElementById(this.rootId);
            if (!root) {
                throw new Error(`Root container with id ${this.rootId} not found`);
            }

            const content = root.querySelector('.terminal-content');
            if (!content) {
                throw new Error('Terminal content container not found');
            }

            this.container = content as HTMLDivElement;
        }
        return this.container;
    }

    createOutputContainer(): string {
        const containerId = `output-${this.nextContainerId++}`;
        const container = document.createElement('div');
        container.className = 'terminal-output-container';
        container.dataset.containerId = containerId;

        const terminalContent = this.ensureContainer();
        const outputs = terminalContent.querySelector('.terminal-outputs');
        if (outputs) {
            outputs.appendChild(container);
        }

        this.outputContainers.set(containerId, container);
        return containerId;
    }

    createPrompt(): HTMLDivElement {
        const prompt = document.createElement('div');
        prompt.className = 'terminal-prompt';

        const icon = document.createElement('span');
        icon.className = 'terminal-prompt-icon';
        icon.textContent = '➜';

        const path = document.createElement('span');
        path.className = 'terminal-prompt-path';
        path.textContent = '~/terminal';

        const git = document.createElement('span');
        git.className = 'terminal-prompt-git';
        git.textContent = 'git:(master)';

        const arrow = document.createElement('span');
        arrow.className = 'terminal-prompt-arrow';
        arrow.textContent = '❯';

        prompt.appendChild(icon);
        prompt.appendChild(path);
        prompt.appendChild(git);
        prompt.appendChild(arrow);

        return prompt;
    }

    addCommandToHistory(command: string): void {
        const container = document.createElement('div');
        container.className = 'terminal-history-line';

        const promptSpan = document.createElement('div');
        promptSpan.className = 'terminal-prompt';
        promptSpan.innerHTML = `
          <span class="terminal-prompt-icon">➜</span>
          <span class="terminal-prompt-path">~/terminal</span>
          <span class="terminal-prompt-git">git:(main)</span>
          <span class="terminal-prompt-arrow">❯</span>
        `;

        const commandSpan = document.createElement('span');
        commandSpan.className = 'terminal-command-text';
        commandSpan.textContent = command;

        container.appendChild(promptSpan);
        container.appendChild(commandSpan);

        const terminalContent = this.ensureContainer();
        const outputs = terminalContent.querySelector('.terminal-outputs');
        if (outputs) {
          outputs.appendChild(container);
        }
      }

    getOutputContainer(containerId: string): HTMLDivElement {
        const container = this.outputContainers.get(containerId);
        if (!container) {
            throw new Error(`Container ${containerId} not found`);
        }

        return container;
    }

    removeContainer(containerId: string): void {
        const container = this.outputContainers.get(containerId);
        if (container) {
            container.remove();
            this.outputContainers.delete(containerId);
        }
    }

    async renderOutput(containerId: string, output: ITerminalOutput): Promise<void> {
        const container = this.outputContainers.get(containerId);
        if (!container) {
            throw new Error(`Container ${containerId} not found`);
        }

        await output.render(container);
    }

    renderError(containerId: string, error: Error): void {
        const container = this.outputContainers.get(containerId);
        if (!container) {
            throw new Error(`Container ${containerId} not found`);
        }

        container.innerHTML = `<div class="terminal-output-error">Error: ${error.message}</div>`;
    }

    write(containerId: string, text: string): void {
        const container = this.getOutputContainer(containerId);
        const textNode = document.createElement('span');
        textNode.className = 'terminal-output-text';
        textNode.textContent = text;
        container.appendChild(textNode);
    }

    writeLine(containerId: string, text: string): void {
        this.write(containerId, text + '\n');
    }

    clear(): void {
      const terminalContent = this.ensureContainer();
      const outputs = terminalContent.querySelector('.terminal-outputs');
      if (outputs) {
        outputs.innerHTML = '';
      }
      this.outputContainers.clear();
    }
}