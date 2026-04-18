# Game Fullscreen + WASD Controls Implementation

## Status: 🚀 IN PROGRESS

### [x] 1. Planning & Approval ✅
- [x] Analyzed files & created comprehensive plan
- [x] User approved plan (WASD controls, /games/{id}/play routing)

### [ ] 2. Core Infrastructure (3 steps)
- [ ] Create `src/pages/GamePlayRoute.tsx` (fullscreen game page)
- [ ] Update `src/router.tsx` (add `/games/:gameId/play` route)  
- [ ] Update `src/components/GamePage.tsx` (Play button → fullscreen)

### [ ] 3. Game Control Updates (6 games)
- [ ] `src/games/2048/Game.tsx` → WASD
- [ ] `src/games/flappy-bird/Game.tsx` → WASD/Space
- [ ] `src/games/invadors/Game.tsx` → WASD
- [ ] `src/games/slimy/Game.tsx` → WASD
- [ ] `src/games/snake/Game.tsx` → WASD
- [ ] `src/games/tetris/Game.tsx` → WASD

### [ ] 4. Testing & Verification
- [ ] `npm run dev`
- [ ] Test `/games/slimy` → Play → `/games/slimy/play` fullscreen
- [ ] Verify WASD controls (Arrow keys free for browser)
- [ ] Test PageUp/Down scroll works during game
- [ ] Browser screenshots of all games fullscreen
- [ ] Update instructions text in games

### [ ] 5. Completion
- [ ] All checkboxes ✅
- [ ] attempt_completion

**Next step:** Create fullscreen GamePlayRoute.tsx
