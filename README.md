<div align="center">

```
 ██████╗ ██████╗ ███╗   ██╗███████╗██████╗ ██╗      ██████╗  ██████╗██╗  ██╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝
██║     ██║   ██║██╔██╗ ██║███████╗██████╔╝██║     ██║   ██║██║     █████╔╝ 
██║     ██║   ██║██║╚██╗██║╚════██║██╔══██╗██║     ██║   ██║██║     ██╔═██╗ 
╚██████╗╚██████╔╝██║ ╚████║███████║██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝
```

### AI Mercenary Marketplace — Local Agent Runner

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-black?style=flat-square&logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-white?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Alpha-red?style=flat-square)]()

**Deploy autonomous AI agents locally. No cloud. No middlemen. Full control.**

[Website](https://consblock.fun) · [Documentation](https://consblock.fun/docs.html) · [Agent Catalog](#agent-catalog)

</div>

---

## What is this?

ConsBlock Local Agent is a CLI framework for deploying specialized AI mercenaries that execute tasks autonomously on your machine. Each agent is purpose-built for a specific domain — from DeFi arbitrage to smart contract auditing.

All operations run **locally**. Your keys never leave your machine.

## Quick Start

```bash
# 1. Clone
git clone https://github.com/consblock/local-agent.git
cd local-agent

# 2. Install dependencies
npm install

# 3. Configure
node bin/consblock.js init

# 4. Start
node bin/consblock.js up
```

## Commands

| Command | Description |
|---------|-------------|
| `consblock init` | Interactive setup wizard — configure API keys and RPC endpoints |
| `consblock up` | Boot the local agent runtime |
| `consblock chat` | Open an interactive chat session with agents |
| `consblock run <task>` | Send a one-shot task to a specific agent |
| `consblock catalog` | List all available mercenary agents |

### Examples

```bash
# Chat mode
node bin/consblock.js chat

# One-shot task
node bin/consblock.js run --agent alphaquant "Monitor USDC/WETH on UniswapV3. Execute arb if spread > 0.5%."

# Scraping task
node bin/consblock.js run --agent datagoblin "Scrape all token launches on Pump.fun in the last 24h. Output to CSV."

# Audit a contract
node bin/consblock.js run --agent smartreaper "Audit contract 0x123... on mainnet. Report critical findings."
```

## Agent Catalog

| Agent | Codename | Specialty |
|-------|----------|-----------|
| **AlphaQuant** | The Sniper | High-frequency trading, flash-loan arbitrage, mempool monitoring |
| **DataGoblin** | The Scavenger | Mass data extraction, Cloudflare bypass, dark web indexing |
| **SocialSentiment** | The Infiltrator | Social media NLP, KOL tracking, sybil detection |
| **SmartReaper** | The Auditor | EVM bytecode analysis, vulnerability scanning, gas optimization |
| **ZeroDay** | The Shadow | Penetration testing, exploit generation, red-team operations |

## Configuration

All configuration is stored in a local `.env` file generated during `consblock init`.

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes* | Primary LLM provider |
| `ANTHROPIC_API_KEY` | Yes* | Fallback LLM provider |
| `RPC_URL_BASE` | No | Custom RPC endpoint (default: Base Mainnet) |
| `EVM_PRIVATE_KEY` | No | For on-chain execution |
| `LOG_LEVEL` | No | `info` / `debug` / `error` |

> \* At least one LLM provider key is required.

## Project Structure

```
local-agent/
├── bin/
│   └── consblock.js      # CLI entrypoint
├── src/
│   ├── agents/            # Agent definitions
│   ├── core/              # Runtime engine
│   └── utils/             # Shared utilities
├── .env.example           # Config template
├── package.json
└── README.md
```

## Security

- **Local-first**: All agent execution happens on your machine
- **No telemetry**: Zero data is sent to ConsBlock servers
- **Sandboxed**: Agents only access the `.consblock/` workspace directory
- **Dry runs**: Destructive actions require terminal confirmation unless `--auto-approve`

## Requirements

- Node.js >= 20
- Git
- An API key from OpenAI or Anthropic

## License

MIT — do whatever you want.

---

<div align="center">
  <sub>Built by <a href="https://consblock.fun">ConsBlock</a> — Hire machines, not people.</sub>
</div>
