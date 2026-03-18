import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { API_KEY, BASE_URL } from "./config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, "..", "cache");
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getCacheKey(url: string): string {
  return createHash("sha256").update(url).digest("hex");
}

function readCache(key: string): any | null {
  const file = join(CACHE_DIR, `${key}.json`);
  if (!existsSync(file)) return null;
  const stat = statSync(file);
  if (Date.now() - stat.mtimeMs > CACHE_TTL_MS) return null;
  try {
    return JSON.parse(readFileSync(file, "utf-8"));
  } catch {
    return null;
  }
}

function writeCache(key: string, data: any): void {
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(join(CACHE_DIR, `${key}.json`), JSON.stringify(data));
}

export async function apiGet(
  path: string,
  params: Record<string, string | number | undefined>
): Promise<any> {
  const url = new URL(`${BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const cacheKey = getCacheKey(url.toString());
  const cached = readCache(cacheKey);
  if (cached !== null) {
    process.stderr.write("(cached)\n");
    return cached;
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const body = await res.text();
    let errorMsg: string;
    try {
      const parsed = JSON.parse(body);
      errorMsg = parsed.error || parsed.message || body;
    } catch {
      errorMsg = body;
    }
    console.error(JSON.stringify({ ok: false, error: errorMsg, status: res.status }));
    process.exit(1);
  }

  const data = await res.json();
  writeCache(cacheKey, data);
  return data;
}

export function output(data: any) {
  console.log(JSON.stringify({ ok: true, data }));
}
