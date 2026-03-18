import { Command } from "commander";
import "./config.js";
import { apiGet, output } from "./api.js";

const program = new Command();

program
  .name("ahrefs-cli")
  .description("CLI for the Ahrefs API v3 — SEO data: backlinks, keywords, rankings, domain metrics")
  .version("1.0.0");

// ── Site Explorer: Overview ──

program
  .command("domain-rating")
  .description("Get Domain Rating (DR) and Ahrefs Rank for a domain")
  .argument("<target>", "Domain or URL to analyze")
  .option("--date <date>", "Date in YYYY-MM-DD format", new Date().toISOString().slice(0, 10))
  .option("--protocol <protocol>", "Protocol: both, http, https", "both")
  .action(async (target, opts) => {
    const data = await apiGet("/site-explorer/domain-rating", {
      target,
      date: opts.date,
      protocol: opts.protocol,
    });
    output(data);
  });

program
  .command("backlinks-stats")
  .description("Get backlinks summary stats for a target")
  .argument("<target>", "Domain or URL")
  .option("--date <date>", "Date in YYYY-MM-DD format", new Date().toISOString().slice(0, 10))
  .option("--mode <mode>", "Scope: exact, prefix, domain, subdomains", "subdomains")
  .option("--protocol <protocol>", "Protocol: both, http, https", "both")
  .action(async (target, opts) => {
    const data = await apiGet("/site-explorer/backlinks-stats", {
      target,
      date: opts.date,
      mode: opts.mode,
      protocol: opts.protocol,
    });
    output(data);
  });

program
  .command("metrics")
  .description("Get organic traffic metrics for a target")
  .argument("<target>", "Domain or URL")
  .option("--date <date>", "Date in YYYY-MM-DD format", new Date().toISOString().slice(0, 10))
  .option("--mode <mode>", "Scope: exact, prefix, domain, subdomains", "subdomains")
  .option("--protocol <protocol>", "Protocol: both, http, https", "both")
  .option("--country <country>", "Two-letter country code (default: all countries)")
  .action(async (target, opts) => {
    const data = await apiGet("/site-explorer/metrics", {
      target,
      date: opts.date,
      mode: opts.mode,
      protocol: opts.protocol,
      country: opts.country,
    });
    output(data);
  });

// ── Site Explorer: Backlinks Profile ──

program
  .command("backlinks")
  .description("Get backlinks pointing to a target")
  .argument("<target>", "Domain or URL")
  .option("--select <fields>", "Comma-separated fields to return", "url_from,url_to,anchor,domain_rating_source,first_seen,last_seen")
  .option("--limit <n>", "Number of results", "20")
  .option("--mode <mode>", "Scope: exact, prefix, domain, subdomains", "subdomains")
  .option("--order-by <field>", "Order by field:direction", "domain_rating_source:desc")
  .option("--where <filter>", "Filter expression (JSON)")
  .option("--history <history>", "Time frame: live, since:YYYY-MM-DD, all_time", "all_time")
  .option("--aggregation <agg>", "Grouping: similar_links, 1_per_domain, all", "similar_links")
  .option("--protocol <protocol>", "Protocol: both, http, https", "both")
  .action(async (target, opts) => {
    const data = await apiGet("/site-explorer/all-backlinks", {
      target,
      select: opts.select,
      limit: opts.limit,
      mode: opts.mode,
      order_by: opts.orderBy,
      where: opts.where,
      history: opts.history,
      aggregation: opts.aggregation,
      protocol: opts.protocol,
    });
    output(data);
  });

program
  .command("referring-domains")
  .description("Get referring domains for a target")
  .argument("<target>", "Domain or URL")
  .option("--select <fields>", "Comma-separated fields to return", "domain,domain_rating,links_to_target,dofollow_links,first_seen,last_seen")
  .option("--limit <n>", "Number of results", "20")
  .option("--mode <mode>", "Scope: exact, prefix, domain, subdomains", "subdomains")
  .option("--order-by <field>", "Order by field:direction", "domain_rating:desc")
  .option("--where <filter>", "Filter expression (JSON)")
  .option("--history <history>", "Time frame: live, since:YYYY-MM-DD, all_time", "all_time")
  .option("--protocol <protocol>", "Protocol: both, http, https", "both")
  .action(async (target, opts) => {
    const data = await apiGet("/site-explorer/refdomains", {
      target,
      select: opts.select,
      limit: opts.limit,
      mode: opts.mode,
      order_by: opts.orderBy,
      where: opts.where,
      history: opts.history,
      protocol: opts.protocol,
    });
    output(data);
  });

