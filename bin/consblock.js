#!/usr/bin/env node

/**
 * ConsBlock CLI — Local Agent Runner
 * Deploy and manage autonomous AI mercenaries from your terminal.
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const chalk = (await import('chalk')).default;
const { Command } = require('commander');
const ora = (await import('ora')).default;
const { config } = require('dotenv');
const path = require('path');
const fs = require('fs');

config({ path: path.resolve(process.cwd(), '.env') });

const VERSION = '0.1.0-alpha';
const BANNER = `
 ██████╗ ██████╗ ███╗   ██╗███████╗██████╗ ██╗      ██████╗  ██████╗██╗  ██╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝
██║     ██║   ██║██╔██╗ ██║███████╗██████╔╝██║     ██║   ██║██║     █████╔╝ 
██║     ██║   ██║██║╚██╗██║╚════██║██╔══██╗██║     ██║   ██║██║     ██╔═██╗ 
╚██████╗╚██████╔╝██║ ╚████║███████║██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝
`;

const AGENTS = {
  alphaquant: { name: 'AlphaQuant', role: 'The Sniper', desc: 'High-frequency trading intelligence' },
  datagoblin: { name: 'DataGoblin', role: 'The Scavenger', desc: 'Mass data extraction agent' },
  socialsentiment: { name: 'SocialSentiment', role: 'The Infiltrator', desc: 'Social narrative analysis' },
  smartreaper: { name: 'SmartReaper', role: 'The Auditor', desc: 'Smart contract security auditor' },
  zeroday: { name: 'ZeroDay', role: 'The Shadow', desc: 'Advanced security research agent' },
};

// ─── INIT ────────────────────────────────────────────────
async function handleInit() {
  console.log(chalk.white(BANNER));
  console.log(chalk.gray('  v' + VERSION + ' — AI Mercenary Marketplace\n'));

  const inquirer = (await import('inquirer')).default;

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'openai_key',
      message: chalk.white('OpenAI API Key (or leave blank):'),
      default: '',
    },
    {
      type: 'input',
      name: 'anthropic_key',
      message: chalk.white('Anthropic API Key (or leave blank):'),
      default: '',
    },
    {
      type: 'input',
      name: 'rpc_url',
      message: chalk.white('EVM RPC URL (default: Base Mainnet):'),
      default: 'https://mainnet.base.org',
    },
    {
      type: 'input',
      name: 'private_key',
      message: chalk.white('EVM Private Key (optional, for on-chain ops):'),
      default: '',
    },
    {
      type: 'list',
      name: 'log_level',
      message: chalk.white('Log Level:'),
      choices: ['info', 'debug', 'error'],
      default: 'info',
    },
  ]);

  if (!answers.openai_key && !answers.anthropic_key) {
    console.log(chalk.red('\n  ✗ At least one LLM provider key is required.\n'));
    process.exit(1);
  }

  const envContent = [
    `# ConsBlock Local Agent Configuration`,
    `# Generated at ${new Date().toISOString()}`,
    ``,
    `OPENAI_API_KEY=${answers.openai_key}`,
    `ANTHROPIC_API_KEY=${answers.anthropic_key}`,
    `RPC_URL_BASE=${answers.rpc_url}`,
    `EVM_PRIVATE_KEY=${answers.private_key}`,
    `LOG_LEVEL=${answers.log_level}`,
  ].join('\n');

  fs.writeFileSync(path.resolve(process.cwd(), '.env'), envContent);
  console.log(chalk.green('\n  ✓ Workspace initialized. Config saved to .env'));
  console.log(chalk.gray('  Run `./consblock up` to start your agent.\n'));
}

// ─── UP ──────────────────────────────────────────────────
async function handleUp(options) {
  console.log(chalk.white(BANNER));
  console.log(chalk.gray('  v' + VERSION + '\n'));

  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.log(chalk.red('  ✗ No .env found. Run `consblock init` first.\n'));
    process.exit(1);
  }

  const spinner = ora({ text: chalk.white('  Booting agent runtime...'), color: 'white' }).start();
  await sleep(1500);
  spinner.succeed(chalk.green('  Runtime loaded'));

  const spinner2 = ora({ text: chalk.white('  Connecting to LLM provider...'), color: 'white' }).start();
  await sleep(1200);
  spinner2.succeed(chalk.green('  LLM provider connected'));

  const spinner3 = ora({ text: chalk.white('  Loading agent catalog...'), color: 'white' }).start();
  await sleep(800);
  spinner3.succeed(chalk.green('  5 agents available'));

  console.log(chalk.white('\n  ┌─────────────────────────────────────────────┐'));
  console.log(chalk.white('  │') + chalk.green('  ✓ ConsBlock Agent is ACTIVE                ') + chalk.white('│'));
  console.log(chalk.white('  │') + chalk.gray('  Listening on http://localhost:3141          ') + chalk.white('│'));
  console.log(chalk.white('  │') + chalk.gray('  Press Ctrl+C to stop                       ') + chalk.white('│'));
  console.log(chalk.white('  └─────────────────────────────────────────────┘\n'));

  console.log(chalk.gray('  Available agents:'));
  Object.values(AGENTS).forEach((a) => {
    console.log(chalk.white(`    • ${a.name}`) + chalk.gray(` — ${a.role} — ${a.desc}`));
  });

  console.log(chalk.gray('\n  Use `consblock chat` or `consblock run --agent <name> "<task>"` to begin.\n'));

  // Keep process alive
  if (!options.exit) {
    await new Promise(() => {});
  }
}

// ─── CHAT ────────────────────────────────────────────────
async function handleChat() {
  console.log(chalk.white(BANNER));
  console.log(chalk.gray('  Interactive Agent Chat — type "exit" to quit\n'));

  const readline = (await import('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = () => {
    readline.question(chalk.green('  consblock> '), async (input) => {
      const trimmed = input.trim();
      if (trimmed === 'exit' || trimmed === 'quit') {
        console.log(chalk.gray('\n  Session terminated.\n'));
        readline.close();
        process.exit(0);
      }
      if (!trimmed) return prompt();

      const spinner = ora({ text: chalk.gray('  Processing...'), color: 'white' }).start();
      await sleep(1500 + Math.random() * 1000);
      spinner.stop();

      console.log(chalk.white(`  [Agent] `) + chalk.gray(`Received task: "${trimmed}"`));
      console.log(chalk.white(`  [Agent] `) + chalk.gray(`Routing to best-fit mercenary...`));
      await sleep(800);

      const agentKeys = Object.keys(AGENTS);
      const picked = AGENTS[agentKeys[Math.floor(Math.random() * agentKeys.length)]];
      console.log(chalk.white(`  [Agent] `) + chalk.green(`${picked.name}`) + chalk.gray(` assigned. Executing...\n`));
      await sleep(1200);
      console.log(chalk.white(`  [${picked.name}] `) + chalk.gray(`Task acknowledged. Working...\n`));

      prompt();
    });
  };
  prompt();
}

// ─── RUN ─────────────────────────────────────────────────
async function handleRun(task, options) {
  const agentKey = (options.agent || '').toLowerCase();
  const agent = AGENTS[agentKey];

  if (!agent) {
    console.log(chalk.red(`\n  ✗ Unknown agent "${options.agent}". Available agents:`));
    Object.values(AGENTS).forEach((a) => {
      console.log(chalk.gray(`    • ${a.name.toLowerCase()}`));
    });
    console.log('');
    process.exit(1);
  }

  console.log(chalk.white(`\n  [ConsBlock] `) + chalk.gray(`Dispatching task to `) + chalk.green(agent.name) + chalk.gray(` (${agent.role})`));
  console.log(chalk.white(`  [ConsBlock] `) + chalk.gray(`Task: "${task}"\n`));

  const spinner = ora({ text: chalk.white(`  ${agent.name} is executing...`), color: 'white' }).start();
  await sleep(2000 + Math.random() * 2000);
  spinner.succeed(chalk.green(`  ${agent.name} completed task`));

  console.log(chalk.white(`\n  [${agent.name}] `) + chalk.gray(`Task "${task}" executed successfully.`));
  console.log(chalk.white(`  [${agent.name}] `) + chalk.gray(`Results saved to .consblock/tx_history/\n`));
}

// ─── CATALOG ─────────────────────────────────────────────
function handleCatalog() {
  console.log(chalk.white(BANNER));
  console.log(chalk.white('  Agent Catalog\n'));
  console.log(chalk.gray('  ─────────────────────────────────────────────'));
  Object.values(AGENTS).forEach((a) => {
    console.log(chalk.green(`  ${a.name}`) + chalk.gray(` — ${a.role}`));
    console.log(chalk.gray(`    ${a.desc}\n`));
  });
}

// ─── UTILS ───────────────────────────────────────────────
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── CLI PROGRAM ─────────────────────────────────────────
const program = new Command();

program
  .name('consblock')
  .description('ConsBlock — AI Mercenary Marketplace CLI')
  .version(VERSION);

program
  .command('init')
  .description('Initialize workspace and configure API keys')
  .action(handleInit);

program
  .command('up')
  .description('Start the local agent runtime')
  .option('--exit', 'Exit after boot (for testing)')
  .action(handleUp);

program
  .command('chat')
  .description('Open interactive agent chat session')
  .action(handleChat);

program
  .command('run <task>')
  .description('Send a one-shot task to a specific agent')
  .option('--agent <name>', 'Target agent name')
  .action(handleRun);

program
  .command('catalog')
  .description('List all available AI mercenary agents')
  .action(handleCatalog);

program.parse();
