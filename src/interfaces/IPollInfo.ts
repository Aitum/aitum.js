export interface IPollInfo {
  active: boolean;
  choices: {
    text: string;
    votes: number;
  }[];
  title: string;
}
