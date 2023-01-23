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
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('dL3APWagYGXD2oD5GZ3mPb6WFMG1IRJl',1674742860,'{\"cookie\":{\"originalMaxAge\":604799999,\"expires\":\"2023-01-26T13:21:47.243Z\",\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"user\":1}'),('nLVEgkEOQ6FXZFT20fNpYLqwWczfp9a1',1674601632,'{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2023-01-24T16:51:34.814Z\",\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"user\":6}'),('ruhxUlIwoPbreytEtN7o4Whchgrijsbx',1674997146,'{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2023-01-29T10:58:52.469Z\",\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"user\":11}'),('uBXfkQ2PXACG0F6JvAULrTemknDoSfzP',1674925260,'{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2023-01-28T11:28:06.769Z\",\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"user\":9}'),('ySJBzHySS6vQVy4fPt326vQM2kfZ8NB5',1674908142,'{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2023-01-26T20:52:09.756Z\",\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"user\":1}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-22 14:07:49
