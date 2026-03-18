# ahrefs-cli

CLI for the Ahrefs API v3 — pull SEO data from the command line: domain ratings, backlinks, organic keywords, SERP analysis, and keyword research.

## Prerequisites

- Node.js 18+
- [Ahrefs API key](https://app.ahrefs.com/user/api) (requires paid plan with API access)

## Setup

```bash
cd ~/tools/ahrefs-cli
npm install
cp .env.example .env     # Add your AHREFS_API_KEY
npm run build
npm link
```

## Configuration

Create a `.env` file:

```env
AHREFS_API_KEY=your-api-key-here
```

## Commands

### Site Explorer — Overview

```bash
# Domain Rating (DR) and Ahrefs Rank
ahrefs-cli domain-rating ahrefs.com
ahrefs-cli domain-rating ahrefs.com --date 2024-01-01

# Backlinks summary (total backlinks, referring domains, etc.)
ahrefs-cli backlinks-stats gen.co

# Organic traffic metrics
ahrefs-cli metrics gen.co --country us
```

### Site Explorer — Backlinks

```bash
# List backlinks
ahrefs-cli backlinks gen.co --limit 50
ahrefs-cli backlinks gen.co --mode exact --aggregation 1_per_domain

# Referring domains
ahrefs-cli referring-domains gen.co --limit 100 --order-by domain_rating:desc

# Anchor text
ahrefs-cli anchors gen.co --limit 30
```

### Site Explorer — Organic Search

```bash
# Keywords a domain ranks for
ahrefs-cli organic-keywords gen.co --country us --limit 50

# Top pages by traffic
ahrefs-cli top-pages gen.co --country us

# Organic competitors
ahrefs-cli organic-competitors gen.co --country us
```

### Keywords Explorer

```bash
# Get metrics for specific keywords
ahrefs-cli keyword-overview "saas,micro saas" --country us

# Find matching keyword ideas
ahrefs-cli matching-terms "email automation" --limit 50

# Related keywords
ahrefs-cli related-terms "crm software" --country us --limit 30

# Search suggestions (autocomplete)
ahrefs-cli search-suggestions "best crm" --limit 20

# Search volume history
ahrefs-cli volume-history "saas,micro saas"
```

### SERP Overview

```bash
# See what ranks for a keyword
ahrefs-cli serp-overview "best crm software" --country us --top-positions 10
```

## Common Options

| Option | Description | Default |
|--------|-------------|---------|
| `--limit <n>` | Number of results | varies |
| `--country <code>` | ISO 3166-1 alpha-2 country code | `us` |
| `--mode <mode>` | Target scope: `exact`, `prefix`, `domain`, `subdomains` | `subdomains` |
| `--order-by <f:d>` | Sort by field and direction | varies |
| `--where <json>` | Ahrefs filter expression | — |
| `--select <fields>` | Comma-separated columns to return | sensible defaults |
| `--protocol <p>` | `both`, `http`, `https` | `both` |

## Output Format

All commands output JSON to stdout:

```json
{"ok": true, "data": { ... }}
```

Errors output to stderr and exit with code 1:

```json
{"ok": false, "error": "message", "status": 401}
```

## API Units

Ahrefs API requests consume units (minimum 50 per request). Cost scales with the number of rows returned and fields selected. Use `--limit` and `--select` to control costs.

## How It Works

Direct HTTP wrapper around the [Ahrefs API v3](https://docs.ahrefs.com/docs/api/reference/introduction). All endpoints use GET requests with Bearer token auth. The CLI maps subcommands to API paths and passes options as query parameters.
