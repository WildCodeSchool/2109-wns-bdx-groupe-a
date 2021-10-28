CREATE DATABASE db_tasks;
USE db_tasks;

DROP TABLE IF EXISTS user;
CREATE TABLE `user`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user (email, username, password) VALUES
  ('john.doe@test.fr', 'john-doe', '12345')
  