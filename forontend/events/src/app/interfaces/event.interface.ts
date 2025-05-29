export interface Event {
  id: number;
  title: string;
  date: Date;
  location: string;
  category: string;
  price: number;
  image: string;
  description: string;
  capacity?: number;
  availableTickets?: number;
} 