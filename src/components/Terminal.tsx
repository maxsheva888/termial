import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalCore } from '../core/Terminal';
import '../styles/terminal.css';

interface TerminalProps {
    terminal: TerminalCore;
}

export const Terminal: React.FC<TerminalProps> = ({ terminal }) => {
    const [inputValue, setInputValue] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = () => {
            inputRef.current?.focus();
        };

        inputRef.current?.focus();
        containerRef.current?.addEventListener('click', handleClick);
        return () => containerRef.current?.removeEventListener('click', handleClick);
    }, []);

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = inputValue;
            setInputValue('');

            try {
                terminal.getTerminalView().addCommandToHistory(command);
                await terminal.executeCommand(command);
            } catch (error) {
                console.error('Command execution error:', error);
            }

            containerRef.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="terminal-container" ref={containerRef}>
            <div className="terminal-content">
                <div className="terminal-outputs"></div>
                <div className="terminal-input-wrapper">
                    <div className="terminal-prompt">
                        <span className="terminal-prompt-icon">➜</span>
                        <span className="terminal-prompt-path">~/terminal</span>
                        <span className="terminal-prompt-git">git:(main)</span>
                        <span className="terminal-prompt-arrow">❯</span>
                    </div>
                    <div className="terminal-input-line">
                        <input
                            ref={inputRef}
                            type="text"
                            className="terminal-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setShowCursor(true)}
                            onBlur={() => setShowCursor(false)}
                            spellCheck={false}
                            autoComplete="off"
                            autoCapitalize="off"
                        />
                        {showCursor && <span className="terminal-cursor" />}
                    </div>
                </div>
            </div>
        </div>
    );
};
