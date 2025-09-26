import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Deal, Task, Person, PortfolioCompany } from '../types';
import { mockDeals, mockTasks, mockPeople, mockPortfolio } from '../data/mockData';

interface AppState {
  deals: Deal[];
  tasks: Task[];
  people: Person[];
  portfolio: PortfolioCompany[];
  selectedDeal: Deal | null;
  notifications: any[];
}

type AppAction = 
  | { type: 'SELECT_DEAL'; payload: Deal }
  | { type: 'UPDATE_DEAL'; payload: Deal }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'ADD_TASK'; payload: Task };

const initialState: AppState = {
  deals: mockDeals,
  tasks: mockTasks,
  people: mockPeople,
  portfolio: mockPortfolio,
  selectedDeal: null,
  notifications: []
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SELECT_DEAL':
      return { ...state, selectedDeal: action.payload };
    case 'UPDATE_DEAL':
      return {
        ...state,
        deals: state.deals.map(deal => 
          deal.id === action.payload.id ? action.payload : deal
        )
      };
    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload ? { ...task, completed: true } : task
        )
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}