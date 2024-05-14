export interface Task {
  description: string;
  numberOfPomodoroSessions: number;
  done: boolean;
  currentPomodoroSession: number;
}
