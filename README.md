# TypeScript Terminal Emulator

A customizable terminal emulator built with TypeScript that supports a plugin system for extending functionality.

## Features

- Extensible plugin system
- Custom command packages
- System events and hooks
- Built-in system commands
- Command history
- Real-time command execution monitoring

## System Commands

- `help` - Display all available commands from registered packages
- `clear` - Clear terminal output
- `history` - Show command history

## Package System

Packages can be easily added to extend terminal functionality. Each package can contain multiple commands.

Example of using package commands:
```bash
# System command (no package prefix needed)
clear

# Package command (requires package prefix)
ui time
```

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
src/
  ├── core/           # Core terminal functionality
  ├── interfaces/     # TypeScript interfaces
  ├── packages/       # Built-in and custom packages
  └── utils/          # Utility functions
```

## License

MIT