program
  .command("anchors")
  .description("Get anchor text distribution for a target")
  .argument("<target>", "Domain or URL")
  .option("--select <fields>", "Comma-separated fields to return", "anchor,refdomains,refpages,links_to_target,first_seen,last_seen")
  .option("--limit <n>", "Number of results", "20")
  .option("--mode <mode>", "Scope: exact, prefix, domain, subdomains", "subdomains")
  .option("--order-by <field>", "Order by field:direction", "refdomains:desc")
  .option("--where <filter>", "Filter expression (JSON)")
  .option("--history <history>", "Time frame: live, since:YYYY-MM-DD, all_time", "all_time")
  .option("--protocol <protocol>", "Protocol: both, http, https", "both")
  .action(async (target, opts) => {
    const data = await apiGet("/site-explorer/anchors", {
      target,
      select: opts.select,
      limit: opts.limit,
      mode: opts.mode,
      order_by: opts.orderBy,
      where: opts.where,
      history: opts.history,
      protocol: opts.protocol,
    });
    output(data);
  });

// ── Site Explorer: Organic Search ──

program
  .command("organic-keywords")
  .description("Get organic keywords a target ranks for")
  .argument("<target>", "Domain or URL")
  .option("--select <fields>", "Comma-separated fields to return", "keyword,best_position,volume,sum_traffic,best_position_url,keyword_difficulty")
  .option("--limit <n>", "Number of results", "20")
  .option("--mode <mode>", "Scope: exact, prefix, domain, subdomains", "subdomains")
  .option("--country <country>", "Two-letter country code", "us")
  .option("--date <date>", "Date in YYYY-MM-DD format", new Date().toISOString().slice(0, 10))
  .option("--order-by <field>", "Order by field:direction", "sum_traffic:desc")
  .option("--where <filter>", "Filter expression (JSON)")
  .option("--protocol <protocol>", "Protocol: both, http, https", "both")
  .action(async (target, opts) => {
    const data = await apiGet("/site-explorer/organic-keywords", {
      target,
      select: opts.select,
      limit: opts.limit,
      mode: opts.mode,
      country: opts.country,
      date: opts.date,
      order_by: opts.orderBy,
      where: opts.where,
      protocol: opts.protocol,
    });
    output(data);
  });

program
  .command("top-pages")
  .description("Get top pages by organic traffic for a target")
  .argument("<target>", "Domain or URL")
  .option("--select <fields>", "Comma-separated fields to return", "url,sum_traffic,keywords,top_keyword,top_keyword_volume,top_keyword_best_position")
  .option("--limit <n>", "Number of results", "20")
  .option("--mode <mode>", "Scope: exact, prefix, domain, subdomains", "subdomains")
  .option("--country <country>", "Two-letter country code", "us")
  .option("--date <date>", "Date in YYYY-MM-DD format", new Date().toISOString().slice(0, 10))
  .option("--order-by <field>", "Order by field:direction", "sum_traffic:desc")
  .option("--where <filter>", "Filter expression (JSON)")
  .option("--protocol <protocol>", "Protocol: both, http, https", "both")
  .action(async (target, opts) => {
    const data = await apiGet("/site-explorer/top-pages", {
      target,
      select: opts.select,
      limit: opts.limit,
      mode: opts.mode,
      country: opts.country,
      date: opts.date,
      order_by: opts.orderBy,
      where: opts.where,
      protocol: opts.protocol,
    });
    output(data);
  });

program
  .command("organic-competitors")
  .description("Get organic competitors for a target")
  .argument("<target>", "Domain or URL")
  .option("--select <fields>", "Comma-separated fields to return", "competitor_domain,keywords_common,keywords_target,keywords_competitor,traffic,domain_rating")
  .option("--limit <n>", "Number of results", "20")
  .option("--mode <mode>", "Scope: exact, prefix, domain, subdomains", "subdomains")
  .option("--country <country>", "Two-letter country code", "us")
  .option("--date <date>", "Date in YYYY-MM-DD format", new Date().toISOString().slice(0, 10))
  .option("--order-by <field>", "Order by field:direction")
  .option("--where <filter>", "Filter expression (JSON)")
  .option("--protocol <protocol>", "Protocol: both, http, https", "both")
  .action(async (target, opts) => {
    const data = await apiGet("/site-explorer/organic-competitors", {
      target,
      select: opts.select,
      limit: opts.limit,
      mode: opts.mode,
      country: opts.country,
      date: opts.date,
      order_by: opts.orderBy,
      where: opts.where,
      protocol: opts.protocol,
    });
    output(data);
  });

// ── Site Explorer: Pages ──

program
  .command("pages-by-traffic")
  .description("Get pages-by-traffic distribution summary (bucket counts)")
  .argument("<target>", "Domain or URL")
  .option("--date <date>", "Date in YYYY-MM-DD format", new Date().toISOString().slice(0, 10))
  .option("--mode <mode>", "Scope: exact, prefix, domain, subdomains", "subdomains")
  .option("--country <country>", "Two-letter country code", "us")
  .option("--protocol <protocol>", "Protocol: both, http, https", "both")
  .action(async (target, opts) => {
    const data = await apiGet("/site-explorer/pages-by-traffic", {
      target,
      date: opts.date,
      mode: opts.mode,
      country: opts.country,
      protocol: opts.protocol,
    });
    output(data);
  });

