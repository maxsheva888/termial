# TypeScript Terminal Emulator

A customizable terminal emulator built with TypeScript that supports a plugin system for extending functionality.

## Features

- Extensible plugin system with custom command packages
- Advanced output system supporting any type of content (text, charts, HTML, React components)
- Independent command rendering system
- System events and hooks
- Built-in system commands
- Command history with output preservation
- Real-time command execution monitoring
- Isolated command output containers
- Resource management for complex outputs

## System Commands

- `help` - Display all available commands from registered packages
- `clear` - Clear terminal output
- `history` - Show command history with preserved outputs

## Built-in Packages

### System Package
Core system commands for terminal management.

### UI Package (Coming Soon)
UI enhancement commands:
- `time` - Add current time to terminal prompt
- `exectime` - Display execution time for commands

## Package System

Packages can be easily added to extend terminal functionality. Each package can contain multiple commands.

Example of using package commands:
```bash
# System command (no package prefix needed)
clear

# Package command (requires package prefix)
ui time
```

## Advanced Output System

The terminal supports any type of output through a flexible rendering system. Commands can output:
- Text content
- Interactive charts
- HTML elements
- React components
- Custom visualizations
- Any other type of content

Example of custom output:
```typescript
class ChartCommand implements ICommand {
  async execute(args: string[]): Promise<void> {
    await this.io.output({
      render: async (container) => {
        // Render any content in the container
        const chart = new ApexCharts(container, config);
        await chart.render();
      },
      destroy: () => {
        // Clean up resources when needed
      }
    });
  }
}
```

## Planned Features

- [ ] Command access control system [see initiative](docs/initiatives/001-command-access-control.md)
- [ ] UI Package implementation
- [ ] Test coverage
- [ ] Example packages
- [ ] Documentation website

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build project
npm run build
```

## Project Structure

```
typescript-terminal/
├── src/
│   ├── core/           # Core terminal functionality
│   │   ├── Terminal.ts
│   │   ├── PackageManager.ts
│   │   ├── CommandParser.ts
│   │   └── EventBus.ts
│   ├── interfaces/     # TypeScript interfaces
│   ├── packages/       # Built-in and custom packages
│   └── utils/          # Utility functions
├── docs/
│   └── initiatives/    # Future improvements documentation
└── tests/             # Test files
```

## Contributing

1. Check existing initiatives in `docs/initiatives/`
2. Fork the repository
3. Create your feature branch
4. Submit a pull request

## License

MIT