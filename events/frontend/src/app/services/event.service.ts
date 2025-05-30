import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

export interface EventDto {
  id?: number;
  title: string;
  description: string;
  date: string;
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

  private convertToEvent(event: EventDto): Event {
    return {
      ...event,
      date: new Date(event.date)
    };
  }

  private convertToEventDto(event: Partial<Event>): Partial<EventDto> {
    const dto = { ...event } as Partial<EventDto>;
    if (event.date) {
      dto.date = event.date.toISOString();
    }
    return dto;
  }

  getAllEvents(params?: EventQueryParams): Observable<Event[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<EventDto[]>(this.apiUrl, { params: httpParams })
      .pipe(map(events => events.map(event => this.convertToEvent(event))));
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<EventDto>(`${this.apiUrl}/${id}`)
      .pipe(map(event => this.convertToEvent(event)));
  }

  createEvent(event: Omit<Event, 'id'>): Observable<Event> {
    return this.http.post<EventDto>(this.apiUrl, this.convertToEventDto(event))
      .pipe(map(event => this.convertToEvent(event)));
  }

  updateEvent(id: number, event: Partial<Event>): Observable<Event> {
    return this.http.put<EventDto>(`${this.apiUrl}/${id}`, this.convertToEventDto(event))
      .pipe(map(event => this.convertToEvent(event)));
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