// ── Keywords Explorer ──

program
  .command("keyword-overview")
  .description("Get keyword metrics (volume, difficulty, CPC, etc.)")
  .argument("<keywords>", "Comma-separated list of keywords")
  .option("--select <fields>", "Comma-separated fields to return", "keyword,volume,difficulty,cpc,clicks,traffic_potential,global_volume,parent_topic,parent_volume")
  .option("--country <country>", "Two-letter country code", "us")
  .option("--limit <n>", "Number of results", "1000")
  .action(async (keywords, opts) => {
    const data = await apiGet("/keywords-explorer/overview", {
      keywords,
      select: opts.select,
      country: opts.country,
      limit: opts.limit,
    });
    output(data);
  });

program
  .command("matching-terms")
  .description("Get keyword ideas matching a seed keyword")
  .argument("<keywords>", "Comma-separated seed keywords")
  .option("--select <fields>", "Comma-separated fields to return", "keyword,volume,difficulty,cpc,traffic_potential,global_volume")
  .option("--country <country>", "Two-letter country code", "us")
  .option("--limit <n>", "Number of results", "20")
  .option("--order-by <field>", "Order by field:direction", "volume:desc")
  .option("--where <filter>", "Filter expression (JSON)")
  .action(async (keywords, opts) => {
    const data = await apiGet("/keywords-explorer/matching-terms", {
      keywords,
      select: opts.select,
      country: opts.country,
      limit: opts.limit,
      order_by: opts.orderBy,
      where: opts.where,
    });
    output(data);
  });

program
  .command("related-terms")
  .description("Get related keyword ideas")
  .argument("<keywords>", "Comma-separated seed keywords")
  .option("--select <fields>", "Comma-separated fields to return", "keyword,volume,difficulty,cpc,traffic_potential,global_volume")
  .option("--country <country>", "Two-letter country code", "us")
  .option("--limit <n>", "Number of results", "20")
  .option("--order-by <field>", "Order by field:direction", "volume:desc")
  .option("--where <filter>", "Filter expression (JSON)")
  .action(async (keywords, opts) => {
    const data = await apiGet("/keywords-explorer/related-terms", {
      keywords,
      select: opts.select,
      country: opts.country,
      limit: opts.limit,
      order_by: opts.orderBy,
      where: opts.where,
    });
    output(data);
  });

program
  .command("search-suggestions")
  .description("Get search suggestion keyword ideas")
  .argument("<keywords>", "Comma-separated seed keywords")
  .option("--select <fields>", "Comma-separated fields to return", "keyword,volume,difficulty,cpc,traffic_potential,global_volume")
  .option("--country <country>", "Two-letter country code", "us")
  .option("--limit <n>", "Number of results", "20")
  .option("--order-by <field>", "Order by field:direction", "volume:desc")
  .option("--where <filter>", "Filter expression (JSON)")
  .action(async (keywords, opts) => {
    const data = await apiGet("/keywords-explorer/search-suggestions", {
      keywords,
      select: opts.select,
      country: opts.country,
      limit: opts.limit,
      order_by: opts.orderBy,
      where: opts.where,
    });
    output(data);
  });

program
  .command("volume-history")
  .description("Get search volume history for a keyword")
  .argument("<keyword>", "Keyword to get history for")
  .option("--country <country>", "Two-letter country code", "us")
  .option("--date-from <date>", "Start date in YYYY-MM-DD format")
  .option("--date-to <date>", "End date in YYYY-MM-DD format")
  .action(async (keyword, opts) => {
    const data = await apiGet("/keywords-explorer/volume-history", {
      keyword,
      country: opts.country,
      date_from: opts.dateFrom,
      date_to: opts.dateTo,
    });
    output(data);
  });

// ── SERP Overview ──

program
  .command("serp-overview")
  .description("Get SERP results for a keyword")
  .argument("<keyword>", "Keyword to get SERP for")
  .option("--select <fields>", "Comma-separated fields to return", "position,url,title,domain_rating,url_rating,traffic,keywords,backlinks,refdomains,top_keyword")
  .option("--country <country>", "Two-letter country code", "us")
  .option("--top-positions <n>", "Number of top positions to return")
  .option("--date <date>", "Date in YYYY-MM-DDThh:mm:ss format")
  .action(async (keyword, opts) => {
    const data = await apiGet("/serp-overview/serp-overview", {
      keyword,
      select: opts.select,
      country: opts.country,
      top_positions: opts.topPositions,
      date: opts.date,
    });
    output(data);
  });

program.parseAsync().catch((err) => {
  console.error(JSON.stringify({ ok: false, error: err.message }));
  process.exit(1);
});
