export interface Deal {
  id: string;
  name: string;
  stage: 'new' | 'screening' | 'diligence' | 'ic-ready' | 'decided';
  score: number;
  sector: string;
  amount: string;
  runway: number; // months
  lastUpdate: string;
  status: 'active' | 'at-risk' | 'decided';
  description: string;
  founders: string[];
  metrics: {
    revenue: string;
    growth: string;
    customers: string;
  };
  evidence: Evidence[];
}

export interface Evidence {
  id: string;
  type: 'link' | 'note' | 'document';
  title: string;
  content: string;
  url?: string;
  tags: string[];
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  type: 'review' | 'call' | 'research' | 'follow-up';
  dealId?: string;
  dueDate: string;
  completed: boolean;
  assignee: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  company: string;
  connections: string[];
  deals: string[];
  lastContact: string;
  avatar?: string;
}

export interface PortfolioCompany {
  id: string;
  name: string;
  status: 'active' | 'at-risk' | 'exited';
  investment: string;
  valuation: string;
  ownership: string;
  lastUpdate: string;
  metrics: {
    arr: string;
    growth: string;
    runway: number;
  };
}