# 🏛️ MemPalace Integration Plan for OpenClaw

**Status:** Planning Phase
**Date:** April 9, 2026
**Goal:** Integrate MemPalace as the primary memory system for TechNexus project

---

## 📋 **Current State Analysis**

### **Existing Memory System**
- ✅ AGENTS.md - Workspace rules and agent behavior
- ✅ SOUL.md - Agent personality and values
- ✅ USER.md - User context (Khaled)
- ✅ TOOLS.md - Tool documentation
- ✅ HEARTBEAT.md - Periodic task reminders
- ✅ memory/ directory structure exists (but no YYYY-MM-DD.md files found)
- ❌ MEMORY.md doesn't exist yet (long-term curated memory)

### **Issues with Current System**
1. **Limited persistence** - Session-based context only
2. **No semantic search** - Can't easily find past decisions
3. **No temporal tracking** - Doesn't track when decisions were made
4. **No knowledge graph** - Can't track relationships between facts
5. **Manual curation** - Requires explicit updates to MEMORY.md

---

## 🎯 **MemPalace Integration Strategy**

### **Phase 1: Core Setup (Day 1)**
**Tasks:**
1. Install MemPalace
2. Initialize palace structure
3. Create wings for TechNexus projects:
   - `wing_platform` - Main website (pom100.com)
   - `wing_games` - Game development (Invadors, 2048, etc.)
   - `wing_slimy` - Slimy Soccer game
   - `wing_infrastructure` - AWS, Nginx, deployment
   - `wing_khaled` - User context & preferences

4. Create standard rooms for each wing:
   - `hall_facts` - Decisions locked in
   - `hall_events` - Sessions, milestones
   - `hall_discoveries` - Breakthroughs, learnings
   - `hall_preferences` - Habits, opinions
   - `hall_advice` - Recommendations

5. Mine existing data:
   - Parse existing AGENTS.md, SOUL.md, USER.md
   - Extract decisions, preferences, facts
   - Populate knowledge graph

### **Phase 2: Data Migration (Days 2-3)**
**Tasks:**
1. Convert existing memory files to MemPalace format
2. Extract facts from session logs (memory/2026-04-08.md)
3. Build knowledge graph:
   - Games deployed (Invadors, 2048, Flappy, Snake, Tetris, Slimy)
   - Deployment infrastructure (AWS ALB, EC2, Route53)
   - Technical decisions (HTTPS, DNS, SSL certificates)
   - Team decisions (game colors, physics, design)

4. Create temporal entities:
   - Project timeline
   - Deployment history
   - Decision history

### **Phase 3: MCP Integration (Days 4-5)**
**Tasks:**
1. Set up MemPalace MCP server
2. Connect to Claude via MCP
3. Create memory hooks for auto-save:
   - Save after every major decision
   - Emergency save before context compression
4. Test memory recall in conversations

### **Phase 4: Automation (Days 6+)**
**Tasks:**
1. Create Claude hooks:
   - `mempal_save_hook.sh` - Auto-save every N messages
   - `mempal_precompact_hook.sh` - Emergency save
2. Train on AAAK dialect for compression
3. Set up agent-specific diaries:
   - `reviewer.json` - Code quality patterns
   - `architect.json` - Design decisions
   - `ops.json` - Deployment history

---

## 📊 **Memory Structure**

```
~/.mempalace/palace/
├── wings/
│   ├── wing_platform/
│   │   ├── hall_facts/
│   │   │   ├── decision-ssl-certificates.txt
│   │   │   ├── decision-alb-routing.txt
│   │   │   └── decision-dns-ttl.txt
│   │   ├── hall_events/
│   │   │   ├── deployment-2026-04-08.txt
│   │   │   ├── hero-redesign-2026-04-08.txt
│   │   │   └── articles-integration-2026-04-09.txt
│   │   └── hall_discoveries/
│   │       ├── gallery-cache-issue-solved.txt
│   │       └── game-routing-pattern.txt
│   ├── wing_games/
│   │   ├── hall_facts/
│   │   │   ├── decision-physics-no-gravity.txt
│   │   │   └── decision-2d-ai.txt
│   │   └── hall_events/
│   │       ├── slimy-development-2026-04-08.txt
│   │       └── game-pages-implementation-2026-04-09.txt
│   └── wing_khaled/
│       ├── hall_preferences/
│       │   ├── prefers-qwen3-for-cost.txt
│       │   ├── wants-color-tracking-for-agents.txt
│       │   └── values-fast-delivery.txt
│       └── hall_advice/
│           ├── test-before-assuming-working.txt
│           └── hard-refresh-for-browser-cache.txt
├── agents/
│   ├── reviewer.json
│   ├── architect.json
│   └── ops.json
└── knowledge_graph.db
```

---

## 🔗 **Key Facts to Extract & Store**

