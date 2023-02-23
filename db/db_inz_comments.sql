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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id_comment` int NOT NULL AUTO_INCREMENT,
  `content_comment` mediumtext NOT NULL,
  `publication_date` datetime NOT NULL,
  `edited` tinyint DEFAULT NULL,
  `user` int NOT NULL,
  `text` int NOT NULL,
  PRIMARY KEY (`id_comment`),
  UNIQUE KEY `idcomment_UNIQUE` (`id_comment`),
  KEY `fk_comments_users_idx` (`user`),
  KEY `fk_comments_texts1_idx` (`text`),
  CONSTRAINT `fk_comments_texts1` FOREIGN KEY (`text`) REFERENCES `texts` (`id_text`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_users` FOREIGN KEY (`user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'dfgfdsgdfgdf','2023-01-25 18:01:12',NULL,3,6),(2,'Wspaniały wywiad.','2023-01-25 21:00:48',NULL,1,4),(3,'Całkiem interesujące.','2023-01-26 12:00:30',NULL,2,6),(4,'Zgadzam się z autorem','2023-01-26 12:09:05',NULL,2,7),(6,'test2','2023-01-26 12:24:38',NULL,2,7),(7,'test3','2023-01-26 12:27:36',NULL,2,7),(9,'Faktycznie.','2023-01-26 12:42:57',NULL,2,6),(10,'Cbdfsgbdfbvdffdsfdsfvdsfvds','2023-01-26 12:50:03',1,2,7),(11,'zxysdgdfsgdsgdsghdfhdfhdfh','2023-01-26 13:20:22',1,2,7),(12,'zyx','2023-01-26 13:39:30',NULL,2,6),(13,'abc','2023-01-26 13:51:43',NULL,2,6),(14,'qwerty','2023-01-26 13:58:56',NULL,2,6),(15,'123456','2023-01-26 14:00:08',NULL,2,6),(16,'aha','2023-01-26 14:01:44',NULL,2,6),(17,'zzzzz','2023-01-26 14:04:03',NULL,2,6),(18,'1111bdsfsgdfgdfgdffdsfds','2023-01-26 14:16:13',NULL,2,7),(27,'testowanie','2023-01-26 15:22:17',NULL,2,6),(28,'test','2023-01-26 15:37:44',NULL,2,6),(29,'ddddd','2023-01-26 15:39:26',NULL,2,6),(31,'kom1','2023-01-26 16:34:55',NULL,2,5),(32,'gfhgf','2023-01-26 17:06:24',NULL,2,6),(33,'vbvbxvb','2023-01-26 17:16:29',NULL,2,6),(34,'test','2023-01-26 17:27:00',NULL,2,2),(35,'xyz','2023-01-26 17:27:21',NULL,2,2),(37,'test','2023-01-26 17:48:13',NULL,2,1),(38,'gfdgdf','2023-01-26 17:54:32',NULL,2,1),(39,'test','2023-01-26 17:56:08',NULL,2,1),(40,'test','2023-01-26 18:02:24',NULL,11,3),(41,'test','2023-01-26 18:02:28',NULL,11,3),(42,'xyz','2023-01-26 18:03:42',NULL,11,3),(43,'xyz','2023-01-26 18:13:38',NULL,11,3),(45,'5','2023-01-26 18:22:25',NULL,2,1),(46,'kl/lk/','2023-01-26 18:26:55',NULL,11,3),(47,'xyz','2023-01-26 18:28:37',NULL,2,4),(48,'xyz','2023-01-26 18:28:59',NULL,2,5),(49,'xyz','2023-01-26 18:29:22',NULL,2,3),(50,'123456','2023-01-26 18:29:51',NULL,2,6),(51,'vvvvv','2023-01-26 18:30:51',NULL,2,6),(52,'khkhjm','2023-01-26 18:36:11',NULL,2,6),(53,'cvxccxvbcvxbvx','2023-01-26 18:38:20',NULL,2,6),(54,'bdfvbdfbvdfbv','2023-01-26 18:38:40',NULL,2,6),(55,'xyzz','2023-01-26 18:40:59',NULL,2,6),(56,'kkk','2023-01-26 18:43:51',NULL,2,6),(58,'kjvdfajkdfahj','2023-01-26 18:56:58',NULL,2,6),(62,'hfdhfsdhsf','2023-01-26 21:02:08',NULL,2,3),(68,'fdsgdsvs','2023-01-27 10:46:18',NULL,11,1),(70,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','2023-01-27 12:57:45',NULL,2,7),(71,'dshfihdfiuvhdfjihvfdhdsjkdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff','2023-01-27 14:27:32',NULL,3,2),(72,'kdvbbsdbvsvb','2023-01-28 14:07:57',NULL,9,7);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-23 13:30:14
