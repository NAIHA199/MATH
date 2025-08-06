// ========== USER DATA ==========
export const mockUserProgress = {
  totalPoints: 2850,
  level: 5,
  currentStreak: 7,
  totalLessonsCompleted: 45,
  totalExercisesDone: 238,
  accuracy: 87,
  studyTime: 1250,
  badges: [
    { id: 1, name: 'Người mới bắt đầu', icon: '🌟', earned: true, date: '2024-01-15' },
    { id: 2, name: 'Siêu sao toán học', icon: '⭐', earned: true, date: '2024-01-20' },
    { id: 3, name: 'Chuỗi 7 ngày', icon: '🔥', earned: true, date: '2024-01-22' },
    { id: 4, name: 'Nhà vô địch', icon: '🏆', earned: false },
    { id: 5, name: 'Bậc thầy', icon: '👑', earned: false }
  ],
  completedLessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

// ========== WEEKLY STATISTICS ==========
export const mockWeeklyStats = [
  { day: 'T2', points: 120, exercises: 15, minutes: 45 },
  { day: 'T3', points: 150, exercises: 18, minutes: 55 },
  { day: 'T4', points: 100, exercises: 12, minutes: 35 },
  { day: 'T5', points: 180, exercises: 22, minutes: 65 },
  { day: 'T6', points: 200, exercises: 25, minutes: 70 },
  { day: 'T7', points: 90, exercises: 10, minutes: 30 },
  { day: 'CN', points: 160, exercises: 20, minutes: 60 }
];

// ========== SUBJECT PROGRESS ==========
export const mockSubjectProgress = [
  { subject: 'Phép cộng', progress: 95, total: 20, completed: 19, color: '#ec4899' },
  { subject: 'Phép trừ', progress: 85, total: 20, completed: 17, color: '#8b5cf6' },
  { subject: 'Phép nhân', progress: 70, total: 25, completed: 18, color: '#3b82f6' },
  { subject: 'Phép chia', progress: 60, total: 25, completed: 15, color: '#10b981' },
  { subject: 'Hình học', progress: 80, total: 15, completed: 12, color: '#f59e0b' }
];

// ========== RECENT ACTIVITIES ==========
export const mockRecentActivities = [
  {
    id: 1,
    type: 'lesson',
    title: 'Phép cộng có nhớ',
    time: '10 phút trước',
    points: 50,
    status: 'completed',
    icon: '📚'
  },
  {
    id: 2,
    type: 'game',
    title: 'Bắn số - Cấp độ 3',
    time: '2 giờ trước',
    points: 120,
    status: 'completed',
    icon: '🎮'
  },
  {
    id: 3,
    type: 'exercise',
    title: 'Bài tập phép trừ',
    time: 'Hôm qua',
    points: 80,
    status: 'completed',
    icon: '✏️'
  },
  {
    id: 4,
    type: 'challenge',
    title: 'Thử thách hàng ngày',
    time: 'Hôm qua',
    points: 100,
    status: 'completed',
    icon: '🏃'
  }
];

// ========== LEADERBOARD ==========
export const mockLeaderboard = [
  { rank: 1, name: 'Minh Anh', avatar: '🦄', points: 5420, trend: 'up' },
  { rank: 2, name: 'Bảo Nam', avatar: '🦁', points: 5180, trend: 'up' },
  { rank: 3, name: 'Thu Hà', avatar: '🦋', points: 4950, trend: 'down' },
  { rank: 4, name: 'You', avatar: '🐬', points: 2850, trend: 'up', isCurrentUser: true },
  { rank: 5, name: 'Khánh Linh', avatar: '🦜', points: 2720, trend: 'same' }
];

// ========== LEARNING GOALS ==========
export const mockLearningGoals = [
  { id: 1, title: 'Hoàn thành 5 bài học', current: 3, target: 5, deadline: 'Hôm nay' },
  { id: 2, title: 'Đạt 500 điểm', current: 380, target: 500, deadline: 'Tuần này' },
  { id: 3, title: 'Chuỗi 10 ngày', current: 7, target: 10, deadline: '3 ngày nữa' }
];

// ========== LESSONS BY GRADE ==========
export const mockLessons = {
  1: [ // Lớp 1
    {
      id: 1,
      title: "Số đếm từ 1 đến 10",
      description: "Học đếm số và nhận biết các con số",
      icon: "🔢",
      progress: 80,
      exercises: 5
    },
    {
      id: 2,
      title: "Phép cộng đơn giản",
      description: "Cộng các số trong phạm vi 10",
      icon: "➕",
      progress: 60,
      exercises: 8
    },
    {
      id: 3,
      title: "Phép trừ đơn giản",
      description: "Trừ các số trong phạm vi 10",
      icon: "➖",
      progress: 0,
      exercises: 6
    },
    {
      id: 4,
      title: "Hình học cơ bản",
      description: "Nhận biết các hình dạng cơ bản",
      icon: "🔷",
      progress: 0,
      exercises: 4
    },
    {
      id: 5,
      title: "So sánh số",
      description: "Lớn hơn, nhỏ hơn, bằng nhau",
      icon: "⚖️",
      progress: 0,
      exercises: 5
    }
  ],
  2: [ // Lớp 2
    {
      id: 6,
      title: "Số đếm từ 1 đến 100",
      description: "Học đếm và viết số đến 100",
      icon: "💯",
      progress: 30,
      exercises: 10
    },
    {
      id: 7,
      title: "Phép cộng có nhớ",
      description: "Cộng các số có tổng lớn hơn 10",
      icon: "➕",
      progress: 0,
      exercises: 12
    },
    {
      id: 8,
      title: "Phép trừ có nhớ",
      description: "Trừ các số lớn hơn 10",
      icon: "➖",
      progress: 0,
      exercises: 10
    },
    {
      id: 9,
      title: "Bảng cửu chương 2, 5",
      description: "Học thuộc bảng nhân 2 và 5",
      icon: "✖️",
      progress: 0,
      exercises: 8
    },
    {
      id: 10,
      title: "Đo lường cơ bản",
      description: "Đo độ dài, khối lượng đơn giản",
      icon: "📏",
      progress: 0,
      exercises: 6
    }
  ],
  3: [ // Lớp 3
    {
      id: 11,
      title: "Số đến 1000",
      description: "Làm quen với số có 3 chữ số",
      icon: "🔢",
      progress: 0,
      exercises: 12
    },
    {
      id: 12,
      title: "Phép nhân cơ bản",
      description: "Bảng cửu chương từ 2 đến 9",
      icon: "✖️",
      progress: 0,
      exercises: 15
    },
    {
      id: 13,
      title: "Phép chia cơ bản",
      description: "Chia cho số có 1 chữ số",
      icon: "➗",
      progress: 0,
      exercises: 12
    }
  ],
  4: [ // Lớp 4
    {
      id: 16,
      title: "Số lớn và làm tròn số",
      description: "Số đến triệu và cách làm tròn",
      icon: "🔢",
      progress: 0,
      exercises: 10
    },
    {
      id: 17,
      title: "Phép tính với số lớn",
      description: "Cộng, trừ, nhân, chia số lớn",
      icon: "🧮",
      progress: 0,
      exercises: 20
    }
  ],
  5: [ // Lớp 5
    {
      id: 21,
      title: "Số thập phân nâng cao",
      description: "Các phép tính với số thập phân",
      icon: "🔢",
      progress: 0,
      exercises: 15
    },
    {
      id: 22,
      title: "Tỉ số và tỉ lệ",
      description: "Tìm tỉ số và giải bài toán",
      icon: "⚖️",
      progress: 0,
      exercises: 12
    }
  ]
};

// ========== EXERCISES ==========
export const mockExercises = {
  1: [ // Bài học ID 1
    {
      id: 1,
      type: 'multiple-choice',
      question: 'Số nào lớn hơn?',
      options: ['3', '5', '2', '1'],
      correctAnswer: '5',
      points: 10,
      hint: 'Số lớn hơn là số đứng sau trong dãy số'
    },
    {
      id: 2,
      type: 'fill-blank',
      question: 'Điền số còn thiếu: 1, 2, __, 4, 5',
      correctAnswer: '3',
      points: 10,
      hint: 'Đếm từ 1 đến 5'
    },
    {
      id: 3,
      type: 'drag-drop',
      question: 'Sắp xếp các số theo thứ tự tăng dần',
      items: ['3', '1', '4', '2', '5'],
      correctOrder: ['1', '2', '3', '4', '5'],
      points: 20,
      hint: 'Số nhỏ nhất đứng đầu'
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: '2 + 3 = ?',
      options: ['4', '5', '6', '7'],
      correctAnswer: '5',
      points: 10
    },
    {
      id: 5,
      type: 'fill-blank',
      question: 'Số liền sau của 7 là?',
      correctAnswer: '8',
      points: 10,
      hint: 'Cộng thêm 1'
    }
  ],
  2: [ // Bài học ID 2
    {
      id: 6,
      type: 'multiple-choice',
      question: '4 + 3 = ?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '7',
      points: 10
    },
    {
      id: 7,
      type: 'fill-blank',
      question: '5 + __ = 8',
      correctAnswer: '3',
      points: 15,
      hint: '8 - 5 = ?'
    },
    {
      id: 8,
      type: 'drag-drop',
      question: 'Sắp xếp các phép tính theo kết quả tăng dần',
      items: ['2+3', '1+1', '4+2', '3+1'],
      correctOrder: ['1+1', '3+1', '2+3', '4+2'],
      points: 25
    }
  ]
};

// ========== GAMES ==========
export const mockGames = [
  {
    id: 1,
    name: 'Bắn Toán',
    description: 'Bắn vào các phép tính với đáp án đúng',
    icon: '🎯',
    difficulty: 'Dễ',
    requiredLevel: 1,
    highScore: 0,
    playCount: 0
  },
  {
    id: 2,
    name: 'Đua xe toán học',
    description: 'Giải toán để tăng tốc',
    icon: '🏎️',
    difficulty: 'Trung bình',
    requiredLevel: 2,
    highScore: 0,
    playCount: 0
  },
  {
    id: 3,
    name: 'Memory toán',
    description: 'Ghép cặp phép tính và đáp án',
    icon: '🧠',
    difficulty: 'Dễ',
    requiredLevel: 1,
    highScore: 0,
    playCount: 0
  },
  {
    id: 4,
    name: 'Ninja Toán',
    description: 'Chém trái cây với số đúng',
    icon: '🥷',
    difficulty: 'Khó',
    requiredLevel: 3,
    highScore: 0,
    playCount: 0
  },
  {
    id: 5,
    name: 'Câu cá toán học',
    description: 'Câu cá với phép tính đúng',
    icon: '🎣',
    difficulty: 'Trung bình',
    requiredLevel: 2,
    highScore: 0,
    playCount: 0
  }
];

// ========== DAILY CHALLENGE ==========
export const mockDailyChallenge = {
  id: 1,
  title: "Thử thách phép cộng",
  description: "Giải 10 phép cộng trong 2 phút",
  reward: 50,
  timeLimit: 120, // seconds
  questions: [
    { id: 1, question: "5 + 3 = ?", answer: 8 },
    { id: 2, question: "7 + 2 = ?", answer: 9 },
    { id: 3, question: "4 + 6 = ?", answer: 10 },
    { id: 4, question: "8 + 1 = ?", answer: 9 },
    { id: 5, question: "3 + 7 = ?", answer: 10 },
    { id: 6, question: "6 + 2 = ?", answer: 8 },
    { id: 7, question: "9 + 1 = ?", answer: 10 },
    { id: 8, question: "2 + 5 = ?", answer: 7 },
    { id: 9, question: "4 + 4 = ?", answer: 8 },
    { id: 10, question: "3 + 3 = ?", answer: 6 }
  ]
};

// ========== ACHIEVEMENTS ==========
export const mockAchievements = {
  categories: [
    { id: 'learning', name: 'Học tập', icon: '📚' },
    { id: 'speed', name: 'Tốc độ', icon: '⚡' },
    { id: 'accuracy', name: 'Chính xác', icon: '🎯' },
    { id: 'streak', name: 'Chuỗi ngày', icon: '🔥' },
    { id: 'social', name: 'Xã hội', icon: '👥' }
  ],
  badges: [
    {
      id: 'first_lesson',
      name: 'Bước đầu tiên',
      description: 'Hoàn thành bài học đầu tiên',
      category: 'learning',
      icon: '🎓',
      points: 10,
      earned: true,
      earnedDate: '2024-01-15'
    },
    {
      id: 'fast_learner',
      name: 'Học nhanh',
      description: 'Hoàn thành 5 bài trong 1 ngày',
      category: 'speed',
      icon: '🚀',
      points: 50,
      earned: false,
      progress: { current: 3, target: 5 }
    },
    {
      id: 'perfect_score',
      name: 'Điểm tuyệt đối',
      description: 'Đạt 100% trong 10 bài tập',
      category: 'accuracy',
      icon: '💯',
      points: 100,
      earned: false,
      progress: { current: 7, target: 10 }
    },
    {
      id: 'week_streak',
      name: 'Tuần vàng',
      description: 'Học 7 ngày liên tiếp',
      category: 'streak',
      icon: '🔥',
      points: 70,
      earned: true,
      earnedDate: '2024-01-22'
    },
    {
      id: 'helper',
      name: 'Người giúp đỡ',
      description: 'Giúp 3 bạn giải bài tập',
      category: 'social',
      icon: '🤝',
      points: 30,
      earned: false,
      progress: { current: 1, target: 3 }
    }
  ]
};

// ========== NOTIFICATIONS ==========
export const mockNotifications = [
  {
    id: 1,
    type: 'achievement',
    title: 'Huy hiệu mới!',
    message: 'Bạn vừa nhận được huy hiệu "Tuần vàng"',
    icon: '🏆',
    time: '5 phút trước',
    read: false
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Nhắc nhở học tập',
    message: 'Đừng quên làm bài tập hôm nay nhé!',
    icon: '⏰',
    time: '1 giờ trước',
    read: true
  },
  {
    id: 3,
    type: 'friend',
    title: 'Bạn bè',
    message: 'Minh Anh vừa vượt qua bạn trên bảng xếp hạng',
    icon: '👥',
    time: 'Hôm qua',
    read: true
  }
];

// ========== USER SETTINGS ==========
export const mockUserSettings = {
  sound: true,
  music: true,
  notifications: true,
  difficulty: 'medium',
  language: 'vi',
  theme: 'light',
  fontSize: 'medium',
  autoSave: true
};

// ========== EXPORT ALL ==========
const mockData = {
  mockUserProgress,
  mockWeeklyStats,
  mockSubjectProgress,
  mockRecentActivities,
  mockLeaderboard,
  mockLearningGoals,
  mockLessons,
  mockExercises,
  mockGames,
  mockDailyChallenge,
  mockAchievements,
  mockNotifications,
  mockUserSettings
};

export default mockData;