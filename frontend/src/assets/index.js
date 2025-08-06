// Logo
import logo from './images/logo/logo.png';

// Mascot
import mascotHappy from './images/mascot/mascot-happy.png';
import mascotThinking from './images/mascot/mascot-thinking.png';
import mascotCelebrate from './images/mascot/mascot-celebrate.png';

// Backgrounds
import patternMain from './images/backgrounds/pattern-main.svg';
import patternBubbles from './images/backgrounds/pattern-bubbles.svg';

// Grade Icons
import grade1Icon from './images/icons/grades/grade-1-unicorn.png';
import grade2Icon from './images/icons/grades/grade-2-butterfly.png';
import grade3Icon from './images/icons/grades/grade-3-dolphin.png';
import grade4Icon from './images/icons/grades/grade-4-parrot.png';
import grade5Icon from './images/icons/grades/grade-5-lion.png';

// Subject Icons
import iconMath from './images/icons/subjects/icon-math.png';
import iconAddition from './images/icons/subjects/icon-addition.png';
import iconSubtraction from './images/icons/subjects/icon-subtraction.png';
import iconMultiplication from './images/icons/subjects/icon-multiplication.png';
import iconGeometry from './images/icons/subjects/icon-geometry.png';
import iconReward from './images/icons/subjects/icon-reward.png';

// Badges
import badgeBeginner from './images/badges/badge-beginner.png';
import badgeStar from './images/badges/badge-star.png';
import badgeChampion from './images/badges/badge-champion.png';
import badgeStreak7 from './images/badges/badge-streak-7.png';
import badgePerfect from './images/badges/badge-perfect.png';
import badgeMaster from './images/badges/badge-master.png';

// Sounds
import clickSound from './sounds/click.mp3';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import successSound from './sounds/success.mp3';
import bgMusic from './sounds/bg-music.mp3';

// Export images object
export const images = {
  logo,
  mascot: {
    happy: mascotHappy,
    thinking: mascotThinking,
    celebrate: mascotCelebrate,
    sad: mascotThinking
  },
  backgrounds: {
    main: patternMain,
    bubbles: patternBubbles
  },
  gradeIcons: {
    1: grade1Icon,
    2: grade2Icon,
    3: grade3Icon,
    4: grade4Icon,
    5: grade5Icon
  },
  subjectIcons: {
    math: iconMath,
    addition: iconAddition,
    subtraction: iconSubtraction,
    multiplication: iconMultiplication,
    geometry: iconGeometry,
    reward: iconReward
  },
  illustrations: {
    studying: 'https://via.placeholder.com/400x300/9333ea/ffffff?text=Studying',
    learning: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Learning',
    success: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Success',
    gaming: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Gaming'
  },
  badges: {
    beginner: badgeBeginner,
    star: badgeStar,
    champion: badgeChampion,
    streak7: badgeStreak7,
    perfect: badgePerfect,
    master: badgeMaster
  }
};

// Export sounds
export const sounds = {
  click: clickSound,
  correct: correctSound,
  wrong: wrongSound,
  success: successSound,
  bgMusic: bgMusic
};