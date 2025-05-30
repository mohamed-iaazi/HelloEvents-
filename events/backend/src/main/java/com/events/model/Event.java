package com.events.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Date is required")
    private LocalDateTime date;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private Double price;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be greater than 0")
    private Integer capacity;

    @NotBlank(message = "Description is required")
    @Column(length = 2000)
    private String description;

    @NotBlank(message = "Image URL is required")
    private String image;

    @NotNull
    @Min(value = 0, message = "Available tickets must be greater than or equal to 0")
    private Integer availableTickets;

    @Version
    private Long version;  // For optimistic locking

    // Helper method to check if tickets are available
    public boolean hasAvailableTickets() {
        return availableTickets > 0;
    }

    // Helper method to book tickets
    public boolean bookTickets(int numberOfTickets) {
        if (availableTickets >= numberOfTickets) {
            availableTickets -= numberOfTickets;
            return true;
        }
        return false;
    }
} 