class DiffCheckerPro {
    constructor() {
        this.initializeElements();
        this.initializeState();
        this.setupEventListeners();
        this.loadSettings();
        this.setupKeyboardShortcuts();
        this.initializeHistory();
    }

    initializeElements() {
        // File inputs and textareas
        this.file1Input = document.getElementById('file1');
        this.file2Input = document.getElementById('file2');
        this.text1Area = document.getElementById('text1');
        this.text2Area = document.getElementById('text2');

        // Language selectors
        this.file1Language = document.getElementById('file1-language');
        this.file2Language = document.getElementById('file2-language');

        // File info elements
        this.file1Info = document.getElementById('file1-info');
        this.file2Info = document.getElementById('file2-info');

        // Text stats elements
        this.text1Stats = document.getElementById('text1-stats');
        this.text2Stats = document.getElementById('text2-stats');

        // Control buttons
        this.compareBtn = document.getElementById('compareBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.swapBtn = document.getElementById('swapBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.settingsBtn = document.getElementById('settingsBtn');

        // Undo/Redo buttons
        this.text1UndoBtn = document.getElementById('text1-undo');
        this.text1RedoBtn = document.getElementById('text1-redo');
        this.text2UndoBtn = document.getElementById('text2-undo');
        this.text2RedoBtn = document.getElementById('text2-redo');

        // View controls
        this.viewToggle = document.getElementById('viewToggle');
        this.themeSwitcher = document.getElementById('darkModeToggle');

        // Diff options
        this.ignoreWhitespace = document.getElementById('ignoreWhitespace');
        this.ignoreCase = document.getElementById('ignoreCase');

        // Output elements
        this.diffOutput = document.getElementById('diff-output');
        this.diffOutputSideBySide = document.getElementById('diff-output-side-by-side');
        this.diffStats = document.getElementById('diff-stats');
        this.loadingSpinner = document.getElementById('loadingSpinner');

        // Search elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchResults = document.getElementById('searchResults');

        // Modal elements
        this.settingsModal = document.getElementById('settingsModal');
        this.exportModal = document.getElementById('exportModal');
        this.closeSettings = document.getElementById('closeSettings');
        this.closeExport = document.getElementById('closeExport');

        // Settings elements
        this.fontSizeSelect = document.getElementById('fontSizeSelect');
        this.tabSizeSelect = document.getElementById('tabSizeSelect');
        this.wordWrapToggle = document.getElementById('wordWrapToggle');
        this.lineNumbersToggle = document.getElementById('lineNumbersToggle');
        this.autoCompareToggle = document.getElementById('autoCompareToggle');

        // Export buttons
        this.exportHtml = document.getElementById('exportHtml');
        this.exportTxt = document.getElementById('exportTxt');
        this.exportJson = document.getElementById('exportJson');

        // Shortcuts info
        this.shortcutsInfo = document.getElementById('shortcutsInfo');

        // Reset settings button
        this.resetSettingsBtn = document.getElementById('resetSettingsBtn');
        this.resetSettingsBtn.addEventListener('click', () => this.resetSettingsToDefault());
    }

    initializeState() {
        this.currentDiff = null;
        this.searchMatches = [];
        this.currentSearchIndex = 0;
        this.history = {
            text1: [],
            text2: []
        };
        this.historyIndex = {
            text1: -1,
            text2: -1
        };
        this.settings = {
            fontSize: 16,
            tabSize: 4,
            wordWrap: true,
            lineNumbers: true,
            autoCompare: true,
            theme: 'dark'
        };
    }

    setupEventListeners() {
        // File input listeners
        this.file1Input.addEventListener('change', (e) => this.handleFileSelect(e, this.text1Area, this.file1Info, this.file1Language));
        this.file2Input.addEventListener('change', (e) => this.handleFileSelect(e, this.text2Area, this.file2Info, this.file2Language));

        // Textarea listeners
        this.text1Area.addEventListener('input', () => this.handleTextChange(this.text1Area, this.text1Stats, 'text1'));
        this.text2Area.addEventListener('input', () => this.handleTextChange(this.text2Area, this.text2Stats, 'text2'));

        // Button listeners
        this.compareBtn.addEventListener('click', () => this.generateDiffs());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.swapBtn.addEventListener('click', () => this.swapFiles());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.exportBtn.addEventListener('click', () => this.showExportModal());
        this.shareBtn.addEventListener('click', () => this.shareUrl());
        this.settingsBtn.addEventListener('click', () => this.showSettingsModal());

        // Undo/Redo listeners
        this.text1UndoBtn.addEventListener('click', () => this.undo('text1'));
        this.text1RedoBtn.addEventListener('click', () => this.redo('text1'));
        this.text2UndoBtn.addEventListener('click', () => this.undo('text2'));
        this.text2RedoBtn.addEventListener('click', () => this.redo('text2'));

        // View toggle listener
        this.viewToggle.addEventListener('change', () => {
            this.toggleView();
            if (this.settings.autoCompare && this.text1Area.value && this.text2Area.value) {
                this.generateDiffs();
            }
        });

        // Diff level listeners
        document.querySelectorAll('input[name="diff-level"]').forEach(radio => {
            radio.addEventListener('change', () => {
                if (this.settings.autoCompare && this.text1Area.value && this.text2Area.value) {
                    this.generateDiffs();
                }
            });
        });

        // Diff options listeners
        this.ignoreWhitespace.addEventListener('change', () => {
            if (this.settings.autoCompare && this.text1Area.value && this.text2Area.value) {
                this.generateDiffs();
            }
        });

        this.ignoreCase.addEventListener('change', () => {
            if (this.settings.autoCompare && this.text1Area.value && this.text2Area.value) {
                this.generateDiffs();
            }
        });

        // Search listeners
        this.searchBtn.addEventListener('click', () => this.searchInDiff());
        this.searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') this.searchInDiff();
        });
        this.searchInput.addEventListener('input', () => {
            if (this.searchInput.value === '') {
                this.clearSearchHighlights();
            }
        });

