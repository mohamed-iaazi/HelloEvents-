package com.events.repository;

import com.events.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCategory(String category);
    List<Event> findByDateAfter(LocalDateTime date);
    List<Event> findByTitleContainingIgnoreCase(String title);
    List<Event> findByCategoryAndDateAfter(String category, LocalDateTime date);
} 