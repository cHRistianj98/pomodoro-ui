export interface TaskDto {
  id?: number;
  description: string;
  numberOfPomodoroSessions: number;
  done: boolean;
  currentPomodoroSession: number;
}
