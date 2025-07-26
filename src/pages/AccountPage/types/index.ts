export interface PersonalData {
  firstName: string;
  lastName: string;
  personalCode: string;
  city: string;
  status: string;
}

export interface TablePosition {
  position: number;
  points: string;
}

export interface InterviewSimulation {
  direction: string;
  interviewDate: string;
}

export interface RandomCoffee {
  employeeName: string;
  position: string;
  meetingDate: string;
}

export interface Skill {
  name: string;
  progress: string;
  completed?: boolean;
}

export interface Activity {
  name: string;
  progress: string;
  completed?: boolean;
}

export interface AccountPageData {
  personalData: PersonalData;
  tablePosition: TablePosition;
  interviewSimulation: InterviewSimulation;
  randomCoffee: RandomCoffee;
  generalSkills: Skill[];
  activities: Activity[];
}
