/**
 * ConsBlock Runtime Engine
 * Manages agent lifecycle, LLM routing, and action payload execution.
 */

import { config } from 'dotenv';
config();

export class Runtime {
    constructor(options = {}) {
        this.provider = null;
        this.activeAgent = null;
        this.logLevel = process.env.LOG_LEVEL || 'info';
        this.txHistory = [];
    }

    async boot() {
        // Detect LLM provider
        if (process.env.OPENAI_API_KEY) {
            this.provider = 'openai';
        } else if (process.env.ANTHROPIC_API_KEY) {
            this.provider = 'anthropic';
        } else {
            throw new Error('No LLM provider configured. Run `consblock init`.');
        }

        this.log('info', `Runtime booted with provider: ${this.provider}`);
        return this;
    }

    async dispatch(agentName, task) {
        this.log('info', `Dispatching "${task}" to ${agentName}`);

        const payload = {
            agent: agentName,
            task: task,
            timestamp: new Date().toISOString(),
            provider: this.provider,
            status: 'pending',
        };

        // Simulate LLM routing
        payload.intentHash = this.generateHash(task);
        payload.status = 'completed';

        this.txHistory.push(payload);
        this.log('info', `Task completed. Hash: ${payload.intentHash}`);

        return payload;
    }

    generateHash(input) {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return '0x' + Math.abs(hash).toString(16).padStart(8, '0');
    }

    log(level, message) {
        const levels = { error: 0, info: 1, debug: 2 };
        if (levels[level] <= levels[this.logLevel]) {
            const ts = new Date().toISOString().split('T')[1].split('.')[0];
            console.log(`  [${ts}] [${level.toUpperCase()}] ${message}`);
        }
    }
}
