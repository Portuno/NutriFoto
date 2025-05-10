import { create } from 'zustand';
import { FitnessData, Challenge, Achievement, UserProgress, BarcodeProduct } from '../types/fitness';

interface FitnessState {
  fitnessData: FitnessData[];
  challenges: Challenge[];
  achievements: Achievement[];
  userProgress: UserProgress | null;
  scannedProducts: BarcodeProduct[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setFitnessData: (data: FitnessData[]) => void;
  addFitnessData: (data: FitnessData) => void;
  setChallenges: (challenges: Challenge[]) => void;
  updateChallenge: (challengeId: string, isCompleted: boolean) => void;
  setAchievements: (achievements: Achievement[]) => void;
  unlockAchievement: (achievementId: string) => void;
  setUserProgress: (progress: UserProgress) => void;
  addPoints: (points: number) => void;
  addBadge: (badge: string) => void;
  addScannedProduct: (product: BarcodeProduct) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFitnessStore = create<FitnessState>((set) => ({
  fitnessData: [],
  challenges: [],
  achievements: [],
  userProgress: null,
  scannedProducts: [],
  isLoading: false,
  error: null,

  setFitnessData: (data) => set({ fitnessData: data }),
  addFitnessData: (data) => set((state) => ({ 
    fitnessData: [...state.fitnessData, data] 
  })),
  
  setChallenges: (challenges) => set({ challenges }),
  updateChallenge: (challengeId, isCompleted) => set((state) => ({
    challenges: state.challenges.map((challenge) =>
      challenge.id === challengeId
        ? { ...challenge, isCompleted }
        : challenge
    ),
  })),

  setAchievements: (achievements) => set({ achievements }),
  unlockAchievement: (achievementId) => set((state) => ({
    achievements: state.achievements.map((achievement) =>
      achievement.id === achievementId
        ? { ...achievement, unlockedAt: new Date() }
        : achievement
    ),
  })),

  setUserProgress: (progress) => set({ userProgress: progress }),
  addPoints: (points) => set((state) => ({
    userProgress: state.userProgress
      ? {
          ...state.userProgress,
          points: state.userProgress.points + points,
        }
      : null,
  })),
  addBadge: (badge) => set((state) => ({
    userProgress: state.userProgress
      ? {
          ...state.userProgress,
          badges: [...state.userProgress.badges, badge],
        }
      : null,
  })),

  addScannedProduct: (product) => set((state) => ({
    scannedProducts: [...state.scannedProducts, product],
  })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
})); 