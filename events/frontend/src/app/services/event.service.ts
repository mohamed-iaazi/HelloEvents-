import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Event {
  id?: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  price: number;
  capacity: number;
  availableTickets: number;
  image: string;
  version?: number;
}

export interface EventQueryParams {
  category?: string;
  search?: string;
  page?: number;
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly apiUrl = `${environment.apiUrl}/api/events`;

  constructor(private http: HttpClient) {}

  getAllEvents(params?: EventQueryParams): Observable<Event[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<Event[]>(this.apiUrl, { params: httpParams });
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: Omit<Event, 'id'>): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  updateEvent(id: number, event: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  bookEvent(eventId: number, tickets: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/book`, null, {
      params: new HttpParams().set('tickets', tickets.toString())
    });
  }
} 