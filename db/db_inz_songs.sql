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
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id_song` int NOT NULL AUTO_INCREMENT,
  `track_number` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `duration` varchar(5) NOT NULL,
  `music_album` int NOT NULL,
  `artist` int NOT NULL,
  PRIMARY KEY (`id_song`),
  UNIQUE KEY `id_song_UNIQUE` (`id_song`),
  KEY `fk_songs_music_albums1_idx` (`music_album`),
  KEY `fk_songs_artists1_idx` (`artist`),
  CONSTRAINT `fk_songs_artists1` FOREIGN KEY (`artist`) REFERENCES `artists` (`id_artist`) ON DELETE CASCADE,
  CONSTRAINT `fk_songs_music_albums1` FOREIGN KEY (`music_album`) REFERENCES `music_albums` (`id_music_album`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,1,'Smells Like Teen Spirit','5:02',20,23),(2,2,'In Bloom','4:15',20,23),(3,3,'Come As You Are','3:39',20,23),(6,4,'Breed','3:04',20,23),(7,5,'Lithium','4:17',20,23),(8,6,'Polly','2:54',20,23),(9,7,'Territorial Pissings','2:23',20,23),(10,8,'Drain You','3:44',20,23),(11,9,'Lounge Act','2:36',20,23),(12,10,'Stay Away','3:31',20,23),(13,11,'On A Plain','3:14',20,23),(14,12,'Something In The Way','3:52',20,23),(15,13,'Endless, Nameless','6:43',20,23);
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-14 21:45:22
