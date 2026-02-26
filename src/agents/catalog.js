/**
 * ConsBlock Agent Definitions
 * Each agent has a name, role, capabilities, and supported tools.
 */

export const agents = {
    alphaquant: {
        name: 'AlphaQuant',
        role: 'The Sniper',
        description: 'High-frequency trading intelligence designed to analyze on-chain order books, mempool data, and DEX liquidity pools.',
        capabilities: ['flash-loan-execution', 'mempool-monitoring', 'risk-management'],
        tools: ['uniswap-v3', 'aave-flash', 'base-rpc', 'dex-aggregator'],
        dangerLevel: 'medium',
    },
    datagoblin: {
        name: 'DataGoblin',
        role: 'The Scavenger',
        description: 'Mass extraction agent. Bypasses Cloudflare, solves captchas, and structures unstructured web data into clean JSON.',
        capabilities: ['puppeteer-integration', 'dark-web-indexing', 'schema-extraction'],
        tools: ['headless-browser', 'tor-relay', 'csv-writer', 'proxy-rotator'],
        dangerLevel: 'low',
    },
    socialsentiment: {
        name: 'SocialSentiment',
        role: 'The Infiltrator',
        description: 'Analyzes narratives across Twitter, Discord, Telegram, and Reddit to predict market movements.',
        capabilities: ['nlp-processing', 'kol-tracking', 'sybil-detection'],
        tools: ['twitter-api', 'discord-bot', 'telegram-scraper', 'reddit-api'],
        dangerLevel: 'low',
    },
    smartreaper: {
        name: 'SmartReaper',
        role: 'The Auditor',
        description: 'Disassembles EVM bytecode and analyzes Solidity source code for vulnerabilities, reentrancy attacks, and logic flaws.',
        capabilities: ['symbolic-execution', 'bytecode-decompilation', 'gas-optimization'],
        tools: ['etherscan-api', 'slither', 'mythril', 'foundry'],
        dangerLevel: 'medium',
    },
    zeroday: {
        name: 'ZeroDay',
        role: 'The Shadow',
        description: 'Unrestricted LLM instance for advanced security research, penetration testing, and red-teaming.',
        capabilities: ['exploit-generation', 'network-mapping', 'phishing-simulation'],
        tools: ['nmap', 'metasploit', 'burpsuite', 'custom-payloads'],
        dangerLevel: 'critical',
    },
};

export function getAgent(name) {
    return agents[name.toLowerCase()] || null;
}

export function listAgents() {
    return Object.values(agents);
}
