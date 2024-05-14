export interface Task {
  id: number;
  description: string;
  numberOfPomodoroSessions: number;
  done: boolean;
  currentPomodoroSession: number;
}
