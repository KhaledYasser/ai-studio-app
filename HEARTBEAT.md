# HEARTBEAT.md - OpenClaw Periodic Tasks

## SEO Monitoring Task

**What:** Daily SEO health checks for TechNexus platform
**When:** Once per day (24-hour interval via OpenClaw heartbeat)
**What to check:**
1. All 7 links responding (HTTP 200)
2. SSL certificate validity
3. HTTP→HTTPS redirects (301/308)
4. Overall SEO score calculation
5. Log results to `/tmp/seo-reports/`

**Script location:** `/tmp/seo-check.sh`

**How to run:**
```bash
/tmp/seo-check.sh
```

**Expected output:**
```
✅ Links checked: 7 working, 0 broken
✅ SSL: Valid (expires Oct 22 2026)
✅ Redirects: 301 working
✅ SEO Score: 85/100
```

**Log files:** `/tmp/seo-reports/seo-check-YYYY-MM-DD.log`

**Frequency:** Once per day (24-hour interval)

---

## How It Works

OpenClaw's heartbeat system will:
1. Run **once per day** (approximately every 24 hours)
2. Execute `/tmp/seo-check.sh`
3. Log results to SEO reports directory
4. Keep 7 days of logs
5. Alert on any failures

This replaces the cron job with OpenClaw's native task scheduling.
