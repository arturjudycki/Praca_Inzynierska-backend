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
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `id_artist` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `members` mediumtext NOT NULL,
  PRIMARY KEY (`id_artist`),
  UNIQUE KEY `id_artist_UNIQUE` (`id_artist`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (23,'Nirvana','Amerykański zespół grunge’owy, założony przez wokalistę i gitarzystę Kurta Cobaina i basistę Krista Novoselica w Aberdeen (USA) w 1987. Zespół w ciągu siedmiu lat swojej działalności zatrudniał kilku perkusistów (najdłużej w zespole grał Dave Grohl, który dołączył do grupy w 1990). ','Kurt Cobain - wokal, gitara\nKrist Novoselic - bas\nDave Grohl - perkusja'),(26,'The Velvet Underground','The Velvet Underground jest nowatorskim amerykańskim zespołem rockowym, należącym do awangardy rockowej. Grupa była aktywna głównie w latach 60. Zespół jest najwybitniejszym muzycznym przedstawicielem nurtu pop art. Formacja czerpała inspirację z muzyki współczesnej amerykańskiej awangardy, której głównym przedstawicielem był ekstrawagancki kompozytor John Cage. Muzycy znani są jako pionierzy takich gatunków muzyki popularnej jak: noise rock, alternatywny rock i punk rock. Ich znakiem rozpoznawczym były bardzo poetyckie i często bulwersujące teksty utworów, w których poruszali tematy taboo. ','Lou Reed - wokal, gitara\nJohn Cale - wokal, klawisze\nSterling Morrison - bas\nMoe Tucker - perkusja'),(27,'Nico','Niemiecka modelka, aktorka, piosenkarka, jedna z muz Andy’ego Warhola. Zasłynęła jako wokalistka The Velvet Underground, którego współzałożyciel John Cale znacząco ukształtował jej dorobek muzyczny jako producent muzyczny, instrumentalista, kompozytor i autor śpiewanych przez nią piosenek i tekstów. ','Nico - wokal'),(28,'Pearl Jam','Amerykański zespół muzyczny założony w 1990 w Seattle w stanie Waszyngton. Wraz z grupami Alice in Chains, Nirvana i Soundgarden zaliczany jest do tzw. „Wielkiej Czwórki z Seattle”. ','Eddie Vedder - wokal, gitara\nStone Gossard - gitara\nJeff Ament - bas\nMike McCready - gitara\nMatt Cameron - perkusja\nBoom Gaspar - klawisze');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-06 17:37:37
