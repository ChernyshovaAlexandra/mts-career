export interface PersonalData {
  firstName: string;
  lastName: string;
  personalCode: string;
  city: string;
  status: string;
}

export interface TablePosition {
  position: number;
  points: number;
}

export interface InterviewSimulation {
  direction: string;
  interviewDate: string;
  staffName?: string;
  link?: string;
  status?: string;
}

export interface RandomCoffee {
  employeeName: string;
  position: string;
  meetingDate: string;
  link?: string;
  status?: string;
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