        // Modal listeners
        this.closeSettings.addEventListener('click', () => this.hideSettingsModal());
        this.closeExport.addEventListener('click', () => this.hideExportModal());

        // Settings listeners
        this.themeSwitcher.addEventListener('change', () => this.toggleTheme());
        this.fontSizeSelect.addEventListener('change', () => this.updateFontSize());
        this.tabSizeSelect.addEventListener('change', () => this.updateTabSize());
        this.wordWrapToggle.addEventListener('change', () => this.updateWordWrap());
        this.lineNumbersToggle.addEventListener('change', () => this.updateLineNumbers());
        this.autoCompareToggle.addEventListener('change', () => this.updateAutoCompare());

        // Export listeners
        this.exportHtml.addEventListener('click', () => this.exportAs('html'));
        this.exportTxt.addEventListener('click', () => this.exportAs('txt'));
        this.exportJson.addEventListener('click', () => this.exportAs('json'));

        // Language selector listeners
        this.file1Language.addEventListener('change', () => this.applySyntaxHighlighting());
        this.file2Language.addEventListener('change', () => this.applySyntaxHighlighting());

        // Drag and drop setup
        this.setupDragAndDrop();

        // Window events
        window.addEventListener('beforeunload', () => this.saveSettings());
        window.addEventListener('resize', () => this.handleResize());

