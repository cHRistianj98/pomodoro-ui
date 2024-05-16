export interface Task {
  id?: number | null;
  description: string;
  numberOfPomodoroSessions: number;
  done: boolean;
  currentPomodoroSession: number;
}
