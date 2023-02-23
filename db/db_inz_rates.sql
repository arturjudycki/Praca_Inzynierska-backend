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
-- Table structure for table `rates`
--

DROP TABLE IF EXISTS `rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rates` (
  `id_rate` int NOT NULL AUTO_INCREMENT,
  `numerical_rating` int DEFAULT NULL,
  `verbal_rating` mediumtext,
  `rating_date` datetime NOT NULL,
  `favourites` tinyint DEFAULT NULL,
  `song` int DEFAULT NULL,
  `music_album` int DEFAULT NULL,
  `user` int NOT NULL,
  PRIMARY KEY (`id_rate`),
  UNIQUE KEY `idrate_UNIQUE` (`id_rate`),
  KEY `fk_rates_users1_idx` (`user`),
  KEY `fk_rates_songs1_idx` (`song`),
  KEY `fk_rates_music_albums1_idx` (`music_album`),
  CONSTRAINT `fk_rates_music_albums1` FOREIGN KEY (`music_album`) REFERENCES `music_albums` (`id_music_album`) ON DELETE CASCADE,
  CONSTRAINT `fk_rates_songs1` FOREIGN KEY (`song`) REFERENCES `songs` (`id_song`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_rates_users1` FOREIGN KEY (`user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rates`
--

LOCK TABLES `rates` WRITE;
/*!40000 ALTER TABLE `rates` DISABLE KEYS */;
INSERT INTO `rates` VALUES (2,9,'','2023-02-12 19:58:27',0,NULL,20,1),(4,9,'Idealny balans pomiędzy grunge\'owością Bleach a melodyjnością Nevermind.','2023-02-13 14:01:18',1,NULL,21,1),(26,8,'','2023-02-13 16:15:00',0,NULL,24,1),(30,8,'','2023-02-13 17:01:17',0,NULL,21,2),(32,8,'','2023-02-13 17:48:55',0,NULL,22,1),(33,8,'','2023-02-13 19:24:54',0,1,NULL,1),(34,8,'','2023-02-22 11:33:36',0,13,NULL,1),(36,10,'','2023-02-22 12:33:48',1,NULL,20,2),(38,9,'','2023-02-22 12:37:28',0,1,NULL,2),(39,9,'','2023-02-22 15:10:02',1,NULL,25,2),(40,7,'','2023-02-22 15:17:17',0,12,NULL,3),(41,8,'','2023-02-23 11:49:29',0,8,NULL,1),(42,8,'','2023-02-23 11:49:46',1,11,NULL,1),(43,9,'','2023-02-23 11:49:57',1,NULL,25,1),(44,9,'','2023-02-23 13:21:52',0,NULL,32,1),(45,8,'','2023-02-23 13:22:13',0,NULL,30,1),(46,7,'','2023-02-23 13:22:18',0,NULL,31,1),(47,7,'','2023-02-23 13:22:26',0,NULL,29,1),(48,7,'','2023-02-23 13:22:34',0,NULL,28,1),(49,9,'','2023-02-23 13:22:46',1,NULL,26,1),(50,7,'','2023-02-23 13:22:58',0,NULL,27,1);
/*!40000 ALTER TABLE `rates` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-23 13:30:13
