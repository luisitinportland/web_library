-- Estructura de tabla para reviews
CREATE TABLE reviews (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), comment TEXT, rating INT, approved TINYINT(1));