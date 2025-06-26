export interface Order {
  id: string;
  origin: string;
  destination: string;
  assignedBison: string;
  cost: number;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}
