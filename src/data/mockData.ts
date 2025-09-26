import { Deal, Task, Person, PortfolioCompany } from '../types';

export const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'CloudSync AI',
    stage: 'diligence',
    score: 8.5,
    sector: 'AI/ML',
    amount: '$2.5M Series A',
    runway: 18,
    lastUpdate: '2 hours ago',
    status: 'active',
    description: 'AI-powered data synchronization platform for enterprise',
    founders: ['Sarah Chen', 'Marcus Liu'],
    metrics: {
      revenue: '$500K ARR',
      growth: '15% MoM',
      customers: '45 enterprise'
    },
    evidence: [
      {
        id: '1',
        type: 'note',
        title: 'Founder Interview Notes',
        content: 'Strong technical background, clear product vision',
        tags: ['founder', 'interview'],
        createdAt: '2024-01-15'
      }
    ]
  },
  {
    id: '2',
    name: 'EcoShip Logistics',
    stage: 'screening',
    score: 7.2,
    sector: 'Climate Tech',
    amount: '$1.8M Seed',
    runway: 12,
    lastUpdate: '1 day ago',
    status: 'active',
    description: 'Carbon-neutral shipping optimization platform',
    founders: ['David Park', 'Emma Thompson'],
    metrics: {
      revenue: '$120K ARR',
      growth: '8% MoM',
      customers: '12 SMB'
    },
    evidence: []
  },
  {
    id: '3',
    name: 'MedFlow',
    stage: 'ic-ready',
    score: 9.1,
    sector: 'HealthTech',
    amount: '$4.2M Series A',
    runway: 24,
    lastUpdate: '3 hours ago',
    status: 'active',
    description: 'Hospital workflow automation and patient management',
    founders: ['Dr. Ana Rodriguez', 'James Miller'],
    metrics: {
      revenue: '$1.2M ARR',
      growth: '22% MoM',
      customers: '8 hospitals'
    },
    evidence: []
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review CloudSync AI technical diligence',
    priority: 'high',
    type: 'review',
    dealId: '1',
    dueDate: '2024-01-16',
    completed: false,
    assignee: 'You'
  },
  {
    id: '2',
    title: 'Schedule call with MedFlow founders',
    priority: 'high',
    type: 'call',
    dealId: '3',
    dueDate: '2024-01-16',
    completed: false,
    assignee: 'Sarah Kim'
  },
  {
    id: '3',
    title: 'Research EcoShip competitive landscape',
    priority: 'medium',
    type: 'research',
    dealId: '2',
    dueDate: '2024-01-17',
    completed: false,
    assignee: 'Mike Chen'
  }
];

export const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'CloudSync AI',
    connections: ['2', '3'],
    deals: ['1'],
    lastContact: '2024-01-15'
  },
  {
    id: '2',
    name: 'Marcus Liu',
    role: 'CTO',
    company: 'CloudSync AI',
    connections: ['1'],
    deals: ['1'],
    lastContact: '2024-01-15'
  }
];

export const mockPortfolio: PortfolioCompany[] = [
  {
    id: '1',
    name: 'DataVault Pro',
    status: 'active',
    investment: '$3.2M',
    valuation: '$45M',
    ownership: '12%',
    lastUpdate: '1 week ago',
    metrics: {
      arr: '$2.8M',
      growth: '18%',
      runway: 30
    }
  },
  {
    id: '2',
    name: 'TechFlow Systems',
    status: 'at-risk',
    investment: '$2.1M',
    valuation: '$28M',
    ownership: '15%',
    lastUpdate: '3 days ago',
    metrics: {
      arr: '$890K',
      growth: '3%',
      runway: 8
    }
  }
];