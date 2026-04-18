import { GamePageProps } from '../types';

export const GAMES: Record<string, GamePageProps> = {
  invadors: {
    id: 'invadors',
    name: 'Invadors',
    tagline: 'Classic Space Invaders - Defend Earth from Alien Invasion',
    description: 'Defend Earth from waves of alien invaders in this classic arcade shooter. Move your cannon, shoot down the enemy fleet, and survive as the difficulty increases with each wave.',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1538481143235-e7ad196bcc86?w=1200&h=800&fit=crop',
      alt: 'Neon retro arcade space invaders game with glowing neon lights and digital aesthetic'
    },
    gameLink: '/games/invadors',
    sourceCodeLink: 'https://github.com/yourusername/invadors-game',
    features: [
      {
        title: 'Controls',
        description: 'Simple but responsive controls',
        items: ['Arrow Keys: Move left/right', 'Spacebar: Shoot', 'ESC: Pause game', 'Touch controls on mobile']
      },
      {
        title: 'Difficulty Levels',
        description: 'Progressive challenge system',
        items: ['Easy: Slower aliens, forgiving spacing', 'Medium: Standard arcade difficulty', 'Hard: Lightning-fast descents', 'Waves increase dynamically']
      },
      {
        title: 'Scoring System',
        description: 'Track your performance',
        items: ['100 pts: Regular aliens', '250 pts: Rare golden invaders', 'Combo multipliers for rapid shots', 'Leaderboard tracking']
      },
      {
        title: 'Special Mechanics',
        description: 'Unique gameplay features',
        items: ['Shield power-ups for protection', 'Rapid-fire boost for limited time', 'Bonus rounds with extra rewards', 'Lives system with continues']
      }
    ],
    howToPlay: {
      steps: [
        {
          title: 'Position Your Cannon',
          description: 'Use arrow keys to move your laser cannon left and right at the bottom of the screen. Your goal is to position it directly under incoming aliens.'
        },
        {
          title: 'Fire at Waves',
          description: 'Press spacebar to shoot. Destroy all aliens before they reach the bottom. Each destroyed alien moves you closer to victory.'
        },
        {
          title: 'Survive & Progress',
          description: 'With each wave, remaining aliens speed up. Adapt your strategy - anticipate their movement patterns and time your shots carefully.'
        },
        {
          title: 'Reach High Scores',
          description: 'Eliminate all invaders to advance to the next level. Collect power-ups when available to gain tactical advantages.'
        }
      ]
    },
    tips: [
      'Stay centered on screen and move only when necessary - quick, decisive movements are better than constant repositioning',
      'Anticipate alien movement patterns - predict where they\'ll be, not where they are',
      'Collect power-ups immediately - shield protection can be the difference between victory and defeat',
      'Practice rhythm - shoot in patterns rather than randomly for better control',
      'Keep some distance from screen edges to maintain maneuverability in both directions'
    ],
    specs: [
      { label: 'Players', value: 'Single Player' },
      { label: 'Controls', value: 'Arrow Keys + Spacebar / Touch' },
      { label: 'Difficulty', value: 'Easy / Medium / Hard' },
      { label: 'Performance', value: '60 FPS' },
      { label: 'Compatibility', value: 'All Modern Browsers' }
    ],
    shareUrls: [
      { icon: '🐦', label: 'Share on Twitter', url: 'https://twitter.com/intent/tweet?text=Just%20played%20Invadors%20-%20an%20awesome%20space%20arcade%20game!&url=https://invadors.pom100.com' },
      { icon: '📘', label: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=https://invadors.pom100.com' },
      { icon: '🔗', label: 'Copy Link', url: '#copy-link' }
    ],
    seo: {
      title: 'Invadors - Classic Space Invaders Arcade Game',
      description: 'Play Invadors, a modern take on the classic Space Invaders arcade game. Defend Earth from alien invasion with retro neon aesthetics and addictive gameplay.',
      keywords: ['space invaders', 'arcade game', 'retro gaming', 'online game', 'classic arcade']
    }
  },

  '2048': {
    id: '2048',
    name: '2048',
    tagline: 'Combine Tiles to Reach 2048 - The Ultimate Puzzle Challenge',
    description: `2048 is an engaging mathematical puzzle game where you combine numbered tiles to reach the elusive 2048 tile. Swipe tiles in any direction to merge matching numbers, creating increasingly larger values. Each move adds a new random tile (2 or 4) to the grid, requiring strategic planning and foresight. With its simple rules but deep strategy, 2048 has captivated millions worldwide. The game challenges your planning abilities and mathematical intuition as you navigate the ever-growing grid. Perfect for casual gamers and puzzle enthusiasts alike, each playthrough offers a unique combination of luck and skill.`,
    heroImage: {
      url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&h=800&fit=crop',
      alt: 'Abstract colorful numbered tiles and geometric shapes representing number puzzle game'
    },
    gameLink: '/games/2048',
    sourceCodeLink: 'https://github.com/yourusername/2048-game',
    features: [
      {
        title: 'Controls',
        description: 'Intuitive swipe mechanics',
        items: ['Arrow Keys: Move tiles', 'Swipe: Mobile controls', 'Undo last move: Available', 'Auto-save: Never lose progress']
      },
      {
        title: 'Difficulty Levels',
        description: 'Choose your challenge',
        items: ['Casual: Relaxed pace', 'Standard: Classic 4x4 grid', 'Hard: 5x5 grid', 'Extreme: Speed challenges']
      },
      {
        title: 'Scoring System',
        description: 'Track your achievement',
        items: ['Points: Every merge action', 'High Score: Personal best tracking', 'Statistics: Move count & game time', 'Achievements: Unlock badges']
      },
      {
        title: 'Special Mechanics',
        description: 'Strategic gameplay elements',
        items: ['Grid sizes: 3x3 to 6x6 variants', 'Tile animations: Smooth merging', 'Hint system: Strategic suggestions', 'Daily challenges: Limited time modes']
      }
    ],
    howToPlay: {
      steps: [
        {
          title: 'Understand the Grid',
          description: 'Start with a 4x4 grid containing two random tiles (either 2 or 4). Your goal is to combine tiles to create a tile with the value 2048.'
        },
        {
          title: 'Make Your First Move',
          description: 'Press arrow keys (or swipe on mobile) in any direction. All tiles slide in that direction, and tiles with the same number merge into one with their combined value.'
        },
        {
          title: 'Build Strategy',
          description: 'After each move, a new tile appears randomly. Plan ahead - try to keep larger tiles in corners and build sequences systematically.'
        },
        {
          title: 'Reach 2048',
          description: 'Continue merging tiles strategically. You win when you create your first 2048 tile. Continue playing for higher scores!'
        }
      ]
    },
    tips: [
      'Keep the largest tile in a corner - this prevents it from getting trapped and gives you flexibility',
      'Create "chains" of incrementally larger tiles moving toward your corner strategy',
      'Don\'t let the grid fill completely - always maintain space for new tiles to appear',
      'Plan 2-3 moves ahead instead of reacting to each new tile',
      'Focus on one area first - complete merges in sections rather than scattered across the grid'
    ],
    specs: [
      { label: 'Players', value: 'Single Player' },
      { label: 'Controls', value: 'Arrow Keys / Swipe' },
      { label: 'Difficulty', value: 'Casual / Standard / Hard / Extreme' },
      { label: 'Performance', value: '60 FPS' },
      { label: 'Compatibility', value: 'All Modern Browsers' }
    ],
    shareUrls: [
      { icon: '🐦', label: 'Share on Twitter', url: 'https://twitter.com/intent/tweet?text=I%20just%20scored%20%5Bscore%5D%20on%202048!%20Can%20you%20beat%20my%20score?&url=https://2048.pom100.com' },
      { icon: '📘', label: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=https://2048.pom100.com' },
      { icon: '🔗', label: 'Copy Link', url: '#copy-link' }
    ],
    seo: {
      title: '2048 - The Ultimate Puzzle Game',
      description: 'Play 2048 online. Combine numbered tiles to reach 2048 in this addictive puzzle game. Challenge yourself with multiple difficulty levels.',
      keywords: ['2048 game', 'puzzle game', 'tile game', 'brain game', 'number puzzle']
    }
  },

  'flappy-bird': {
    id: 'flappy-bird',
    name: 'Flappy Bird',
    tagline: 'Navigate Through Pipes - One Tap Arcade Action',
    description: `Flappy Bird is a deceptively simple yet incredibly addictive arcade game that will test your reflexes and precision. Control a small bird and tap to make it flap its wings, navigating through endless pairs of scrolling pipes. Time your flaps perfectly to avoid obstacles and set new high scores. With its minimalist design and challenging gameplay, Flappy Bird has become a phenomenon. The game's difficulty curve is perfectly balanced - easy to pick up, but mastering it requires dedication and practice. Each playthrough is unique, offering endless entertainment and the constant drive to "beat your score."`,
    heroImage: {
      url: 'https://images.unsplash.com/photo-1444464666175-1469f8c6dea0?w=1200&h=800&fit=crop',
      alt: 'Bird in flight against bright blue sky with motion and dynamic energy'
    },
    gameLink: '/games/flappy-bird',
    gameComponent: 'flappy-bird',
    sourceCodeLink: 'https://github.com/yourusername/flappy-bird-game',
    features: [
      {
        title: 'Controls',
        description: 'Single button simplicity',
        items: ['Click: Make bird flap', 'Tap: Mobile flap', 'Space: Alternative flap', 'ESC: Pause/Menu']
      },
      {
        title: 'Difficulty Levels',
        description: 'Progressive challenge',
        items: ['Easy: Larger pipe gaps', 'Medium: Standard gaps', 'Hard: Tight gaps', 'Nightmare: Extreme difficulty']
      },
      {
        title: 'Scoring System',
        description: 'Simple but rewarding',
        items: ['1 Point: Per pipe cleared', 'Combo Points: Rapid clears', 'Bonus: Perfect gaps', 'Leaderboards: Global ranking']
      },
      {
        title: 'Special Mechanics',
        description: 'Engaging gameplay features',
        items: ['Gravity physics: Realistic bird movement', 'Procedural pipes: Never-ending variation', 'Power-ups: Shield & slow-motion', 'Night mode: Themed variations']
      }
    ],
    howToPlay: {
      steps: [
        {
          title: 'Tap to Flap',
          description: 'The bird falls due to gravity. Click (or tap on mobile) to make the bird flap its wings and rise. Each flap provides a burst of upward momentum.'
        },
        {
          title: 'Navigate Pipes',
          description: 'Pipes scroll toward you from the right. Find the gap between each pair and fly through without hitting them. The gap is randomly positioned.'
        },
        {
          title: 'Maintain Balance',
          description: 'Balance your flaps to maintain the right altitude. Flap too much and you hit the top; flap too little and you hit the bottom or the ground.'
        },
        {
          title: 'Score Points',
          description: 'Successfully pass through each pipe pair to gain a point. Continue as long as possible to set your high score!'
        }
      ]
    },
    tips: [
      'Develop a rhythm - consistent timing is better than erratic flapping',
      'Aim for the center of each gap for maximum safety margin',
      'Anticipate pipe placement - start adjusting height slightly before you reach each pipe',
      'Stay calm - panicked flapping usually leads to crashes. One deliberate tap is often enough',
      'Practice the early game to build muscle memory - the first 5 pipes are crucial for momentum'
    ],
    specs: [
      { label: 'Players', value: 'Single Player' },
      { label: 'Controls', value: 'Click / Tap / Spacebar' },
      { label: 'Difficulty', value: 'Easy / Medium / Hard / Nightmare' },
      { label: 'Performance', value: '60 FPS' },
      { label: 'Compatibility', value: 'All Modern Browsers' }
    ],
    shareUrls: [
      { icon: '🐦', label: 'Share on Twitter', url: 'https://twitter.com/intent/tweet?text=I%20scored%20%5Bscore%5D%20points%20on%20Flappy%20Bird!%20%F0%9F%90%A6%20Can%20you%20beat%20me?&url=https://flappy.pom100.com' },
      { icon: '📘', label: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=https://flappy.pom100.com' },
      { icon: '🔗', label: 'Copy Link', url: '#copy-link' }
    ],
    seo: {
      title: 'Flappy Bird - Classic Arcade Game Online',
      description: 'Play Flappy Bird online. A simple yet addictive arcade game where you navigate a bird through pipes. Test your reflexes and beat your high score.',
      keywords: ['flappy bird', 'arcade game', 'bird game', 'casual game', 'mobile game']
    }
  },

  'snake': {
    id: 'snake',
    name: 'Snake',
    tagline: 'The Timeless Classic - Eat Food, Grow, Avoid Yourself',
    description: `Snake is one of the most iconic and beloved games of all time. Control a continuously moving snake across a grid-based board, eating food to grow longer while avoiding walls and your own tail. The longer you grow, the higher your score, but also the more challenging it becomes to maneuver. This classic game combines strategic planning with quick reflexes. The retro green phosphor aesthetic brings back nostalgic memories of classic arcade cabinets and early mobile phones. Despite its simplicity, Snake remains endlessly entertaining, with players constantly chasing better scores and survival records.`,
    heroImage: {
      url: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=800&fit=crop',
      alt: 'Green neon grid pattern with retro arcade gaming aesthetic and digital display'
    },
    gameLink: '/games/snake',
    sourceCodeLink: 'https://github.com/yourusername/snake-game',
    features: [
      {
        title: 'Controls',
        description: 'Classic directional controls',
        items: ['Arrow Keys: Change direction', 'WASD: Alternative controls', 'Touch: Mobile swipe controls', 'ESC: Pause/Menu']
      },
      {
        title: 'Difficulty Levels',
        description: 'Adjustable challenge',
        items: ['Casual: Slow speed, forgiving', 'Normal: Classic Snake speed', 'Hard: Fast movement', 'Expert: Lightning-fast gameplay']
      },
      {
        title: 'Scoring System',
        description: 'Growth-based progression',
        items: ['10 pts: Each food item', 'Speed bonus: Faster completion', 'Survival bonus: Long games', 'Achievements: Special milestones']
      },
      {
        title: 'Special Mechanics',
        description: 'Retro gaming features',
        items: ['Wall wrapping: Exit one side, enter opposite', 'Food variety: Different food types', 'Speed increases: Progressive difficulty', 'Grid visualization: Clear play area']
      }
    ],
    howToPlay: {
      steps: [
        {
          title: 'Start Moving',
          description: 'Your snake starts with 3 segments and moves continuously in one direction. Use arrow keys to change direction (up, down, left, right).'
        },
        {
          title: 'Eat Food',
          description: 'Red squares appear randomly on the grid. Move your snake\'s head to the food to eat it. Your snake grows by one segment each time you eat.'
        },
        {
          title: 'Grow Longer',
          description: 'As you eat more food, your snake grows longer, making navigation increasingly difficult. Plan your moves to avoid collisions.'
        },
        {
          title: 'Stay Alive',
          description: 'Avoid hitting walls (or wrapping too much) and never hit your own tail. The longer you survive, the higher your score!'
        }
      ]
    },
    tips: [
      'Keep the snake\'s tail visible - always maintain awareness of your entire body position',
      'Plan ahead - think about where you\'re going multiple moves in advance',
      'Use borders strategically - trace walls in patterns to maximize available space',
      'Create loops - efficient snakes use circular or spiral patterns to control movement',
      'Start slowly - focus on smooth directional changes rather than rapid movements'
    ],
    specs: [
      { label: 'Players', value: 'Single Player' },
      { label: 'Controls', value: 'Arrow Keys / WASD / Touch' },
      { label: 'Difficulty', value: 'Casual / Normal / Hard / Expert' },
      { label: 'Performance', value: '60 FPS' },
      { label: 'Compatibility', value: 'All Modern Browsers' }
    ],
    shareUrls: [
      { icon: '🐦', label: 'Share on Twitter', url: 'https://twitter.com/intent/tweet?text=I%20just%20grew%20my%20snake%20to%20%5Blength%5D%20segments%20on%20the%20classic%20Snake%20game!&url=https://snake.pom100.com' },
      { icon: '📘', label: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=https://snake.pom100.com' },
      { icon: '🔗', label: 'Copy Link', url: '#copy-link' }
    ],
    seo: {
      title: 'Snake - The Classic Arcade Game',
      description: 'Play Snake online - the timeless classic. Control your snake, eat food, grow longer, and avoid hitting yourself. Perfect retro gaming experience.',
      keywords: ['snake game', 'retro game', 'classic game', 'arcade game', 'casual game']
    }
  },

  'tetris': {
    id: 'tetris',
    name: 'Tetris',
    tagline: 'Stack Blocks, Clear Lines, Master the Challenge',
    description: `Tetris is the legendary puzzle game that has captivated billions of players worldwide. Control falling Tetrimino blocks (the iconic seven-shaped pieces) and rotate them to fit perfectly into the playing field. Clear complete horizontal lines to earn points and create space. The game accelerates as you progress, providing escalating challenge. With its simple yet deep gameplay mechanics, Tetris appeals to casual players and competitive professionals alike. The vibrant colors of each Tetrimino piece provide visual feedback and satisfaction with each successful placement. Tetris remains the gold standard of puzzle games.`,
    heroImage: {
      url: 'https://images.unsplash.com/photo-1579546929662-711aa33e3881?w=1200&h=800&fit=crop',
      alt: 'Vibrant colorful geometric blocks and patterns stacked in puzzle formation'
    },
    gameLink: 'https://tetris.pom100.com',
    sourceCodeLink: 'https://github.com/yourusername/tetris-game',
    features: [
      {
        title: 'Controls',
        description: 'Precision block manipulation',
        items: ['Left/Right Arrow: Move piece', 'Up Arrow: Rotate piece', 'Down Arrow: Accelerate drop', 'Space: Hard drop']
      },
      {
        title: 'Difficulty Levels',
        description: 'Escalating complexity',
        items: ['Easy: Slow pieces, full visibility', 'Normal: Classic Tetris speed', 'Hard: Faster acceleration', 'Master: Professional difficulty']
      },
      {
        title: 'Scoring System',
        description: 'Rewarding line clears',
        items: ['1 Line: 100 points', '2 Lines: 300 points', '3 Lines: 500 points', '4 Lines (Tetris): 800 points + bonus']
      },
      {
        title: 'Special Mechanics',
        description: 'Classic gameplay elements',
        items: ['Piece preview: See next piece', 'Hold piece: Save for later', 'Ghost piece: Shadow guide', 'Line clear animation: Satisfying effects']
      }
    ],
    howToPlay: {
      steps: [
        {
          title: 'Understand Tetriminos',
          description: 'Seven different shaped pieces fall from the top: I, O, T, S, Z, J, and L. Each has a unique shape. Rotate and position them strategically.'
        },
        {
          title: 'Position Pieces',
          description: 'Use arrow keys to move falling pieces left and right. Plan where each piece should land before it arrives. Down arrow accelerates the descent.'
        },
        {
          title: 'Create Lines',
          description: 'Complete a full horizontal line with no gaps, and it clears, awarding points. The goal is to clear lines faster than they accumulate.'
        },
        {
          title: 'Survive',
          description: 'If blocks reach the top, the game ends. Stay alive as long as possible, clear lines strategically, and beat your high score!'
        }
      ]
    },
    tips: [
      'Keep the sides open - avoid stacking high on the edges, leave central space for flexibility',
      'Create wells - leave a single-width gap on one side for I-pieces (long straight pieces)',
      'Plan line clears - build toward clearing multiple lines simultaneously for bonus points',
      'Use the hold feature strategically - save tricky pieces for critical moments',
      'Watch the preview - plan your next move before the piece arrives'
    ],
    specs: [
      { label: 'Players', value: 'Single Player' },
      { label: 'Controls', value: 'Arrow Keys + Space' },
      { label: 'Difficulty', value: 'Easy / Normal / Hard / Master' },
      { label: 'Performance', value: '60 FPS' },
      { label: 'Compatibility', value: 'All Modern Browsers' }
    ],
    shareUrls: [
      { icon: '🐦', label: 'Share on Twitter', url: 'https://twitter.com/intent/tweet?text=I%20cleared%20%5Blines%5D%20lines%20in%20Tetris%20and%20scored%20%5Bscore%5D%20points!%20%F0%9F%8F%B1&url=https://tetris.pom100.com' },
      { icon: '📘', label: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=https://tetris.pom100.com' },
      { icon: '🔗', label: 'Copy Link', url: '#copy-link' }
    ],
    seo: {
      title: 'Tetris - The Classic Puzzle Game',
      description: 'Play Tetris online. Stack blocks, clear lines, and master the legendary puzzle game. Challenge yourself with multiple difficulty levels.',
      keywords: ['tetris', 'tetris game', 'puzzle game', 'block game', 'classic game']
    }
  },

  'slimy': {
    id: 'slimy',
    name: 'Slimy Soccer',
    tagline: 'Control Your Slime and Play Soccer Against AI',
    description: `Slimy Soccer is a unique sports game where you control a cute slime character competing in soccer matches. Navigate your slimy protagonist across the field, position yourself strategically, and score goals against an AI opponent. The game combines physics-based ball dynamics with real-time multiplayer-style gameplay. Your slime can bounce, slide, and stretch to reach the ball in creative ways. The charming aesthetic and intuitive controls make it accessible for all ages, while the strategic depth keeps competitive players engaged. Perfect for quick pick-up-and-play sessions or extended tournaments.`,
    heroImage: {
      url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop',
      alt: 'Soccer ball in action on green field with dynamic motion and sports intensity'
    },
    gameLink: 'https://slimy.pom100.com',
    sourceCodeLink: 'https://github.com/yourusername/slimy-game',
    features: [
      {
        title: 'Controls',
        description: 'Responsive player controls',
        items: ['Arrow Keys: Move slime', 'Space: Jump/Boost', 'Mouse/Touch: Aim & aim kick', 'ESC: Pause game']
      },
      {
        title: 'Difficulty Levels',
        description: 'AI challenge levels',
        items: ['Easy: Relaxed AI opponent', 'Medium: Competitive AI', 'Hard: Expert AI strategy', 'Pro: Professional difficulty']
      },
      {
        title: 'Scoring System',
        description: 'Goal-based scoring',
        items: ['1 Goal: 1 point', 'Combo Goals: Multiplier bonus', 'Perfect Match: All shots in goal', 'Achievement Badges: Unlockable rewards']
      },
      {
        title: 'Special Mechanics',
        description: 'Unique gameplay features',
        items: ['Slime physics: Bounce & stretch', 'Ball dynamics: Realistic physics', 'Power meter: Charge shots', 'Field variations: Different sized arenas']
      }
    ],
    howToPlay: {
      steps: [
        {
          title: 'Control Your Slime',
          description: 'Use arrow keys to move your slime character around the soccer field. Position yourself to intercept the ball or prepare to shoot.'
        },
        {
          title: 'Interact with Ball',
          description: 'When you touch the ball, your slime can control it. Walk into the ball to push it, or use spacebar to kick. Aim for the opponent\'s goal!'
        },
        {
          title: 'Score Goals',
          description: 'Move the ball into the opponent\'s goal to score a point. The more accurate your shots, the higher your success rate.'
        },
        {
          title: 'Win the Match',
          description: 'Outscore your AI opponent within the time limit. Win matches to unlock new arenas and face stronger AI challenges!'
        }
      ]
    },
    tips: [
      'Position yourself between the opponent and your goal - defense first, then counter-attack',
      'Master the power meter - timing your kicks perfectly results in more accurate shots',
      'Use slime physics - bounce off walls to reach difficult positions quickly',
      'Anticipate AI movement - the AI follows patterns; learn them and exploit weaknesses',
      'Conserve energy - balanced offense and defense beats aggressive play every time'
    ],
    specs: [
      { label: 'Players', value: 'Single Player vs AI' },
      { label: 'Controls', value: 'Arrow Keys + Space / Mouse' },
      { label: 'Difficulty', value: 'Easy / Medium / Hard / Pro' },
      { label: 'Performance', value: '60 FPS' },
      { label: 'Compatibility', value: 'All Modern Browsers' }
    ],
    shareUrls: [
      { icon: '🐦', label: 'Share on Twitter', url: 'https://twitter.com/intent/tweet?text=I%20just%20beat%20the%20AI%20in%20Slimy%20Soccer%20%F0%9F%A7%80%E2%9A%BD%EF%B8%8F!%20Can%20you%20do%20better?&url=https://slimy.pom100.com' },
      { icon: '📘', label: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=https://slimy.pom100.com' },
      { icon: '🔗', label: 'Copy Link', url: '#copy-link' }
    ],
    seo: {
      title: 'Slimy Soccer - Play Soccer as a Cute Slime',
      description: 'Play Slimy Soccer - control your slime character in soccer matches against AI. Unique physics-based sports gameplay.',
      keywords: ['slimy soccer', 'soccer game', 'sports game', 'AI game', 'physics game']
    }
  }
};

// Helper function to get related games (all except current)
export const getRelatedGames = (currentGameId: string) => {
  return Object.entries(GAMES)
    .filter(([id]) => id !== currentGameId)
    .slice(0, 3)
    .map(([, game]) => ({
      id: game.id,
      name: game.name,
      description: game.tagline,
      image: game.heroImage.url,
      link: `/games/${game.id}`
    }));
};