### **From SOUL.md:**
- Be genuinely helpful (not performative)
- Have opinions, don't be neutral
- Be resourceful before asking
- Earn trust through competence
- Remember you're a guest

→ Store in: `wing_khaled/hall_preferences/`

### **From USER.md:**
- User: Khaled Yasser (@Khaled_eladl)
- Timezone: UTC
- Focus: TechNexus platform, games, web development

→ Store in: `wing_khaled/hall_facts/`

### **From Recent Sessions:**
- **Slimy Soccer fixes:** Removed gravity, fixed 2D AI movement
- **Gallery updates:** Added game landing pages, routing
- **Articles:** Integrated 10 new tech articles (total 13)
- **Certificate issue:** ACM cert was missing slimy.pom100.com subdomain
- **Browser cache:** Hard refresh solves display issues

→ Store in: respective `wing_*` directories

---

## 🎯 **Implementation Tasks**

### **Week 1: Setup & Migration**
- [ ] Install MemPalace (`pip install mempalace`)
- [ ] Initialize palace structure (`mempalace init ~/.mempalace/palace`)
- [ ] Create wing configuration
- [ ] Mine existing AGENTS.md, SOUL.md, USER.md
- [ ] Build initial knowledge graph
- [ ] Set up MCP server integration

### **Week 2: Data Population**
- [ ] Extract all TechNexus decisions to MemPalace
- [ ] Convert memory/2026-04-08.md to MemPalace format
- [ ] Create temporal tracking for deployment history
- [ ] Build relationship graph (games → domains → AWS resources)
- [ ] Verify semantic search works

### **Week 3: Agent Integration**
- [ ] Set up 3 specialized agents:
  - Code reviewer agent (code patterns, bugs)
  - Architect agent (design decisions)
  - Ops agent (deployments, incidents)
- [ ] Create agent diary files
- [ ] Test agent memory persistence

### **Week 4: Automation & Optimization**
- [ ] Create Claude Code hooks
- [ ] Set up auto-save on message N
- [ ] Configure emergency save before compression
- [ ] Test full workflow: ask Claude → retrieve memory → answer
- [ ] Optimize AAAK compression

---

## 💾 **Data Migration Checklist**

**Platform Wing (wing_platform):**
- [ ] Hero section redesign decision
- [ ] App gallery implementation
- [ ] Article integration (13 articles)
- [ ] Stock photo integration
- [ ] SEO optimization strategy

**Games Wing (wing_games):**
- [ ] Game development timeline
- [ ] Physics engine decisions (gravity removal)
- [ ] AI difficulty settings
- [ ] Color schemes (Slimy reverse colors)
- [ ] Deployment locations

**Infrastructure Wing (wing_infrastructure):**
- [ ] AWS ALB setup
- [ ] Route53 DNS configuration
- [ ] ACM certificate strategy
- [ ] Nginx routing rules
- [ ] Deployment automation

**User Wing (wing_khaled):**
- [ ] Preferences (Qwen3 for cost, fast delivery)
- [ ] Decision criteria (quality vs speed)
- [ ] Values (resourcefulness, competence)
- [ ] Constraints (single EC2 t2.micro instance)

---

## 🔍 **Search Examples (Future)**

Once integrated, you'll be able to ask Claude:

```
"Why did we remove gravity from Slimy?"
→ MemPalace finds: decision-physics-no-gravity.txt
→ Returns: "User requested top-down table view (air hockey style)"

"What's the SSL certificate situation?"
→ Searches wing_infrastructure / hall_facts
→ Returns: "Updated to include slimy.pom100.com after initial deployment issue"

"How much have we spent on this project?"
→ Searches wing_khaled / hall_facts
→ Returns: "Single t2.micro instance, $0 subscription costs, focus on free tools"
```

---

## 📈 **Expected Benefits**

1. **Semantic memory search** - Find past decisions quickly
2. **Persistent knowledge** - No more "starting from scratch"
3. **Temporal tracking** - Know when decisions were made
4. **Relationship mapping** - Understand how decisions connect
5. **Agent specialization** - Different AI personas with memory
6. **Cost tracking** - $0/month vs $19-507/year for alternatives
7. **Fully local** - No cloud dependency, no data leakage

---

## ⚠️ **Considerations**

1. **Initial setup time** - 2-4 weeks to fully migrate
2. **Learning curve** - AAAK compression, wing structure
3. **Storage overhead** - Local SQLite + ChromaDB databases
4. **Manual tuning** - May need to adjust wing structure after use

---

## 🚀 **Next Steps**

1. **Approval:** Should we proceed with Phase 1?
2. **Timeline:** Start immediately or wait?
3. **Scope:** Just TechNexus project or broader OpenClaw memory?
4. **Integration:** Via MCP (Claude) or standalone CLI?

---

**Status:** Awaiting approval to proceed
**Estimated Time:** 2-4 weeks for full integration
**Effort Level:** Medium (primarily data migration)
**Priority:** High (enables better long-term project memory)
