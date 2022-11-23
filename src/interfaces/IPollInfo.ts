export interface IPollInfo {
  active: boolean;
  choices: Array<{
    text: string;
    votes: number;
  }>;
  title: string;
}
