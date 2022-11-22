export interface IPollInfo {
  active: boolean;
  title: string;
  choices: {
    text: string;
    votes: number;
  }[];
}