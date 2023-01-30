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
  `type_of_album` enum('studio_album','live_album','compilation_album','EP') NOT NULL,
  `genre` varchar(255) NOT NULL,
  `record_label` varchar(255) NOT NULL,
  PRIMARY KEY (`id_music_album`),
  UNIQUE KEY `idmusic-album_UNIQUE` (`id_music_album`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `music_albums`
--

LOCK TABLES `music_albums` WRITE;
/*!40000 ALTER TABLE `music_albums` DISABLE KEYS */;
INSERT INTO `music_albums` VALUES (4,'ggggg','cover_1675093690357_.jpg','1994-05-12','gdfg','studio_album','dfgfgfs','vdfvdfvf'),(5,'ggggg','cover_1675096472248_.jpg','1994-05-12','gdfg','studio_album','dfgfgfs','vdfvdfvf'),(6,'ggggg','cover_1675096496554_.jpg','1994-05-12','gdfg','studio_album','dfgfgfs','vdfvdfvf'),(7,'ggggg','cover_1675099647487_.jpg','1994-05-12','gdfg','studio_album','dfgfgfs','vdfvdfvf'),(8,'ggggg','cover_1675099940016_.jpg','1994-05-12','gdfg','studio_album','dfgfgfs','vdfvdfvf'),(9,'ggggg','cover_1675100214499_.jpg','1994-05-12','gdfg','studio_album','dfgfgfs','vdfvdfvf'),(10,'ggggg','cover_1675100432818_.jpg','1994-05-12','gdfg','studio_album','dfgfgfs','vdfvdfvf'),(11,'ggggg','cover_1675100511935_.jpg','1994-05-12','gdfg','studio_album','dfgfgfs','vdfvdfvf');
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

-- Dump completed on 2023-01-30 18:49:14
