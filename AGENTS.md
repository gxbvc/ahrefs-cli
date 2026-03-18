# ahrefs-cli

CLI for Ahrefs API v3 — SEO data: backlinks, keywords, rankings, domain metrics.

## Commands

```bash
# Site Explorer: Overview
ahrefs-cli domain-rating <target>                  # Domain Rating + Ahrefs Rank
ahrefs-cli backlinks-stats <target>                # Backlinks summary stats
ahrefs-cli metrics <target>                        # Organic traffic metrics

# Site Explorer: Backlinks
ahrefs-cli backlinks <target>                      # List backlinks
ahrefs-cli referring-domains <target>              # List referring domains
ahrefs-cli anchors <target>                        # Anchor text distribution

# Site Explorer: Organic Search
ahrefs-cli organic-keywords <target>               # Keywords a domain ranks for
ahrefs-cli top-pages <target>                      # Top pages by traffic
ahrefs-cli organic-competitors <target>            # Competing domains
ahrefs-cli pages-by-traffic <target>               # Traffic distribution summary

# Keywords Explorer
ahrefs-cli keyword-overview <keywords>             # Metrics for keyword(s) (comma-separated)
ahrefs-cli matching-terms <keywords>               # Keyword ideas (matching)
ahrefs-cli related-terms <keywords>                # Keyword ideas (related)
ahrefs-cli search-suggestions <keywords>           # Autocomplete suggestions
ahrefs-cli volume-history <keyword>                # Historical search volume (single keyword)

# SERP Overview
ahrefs-cli serp-overview <keyword>                 # SERP results for a keyword
```

## Common Options

```bash
--limit <n>              # Number of results (default varies)
--country <code>         # Two-letter country code (default: us)
--mode <mode>            # Scope: exact, prefix, domain, subdomains
--order-by <field:dir>   # Sort: field_name:desc or field_name:asc
--where <json>           # Filter expression (Ahrefs filter syntax)
--select <fields>        # Comma-separated fields to return
--protocol <p>           # both, http, https
--date <YYYY-MM-DD>      # Date for report (defaults to today)
```

## Examples

```bash
ahrefs-cli domain-rating ahrefs.com
ahrefs-cli backlinks gen.co --limit 10 --mode domain
ahrefs-cli referring-domains fileinbox.com --limit 50
ahrefs-cli organic-keywords gen.co --country us --limit 30
ahrefs-cli top-pages gen.co --country us
ahrefs-cli keyword-overview "saas,micro saas"
ahrefs-cli matching-terms "email automation" --limit 50
ahrefs-cli volume-history "saas" --date-from 2024-01-01 --date-to 2025-01-01
ahrefs-cli serp-overview "best crm software" --country us --top-positions 10
```

Requires `.env` with `AHREFS_API_KEY`. See `.env.example`.

Note: API requests consume units (min 50/request). Cost scales with rows × fields.
