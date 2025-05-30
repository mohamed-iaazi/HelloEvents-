export interface Booking {
  id: number;
  eventId: number;
  userId: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  ticketCount: number;
  totalPrice: number;
  bookingDate: Date;
  userName: string;
  eventTitle: string;
} 