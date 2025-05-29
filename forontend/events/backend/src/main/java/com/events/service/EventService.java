package com.events.service;

import com.events.model.Event;
import com.events.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<Event> getAllEvents(String category, String search) {
        if (category != null && search != null) {
            return eventRepository.findByCategoryAndDateAfter(category, LocalDateTime.now())
                    .stream()
                    .filter(event -> event.getTitle().toLowerCase().contains(search.toLowerCase()))
                    .collect(Collectors.toList());
        } else if (category != null) {
            return eventRepository.findByCategory(category);
        } else if (search != null) {
            return eventRepository.findByTitleContainingIgnoreCase(search);
        }
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));
    }

    public Event createEvent(Event event) {
        event.setAvailableTickets(event.getCapacity());
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event event = getEventById(id);
        
        event.setTitle(eventDetails.getTitle());
        event.setDate(eventDetails.getDate());
        event.setLocation(eventDetails.getLocation());
        event.setCategory(eventDetails.getCategory());
        event.setPrice(eventDetails.getPrice());
        event.setCapacity(eventDetails.getCapacity());
        event.setDescription(eventDetails.getDescription());
        event.setImage(eventDetails.getImage());
        
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new EntityNotFoundException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }

    @Transactional
    public Map<String, String> bookEvent(Long id, int tickets) {
        Event event = getEventById(id);
        
        if (event.getAvailableTickets() < tickets) {
            throw new IllegalStateException("Not enough tickets available");
        }
        
        if (event.bookTickets(tickets)) {
            eventRepository.save(event);
            return Map.of(
                "message", "Successfully booked " + tickets + " tickets",
                "remainingTickets", String.valueOf(event.getAvailableTickets())
            );
        } else {
            throw new IllegalStateException("Failed to book tickets");
        }
    }
} 