        // Modal background click to close
        window.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) this.hideSettingsModal();
            if (e.target === this.exportModal) this.hideExportModal();
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.generateDiffs();
                        break;
                    case 'k':
                        e.preventDefault();
                        this.clearAll();
                        break;
                    case 's':
                        e.preventDefault();
                        this.showExportModal();
                        break;
                    case 'f':
                        e.preventDefault();
                        this.searchInput.focus();
                        break;
                    case 'z':
                        if (document.activeElement === this.text1Area) {
                            e.preventDefault();
                            this.undo('text1');
                        } else if (document.activeElement === this.text2Area) {
                            e.preventDefault();
                            this.undo('text2');
                        }
                        break;
                    case 'y':
                        if (document.activeElement === this.text1Area) {
                            e.preventDefault();
                            this.redo('text1');
                        } else if (document.activeElement === this.text2Area) {
                            e.preventDefault();
                            this.redo('text2');
                        }
                        break;
                    case '?':
                        e.preventDefault();
                        this.toggleShortcutsInfo();
                        break;
                }
            }

            if (e.key === 'Escape') {
                this.hideSettingsModal();
                this.hideExportModal();
                this.hideShortcutsInfo();
            }
        });
    }

    initializeHistory() {
        // Initialize with current content
        this.saveToHistory('text1', this.text1Area.value);
        this.saveToHistory('text2', this.text2Area.value);
    }

    async readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    }

    detectLanguage(filename, content) {
        const extension = filename.split('.').pop().toLowerCase();
        const languageMap = {
            'js': 'javascript',
            'ts': 'javascript',
            'html': 'html',
            'htm': 'html',
            'css': 'css',
            'scss': 'css',
            'sass': 'css',
            'json': 'json',
            'py': 'python',
            'xml': 'xml',
            'md': 'markdown',
            'txt': 'text'
        };

        return languageMap[extension] || 'text';
    }

    async handleFileSelect(event, textArea, infoElement, languageSelect) {
        const file = event.target.files[0];
        if (file) {
            try {
                const content = await this.readFile(file);
                textArea.value = content;

                // Update file info
                const fileSize = this.formatFileSize(file.size);
                infoElement.textContent = `${file.name} (${fileSize})`;

                // Detect and set language
                const detectedLanguage = this.detectLanguage(file.name, content);
                languageSelect.value = detectedLanguage;

                // Update stats and history
                this.updateTextStats(textArea, textArea === this.text1Area ? this.text1Stats : this.text2Stats);
                this.saveToHistory(textArea === this.text1Area ? 'text1' : 'text2', content);

                // Auto compare if enabled
                if (this.settings.autoCompare && this.text1Area.value && this.text2Area.value) {
                    this.generateDiffs();
                }

                this.applySyntaxHighlighting();
            } catch (error) {
                console.error('Error reading file:', error);
                alert('Error reading file. Please try again.');
            }
        }
    }

    setupDragAndDrop() {
        const containers = [
            { container: this.file1Input.parentElement, input: this.file1Input, textarea: this.text1Area, info: this.file1Info, language: this.file1Language },
            { container: this.file2Input.parentElement, input: this.file2Input, textarea: this.text2Area, info: this.file2Info, language: this.file2Language }
        ];

        containers.forEach(({ container, input, textarea, info, language }) => {
            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                container.classList.add('dragover');
            });

            container.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                container.classList.remove('dragover');
            });

            container.addEventListener('drop', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                container.classList.remove('dragover');

                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    const file = files[0];
                    input.files = files;

                    try {
                        const content = await this.readFile(file);
                        textarea.value = content;

                        const fileSize = this.formatFileSize(file.size);
                        info.textContent = `${file.name} (${fileSize})`;

                        const detectedLanguage = this.detectLanguage(file.name, content);
                        language.value = detectedLanguage;

                        this.updateTextStats(textarea, textarea === this.text1Area ? this.text1Stats : this.text2Stats);
                        this.saveToHistory(textarea === this.text1Area ? 'text1' : 'text2', content);

                        if (this.settings.autoCompare && this.text1Area.value && this.text2Area.value) {
                            this.generateDiffs();
                        }

                        this.applySyntaxHighlighting();
                    } catch (error) {
                        console.error('Error reading dropped file:', error);
                        alert('Error reading file. Please try again.');
                    }
                }
            });
        });
    }

    handleTextChange(textarea, statsElement, textKey) {
        this.updateTextStats(textarea, statsElement);
        this.saveToHistory(textKey, textarea.value);
        this.updateUndoRedoButtons(textKey);

        if (this.settings.autoCompare && this.text1Area.value && this.text2Area.value) {
            clearTimeout(this.autoCompareTimeout);
            this.autoCompareTimeout = setTimeout(() => {
                this.generateDiffs();
            }, 1000);
        }
    }

    updateTextStats(textarea, statsElement) {
        const text = textarea.value;
        const lines = text.split('\n').length;
        const chars = text.length;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

        statsElement.textContent = `${lines} lines, ${words} words, ${chars} characters`;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    saveToHistory(textKey, content) {
        const history = this.history[textKey];
        const currentIndex = this.historyIndex[textKey];

        // Remove any future history when adding new content
        if (currentIndex < history.length - 1) {
            history.splice(currentIndex + 1);
        }

        // Add new content if it's different from the last entry
        if (history.length === 0 || history[history.length - 1] !== content) {
            history.push(content);
            this.historyIndex[textKey] = history.length - 1;

            // Limit history size
            if (history.length > 50) {
                history.shift();
                this.historyIndex[textKey]--;
            }
        }

        this.updateUndoRedoButtons(textKey);
    }

    undo(textKey) {
        const history = this.history[textKey];
        const currentIndex = this.historyIndex[textKey];

        if (currentIndex > 0) {
            this.historyIndex[textKey]--;
            const textarea = textKey === 'text1' ? this.text1Area : this.text2Area;
            textarea.value = history[this.historyIndex[textKey]];

            const statsElement = textKey === 'text1' ? this.text1Stats : this.text2Stats;
            this.updateTextStats(textarea, statsElement);
            this.updateUndoRedoButtons(textKey);
        }
    }

    redo(textKey) {
        const history = this.history[textKey];
        const currentIndex = this.historyIndex[textKey];

        if (currentIndex < history.length - 1) {
            this.historyIndex[textKey]++;
            const textarea = textKey === 'text1' ? this.text1Area : this.text2Area;
            textarea.value = history[this.historyIndex[textKey]];

            const statsElement = textKey === 'text1' ? this.text1Stats : this.text2Stats;
            this.updateTextStats(textarea, statsElement);
            this.updateUndoRedoButtons(textKey);
        }
    }

    updateUndoRedoButtons(textKey) {
        const history = this.history[textKey];
        const currentIndex = this.historyIndex[textKey];

        const undoBtn = textKey === 'text1' ? this.text1UndoBtn : this.text2UndoBtn;
        const redoBtn = textKey === 'text1' ? this.text1RedoBtn : this.text2RedoBtn;

        undoBtn.disabled = currentIndex <= 0;
        redoBtn.disabled = currentIndex >= history.length - 1;
    }

    calculateStats(diff, diffLevel, ignoreWhitespace, ignoreCase) {
        let added = 0;
        let removed = 0;
        let modified = 0;
        const preprocess = (val) => {
            let v = val;
            if (ignoreWhitespace) {
                v = v.split('\n').map(line => line.replace(/\s+/g, ' ').trim()).join('\n');
            }
            if (ignoreCase) {
                v = v.toLowerCase();
            }
            return v;
        };
        diff.forEach(part => {
            let value = preprocess(part.value);
            if (diffLevel === 'lines') {
                const lines = value.split('\n').filter(l => l !== '');
                if (part.added) added += lines.length;
                else if (part.removed) removed += lines.length;
            } else if (diffLevel === 'words') {
                const words = value.split(/\s+/).filter(w => w !== '');
                if (part.added) added += words.length;
                else if (part.removed) removed += words.length;
            } else {
                // character-level
                const chars = value.replace(/\n/g, '').split('');
                if (part.added) added += chars.length;
                else if (part.removed) removed += chars.length;
            }
        });
        // Calculate modified (simple heuristic)
        modified = Math.min(added, removed);
        added -= modified;
        removed -= modified;
        return { added, removed, modified };
    }

    getDiffLevel() {
        return document.querySelector('input[name="diff-level"]:checked').value;
    }

    preprocessText(text) {
        let processed = text;

        if (this.ignoreWhitespace.checked) {
            // Normalize whitespace within lines but preserve line breaks
            processed = processed.split('\n').map(line =>
                line.replace(/\s+/g, ' ').trim()
            ).join('\n');
        }

        if (this.ignoreCase.checked) {
            processed = processed.toLowerCase();
        }

        return processed;
    }

    async generateDiffs() {
        const text1 = this.preprocessText(this.text1Area.value);
        const text2 = this.preprocessText(this.text2Area.value);
        const diffLevel = this.getDiffLevel();

        // Show loading spinner
        this.loadingSpinner.style.display = 'flex';

        // Clear previous results
        this.diffOutput.innerHTML = '';
        const [side1, side2] = this.diffOutputSideBySide.children;
        side1.querySelector('.side-content').innerHTML = '';
        side2.querySelector('.side-content').innerHTML = '';
        this.diffStats.innerHTML = '';

        if (text1 === '' || text2 === '') {
            const msg = '<span style="color: var(--danger-color);">Please provide content for both files.</span>';
            this.diffOutput.innerHTML = msg;
            side1.querySelector('.side-content').innerHTML = msg;
            this.loadingSpinner.style.display = 'none';
            return;
        }

        // Use setTimeout to allow UI to update
        setTimeout(() => {
            try {
                let diff;
                switch (diffLevel) {
                    case 'chars':
                        diff = Diff.diffChars(text1, text2);
                        break;
                    case 'words':
                        diff = Diff.diffWords(text1, text2);
                        break;
                    default:
                        diff = Diff.diffLines(text1, text2);
                        break;
                }

                // Clean up the diff to handle newlines better
                diff = this.cleanupDiff(diff, diffLevel);

                this.currentDiff = diff;
                const stats = this.calculateStats(
                    diff,
                    diffLevel,
                    this.ignoreWhitespace.checked,
                    this.ignoreCase.checked
                );

                // Update stats display
                let statsHtml = `<span class="added-stat">+${stats.added}</span>`;
                if (stats.modified > 0) {
                    statsHtml += `<span class="modified-stat" style="color: var(--warning-color);">~${stats.modified}</span>`;
                }
                statsHtml += `<span class="removed-stat">-${stats.removed}</span>`;
                this.diffStats.innerHTML = statsHtml;

                this.renderDiff(diff, diffLevel);
                this.applySyntaxHighlighting();

            } catch (error) {
                console.error('Error generating diff:', error);
                this.diffOutput.innerHTML = '<span style="color: var(--danger-color);">Error generating diff. Please try again.</span>';
            } finally {
                this.loadingSpinner.style.display = 'none';
            }
        }, 100);
    }

    renderDiff(diff, diffLevel) {
        // Clear previous output
        this.diffOutput.innerHTML = '';
        this.diffOutputSideBySide.querySelector('.side-content').innerHTML = '';

        if (diffLevel === 'lines') {
            this.renderLineDiff(diff);
        } else {
            this.renderWordCharDiff(diff, diffLevel);
        }
    }

    renderLineDiff(diff) {
        // Render unified view with line numbers
        if (!this.viewToggle.checked) {
            let html = '<div class="diff-lines-container">';
            let lineNumber = 1;
            diff.forEach(part => {
                const type = part.added ? 'added' : part.removed ? 'removed' : 'unchanged';
                const lines = part.value.split('\n');
                lines.forEach((line, idx) => {
                    if (line === '' && idx === lines.length - 1) return; // skip trailing empty
                    html += `<div class="diff-line ${type}">
                        <span class="diff-line-number">${lineNumber}</span>
                        <span class="diff-line-content">${this.escapeHtml(line)}</span>
                    </div>`;
                    lineNumber++;
                });
            });
            html += '</div>';
            this.diffOutput.innerHTML = html;
        } else {
            // Side-by-side view rendering for line diff (new style)
            const sideBySideFragment1 = document.createDocumentFragment();
            const sideBySideFragment2 = document.createDocumentFragment();
            let lineNum1 = 1;
            let lineNum2 = 1;
            if (diff.length === 1 && !diff[0].added && !diff[0].removed) {
                const noChanges = document.createElement('div');
                noChanges.textContent = 'No changes detected.';
                noChanges.style.textAlign = 'center';
                noChanges.style.padding = '2rem';
                noChanges.style.color = 'var(--secondary-text)';
                sideBySideFragment1.appendChild(noChanges.cloneNode(true));
                sideBySideFragment2.appendChild(noChanges);
            } else {
                diff.forEach((part) => {
                    const type = part.added ? 'added' : part.removed ? 'removed' : 'unchanged';
                    const lines = part.value.split('\n');
                    lines.forEach((line, idx) => {
                        if (line === '' && idx === lines.length - 1) return;
                        if (part.added) {
                            const div = document.createElement('div');
                            div.className = `diff-line ${type}`;
                            div.innerHTML = `<span class="diff-line-number">${lineNum2}</span><span class="diff-line-content">${this.escapeHtml(line)}</span>`;
                            sideBySideFragment2.appendChild(div);
                            lineNum2++;
                        } else if (part.removed) {
                            const div = document.createElement('div');
                            div.className = `diff-line ${type}`;
                            div.innerHTML = `<span class="diff-line-number">${lineNum1}</span><span class="diff-line-content">${this.escapeHtml(line)}</span>`;
                            sideBySideFragment1.appendChild(div);
                            lineNum1++;
                        } else {
                            const div1 = document.createElement('div');
                            div1.className = 'diff-line unchanged';
                            div1.innerHTML = `<span class="diff-line-number">${lineNum1}</span><span class="diff-line-content">${this.escapeHtml(line)}</span>`;
                            sideBySideFragment1.appendChild(div1);
                            lineNum1++;
                            const div2 = document.createElement('div');
                            div2.className = 'diff-line unchanged';
                            div2.innerHTML = `<span class="diff-line-number">${lineNum2}</span><span class="diff-line-content">${this.escapeHtml(line)}</span>`;
                            sideBySideFragment2.appendChild(div2);
                            lineNum2++;
                        }
                    });
                });
            }
            const [side1, side2] = this.diffOutputSideBySide.children;
            side1.querySelector('.side-content').innerHTML = '';
            side2.querySelector('.side-content').innerHTML = '';
            side1.querySelector('.side-content').appendChild(sideBySideFragment1);
            side2.querySelector('.side-content').appendChild(sideBySideFragment2);
        }
    }

    renderWordCharDiff(diff, diffLevel) {
        // For word/char level, we need to reconstruct the text with line structure
        // while preserving the word/char level highlighting

        if (!this.viewToggle.checked) {
            // Unified view
            const result = this.reconstructLinesFromDiff(diff, diffLevel);
            this.diffOutput.innerHTML = result;
        } else {
            // Side-by-side view
            const [side1Content, side2Content] = this.reconstructSideBySideFromDiff(diff, diffLevel);
            const [side1, side2] = this.diffOutputSideBySide.children;
            side1.querySelector('.side-content').innerHTML = side1Content;
            side2.querySelector('.side-content').innerHTML = side2Content;
        }
    }

    reconstructLinesFromDiff(diff, diffLevel) {
        let html = '<div class="diff-lines-container">';
        let currentLine = '';
        let lineNumber = 1;
        let currentLineType = 'unchanged';

        diff.forEach(part => {
            const lines = part.value.split('\n');

            lines.forEach((lineContent, lineIndex) => {
                if (lineIndex > 0) {
                    // We hit a newline, so finish the current line
                    html += `<div class="diff-line ${currentLineType}">
                        <span class="diff-line-number">${lineNumber}</span>
                        <span class="diff-line-content">${currentLine}</span>
                    </div>`;
                    lineNumber++;
                    currentLine = '';
                    currentLineType = 'unchanged';
                }

                if (lineContent || lineIndex === 0) {
                    // Add content to current line
                    const escapedContent = this.escapeHtml(lineContent);

                    if (part.added) {
                        if (escapedContent.trim() !== '') {
                            currentLine += `<span class="intra-line-added">${escapedContent}</span>`;
                            if (currentLineType === 'unchanged') currentLineType = 'added';
                        }
                    } else if (part.removed) {
                        if (escapedContent.trim() !== '') {
                            currentLine += `<span class="intra-line-removed">${escapedContent}</span>`;
                            if (currentLineType === 'unchanged') currentLineType = 'removed';
                        }
                    } else {
                        currentLine += escapedContent;
                    }
                }
            });
        });

        // Handle the last line if it doesn't end with newline
        if (currentLine) {
            html += `<div class="diff-line ${currentLineType}">
                <span class="diff-line-number">${lineNumber}</span>
                <span class="diff-line-content">${currentLine}</span>
            </div>`;
        }

        html += '</div>';
        return html;
    }

    reconstructSideBySideFromDiff(diff, diffLevel) {
        let side1Html = '<div class="diff-lines-container">';
        let side2Html = '<div class="diff-lines-container">';
        let lineNum1 = 1;
        let lineNum2 = 1;
        let side1Line = '', side2Line = '';
        let side1LineType = 'unchanged', side2LineType = 'unchanged';

        function finishLines() {
            if (side1Line !== '' || side1LineType !== 'unchanged') {
                side1Html += `<div class="diff-line ${side1LineType}"><span class="diff-line-number">${lineNum1}</span><span class="diff-line-content">${side1Line}</span></div>`;
                lineNum1++;
            }
            if (side2Line !== '' || side2LineType !== 'unchanged') {
                side2Html += `<div class="diff-line ${side2LineType}"><span class="diff-line-number">${lineNum2}</span><span class="diff-line-content">${side2Line}</span></div>`;
                lineNum2++;
            }
            side1Line = '';
            side2Line = '';
            side1LineType = 'unchanged';
            side2LineType = 'unchanged';
        }

        diff.forEach(part => {
            const lines = part.value.split('\n');
            lines.forEach((lineContent, lineIndex) => {
                if (lineIndex > 0) {
                    finishLines();
                }
                const escapedContent = this.escapeHtml(lineContent);
                if (part.added) {
                    if (escapedContent.trim() !== '') {
                        side2Line += `<span class="intra-line-added">${escapedContent}</span>`;
                        side2LineType = 'added';
                    }
                } else if (part.removed) {
                    if (escapedContent.trim() !== '') {
                        side1Line += `<span class="intra-line-removed">${escapedContent}</span>`;
                        side1LineType = 'removed';
                    }
                } else {
                    side1Line += escapedContent;
                    side2Line += escapedContent;
                }
            });
        });
        finishLines();
        side1Html += '</div>';
        side2Html += '</div>';
        return [side1Html, side2Html];
    }



    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    applySyntaxHighlighting() {
        if (!this.settings.syntaxHighlighting) return;

        // Simple syntax highlighting for common languages
        const language1 = this.file1Language.value;
        const language2 = this.file2Language.value;

        if (language1 !== 'text' || language2 !== 'text') {
            // Apply basic syntax highlighting
            this.highlightSyntax(this.diffOutput, language1);
            const [side1, side2] = this.diffOutputSideBySide.children;
            this.highlightSyntax(side1.querySelector('.side-content'), language1);
            this.highlightSyntax(side2.querySelector('.side-content'), language2);
        }
    }

    highlightSyntax(element, language) {
        // Basic syntax highlighting patterns
        const patterns = {
            javascript: [
                { pattern: /\b(function|const|let|var|if|else|for|while|return|class|extends)\b/g, className: 'syntax-keyword' },
                { pattern: /"[^"]*"|'[^']*'/g, className: 'syntax-string' },
                { pattern: /\/\/.*$/gm, className: 'syntax-comment' },
                { pattern: /\b\d+\b/g, className: 'syntax-number' }
            ],
            python: [
                { pattern: /\b(def|class|if|else|elif|for|while|return|import|from|as)\b/g, className: 'syntax-keyword' },
                { pattern: /"[^"]*"|'[^']*'/g, className: 'syntax-string' },
                { pattern: /#.*$/gm, className: 'syntax-comment' },
                { pattern: /\b\d+\b/g, className: 'syntax-number' }
            ],
            html: [
                { pattern: /&lt;[^&gt;]*&gt;/g, className: 'syntax-keyword' },
                { pattern: /"[^"]*"|'[^']*'/g, className: 'syntax-string' }
            ],
            css: [
                { pattern: /[a-zA-Z-]+(?=\s*:)/g, className: 'syntax-keyword' },
                { pattern: /"[^"]*"|'[^']*'/g, className: 'syntax-string' },
                { pattern: /\/\*[\s\S]*?\*\//g, className: 'syntax-comment' }
            ]
        };

        if (patterns[language]) {
            patterns[language].forEach(({ pattern, className }) => {
                element.innerHTML = element.innerHTML.replace(pattern, `<span class="${className}">$&</span>`);
            });
        }
    }

    swapFiles() {
        // Swap textareas
        const temp = this.text1Area.value;
        this.text1Area.value = this.text2Area.value;
        this.text2Area.value = temp;

        // Swap file info
        const tempInfo = this.file1Info.textContent;
        this.file1Info.textContent = this.file2Info.textContent;
        this.file2Info.textContent = tempInfo;

        // Swap language selections
        const tempLang = this.file1Language.value;
        this.file1Language.value = this.file2Language.value;
        this.file2Language.value = tempLang;

        // Update stats
        this.updateTextStats(this.text1Area, this.text1Stats);
        this.updateTextStats(this.text2Area, this.text2Stats);

        // Save to history
        this.saveToHistory('text1', this.text1Area.value);
        this.saveToHistory('text2', this.text2Area.value);

        // Regenerate diff if auto-compare is enabled
        if (this.settings.autoCompare && this.text1Area.value && this.text2Area.value) {
            this.generateDiffs();
        }
    }

    clearAll() {
        this.text1Area.value = '';
        this.text2Area.value = '';
        this.file1Info.textContent = '';
        this.file2Info.textContent = '';
        this.text1Stats.textContent = '';
        this.text2Stats.textContent = '';

        this.diffOutput.innerHTML = '';
        const [side1, side2] = this.diffOutputSideBySide.children;
        side1.querySelector('.side-content').innerHTML = '';
        side2.querySelector('.side-content').innerHTML = '';
        this.diffStats.innerHTML = '';

        this.file1Language.value = 'auto';
        this.file2Language.value = 'auto';

        this.currentDiff = null;
        this.clearSearchHighlights();

        // Reset file inputs
        this.file1Input.value = '';
        this.file2Input.value = '';

        // Clear history
        this.initializeHistory();
    }

    async copyToClipboard() {
        try {
            const unifiedViewVisible = this.diffOutput.style.display !== 'none';
            const content = unifiedViewVisible ? this.diffOutput.innerText : this.diffOutputSideBySide.innerText;

            await navigator.clipboard.writeText(content);

            // Visual feedback
            this.copyBtn.querySelector('svg').style.stroke = 'var(--success-color)';
            setTimeout(() => {
                this.copyBtn.querySelector('svg').style.stroke = 'var(--secondary-color)';
            }, 1500);

            this.showToast('Copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy:', error);
            this.showToast('Failed to copy to clipboard', 'error');
        }
    }

    toggleView() {
        if (this.viewToggle.checked) {
            this.diffOutput.style.display = 'none';
            this.diffOutputSideBySide.style.display = 'grid';
        } else {
            this.diffOutput.style.display = 'block';
            this.diffOutputSideBySide.style.display = 'none';
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        this.settings.theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        this.saveSettings();
    }

    searchInDiff() {
        const query = this.searchInput.value.trim();
        if (!query || !this.currentDiff) return;

        this.clearSearchHighlights();

        const searchRegex = new RegExp(query, 'gi');
        const outputElement = this.viewToggle.checked ? this.diffOutputSideBySide : this.diffOutput;

        this.searchMatches = [];
        this.highlightSearchMatches(outputElement, searchRegex);

        if (this.searchMatches.length > 0) {
            this.currentSearchIndex = 0;
            this.scrollToSearchMatch(0);
            this.searchResults.textContent = `${this.searchMatches.length} matches found`;
            this.searchResults.style.display = 'block';
        } else {
            this.searchResults.textContent = 'No matches found';
            this.searchResults.style.display = 'block';
        }
    }

    highlightSearchMatches(element, regex) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            const matches = [...text.matchAll(regex)];

            if (matches.length > 0) {
                const parent = textNode.parentNode;
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;

                matches.forEach(match => {
                    // Add text before match
                    if (match.index > lastIndex) {
                        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
                    }

                    // Add highlighted match
                    const highlight = document.createElement('span');
                    highlight.className = 'diff-highlight';
                    highlight.textContent = match[0];
                    fragment.appendChild(highlight);
                    this.searchMatches.push(highlight);

                    lastIndex = match.index + match[0].length;
                });

                // Add remaining text
                if (lastIndex < text.length) {
                    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
                }

                parent.replaceChild(fragment, textNode);
            }
        });
    }

    clearSearchHighlights() {
        document.querySelectorAll('.diff-highlight').forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });

        this.searchMatches = [];
        this.currentSearchIndex = 0;
        this.searchResults.style.display = 'none';
    }

    scrollToSearchMatch(index) {
        if (index >= 0 && index < this.searchMatches.length) {
            this.searchMatches[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    showSettingsModal() {
        this.settingsModal.style.display = 'block';
    }

    hideSettingsModal() {
        this.settingsModal.style.display = 'none';
    }

    showExportModal() {
        if (!this.currentDiff) {
            this.showToast('Please generate a diff first', 'warning');
            return;
        }
        this.exportModal.style.display = 'block';
    }

    hideExportModal() {
        this.exportModal.style.display = 'none';
    }

    exportAs(format) {
        if (!this.currentDiff) {
            this.showToast('No diff to export', 'warning');
            return;
        }

        let content;
        let filename;
        let mimeType;

        switch (format) {
            case 'html':
                content = this.generateHtmlExport();
                filename = 'diff-export.html';
                mimeType = 'text/html';
                break;
            case 'txt':
                content = this.generateTextExport();
                filename = 'diff-export.txt';
                mimeType = 'text/plain';
                break;
            case 'json':
                content = this.generateJsonExport();
                filename = 'diff-export.json';
                mimeType = 'application/json';
                break;
        }

        this.downloadFile(content, filename, mimeType);
        this.hideExportModal();
        this.showToast(`Exported as ${format.toUpperCase()}!`);
    }

    generateHtmlExport() {
        const styles = `
            <style>
                body { font-family: monospace; line-height: 1.5; }
                .added { background-color: rgba(46, 160, 67, 0.2); }
                .removed { background-color: rgba(248, 81, 73, 0.2); }
                .stats { margin-bottom: 20px; font-weight: bold; }
                .diff-container { border: 1px solid #ddd; padding: 20px; }
            </style>
        `;

        const stats = this.calculateStats(this.currentDiff);
        const statsHtml = `<div class="stats">Changes: +${stats.added} -${stats.removed}</div>`;

        const diffHtml = this.diffOutput.innerHTML;

        return `<!DOCTYPE html>
<html>
<head>
    <title>Diff Export</title>
    ${styles}
</head>
<body>
    <h1>File Comparison Report</h1>
    <p>Generated on: ${new Date().toLocaleString()}</p>
    ${statsHtml}
    <div class="diff-container">
        ${diffHtml}
    </div>
</body>
</html>`;
    }

    generateTextExport() {
        const stats = this.calculateStats(this.currentDiff);
        const statsText = `Changes: +${stats.added} -${stats.removed}\n${'='.repeat(50)}\n\n`;
        const diffText = this.diffOutput.innerText;

        return `File Comparison Report\nGenerated on: ${new Date().toLocaleString()}\n\n${statsText}${diffText}`;
    }

    generateJsonExport() {
        const stats = this.calculateStats(this.currentDiff);

        return JSON.stringify({
            timestamp: new Date().toISOString(),
            stats: stats,
            diff: this.currentDiff,
            settings: {
                diffLevel: this.getDiffLevel(),
                ignoreWhitespace: this.ignoreWhitespace.checked,
                ignoreCase: this.ignoreCase.checked
            }
        }, null, 2);
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    shareUrl() {
        // Simple URL sharing with base64 encoded diff data
        try {
            const data = {
                text1: this.text1Area.value,
                text2: this.text2Area.value,
                settings: {
                    diffLevel: this.getDiffLevel(),
                    ignoreWhitespace: this.ignoreWhitespace.checked,
                    ignoreCase: this.ignoreCase.checked
                }
            };

            const encoded = btoa(JSON.stringify(data));
            const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;

            navigator.clipboard.writeText(url).then(() => {
                this.showToast('Share URL copied to clipboard!');
            });
        } catch (error) {
            console.error('Error generating share URL:', error);
            this.showToast('Error generating share URL', 'error');
        }
    }

    loadFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');

        if (data) {
            try {
                const decoded = JSON.parse(atob(data));
                this.text1Area.value = decoded.text1 || '';
                this.text2Area.value = decoded.text2 || '';

                if (decoded.settings) {
                    document.querySelector(`input[name="diff-level"][value="${decoded.settings.diffLevel}"]`).checked = true;
                    this.ignoreWhitespace.checked = decoded.settings.ignoreWhitespace || false;
                    this.ignoreCase.checked = decoded.settings.ignoreCase || false;
                }

                // Update stats
                this.updateTextStats(this.text1Area, this.text1Stats);
                this.updateTextStats(this.text2Area, this.text2Stats);

                // Generate diff
                if (this.text1Area.value && this.text2Area.value) {
                    this.generateDiffs();
                }
            } catch (error) {
                console.error('Error loading from URL:', error);
            }
        }
    }

    updateFontSize() {
        const fontSize = this.fontSizeSelect.value;
        this.settings.fontSize = parseInt(fontSize);

        document.documentElement.style.setProperty('--editor-font-size', `${fontSize}px`);

        [this.text1Area, this.text2Area, this.diffOutput].forEach(el => {
            el.style.fontSize = `${fontSize}px`;
        });

        document.querySelectorAll('#diff-output-side-by-side .side-content').forEach(el => {
            el.style.fontSize = `${fontSize}px`;
        });

        this.saveSettings();
    }

    updateTabSize() {
        const tabSize = this.tabSizeSelect.value;
        this.settings.tabSize = parseInt(tabSize);

        [this.text1Area, this.text2Area].forEach(el => {
            el.style.tabSize = tabSize;
        });

        this.saveSettings();
    }

    updateWordWrap() {
        this.settings.wordWrap = this.wordWrapToggle.checked;

        const whiteSpace = this.settings.wordWrap ? 'pre-wrap' : 'pre';
        [this.text1Area, this.text2Area, this.diffOutput].forEach(el => {
            el.style.whiteSpace = whiteSpace;
        });

        document.querySelectorAll('#diff-output-side-by-side .side-content').forEach(el => {
            el.style.whiteSpace = whiteSpace;
        });

        this.saveSettings();
    }

    updateLineNumbers() {
        this.settings.lineNumbers = this.lineNumbersToggle.checked;

        const className = this.settings.lineNumbers ? 'show-line-numbers' : 'hide-line-numbers';
        document.body.className = document.body.className.replace(/\b(show|hide)-line-numbers\b/g, '') + ' ' + className;

        this.saveSettings();
    }

    updateAutoCompare() {
        this.settings.autoCompare = this.autoCompareToggle.checked;
        this.saveSettings();
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('diffchecker-settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }

        // Apply loaded settings
        this.fontSizeSelect.value = this.settings.fontSize;
        this.tabSizeSelect.value = this.settings.tabSize;
        this.wordWrapToggle.checked = this.settings.wordWrap;
        this.lineNumbersToggle.checked = this.settings.lineNumbers;
        this.autoCompareToggle.checked = this.settings.autoCompare;

        if (this.settings.theme === 'dark') {
            document.body.classList.add('dark-theme');
            this.themeSwitcher.checked = true;
        }

        this.updateFontSize();
        this.updateTabSize();
        this.updateWordWrap();
        this.updateLineNumbers();
    }

    saveSettings() {
        try {
            localStorage.setItem('diffchecker-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--${type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'success'}-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    toggleShortcutsInfo() {
        const info = this.shortcutsInfo;
        info.style.display = info.style.display === 'block' ? 'none' : 'block';
    }

    hideShortcutsInfo() {
        this.shortcutsInfo.style.display = 'none';
    }

    handleResize() {
        // Handle responsive behavior
        if (window.innerWidth < 768) {
            this.viewToggle.checked = false;
            this.toggleView();
        }
    }

    cleanupDiff(diff, diffLevel) {
        if (diffLevel === 'lines') {
            return diff; // Line-level diffs don't need newline cleanup
        }

        // For word and character level diffs, handle newline characters better
        const cleaned = [];

        for (let i = 0; i < diff.length; i++) {
            const part = diff[i];

            // Check if this part is only newline characters
            if (part.value.match(/^\n+$/) && (part.added || part.removed)) {
                // Skip standalone newline additions/removals in word/char mode
                continue;
            }

            // If the part contains newlines mixed with other content, normalize them
            if (diffLevel === 'words' && part.value.includes('\n')) {
                // For word-level diffs, treat newlines as word separators, not content
                const lines = part.value.split('\n');
                for (let j = 0; j < lines.length; j++) {
                    if (lines[j].trim()) {
                        // Only add non-empty content
                        cleaned.push({
                            added: part.added,
                            removed: part.removed,
                            value: lines[j] + (j < lines.length - 1 ? '\n' : '')
                        });
                    } else if (j < lines.length - 1) {
                        // Add newline as neutral content
                        cleaned.push({
                            value: '\n'
                        });
                    }
                }
            } else {
                cleaned.push(part);
            }
        }

        return cleaned.length > 0 ? cleaned : diff; // Fallback to original if we cleaned everything
    }

    resetSettingsToDefault() {
        this.settings = {
            fontSize: 16,
            tabSize: 4,
            wordWrap: true,
            lineNumbers: true,
            autoCompare: true,
            theme: 'dark'
        };
        // Update UI controls
        this.fontSizeSelect.value = '16';
        this.tabSizeSelect.value = '4';
        this.wordWrapToggle.checked = true;
        this.lineNumbersToggle.checked = true;
        this.autoCompareToggle.checked = true;
        this.themeSwitcher.checked = true;
        document.body.classList.add('dark-theme');
        // Apply settings to textareas and diff
        this.applySettings();
        this.hideSettingsModal();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.diffChecker = new DiffCheckerPro();

    // Load from URL if data exists
    window.diffChecker.loadFromUrl();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});