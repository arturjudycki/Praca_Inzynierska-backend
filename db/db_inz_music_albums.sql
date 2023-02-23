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
-- Table structure for table `music_albums`
--

DROP TABLE IF EXISTS `music_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `music_albums` (
  `id_music_album` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `release_date` date NOT NULL,
  `duration` varchar(45) NOT NULL,
  `type_of_album` enum('studio_album','live_album','compilation_album','EP','OST') NOT NULL,
  `genre` varchar(255) NOT NULL,
  `record_label` varchar(255) NOT NULL,
  PRIMARY KEY (`id_music_album`),
  UNIQUE KEY `idmusic-album_UNIQUE` (`id_music_album`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `music_albums`
--

LOCK TABLES `music_albums` WRITE;
/*!40000 ALTER TABLE `music_albums` DISABLE KEYS */;
INSERT INTO `music_albums` VALUES (20,'Nevermind','cover_1675630744838_.jpg','1991-01-24','49 min 14 s','studio_album','grunge, rock alternatywny, rock','Geffen Records'),(21,'In Utero','cover_1675952620262_.jpg','1993-09-21','41 min 21 s','studio_album','grunge, rock alternatywny, rock','Geffen Records'),(22,'Bleach','cover_1675423727413_.jpg','1989-06-15','42 min 44 s','studio_album','grunge, hard rock, rock','Sub Pop'),(24,'The Velvet Underground & Nico','cover_1675435353989_.jpg','1968-03-12','47 min 51 s','studio_album','rock, rock awangardowy, art rock','Verve Records'),(25,'Ten','cover_1675444612524_.jpg','1991-08-27','53 min 20 s','studio_album','grunge, hard rock, rock','Epic Records'),(26,'Vitalogy','cover_1677151861077_.jpg','1994-11-22','55:09','studio_album','grunge, hard rock, rock','Epic Records'),(27,'Best of Bowie','cover_1677153257911_.jpg','2002-10-22','2:36:20','compilation_album','glam rock, art rock','EMI Records, Virgin Records'),(28,'Yield','cover_1677153585168_.jpg','1998-02-03','48:37','studio_album','grunge, hard rock, rock','Epic Records'),(29,'No Code','cover_1677154117991_.jpg','1996-08-27','49min 37s','studio_album','hard rock, rock','Epic Records'),(30,'Jar of Flies','cover_1677154222387_.jpg','1994-01-25','30min 49s','EP','grunge, alternative rock','Columbia Records'),(31,'Sap','cover_1677154672966_.jpg','1992-02-04','20min 49s','EP','grunge, rock alternatywny','Columbia Records'),(32,'Blade Runner','cover_1677154870045_.jpg','1994-06-06','57min 39s','OST','elektroniczna, ambient','Atlantic Records');
/*!40000 ALTER TABLE `music_albums` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-23 13:30:12
