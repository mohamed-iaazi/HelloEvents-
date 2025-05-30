-- Insert admin user (password is 'admin123' encoded with BCrypt)
INSERT INTO users (username, email, password) 
VALUES ('admin', 'admin@events.com', '$2a$10$EqKcp1WFKVQXVDgcXe/3COnAfGGqB93MCHzOMXmgDqfNm8pV6nKVu')
ON DUPLICATE KEY UPDATE username=username;

-- Insert admin role
INSERT INTO user_roles (user_id, role)
SELECT id, 'ROLE_ADMIN' FROM users WHERE username = 'admin'
ON DUPLICATE KEY UPDATE role=role; 