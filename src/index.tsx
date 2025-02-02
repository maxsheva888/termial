import React from 'react';
import { createRoot } from 'react-dom/client';
import { Terminal as TerminalComponent } from './components/Terminal';
import { Terminal } from './core/Terminal';
import { PackageManager } from './core/PackageManager';
import { CommandParser } from './core/CommandParser';
import { EventBus } from './core/EventBus';
import { SystemPackage } from './packages/system/SystemPackage';
import { TerminalView } from './core/TerminalView';

// Создаем DOM элемент для терминала
const rootElement = document.createElement('div');
rootElement.id = 'terminal-root';
document.body.appendChild(rootElement);

const eventBus = new EventBus();
const packageManager = new PackageManager();
const commandParser = new CommandParser();
const terminalView = new TerminalView('terminal-root');

const terminal = new Terminal(
  terminalView,
  eventBus,
  packageManager,
  commandParser,
);

const systemPackage = new SystemPackage(terminal, packageManager);
packageManager.registerPackage(systemPackage);

eventBus.on('command:start', (event) => {
  console.log('Command started:', event);
});

eventBus.on('command:end', (event) => {
  console.log('Command completed:', event);
});

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <TerminalComponent terminal={terminal} />
  </React.StrictMode>
);