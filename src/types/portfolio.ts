export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  description: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface PhilosophyPoint {
  title: string;
  content: string;
  highlight?: boolean;
}


