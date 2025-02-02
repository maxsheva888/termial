/// <reference lib="dom" />

export interface ITerminalOutput {
    render(container: HTMLElement): void | Promise<void>;
    destroy?(): void | Promise<void>;
  }