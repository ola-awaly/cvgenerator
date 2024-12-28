-- MySQL dump 10.13  Distrib 8.0.23, for osx10.13 (x86_64)
--
-- Host: localhost    Database: cv_generator
-- ------------------------------------------------------
-- Server version	5.7.34

create database if not EXISTS cv_generator;
use cv_generator;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cvs`
--

DROP TABLE IF EXISTS `cvs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cvs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `intitule_de_poste` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `cp` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `date_de_naissance` date DEFAULT NULL,
  `nationalite` varchar(255) DEFAULT NULL,
  `permis_de_conduire` varchar(255) DEFAULT NULL,
  `situation_familiale` varchar(255) DEFAULT NULL,
  `disponibilite` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `custom_template_config` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `template_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `template_id` (`template_id`),
  CONSTRAINT `cvs_ibfk_125` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `cvs_ibfk_126` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cvs`
--

LOCK TABLES `cvs` WRITE;
/*!40000 ALTER TABLE `cvs` DISABLE KEYS */;
INSERT INTO `cvs` VALUES (1,'Adora3Awaly1656428466448',' ','Adora3','Awaly','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola@ola.be','2022-06-20',NULL,NULL,NULL,NULL,'/images/57818a07-fcf4-45e7-a597-a49acacf8e1a-cv1.jpeg',NULL,'0',NULL,'2022-06-28 15:01:06','2022-06-28 15:01:15',NULL,1,1),(2,'Adora3Awaly1656429018123',' ','Adora3','Awaly','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola@ola.be','2022-06-20',NULL,NULL,NULL,NULL,NULL,NULL,'0',NULL,'2022-06-28 15:10:18','2022-06-28 15:10:18',NULL,1,1),(3,'Mon premier CV',' ','Ola','Awaly','Rue adolphe max 8','6200','Chatelet','0949949494','09948494849','ola@ola.be','2022-06-21',NULL,NULL,NULL,NULL,NULL,NULL,'0',NULL,'2022-06-29 07:18:26','2022-06-29 07:22:31',NULL,2,1),(4,'cv testing',' professeur','Laurence','Durodez','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,'/images/061d2408-0c73-460e-9837-5afa2cf9c7c0-cv4.jpeg','{\"bgcolor\":\"#f2c000\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Courier New\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','2','/pdfs/75d78af9-9cb9-4aa9-a2b0-cde4e1f48f1f-cv4.pdf','2022-06-29 08:05:39','2022-07-01 07:36:56',NULL,4,1),(5,'cv2',' ','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"red\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Courier New\', Courier, monospace\",\"taillePolice\":\"12\",\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":\"36px\",\"posteFontSize\":\"20px\"}','2','/pdfs/d82ab376-4d35-4b0c-b92d-d1ae222841a8-cv5.pdf','2022-06-29 08:08:29','2022-06-30 12:24:21',NULL,4,1),(6,'un autre cv ',' ','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,NULL,'0',NULL,'2022-06-29 08:09:15','2022-06-30 14:47:46',NULL,4,1),(7,'Ola-upAwaly-up1656490319740',' ','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,NULL,'0',NULL,'2022-06-29 08:11:59','2022-06-29 08:11:59',NULL,4,1),(8,'Ola-upAwaly-up1656490364545',' ','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,NULL,'0',NULL,'2022-06-29 08:12:44','2022-06-29 08:12:44',NULL,4,1),(9,'Ola-upAwaly-up1656490394838',' Professeur','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,NULL,'1',NULL,'2022-06-29 08:13:14','2022-06-29 08:13:26','2022-06-30 14:47:52',4,1),(10,'le cv du milieu',' ','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,NULL,'0',NULL,'2022-06-29 08:19:31','2022-07-01 07:35:06',NULL,4,1),(11,'Ola-upAwaly-up1656490939652',' ','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,NULL,'0',NULL,'2022-06-29 08:22:19','2022-06-29 08:22:19','2022-06-29 17:46:22',4,1),(12,'Ola-upAwaly-up1656490955827',' ','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,NULL,'0',NULL,'2022-06-29 08:22:35','2022-06-29 08:22:35',NULL,4,1),(13,'Ola-upAwaly-up1656490974775',' ','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,'{\'bgcolor\':\'red\',\'sectionTitleFontSize\':\'16\',\'police\':\"\'Courier New\', Courier, monospace\",\'taillePolice\':\"12\",\r\n                        \'espaceSections\':\'10\',\'espaceParagraphes\':\'10\',\'titleFontSize\':\'36px\',\'posteFontSize\':\'20px\'}','0',NULL,'2022-06-29 08:22:54','2022-06-29 08:36:44',NULL,4,1),(14,'Ola-upAwaly-up1656491775867',' ','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,'{\'bgcolor\':\'red\',\'sectionTitleFontSize\':\'16\',\'police\':\"\'Courier New\', Courier, monospace\",\'taillePolice\':\"12\",\r\n                        \'espaceSections\':\'10\',\'espaceParagraphes\':\'10\',\'titleFontSize\':\'36px\',\'posteFontSize\':\'20px\'}','0',NULL,'2022-06-29 08:36:15','2022-06-29 08:36:21','2022-06-29 17:46:20',4,1),(15,'Ola-upAwaly-up1656492593181','','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-06-29 08:49:53','2022-06-29 08:49:53',NULL,4,1),(16,'Ola-upAwaly-up1656658650596','','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-09',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-01 06:57:30','2022-07-01 06:57:30',NULL,4,1),(17,'Nettoyeuse Professionnelle','Nettoyeuse de voiture','Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi','08859859869','0985985958','ola4@ola.be','1990-09-08','Belge','B','Marié',NULL,'/images/07dee0ef-ae96-4efb-b673-7ccf0a8ef8a8-cv17.jpeg','{\"bgcolor\":\"#0069a5\",\"sectionTitleFontSize\":17,\"police\":\"\'Arial\', sans-serif;\",\"taillePolice\":14,\"espaceSections\":16,\"espaceParagraphes\":26,\"titleFontSize\":49,\"posteFontSize\":20}','2','/pdfs/16aa9afd-30d8-48e1-b0a9-b497f41b6a0e-cv17.pdf','2022-07-01 07:00:41','2022-07-01 09:27:01',NULL,4,1),(18,'mon cv primaire','Vendeur','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04','NAtionalité',NULL,NULL,NULL,'/images/7ec43b33-2e1f-48c3-852c-4c08c7b80f99-cv18.jpeg','{\"bgcolor\":\"#3f3f3f\",\"sectionTitleFontSize\":14,\"police\":\"\'Georgia\', sans-serif;\",\"taillePolice\":14,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":\"36\",\"posteFontSize\":\"20\"}','2','/pdfs/f6be763b-ac80-403b-834a-b759451ed958-cv18.pdf','2022-07-01 09:40:38','2024-08-13 14:37:38',NULL,6,1),(19,'Ola8Awaly1656669395702','','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-01 09:56:35','2022-07-01 09:56:35','2024-08-13 14:51:38',6,1),(20,'Ola8Awaly1656669467980','','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-01 09:57:47','2022-07-01 09:57:47','2024-08-13 14:51:39',6,1),(21,'Ola8Awaly1656669500900','','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-01 09:58:20','2022-07-01 09:58:20','2024-08-13 14:51:39',6,1),(22,'Ola8Awaly1656669553171','','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-01 09:59:13','2022-07-01 09:59:13','2024-08-13 14:51:40',6,1),(23,'Ola8Awaly1656669808330','','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-01 10:03:28','2022-07-01 10:03:28','2024-08-13 14:51:40',6,1),(24,'Ola8Awaly1656670094173','','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-01 10:08:14','2022-07-01 10:08:14','2024-08-13 14:51:41',6,1),(25,'Ola8Awaly1656670098016','','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-01 10:08:18','2022-07-01 10:08:18','2024-08-13 14:51:41',6,1),(26,'Ola8Awaly1656679477691','Vendeuse','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,'/images/99c7e681-f79a-433f-838f-fae5bf45740b-cv26.jpeg','{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','1',NULL,'2022-07-01 12:44:37','2022-07-01 12:46:55','2024-08-13 14:51:42',6,1),(27,'Ola8Awaly1656680416605','','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-01 13:00:16','2022-07-01 13:00:16','2024-08-13 14:51:42',6,1),(28,'Ola8Awaly1656680419866','Vendeur','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','1',NULL,'2022-07-01 13:00:19','2022-07-01 13:11:57','2024-08-13 14:51:42',6,1),(29,'Ola8Awaly1656682573579','','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-01 13:36:13','2022-07-01 13:36:13','2024-08-13 14:51:43',6,1),(30,'Ola8Awaly1656682582598','vendeur','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','1',NULL,'2022-07-01 13:36:22','2022-07-01 13:36:38','2024-08-13 14:51:43',6,1),(31,'Ola8Awaly1656682655684','Vendeur','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','1',NULL,'2022-07-01 13:37:35','2022-07-01 13:37:46','2024-08-13 14:51:43',6,1),(32,'OlaAwaly1656841243773','','Ola','Awaly','adresse au hasard','3456','Charleroi','09505995959','047986886868','ola6@ola.be','2009-02-12',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-03 09:40:43','2022-07-03 09:40:43',NULL,5,1),(33,'Ola-Awaly1656934557254','','Ola ','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','awaly.ola@gmail.com','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-04 11:35:57','2022-07-04 11:35:57','2024-08-13 14:51:45',6,1),(34,'Ola-Awaly1656935051651','','Ola ','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','awaly.ola@gmail.com','2005-01-04',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-04 11:44:11','2022-07-04 11:44:11','2024-08-13 14:51:45',6,1),(35,'mon cv','Vendeuse','Ola8','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','ola8@ola.be','2005-01-04',NULL,NULL,NULL,NULL,'/images/2a316c64-5381-4d69-b7c2-8ab27d8ac92a-cv18.jpeg','{\"bgcolor\":\"#00a3c2\",\"sectionTitleFontSize\":14,\"police\":\"\'Courier New\', sans-serif;\",\"taillePolice\":14,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":\"36\",\"posteFontSize\":\"20\"}','2','/pdfs/35f0780d-647a-41ef-8605-2ecf2be5fe03-cv35.pdf','2022-07-04 11:44:24','2022-07-04 11:45:30',NULL,6,1),(36,'Ola-Awaly1656956764884','Chercheur','Ola ','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','awaly.ola@gmail.com','2005-01-04',NULL,NULL,NULL,NULL,'/images/e558c39e-3fd5-4a73-94fe-eebe8c88f993-cv36.jpeg','{\"bgcolor\":\"#0069a5\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Georgia\', sans-serif;\",\"taillePolice\":\"12\",\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":29,\"posteFontSize\":19}','2','/pdfs/fdc014ce-3ad0-4e3b-918f-63de6054b10c-cv36.pdf','2022-07-04 17:46:04','2022-07-04 17:57:36',NULL,6,1),(37,'Ola-Awaly1656957634643','Chercheur','Ola ','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','awaly.ola@gmail.com','2005-01-04',NULL,NULL,NULL,NULL,'/images/1652245f-dc08-42c6-9e98-73fa5598298d-cv37.jpeg','{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','1',NULL,'2022-07-04 18:00:34','2022-07-04 18:00:55',NULL,6,1),(38,'Ola-Awaly1656958189850','Vendeur','Ola ','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','awaly.ola@gmail.com','2005-01-03',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"red\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Courier New\', Courier, monospace\",\"taillePolice\":\"12\",\r\n                        \"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":\"36px\",\"posteFontSize\":\"20px\"}','1',NULL,'2022-07-04 18:09:49','2022-07-04 18:10:35',NULL,6,1),(39,'Vendeur','Vendeur','Ola ','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','awaly.ola@gmail.com','2005-01-03',NULL,NULL,NULL,NULL,'/images/a0964a17-622a-45bd-be75-6f29a6b01486-cv39.jpeg','{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','1',NULL,'2022-07-04 18:11:40','2022-07-04 18:15:17',NULL,6,1),(40,'chercheur','Chercheur','Harold','Dupont','Rue du la 8ème, 12 ','4560','ChezMoi','986868686','986986986968','awaly.ola@gmail.com','2000-05-06',NULL,NULL,NULL,NULL,'/images/33919925-4887-43d5-ba46-6e0d6fdf9428-cv40.jpeg','{\"bgcolor\":\"#c4b08f\",\"sectionTitleFontSize\":19,\"police\":\"\'Roboto\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":16,\"espaceParagraphes\":11,\"titleFontSize\":42,\"posteFontSize\":25}','2','/pdfs/4c8df68f-a313-44c5-87ac-54fe3353b193-cv40.pdf','2022-07-05 13:18:21','2024-08-13 14:43:49',NULL,6,1),(41,'Ola-Awaly1657030439495','','Ola ','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','986986986968','awaly.ola@gmail.com','2005-01-03',NULL,NULL,NULL,NULL,NULL,'{\"bgcolor\":\"#fe7a66\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Open Sans\', sans-serif;\",\"taillePolice\":15,\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":28,\"posteFontSize\":17}','0',NULL,'2022-07-05 14:13:59','2022-07-05 14:13:59','2024-08-13 14:53:34',6,1),(42,'Ola-Awalyàsuprimer','React developer','Ola ','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','986868686','9869869869999','awaly.ola@gmail.com','2005-01-03',NULL,NULL,NULL,NULL,'/images/5380e262-a909-48fd-a16c-d53b96c472b2-cv42.jpeg','{\"bgcolor\":\"#c4b08f\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Roboto\', sans-serif;\",\"taillePolice\":\"12\",\"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":\"36px\",\"posteFontSize\":\"20px\"}','2','/pdfs/9d32aae9-0ad2-47d3-91be-30ea9e7b9aa1-cv42.pdf','2024-08-13 14:45:18','2024-08-13 14:53:03',NULL,6,1);
/*!40000 ALTER TABLE `cvs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience_professionnelles`
--

DROP TABLE IF EXISTS `experience_professionnelles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience_professionnelles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule_de_poste` varchar(255) NOT NULL,
  `employeur` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `type_de_contrat` varchar(255) DEFAULT NULL,
  `date_de_debut_mois` varchar(255) DEFAULT NULL,
  `date_de_debut_annee` varchar(255) NOT NULL,
  `date_de_fin_mois` varchar(255) DEFAULT NULL,
  `date_de_fin_annee` varchar(255) NOT NULL,
  `en_cours` tinyint(1) NOT NULL,
  `description` text,
  `ordre` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `experience_professionnelles_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience_professionnelles`
--

LOCK TABLES `experience_professionnelles` WRITE;
/*!40000 ALTER TABLE `experience_professionnelles` DISABLE KEYS */;
INSERT INTO `experience_professionnelles` VALUES (1,'experience1','employeur1','ville','CDI','3','1946','4','1946',0,'',0,'2022-06-29 08:20:03','2022-06-29 08:20:03',NULL,11),(2,'Vendeur','Cora','Chatelineau','CDI','','2006','','2006',0,'',0,'2022-06-29 09:39:01','2022-06-29 09:41:19',NULL,16),(3,'Nettoyeur de voiture','Voiture SPRL','Bruxelles','CDI','7','2008','11','2010',0,'',1,'2022-07-01 07:10:06','2022-07-01 07:10:06',NULL,18),(4,'Nettoyeur de vélo','Velo SPRL','Paris','CDI','5','2007','6','2008',0,'Je nettoyais les vélos avec de l\'eau et du savon :)',0,'2022-07-01 07:10:06','2022-07-01 07:10:06',NULL,18),(5,'','','','','','','','',0,'',0,'2022-07-01 14:39:05','2022-07-01 14:39:05',NULL,25),(6,'','','','','','','','',0,'',0,'2022-07-01 14:39:08','2022-07-01 14:39:08',NULL,25),(7,'poste2 Vendeur','prenom','','','2','1944','2','1945',1,'',0,'2022-07-02 21:22:33','2022-07-05 12:52:31',NULL,26),(8,'poste2 Vendeur','prenom','','','2','1944','1','1945',0,'',0,'2022-07-04 11:44:24','2022-07-04 11:44:24',NULL,31),(9,'Chercheur','Big chercheur','Paris','CDI','5','1948','5','1948',0,'Je me cherchais, je me trouvais pas.. Je cherchais encore',1,'2022-07-04 17:51:20','2022-07-04 18:00:21',NULL,36),(10,'Trouveur','Big trouveur','Bruxelles','CDI','6','1951','8','1952',0,'Je me suis trouvée, ça y est',0,'2022-07-04 17:51:20','2022-07-04 18:00:21',NULL,36),(11,'Chercheur','Big chercheur','Paris','CDI','5','1948','5','1948',0,'Je me cherchais, je me trouvais pas.. Je cherchais encore',0,'2022-07-04 17:52:15','2022-07-04 17:52:15','2022-07-04 17:56:42',36),(12,'Trouveur','Big trouveur','Bruxelles','CDI','6','1951','8','1952',0,'Je me suis trouvée, ça y est',1,'2022-07-04 17:52:15','2022-07-04 17:52:15','2022-07-04 17:56:41',36),(13,'aaaaaa','aaaaa','aaaa','aaaa','','1948','','1968',0,'aaaaa',0,'2022-07-04 18:01:20','2022-07-04 18:01:20',NULL,40),(14,'poste','emp','','','','1947','','1948',0,'',1,'2022-07-05 12:50:55','2022-07-05 12:50:55','2022-07-05 12:52:27',26),(15,'Chercheur ','Big search','MaVille','CDI','6','2019','4','2020',0,'Je me cherchais, je me trouvais pas, je cherchais encore ... ',0,'2022-07-05 13:29:51','2024-08-13 14:41:13',NULL,44),(16,'Trouveur','Big found','Ma Deuxième Ville','CDI','7','2020','12','2021',0,'ça y est, j\'ai trouvé',1,'2022-07-05 13:29:51','2024-08-13 14:41:13',NULL,44),(17,'exp2','','','','','1944','','1945',0,'',0,'2024-08-13 14:47:46','2024-08-13 14:47:46',NULL,49),(18,'experience1','employeur1','chatelet','CDI','3','1947','1','1949',0,'',1,'2024-08-13 14:47:46','2024-08-13 14:47:46',NULL,49);
/*!40000 ALTER TABLE `experience_professionnelles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formations`
--

DROP TABLE IF EXISTS `formations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_etablissement` varchar(255) NOT NULL,
  `diplome` varchar(255) DEFAULT NULL,
  `domaine_etude` varchar(255) DEFAULT NULL,
  `mention` varchar(255) DEFAULT NULL,
  `date_de_debut_mois` varchar(255) DEFAULT NULL,
  `date_de_debut_annee` varchar(255) NOT NULL,
  `date_de_fin_mois` varchar(255) DEFAULT NULL,
  `date_de_fin_annee` varchar(255) NOT NULL,
  `en_cours` tinyint(1) NOT NULL,
  `description` text,
  `ordre` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `formations_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formations`
--

LOCK TABLES `formations` WRITE;
/*!40000 ALTER TABLE `formations` DISABLE KEYS */;
INSERT INTO `formations` VALUES (1,'Ecole de commerce','Vendeur professionnel','Business','Excellent','2','2001','4','2010',0,'description',0,'2022-06-29 08:15:53','2022-07-01 07:36:44',NULL,3),(2,'form1','dip1','dom','','','1947','','1947',0,'',0,'2022-06-29 08:37:04','2022-06-29 08:37:04',NULL,12),(3,'formation2','diplome2','domaine','très bien','','1944','','1948',0,'Une longue longue longue longue longue longue longue longuel ongue longue longue longuel ongue longuelongue longuelongue longuelongue longuel ongue longuelongue longue description',1,'2022-06-29 10:20:57','2022-07-01 07:36:44',NULL,3),(4,'Ecole de la misère','Diplome en misère','2002','très bien','3','1946','5','1946',1,'',0,'2022-07-02 22:16:24','2022-07-05 13:17:33',NULL,27),(5,'Ecole de la misère','Diplome en misère','2002','très bien','3','1946','2','1948',1,'',0,'2022-07-04 11:44:24','2022-07-04 11:44:24',NULL,33),(6,'Ecole de la recheche','Maitrise en recherche','Recherche Internationale','Excellent','1','2016','6','2019',0,'Nous avons appris à bien chercher',1,'2022-07-05 13:34:26','2022-07-11 09:29:33',NULL,45),(7,'Centre de formation pour chercheur','Google searcher','Formation en recherche sur google','Très bien','1','2022','7','2022',0,'Nous avons appris à bien chercher sur google',0,'2022-07-05 13:37:00','2022-07-11 09:29:33',NULL,45);
/*!40000 ALTER TABLE `formations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `langues`
--

DROP TABLE IF EXISTS `langues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `langues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `langue` varchar(255) NOT NULL,
  `niveau` varchar(255) NOT NULL,
  `info_sup` varchar(255) NOT NULL,
  `ordre` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `langues_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `langues`
--

LOCK TABLES `langues` WRITE;
/*!40000 ALTER TABLE `langues` DISABLE KEYS */;
INSERT INTO `langues` VALUES (1,'EN','B2','',1,'2022-06-29 08:24:17','2022-06-29 08:24:17',NULL,14),(2,'NL','C1','plus d\'ninfo',2,'2022-06-29 08:24:17','2022-06-29 08:24:17',NULL,14),(3,'FR','C1','ghghgd',0,'2022-06-29 08:24:17','2022-06-29 08:24:17',NULL,14),(4,'Français','B1','',1,'2022-06-29 09:39:21','2022-06-29 17:49:22',NULL,17),(5,'Espagnol','C1','',0,'2022-06-29 09:40:35','2022-06-29 17:49:22',NULL,17),(6,'FR','C1','',0,'2022-06-30 07:48:53','2022-06-30 07:48:53',NULL,5),(7,'Français','C2','',1,'2022-07-01 07:11:17','2022-07-01 07:18:01',NULL,20),(8,'Anglais','B1','Je me débrouille pas mal',2,'2022-07-01 07:11:17','2022-07-01 07:18:01',NULL,20),(9,'Arabe','C2','Langue Maternelle',0,'2022-07-01 07:16:09','2022-07-01 07:18:01',NULL,20),(10,'Français','A2','Information supplémentaire sur le truc',0,'2022-07-03 07:00:07','2022-07-05 13:14:11',NULL,29),(11,'Français','A2','Information supplémentaire sur le truc',0,'2022-07-04 11:44:24','2022-07-04 11:44:24',NULL,34),(12,'Français','C1','',0,'2022-07-04 17:53:39','2022-07-04 17:53:39',NULL,38),(13,'Anglais','B2','',1,'2022-07-04 17:53:39','2022-07-04 17:53:39',NULL,38),(14,'Espagnol','C2','info',1,'2022-07-05 13:14:11','2022-07-05 13:14:11',NULL,29),(15,'Anglais','B2','Il faut quand même',0,'2022-07-05 13:38:06','2024-08-13 14:42:18',NULL,46),(16,'Arabe','C2','Ma langue maternelle',2,'2022-07-05 13:38:06','2024-08-13 14:42:18',NULL,46),(17,'Français','C2','Super',1,'2022-07-05 13:38:06','2024-08-13 14:42:18',NULL,46),(18,'Tunisienne','B1','encore débutant',0,'2024-08-13 14:49:10','2024-08-13 14:49:10',NULL,51),(19,'allemand','B2','',1,'2024-08-13 14:49:10','2024-08-13 14:49:10',NULL,51);
/*!40000 ALTER TABLE `langues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liens`
--

DROP TABLE IF EXISTS `liens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lien` varchar(255) NOT NULL,
  `commentaire` varchar(255) NOT NULL,
  `ordre` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `section_id` (`section_id`),
  CONSTRAINT `liens_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liens`
--

LOCK TABLES `liens` WRITE;
/*!40000 ALTER TABLE `liens` DISABLE KEYS */;
INSERT INTO `liens` VALUES (1,'http://lien.be','commentaire',0,'2022-06-30 07:56:13','2022-06-30 07:56:13',NULL,6),(2,'http://lienIntagram.com','Suivez-moi aussi',1,'2022-07-01 07:12:09','2022-07-01 07:12:09',NULL,21),(3,'http://lienlinkedin.com','Suivez-moi',0,'2022-07-01 07:12:09','2022-07-01 07:12:09',NULL,21),(4,'lien.be','Mon protfolio: contient tous mes projets',0,'2022-07-03 07:24:46','2022-07-04 08:36:07',NULL,30),(5,'lien.be','Mon protfolio: contient tous mes projets',0,'2022-07-04 11:44:24','2022-07-04 11:44:24',NULL,35),(6,'linked.com','linked in link',0,'2022-07-04 17:54:21','2022-07-04 17:54:21',NULL,39),(7,'instagram.be','commentaire ',1,'2022-07-04 17:54:21','2022-07-04 17:54:21',NULL,39),(8,'mon-lien-linkedin-par.exemple','Mon lien linked in',0,'2022-07-05 13:39:12','2022-07-05 13:39:12',NULL,47),(9,'mon-portfolio.moi','Tous mes projets',1,'2022-07-05 13:39:12','2022-07-05 13:39:12',NULL,47);
/*!40000 ALTER TABLE `liens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `ordre` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `cv_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sections_id_type` (`id`,`type`),
  KEY `cv_id` (`cv_id`),
  CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`cv_id`) REFERENCES `cvs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'Formations','','formation','gauche',2,'2022-06-28 15:09:56','2022-06-28 15:09:56',NULL,1),(2,'Formations','','formation','gauche',2,'2022-06-28 15:10:31','2022-06-28 15:10:31',NULL,2),(3,'Formations','','formation','gauche',2,'2022-06-29 08:05:45','2022-07-01 07:36:55',NULL,4),(4,'Compétences','<p>jkjkjk</p>','competence','gauche',1,'2022-06-29 08:08:42','2022-06-30 07:56:37',NULL,5),(5,'Langues','','langue','droit',1,'2022-06-29 08:08:42','2022-06-30 07:56:37',NULL,5),(6,'Liens','','lien','gauche',2,'2022-06-29 08:08:58','2022-06-30 07:56:37',NULL,5),(7,'Compétences','<p>jkjk</p>','competence','gauche',2,'2022-06-29 08:12:09','2022-06-29 08:12:09',NULL,7),(8,'Liens','','lien','gauche',4,'2022-06-29 08:12:15','2022-06-29 08:12:15',NULL,7),(9,'Compétences','<p>jkj</p>','competence','gauche',2,'2022-06-29 08:12:54','2022-06-29 08:12:54',NULL,8),(10,'Compétences','<ol><li>Réactif</li><li>Intelligent</li><li>Autonome</li><li>Intéractif</li></ol>','competence','gauche',1,'2022-06-29 08:16:04','2022-07-01 07:36:55',NULL,4),(11,'Expériences professionnelles','','experience','droit',1,'2022-06-29 08:19:36','2022-06-29 08:19:36',NULL,10),(12,'Formations','','formation','gauche',2,'2022-06-29 08:23:01','2022-06-29 08:23:01',NULL,13),(13,'Compétences','<p>comp1</p><p>comp2</p>','competence','gauche',2,'2022-06-29 08:23:31','2022-06-29 08:23:31',NULL,13),(14,'Langues','','langue','droit',3,'2022-06-29 08:23:33','2022-06-29 08:23:33',NULL,13),(15,'Compétences','<p>kj</p><ol><li>klkl</li><li>jjj</li><li>jjjjj</li><li>jjjj</li><li>jj</li></ol>','competence','gauche',2,'2022-06-29 08:50:14','2022-06-29 08:50:14',NULL,15),(16,'Expériences professionnelles','','experience','droit',1,'2022-06-29 09:38:45','2022-07-01 07:36:55',NULL,4),(17,'Langues','','langue','droit',2,'2022-06-29 09:39:07','2022-07-01 07:36:55',NULL,4),(18,'Expériences professionnelles','','experience','gauche',1,'2022-07-01 07:07:50','2022-07-01 09:27:00',NULL,17),(19,'Compétences','<ol><li>Propre</li><li>Rapide</li><li>Réactive</li><li>Gentille</li><li>Aimable</li><li>Fiable</li></ol>','competence','droit',1,'2022-07-01 07:10:41','2022-07-01 09:27:00',NULL,17),(20,'Langues','','langue','droit',2,'2022-07-01 07:10:43','2022-07-01 09:27:00',NULL,17),(21,'Liens','','lien','gauche',2,'2022-07-01 07:11:19','2022-07-01 09:27:00',NULL,17),(22,'Expériences professionnelles','','experience','droit',1,'2022-07-01 12:48:59','2022-07-01 12:48:59',NULL,26),(23,'Expériences professionnelles','','experience','droit',1,'2022-07-01 13:12:03','2022-07-01 13:12:03',NULL,28),(24,'Expériences professionnelles','','experience','droit',1,'2022-07-01 13:36:45','2022-07-01 13:36:45',NULL,30),(25,'Expériences professionnelles','','experience','droit',1,'2022-07-01 13:37:51','2022-07-01 13:37:51',NULL,31),(26,'Expériences professionnelles','','experience','gauche',2,'2022-07-01 14:41:29','2024-08-13 14:37:37',NULL,18),(27,'Formations','','formation','gauche',1,'2022-07-02 21:50:53','2024-08-13 14:37:37',NULL,18),(28,'Compétences','<ol><li>Gamer</li><li>Aventureuse</li><li>Travailleuse</li><li>Persévérante</li><li>ajouté</li></ol>','competence','droit',1,'2022-07-02 22:18:18','2024-08-13 14:37:37',NULL,18),(29,'Langues','','langue','droit',2,'2022-07-02 22:18:22','2024-08-13 14:37:37',NULL,18),(30,'Liens','','lien','gauche',3,'2022-07-03 07:00:10','2024-08-13 14:37:37',NULL,18),(31,'Expériences professionnelles','','experience','droit',2,'2022-07-04 11:44:24','2022-07-04 11:45:29',NULL,35),(32,'Compétences','<ol><li>Gamer</li><li>Aventureuse</li><li>Travailleuse</li><li>Persévérante</li><li>ajouté</li></ol>','competence','gauche',1,'2022-07-04 11:44:24','2022-07-04 11:45:29',NULL,35),(33,'Formations','','formation','droit',1,'2022-07-04 11:44:24','2022-07-04 11:45:29',NULL,35),(34,'Langues','','langue','gauche',3,'2022-07-04 11:44:24','2022-07-04 11:45:29',NULL,35),(35,'Liens','','lien','gauche',2,'2022-07-04 11:44:24','2022-07-04 11:45:29',NULL,35),(36,'Expériences professionnelles','','experience','gauche',1,'2022-07-04 17:47:32','2022-07-04 17:57:35',NULL,36),(37,'Compétences','<ol><li>Laborieuse</li><li>Persévérante</li><li>Autonome</li><li>Intelligente</li></ol>','competence','droit',1,'2022-07-04 17:52:55','2022-07-04 17:57:35',NULL,36),(38,'Langues','','langue','droit',2,'2022-07-04 17:52:57','2022-07-04 17:57:35',NULL,36),(39,'Liens','','lien','gauche',2,'2022-07-04 17:53:42','2022-07-04 17:57:35',NULL,36),(40,'Expériences professionnelles','','experience','droit',1,'2022-07-04 18:00:59','2022-07-04 18:00:59',NULL,37),(41,'Compétences','<p>zzzz</p>','competence','gauche',2,'2022-07-04 18:01:26','2022-07-04 18:01:26',NULL,37),(42,'Expériences professionnelles','','experience','droit',1,'2022-07-04 18:12:08','2022-07-04 18:12:08',NULL,39),(43,'Compétences','<p>d</p>','competence','gauche',2,'2022-07-04 18:12:45','2022-07-04 18:12:45',NULL,39),(44,'Expériences professionnelles','','experience','gauche',1,'2022-07-05 13:26:25','2024-08-13 14:43:49',NULL,40),(45,'Formations','','formation','gauche',2,'2022-07-05 13:29:53','2024-08-13 14:43:49',NULL,40),(46,'Langues','','langue','droit',2,'2022-07-05 13:37:04','2024-08-13 14:43:49',NULL,40),(47,'Liens','','lien','gauche',3,'2022-07-05 13:38:08','2024-08-13 14:43:49',NULL,40),(48,'Compétences','<ol><li>Je cherche très bien</li><li>Minutieux</li><li>Précis</li><li>Autonome: je cherche tout seul</li><li>Vue : 10/10</li></ol>','competence','droit',1,'2022-07-05 13:41:42','2024-08-13 14:43:49',NULL,40),(49,'Expériences professionnelles','','experience','gauche',2,'2024-08-13 14:46:37','2024-08-13 14:53:03',NULL,42),(50,'Compétences','<p>Je suis très compétent</p>','competence','gauche',1,'2024-08-13 14:48:39','2024-08-13 14:53:03',NULL,42),(51,'Langues','','langue','droit',1,'2024-08-13 14:48:41','2024-08-13 14:53:03',NULL,42);
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule` varchar(255) NOT NULL,
  `config_par_defaut` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (1,'basic','{\"bgcolor\":\"red\",\"sectionTitleFontSize\":\"16\",\"police\":\"\'Courier New\', Courier, monospace\",\"taillePolice\":\"12\",\r\n                        \"espaceSections\":\"10\",\"espaceParagraphes\":\"10\",\"titleFontSize\":\"36px\",\"posteFontSize\":\"20px\"}','/images/basic-template.png','2022-06-28 14:58:22','2022-06-28 14:58:22',NULL);
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `cp` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `date_de_naissance` date DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `token_forget_password` varchar(255) DEFAULT NULL,
  `token_forget_password_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
  
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','ola12@ola.be','1990-09-09','$2a$10$kwqOd08Iljn78RZbD1XHMulvcu.isJlQPP3s7OpTf4/WVvIfRCNX2','admin',NULL,NULL,'2022-06-28 14:57:03','2022-06-29 07:32:43',NULL),(2,'Ola','Awaly','Rue adolphe max 8','6200','Chatelet',NULL,'0949949494','09948494849','ola@ola.be','2022-06-21','$2a$10$kwqOd08Iljn78RZbD1XHMulvcu.isJlQPP3s7OpTf4/WVvIfRCNX2','user',NULL,NULL,'2022-06-28 19:12:40','2022-06-29 07:22:05',NULL),(3,'Adora3','Awaly','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','ola3@ola.be','2022-06-20','$2a$10$tPyk5Mcblj.nxVtGy4qb2usL63hu8pMJzZJELucuUIWQmUhX3iu8i','user',NULL,NULL,'2022-06-29 07:34:33','2022-06-29 07:34:33',NULL),(4,'Ola','Awaly','Rue de la mensonge,8','3400','charleroi','Belgique','08859859869','0985985958','ola4@ola.be','1990-09-09','$2a$10$kwqOd08Iljn78RZbD1XHMulvcu.isJlQPP3s7OpTf4/WVvIfRCNX2','user',NULL,NULL,'2022-06-29 07:36:40','2022-07-01 09:32:25',NULL),(5,'Ola','Awaly','adresse au hasard','3456','Charleroi',NULL,'09505995959','047986886868','ola6@ola.be','2009-02-12','$2a$10$kwqOd08Iljn78RZbD1XHMulvcu.isJlQPP3s7OpTf4/WVvIfRCNX2','user',NULL,NULL,'2022-07-01 07:54:12','2022-07-01 08:44:40',NULL),(6,'Ola ','Awaly','Rue du la 8ème,12 ','4560','ChezMoi','MonPays','986868686','9869869869999','awaly.ola@gmail.com','2005-01-03','$2a$10$8w/F7tEpRLXa1W5m2gyHuuF6GDFJaQgVpRIniGCMEXzNJsITreg52','user','30654bae-7444-44dc-8a85-b404ea4fa3e1','2024-08-13 14:34:16','2022-07-01 09:37:37','2024-08-13 14:36:27',NULL),(7,'Adora3','Awaly','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','adora3@ola.be','1990-09-09','$2a$10$rSmSQJq.i/Hwf9GGYgEnRO888g2RwqhnCLDdcjYxoZn9B7u7sXnkS','user',NULL,NULL,'2024-09-03 16:54:51','2024-09-03 16:54:51',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_0`
--

DROP TABLE IF EXISTS `users_0`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_0` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `cp` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `date_de_naissance` date DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_0`
--

LOCK TABLES `users_0` WRITE;
/*!40000 ALTER TABLE `users_0` DISABLE KEYS */;
INSERT INTO `users_0` VALUES (1,'Ola up','Awaly up','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','ola12@ola.be','1990-09-09','$2a$10$De9yzAnQYyV7EGMWJIXNmOq6h7WpVPYWUI9z1ilxMqiuIZrxPXC.2','admin','2022-05-17 08:54:17','2022-05-17 08:57:44',NULL),(2,'Adora','Awaly','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','adora@ola.be','1990-09-09','$2a$10$kllVv0JdQIYKz9MJNQQWtOJFSQ9Ixbla.8s9Luutsa4/1NW/geSpy','user','2022-05-17 08:59:38','2022-05-17 08:59:38','2022-05-17 09:00:11'),(4,'Adora3','Awaly','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','adora3@ola.be','1990-09-09','$2a$10$rLa3xGjwfgPvqCHKeRlVIOnb8q6pn/q1b3pNo2GFhgRhm2QlrHgAC','user','2022-05-17 12:23:19','2022-05-17 12:23:19',NULL),(6,'Adora3','Awaly','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','adora4@ola.be','1990-09-09','$2a$10$/LmM18txDHLh2kGxxDe2geMq5NYATdkng8zLghPif/pYTos95Fx3q','user','2022-06-13 13:59:12','2022-06-13 13:59:12',NULL),(7,'prenom','nom','adresse','34567','ville',NULL,'9849894849','98498948948','email@email.com','1992-02-06','$2a$10$Kf23.bKzDdJKuOT9D92Sf.p2NGRtt78NmTZjtq6KIzkqCwyUy6XDW','user','2022-06-13 14:39:22','2022-06-13 14:39:22',NULL),(8,'hjjh','hjjhj',NULL,NULL,NULL,NULL,NULL,NULL,'hjhjhj@hjhjh.be',NULL,'$2a$10$kWFjOWEzSvV8t/fyP8BTQu9L.peLtxROJe.utbR49KTtjnFQVXWfm','user','2022-06-14 08:39:55','2022-06-14 08:39:55',NULL),(14,'hjhjh','hjhjhjh',NULL,NULL,NULL,NULL,NULL,NULL,'hjhjhj@hjhh.be',NULL,'$2a$10$WRk.D.JHlhGJP6zVzq53/uuXmwWT3udGnLqDPQywHazY49ekLzud6','user','2022-06-14 08:58:16','2022-06-14 08:58:16',NULL),(16,'prenom','nom',NULL,NULL,NULL,NULL,NULL,NULL,'test@test.be',NULL,'$2a$10$f4OYf9myo/FbT3AiQpS9h.aCQWeyZ3faeKSIJHgbt/AxT2Q0Xr3RK','user','2022-06-14 10:06:01','2022-06-14 10:06:01',NULL),(17,'prenom','nom',NULL,NULL,NULL,NULL,NULL,NULL,'testing@tes.be',NULL,'$2a$10$Ov2VIthGSSZSyUEwqEKpAu8LZ9J5Fe1U9D.vtJifyHIfWGoU4ip1y','user','2022-06-15 06:53:42','2022-06-15 06:53:42',NULL),(18,'Aurélie','Déchamps','Adresse','345','ville',NULL,'09859859859','098595859','nouveau@nouveau.be','2022-06-08','$2a$10$0r/JGwUGT/WBe8tNOpwdG.mm8CnYvD0wsZTtbY9RH1KLa.flA.HvS','user','2022-06-15 12:04:57','2022-06-15 12:04:57',NULL),(20,'Adora3','Awaly','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','adora45@ola.be','2023-09-09','$2a$10$hZ5iFbVPUc3SSZXGJQuVA.jiTbPh3BLdP6j8EVeDQIHtVHoQQpEmO','user','2022-06-28 09:05:45','2022-06-28 09:05:45',NULL),(22,'Adora3','Awaly','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','adora5555@ola.be','2023-09-09','$2a$10$5lZCLjEKOe37.vQR2W0eZexvhK15Afa5tJNArm3tPYaOGHVHhFSna','usery','2022-06-28 09:06:12','2022-06-28 09:06:12',NULL),(23,'Adora3','Awaly','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','adora555@ola.be','2023-09-09','$2a$10$kKMTCXnr.4Ik1vYbbuZVneiIFs/xUfl3shQC18MIn9GnDo9UQYm3y','usery','2022-06-28 09:08:30','2022-06-28 09:08:30',NULL),(25,'Adora3','Awaly','Rue de la mensonge,8','3400','charleroi',NULL,'08859859869','0985985958','ador555@ola.be','2023-09-09','$2a$10$LklksaKyDaqWEdtYVOyPWesJyEo8oXokOtBZeBhVeqETdvWXnwTvC','usery','2022-06-28 09:10:42','2022-06-28 09:10:42',NULL);
/*!40000 ALTER TABLE `users_0` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-03 21:10:22
