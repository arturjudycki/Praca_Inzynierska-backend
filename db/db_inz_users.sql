-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: db_inz
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `user_type` enum('regular_user','editor','admin') NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `iduser_UNIQUE` (`id_user`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `e-mail_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'arturj','artur.judycki55@gmail.com','$2a$10$esEk2aGvUwKKplzMSmh8lOhJ3m6pCgdWo.1SHpMEOJhYdtKNjHeNy','Artur','Judycki','admin'),(2,'arek99','arek99@gmail.com','$2a$10$TmSlWtjI/6f6tWpqNp42Fu97tFJPuR552uIXeiUrMJ8Wub20500pi',NULL,NULL,'regular_user'),(3,'aga97','aga97@gmail.com','$2a$10$ob4br3nIvEx8G1p5CGyP7uCq1JPztWn4qZTcJetqQcwHgCOOhycd6',NULL,NULL,'regular_user'),(6,'Arczi','arti.judycki27@gmail.com','$2a$10$gKfVrqJ9WM8o6pcH67sV0eHv7V1GQrioSs8RePhPcowf0JQcoF42i',NULL,NULL,'regular_user'),(7,'Elijah','elijah@gmail.com','$2a$10$rAfz5zpV4hY9doVXtJnjtudh3KJGyZHJVmSZiZ6qNJF5FUfC7exRm',NULL,NULL,'regular_user'),(8,'Master_Piece','artur.judycki99@gmail.com','$2a$10$1XXzW/yFYpYfDnQFt4UXq.xol36hTNCtXdei20OIYo6b2PmImM5cO',NULL,NULL,'regular_user'),(9,'Pincher','pincher99@gmail.com','$2a$10$ENgRb2Awn3IIdh6SCpe74elT5IMEmr474LejffZnLPcf9XohBDGfO',NULL,NULL,'regular_user'),(10,'Fincher62','fincher62@gmail.com','$2a$10$0Cj4czA9hryNFSYFCubkaedsznygm0ePYvZsShm98FnOV35EB3adq',NULL,NULL,'regular_user'),(11,'anowacki','anowacki@gmail.com','$2a$10$kIdEAiu/EorUBlSvZHyzw.0MYtNawlWAO4nt0nuviYDR5C/PQdm.u','Adam','Nowacki','editor'),(12,'jkowalski','jkowalski@gmail.com','$2a$10$Jin3JsggAc6sGNXgKiTZZOE/bE1wznczi0kAs16KeovJna60ETaaK','Jan','Kowalski','admin'),(13,'mhłasko','mhlasko@gmail.com','$2a$10$uDhveApXi6ZFUOnB9ZaxJes9e4gfBTisNBtshwC9JzH0jrf8OToji','Marek','Hłasko','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-27 19:19:58
