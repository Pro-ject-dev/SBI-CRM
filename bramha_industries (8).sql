-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2025 at 07:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bramha_industries`
--

-- --------------------------------------------------------

--
-- Table structure for table `addons`
--

CREATE TABLE `addons` (
  `id` int(11) NOT NULL,
  `date` mediumtext NOT NULL,
  `name` mediumtext NOT NULL,
  `ratePerKg` mediumtext NOT NULL,
  `grade` mediumtext NOT NULL,
  `weightOfObject` mediumtext NOT NULL,
  `length` mediumtext NOT NULL,
  `width` mediumtext NOT NULL,
  `thickness` mediumtext NOT NULL,
  `minCost` mediumtext NOT NULL,
  `maxCost` mediumtext NOT NULL,
  `remark` mediumtext DEFAULT NULL,
  `status` mediumtext NOT NULL,
  `createdAt` mediumtext NOT NULL,
  `updatedAt` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `addons`
--

INSERT INTO `addons` (`id`, `date`, `name`, `ratePerKg`, `grade`, `weightOfObject`, `length`, `width`, `thickness`, `minCost`, `maxCost`, `remark`, `status`, `createdAt`, `updatedAt`) VALUES
(23, '2025-05-14', 'add ons test', '10', '304', '100', '10', '10', '1.5', '5', '15', 'test only', '1', '2025-10-13 06:20:41', '2025-10-13 06:20:41');

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` int(11) NOT NULL,
  `title` mediumtext NOT NULL,
  `acName` mediumtext NOT NULL,
  `acType` mediumtext NOT NULL,
  `ifscCode` mediumtext NOT NULL,
  `bankName` mediumtext NOT NULL,
  `acNumber` mediumtext NOT NULL,
  `micrCode` mediumtext NOT NULL,
  `status` mediumtext NOT NULL,
  `createdAt` mediumtext NOT NULL,
  `updatedAt` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `title`, `acName`, `acType`, `ifscCode`, `bankName`, `acNumber`, `micrCode`, `status`, `createdAt`, `updatedAt`) VALUES
(4, 'SBI 113', 'SRI BRAMHA INDUSTRIES', 'current account', 'KVBL0001262', 'KVB', '1262280000000113', '620053004', '1', '2025-10-05 18:23:06', '2025-10-05 18:23:06'),
(5, 'SBCK CUB', 'SRI BRAMHA COMMERICIAL KITCHEN EQUIPMENTS', 'current account', 'CIUB0000441', 'City Union Bank', '510909010137075', '641054025', '1', '2025-10-24 09:37:10', '2025-10-24 09:37:10');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` mediumtext NOT NULL,
  `status` mediumtext NOT NULL,
  `createdAt` mediumtext NOT NULL,
  `updatedAt` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `status`, `createdAt`, `updatedAt`) VALUES
(21, 'Bakery Display counter', '1', '2025-10-02 05:28:43', '2025-10-02 05:28:43'),
(22, 'test', '1', '2025-10-02 05:44:05', '2025-10-02 05:44:05'),
(23, 'Delete 1', '0', '2025-10-14 13:01:21', '2025-10-14 13:04:54'),
(24, 'Delete 2', '1', '2025-10-14 13:01:30', '2025-10-14 13:01:30'),
(25, 'Delete 3', '1', '2025-10-14 13:01:39', '2025-10-14 13:01:39'),
(26, 'Delete 1', '0', '2025-10-14 13:08:36', '2025-10-14 13:13:13'),
(27, 'COOKIE MAN', '1', '2025-10-24 09:27:26', '2025-10-24 09:27:26'),
(28, 'a11', '1', '2025-11-10 14:55:46', '2025-11-10 14:55:46'),
(29, 'B01', '1', '2025-11-13 10:21:46', '2025-11-13 10:21:46');

-- --------------------------------------------------------

--
-- Table structure for table `combo`
--

CREATE TABLE `combo` (
  `id` int(11) NOT NULL,
  `name` mediumtext NOT NULL,
  `status` mediumtext NOT NULL,
  `createdAt` mediumtext NOT NULL,
  `updatedAt` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `combo`
--

INSERT INTO `combo` (`id`, `name`, `status`, `createdAt`, `updatedAt`) VALUES
(20, 'Bakery Display counter', '1', '2025-10-02 05:28:19', '2025-10-02 05:28:19'),
(21, 'test', '1', '2025-10-02 05:43:59', '2025-10-02 05:43:59'),
(22, 'new test', '1', '2025-10-09 05:39:26', '2025-10-09 05:39:26'),
(23, 'Delete Combo', '0', '2025-10-14 13:01:01', '2025-10-14 13:14:16'),
(24, 'testing', '1', '2025-10-14 13:37:15', '2025-10-14 13:37:15'),
(25, 'COOKIE MAN', '1', '2025-10-24 09:26:56', '2025-10-24 09:26:56'),
(26, 'a1', '1', '2025-11-10 14:55:37', '2025-11-10 14:55:37'),
(27, 'B', '1', '2025-11-13 10:21:37', '2025-11-13 10:21:37');

-- --------------------------------------------------------

--
-- Table structure for table `consumable_materials`
--

CREATE TABLE `consumable_materials` (
  `id` int(11) NOT NULL,
  `materialName` text NOT NULL,
  `currentStock` text NOT NULL,
  `minimumStock` text NOT NULL,
  `barcode` text NOT NULL,
  `status` text NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consumable_materials`
--

INSERT INTO `consumable_materials` (`id`, `materialName`, `currentStock`, `minimumStock`, `barcode`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Cotton Gloves Updated', '60', '10', 'GLV123', '0', '2025-11-22 14:56:58', '2025-11-22 15:39:24'),
(2, 'Cotton Gloves', '50', '10', 'GLV123', 'active', '2025-11-22 14:57:15', '2025-11-22 14:57:15'),
(3, 'Cotton Glove', '49', '19', 'GLV123', '0', '2025-11-22 15:39:51', '2025-12-11 04:47:20'),
(4, 'Cotton Gloves', '50', '10', 'GLV123', '0', '2025-11-22 15:39:53', '2025-11-22 15:46:52'),
(5, 'welding rods', '50', '20', 'CM-5-1765648298880', '0', '2025-12-06 16:28:15', '2025-12-13 17:51:38'),
(6, 'Adjustable Spanner ', '10', '15', 'CM-6-1765648298905', '0', '2025-12-11 04:47:00', '2025-12-13 17:51:38'),
(7, 'Adjustable Spanner', '18', '12', 'CM-7-1765648298910', '1', '2025-12-11 04:47:38', '2025-12-13 18:47:29'),
(8, 'AG5 Cylindrical Wheel (old)', '10', '12', 'CM-8-1765648298915', '1', '2025-12-11 04:48:29', '2025-12-13 17:51:38'),
(9, 'AG7 Grinding (OLD)', '10', '15', 'CM-9-1765648298922', '1', '2025-12-11 04:50:44', '2025-12-13 17:51:38'),
(10, 'BHEL Stool\'s Pipe Bending Die Set 3/4\"', '9', '15', 'CM-10-1765648298927', '1', '2025-12-11 04:55:15', '2025-12-13 18:20:52'),
(11, 'Adjustable Spanner', '15', '10', 'CM-11-1765648298934', '1', '2025-12-11 06:32:11', '2025-12-13 17:51:38'),
(12, 'AG5 cylindrical Wheel (old)', '15', '10', 'CM-12-1765648298939', '1', '2025-12-12 13:39:06', '2025-12-13 17:51:38'),
(13, 'AG7 Grinding (OLD)', '15', '10', 'CM-13-1765648298947', '1', '2025-12-12 13:42:09', '2025-12-13 17:51:38'),
(14, 'BHEL Stool\'s Pipe bending Die Set', '15', '10', 'CM-14-1765648298954', '1', '2025-12-12 13:43:15', '2025-12-13 17:51:38'),
(15, 'BHEL Stool\'s Pipe bending Die Set', '15', '10', 'CM-15-1765648298960', '1', '2025-12-12 13:43:29', '2025-12-13 17:51:38'),
(16, 'Cutting Player', '15', '10', 'CM-16-1765648298965', '1', '2025-12-12 13:47:06', '2025-12-13 17:51:38'),
(17, 'Cylinder Key', '15', '10', 'CM-17-1765648298970', '1', '2025-12-12 13:47:49', '2025-12-13 17:51:38'),
(18, 'Die Set (New)', '15', '10', 'CM-18-1765648298974', '1', '2025-12-12 13:48:41', '2025-12-13 17:51:38'),
(19, 'Die Set (New)', '15', '10', 'CM-19-1765648298979', '1', '2025-12-12 13:49:23', '2025-12-13 17:51:38'),
(20, 'Die Set (New)', '10', '10', 'CM-20-1765648298984', '1', '2025-12-12 13:49:31', '2025-12-13 18:50:43'),
(21, 'Die Set (New)', '15', '10', 'CM-21-1765648298988', '1', '2025-12-12 13:49:47', '2025-12-13 17:51:38'),
(22, 'Die Set (Old)', '15', '10', 'CM-22-1765648298993', '1', '2025-12-12 13:50:20', '2025-12-13 17:51:38'),
(23, 'Die Set (Old)', '15', '10', 'CM-23-1765648298996', '1', '2025-12-12 13:50:51', '2025-12-13 17:51:38'),
(24, 'Die Set (Old)', '15', '10', 'CM-24-1765648299001', '1', '2025-12-12 13:50:58', '2025-12-13 17:51:39'),
(25, 'Double End Spanner', '15', '10', 'CM-25-1765648299006', '1', '2025-12-12 13:52:47', '2025-12-13 17:51:39'),
(26, 'Double End Spanner', '15', '10', 'CM-26-1765648299010', '1', '2025-12-12 13:52:56', '2025-12-13 17:51:39'),
(27, 'Double End Spanner', '15', '10', 'CM-27-1765648299014', '1', '2025-12-12 13:56:27', '2025-12-13 17:51:39'),
(28, 'Drill Bit', '15', '10', 'CM-28-1765648299020', '1', '2025-12-12 14:01:16', '2025-12-13 17:51:39'),
(29, 'Drill Bit', '15', '10', 'CM-29-1765648299023', '1', '2025-12-12 14:01:28', '2025-12-13 17:51:39'),
(30, 'Drill Bit', '15', '10', 'CM-30-1765648299028', '1', '2025-12-12 14:01:36', '2025-12-13 17:51:39'),
(31, 'Drill Bit', '15', '10', 'CM-31-1765648299032', '1', '2025-12-12 14:01:44', '2025-12-13 17:51:39'),
(32, 'Drill Bit', '15', '10', 'CM-32-1765648299038', '1', '2025-12-12 14:01:53', '2025-12-13 17:51:39'),
(33, 'Drill Bit', '15', '10', 'CM-33-1765648299041', '1', '2025-12-12 14:02:01', '2025-12-13 17:51:39'),
(34, 'Drill Bit', '15', '10', 'CM-34-1765648299045', '1', '2025-12-12 14:02:10', '2025-12-13 17:51:39'),
(35, 'Drill Bit', '15', '10', 'CM-35-1765648299049', '1', '2025-12-12 14:02:17', '2025-12-13 17:51:39'),
(36, 'Drill Bit', '15', '10', 'CM-36-1765648299054', '1', '2025-12-12 14:02:24', '2025-12-13 17:51:39'),
(37, 'Drill Bit', '15', '10', 'CM-37-1765648299057', '1', '2025-12-12 14:02:32', '2025-12-13 17:51:39'),
(38, 'Drill Bit', '15', '10', 'CM-38-1765648299076', '1', '2025-12-12 14:02:41', '2025-12-13 17:51:39'),
(39, 'Drill Bit', '15', '10', 'CM-39-1765648299081', '1', '2025-12-12 14:02:48', '2025-12-13 17:51:39'),
(40, 'Drill Bit', '15', '10', 'CM-40-1765648299086', '1', '2025-12-12 14:02:56', '2025-12-13 17:51:39'),
(41, 'Drill Bit', '15', '10', 'CM-41-1765648299089', '1', '2025-12-12 14:03:04', '2025-12-13 17:51:39'),
(42, 'Flat File', '15', '10', 'CM-42-1765648299093', '1', '2025-12-12 14:03:46', '2025-12-13 17:51:39'),
(43, 'Hack Saw Blade', '15', '10', 'CM-43-1765648299099', '1', '2025-12-12 14:03:57', '2025-12-13 17:51:39'),
(44, 'Hammer', '15', '10', 'CM-44-1765648299103', '1', '2025-12-12 14:04:07', '2025-12-13 17:51:39'),
(45, 'Hollow Punch', '15', '10', 'CM-45-1765648299107', '1', '2025-12-12 14:04:18', '2025-12-13 17:51:39'),
(46, 'Jumber  & Bit', '15', '10', 'CM-46-1765648299111', '1', '2025-12-12 14:04:29', '2025-12-13 17:51:39'),
(47, 'Measuring Tape', '15', '10', 'CM-47-1765648299115', '1', '2025-12-12 14:04:41', '2025-12-13 17:51:39'),
(48, 'MS Schedule Pipe', '15', '10', 'CM-48-1765648299119', '1', '2025-12-12 14:04:52', '2025-12-13 17:51:39'),
(49, 'MS Smoke Pipe', '15', '10', 'CM-49-1765648299123', '1', '2025-12-12 14:05:05', '2025-12-13 17:51:39'),
(50, 'Number Punch Set', '15', '10', 'CM-50-1765648299126', '1', '2025-12-12 14:05:17', '2025-12-13 17:51:39'),
(51, 'Pipe Wrench', '15', '10', 'CM-51-1765648299130', '1', '2025-12-12 14:05:27', '2025-12-13 17:51:39'),
(52, 'Pipe Wrench', '15', '10', 'CM-52-1765648299134', '1', '2025-12-12 14:05:35', '2025-12-13 17:51:39'),
(53, 'Pnumatic Grinding Machine', '15', '10', 'CM-53-1765648299137', '1', '2025-12-12 14:05:46', '2025-12-13 17:51:39'),
(54, 'Polish Machine(Old)', '15', '10', 'CM-54-1765648299141', '1', '2025-12-12 14:05:58', '2025-12-13 17:51:39'),
(55, 'Punch Set', '15', '10', 'CM-55-1765648299144', '1', '2025-12-12 14:06:09', '2025-12-13 17:51:39'),
(56, 'Ring Spanner', '15', '10', 'CM-56-1765648299148', '1', '2025-12-12 14:06:25', '2025-12-13 17:51:39'),
(57, 'Ring Spanner', '15', '10', 'CM-57-1765648299151', '1', '2025-12-12 14:06:35', '2025-12-13 17:51:39'),
(58, 'Ring Spanner', '15', '10', 'CM-58-1765648299157', '1', '2025-12-12 14:06:41', '2025-12-13 17:51:39'),
(59, 'Ring Spanner', '15', '10', 'CM-59-1765648299161', '1', '2025-12-12 14:06:49', '2025-12-13 17:51:39'),
(60, 'Screw Driver', '15', '10', 'CM-60-1765648299164', '1', '2025-12-12 14:07:13', '2025-12-13 17:51:39'),
(61, 'Square File', '14', '10', 'CM-61-1765648299168', '1', '2025-12-12 14:07:23', '2025-12-13 18:57:05'),
(62, 'Tap set', '15', '10', 'CM-62-1765648299173', '1', '2025-12-12 14:07:35', '2025-12-13 17:51:39'),
(63, 'Earth clamp lug', '15', '10', 'CM-63-1765648299176', '1', '2025-12-12 14:07:45', '2025-12-13 17:51:39'),
(64, 'Straight bearing bit', '15', '10', 'CM-64-1765648299179', '1', '2025-12-12 14:07:56', '2025-12-13 17:51:39'),
(65, 'Drill Bit', '15', '10', 'CM-65-1765648299184', '1', '2025-12-12 14:08:07', '2025-12-13 17:51:39'),
(66, 'test', '3', '1', 'CM-66-1765648299189', '1', '2025-12-13 17:48:54', '2025-12-13 17:51:39'),
(67, 'test', '5', '1', '', '1', '2025-12-13 18:36:15', '2025-12-13 18:36:15'),
(68, 'Test Material 1765651217656', '50', '10', 'CM-1765651217731', '1', '2025-12-13 18:40:17', '2025-12-13 18:40:17'),
(69, 'LogTest-1765652001602', '100', '10', 'CM-1765652001685', '1', '2025-12-13 18:53:21', '2025-12-13 18:53:21'),
(70, 'LogTest-1765652058015', '90', '10', 'CM-1765652058076', '1', '2025-12-13 18:54:18', '2025-12-13 18:54:18');

-- --------------------------------------------------------

--
-- Table structure for table `consumable_materials_request`
--

CREATE TABLE `consumable_materials_request` (
  `id` int(11) NOT NULL,
  `date` text NOT NULL,
  `priority` text NOT NULL,
  `requiredDate` text NOT NULL,
  `notes` text NOT NULL,
  `requestedBy` text NOT NULL,
  `status` text NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consumable_materials_request`
--

INSERT INTO `consumable_materials_request` (`id`, `date`, `priority`, `requiredDate`, `notes`, `requestedBy`, `status`, `createdAt`, `updatedAt`) VALUES
(6, '2025-12-13T12:50:52.718Z', 'High', '2025-12-13', 'test', 'test opm', 'Fulfilled', '2025-12-13 12:50:52', '2025-12-13 18:20:52'),
(7, '2025-12-13T18:31:03.910Z', 'Medium', '2025-12-14', 'test', 'test opm', 'Fulfilled', '2025-12-13 18:31:03', '2025-12-13 18:33:13'),
(8, '2025-12-13T18:49:51.643Z', 'Medium', '2025-12-14', '', 'test opm', 'Fulfilled', '2025-12-13 18:49:51', '2025-12-13 18:50:43'),
(9, '2025-12-13T18:54:18.137Z', 'High', '2025-12-13T18:54:18.131Z', 'Test Request', 'Tester', 'Fulfilled', '2025-12-13 18:54:18', '2025-12-13 18:54:18'),
(10, '2025-12-13T18:56:32.187Z', 'Medium', '2025-12-14', 'tst', 'test opm', 'Fulfilled', '2025-12-13 18:56:32', '2025-12-13 18:57:05');

-- --------------------------------------------------------

--
-- Table structure for table `consumable_stock_logs`
--

CREATE TABLE `consumable_stock_logs` (
  `id` int(11) NOT NULL,
  `consumableMaterialId` int(11) NOT NULL,
  `materialName` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consumable_stock_logs`
--

INSERT INTO `consumable_stock_logs` (`id`, `consumableMaterialId`, `materialName`, `quantity`, `type`, `reason`, `orderId`, `date`, `createdAt`, `updatedAt`) VALUES
(2, 67, 'test', 5, 'Stock In', 'Initial Stock', NULL, '2025-12-13 18:36:15', '2025-12-13 18:36:15', '2025-12-13 18:36:15'),
(3, 68, 'Test Material 1765651217656', 50, 'Stock In', 'Initial Stock', NULL, '2025-12-13 18:40:17', '2025-12-13 18:40:17', '2025-12-13 18:40:17'),
(4, 7, 'Adjustable Spanner', 5, 'Stock In', 'Manual Adjustment (Edit)', NULL, '2025-12-13 18:47:29', '2025-12-13 18:47:29', '2025-12-13 18:47:29'),
(7, 61, 'Square File', 1, 'Stock Out', 'Request Fulfillment', '10', '2025-12-13 18:57:05', '2025-12-13 18:57:05', '2025-12-13 18:57:05');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `date` text NOT NULL,
  `mail` text NOT NULL,
  `password` text NOT NULL,
  `mobile` text NOT NULL,
  `role` text NOT NULL,
  `status` text NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `date`, `mail`, `password`, `mobile`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
(2, 'Ashik Rahuman', '2025-06-25', 'admin@test.com', '$2b$10$rY96w7UO4rZBvcj9QqNquu6gjVOv92w0QWaw1mddzJQ48blFmpUCS', '+91-9876543210', 'admin', '1', '2025-08-27 14:39:27', '2025-09-20 05:42:59'),
(6, 'test opm', '2025-08-07', 'operation@test.com', '$2b$10$cZPER5sCV.q4x718MbxouOUeJ9AZq2YqG9g/Id5Qabf6a6905q566', '8148082567', 'operation_manager', '1', '2025-09-01 16:54:15', '2025-09-01 17:17:24'),
(7, 'whm test', '2025-08-13', 'warehouse@test.com', '$2b$10$rY96w7UO4rZBvcj9QqNquu6gjVOv92w0QWaw1mddzJQ48blFmpUCS', '8148067541', 'warehouse_manager', '1', '2025-09-01 16:55:55', '2025-09-01 17:19:22'),
(8, 'sm test', '2025-08-13', 'sales@test.com', '$2b$10$OiK8zNKmSjyQ9I1CgKAeluLzRqn0WOPSrrupqmflKq2FihlLijxIS', '8134878897', 'sales_manager', '1', '2025-09-01 16:57:15', '2025-10-09 05:46:34'),
(9, 'VASUDEVAN NAGARAJAN', '2025-09-18', 'sales123@test.com', '$2b$10$ubPNF6m80JOKAiEqY3pTAOv8N1n59e.TgS.9cA/FipLJT8aiAXlx.', '+918148081690', 'sales_manager', '1', '2025-09-19 13:20:29', '2025-09-20 05:30:28');

-- --------------------------------------------------------

--
-- Table structure for table `estimation`
--

CREATE TABLE `estimation` (
  `id` int(11) NOT NULL,
  `leadId` text NOT NULL,
  `termId` text DEFAULT NULL,
  `bankId` text DEFAULT NULL,
  `referenceNumber` text DEFAULT NULL,
  `orderDate` text DEFAULT NULL,
  `documentType` text DEFAULT NULL,
  `customerName` text DEFAULT NULL,
  `customerPhone` text DEFAULT NULL,
  `customerAddress1` text DEFAULT NULL,
  `customerAddress2` text DEFAULT NULL,
  `customerCity` text DEFAULT NULL,
  `customerCountry` text DEFAULT NULL,
  `customerState` text DEFAULT NULL,
  `customerZip` text DEFAULT NULL,
  `customerGstin` text DEFAULT NULL,
  `subtotal` text DEFAULT NULL,
  `discount` text DEFAULT NULL,
  `discountAmount` text DEFAULT NULL,
  `totalAfterDiscount` text DEFAULT NULL,
  `taxCgst` text DEFAULT NULL,
  `taxSgst` text DEFAULT NULL,
  `taxTotal` text DEFAULT NULL,
  `grandTotal` text DEFAULT NULL,
  `bankAccountHolder` text DEFAULT NULL,
  `bankName` text DEFAULT NULL,
  `bankAccountNumber` text DEFAULT NULL,
  `bankAccountType` text DEFAULT NULL,
  `bankIfscCode` text DEFAULT NULL,
  `bankMicrCode` text DEFAULT NULL,
  `bankBranchName` text DEFAULT NULL,
  `termsTitle` text DEFAULT NULL,
  `termsDescription` text DEFAULT NULL,
  `companyName` text DEFAULT NULL,
  `companySubtitle` text DEFAULT NULL,
  `companyGstin` text DEFAULT NULL,
  `companyTagline` text DEFAULT NULL,
  `companyAddressStreet` text DEFAULT NULL,
  `companyAddressArea` text DEFAULT NULL,
  `companyContactSales` text DEFAULT NULL,
  `companyContactService` text DEFAULT NULL,
  `companyContactWebsite` text DEFAULT NULL,
  `companyContactEmail` text DEFAULT NULL,
  `companyFactoryAddress` text DEFAULT NULL,
  `status` text NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `estimation`
--

INSERT INTO `estimation` (`id`, `leadId`, `termId`, `bankId`, `referenceNumber`, `orderDate`, `documentType`, `customerName`, `customerPhone`, `customerAddress1`, `customerAddress2`, `customerCity`, `customerCountry`, `customerState`, `customerZip`, `customerGstin`, `subtotal`, `discount`, `discountAmount`, `totalAfterDiscount`, `taxCgst`, `taxSgst`, `taxTotal`, `grandTotal`, `bankAccountHolder`, `bankName`, `bankAccountNumber`, `bankAccountType`, `bankIfscCode`, `bankMicrCode`, `bankBranchName`, `termsTitle`, `termsDescription`, `companyName`, `companySubtitle`, `companyGstin`, `companyTagline`, `companyAddressStreet`, `companyAddressArea`, `companyContactSales`, `companyContactService`, `companyContactWebsite`, `companyContactEmail`, `companyFactoryAddress`, `status`, `createdAt`, `updatedAt`) VALUES
(37, '32', '6', '4', 'SBI-PI-25-015', '2025-10-09', 'Quotation', 'Ajith P', '1234567890', 'AP-68, 2nd Street, AF Block Anna Nagar', 'anna nagar', 'Chennai', 'India', 'Tamil Nadu', '600040', 'N/A', '63000', '0.15873015873015872', '100', '62900', '5661', '5661', '11322', '74222', 'SBI 113', 'KVB', '1262280000000113', 'current account', 'KVBL0001262', '620053004', 'N/A', '2 weeks', 'PAYMENT: 75% ADVANCE, 25% AT THE TIME OF DELIVERY.\nTRANSPORT: EXTRA\nDELIVERY: 2 week from the date of your confirmed order.\nMATERIAL VERIFICATION: Before the delivery schedule we inform you that the\nequipment’s is ready for delivery. You or your authorized person has come to our factory\nand inspect the equipments. To confirm that the equipment are perfect as per your PO or your requirement. Then only we cannot able to dispatch the equipment.\nWORKS: Civil work, Electrical work, water plumbing line work, unloading of materials,\nscuff folding work , Laying of new gas pipe line works ,cylinder cost & deposit all are at-your scope.\nGUARANTEE: For 1 Year against any manufacturing defects.\nSERVICE: Service on calls by priority basis.\nVALIDITY: This quotation valid up to 30 Days from the date of quotation', 'SRI BRAMHA INDUSTRIES', 'COMMERCIAL KITCHEN & BAKERY EQUIPMENTS', '33AVTPS8228G1Z0', 'Quality With Integrity', 'Near Reliance Market, Opp to SIT Hostel, Thanjavur-Trichy Main Rd,', 'Ariyamangalam Area, Trichy - 620010', '98636 99922, 98424 71388', '95781 71388', 'www.sribramhaindustries.in', 'bramhaindustries@gmail.com', 'SRI BRAMHA INDUSTRIES, T.S. No. 214/5-B Thanjavur-Trichy Main road, Opposite to Navalur road, Pudukudi North Village (PO), Sengipatti (VIA), Thanjavur - 613402', '1', '2025-10-09 00:00:00', '2025-10-09 04:08:30'),
(38, '33', '6', '4', 'SBI-PI-25-002', '2025-10-09', 'Proforma Invoice', 'thamem aa', '9500505712', '327', 'pmv', 'pdk', 'ind', 'tn', '6322222', 'N/A', '31500', '0', '0', '31500', '2835', '2835', '5670', '37170', 'SBI 113', 'KVB', '1262280000000113', 'current account', 'KVBL0001262', '620053004', 'N/A', '2 weeks', 'PAYMENT: 75% ADVANCE, 25% AT THE TIME OF DELIVERY.\nTRANSPORT: EXTRA\nDELIVERY: 2 week from the date of your confirmed order.\nMATERIAL VERIFICATION: Before the delivery schedule we inform you that the\nequipment’s is ready for delivery. You or your authorized person has come to our factory\nand inspect the equipments. To confirm that the equipment are perfect as per your PO or your requirement. Then only we cannot able to dispatch the equipment.\nWORKS: Civil work, Electrical work, water plumbing line work, unloading of materials,\nscuff folding work , Laying of new gas pipe line works ,cylinder cost & deposit all are at-your scope.\nGUARANTEE: For 1 Year against any manufacturing defects.\nSERVICE: Service on calls by priority basis.\nVALIDITY: This quotation valid up to 30 Days from the date of quotation', 'SRI BRAMHA INDUSTRIES', 'COMMERCIAL KITCHEN & BAKERY EQUIPMENTS', '33AVTPS8228G1Z0', 'Quality With Integrity', 'Near Reliance Market, Opp to SIT Hostel, Thanjavur-Trichy Main Rd,', 'Ariyamangalam Area, Trichy - 620010', '98636 99922, 98424 71388', '95781 71388', 'www.sribramhaindustries.in', 'bramhaindustries@gmail.com', 'SRI BRAMHA INDUSTRIES, T.S. No. 214/5-B Thanjavur-Trichy Main road, Opposite to Navalur road, Pudukudi North Village (PO), Sengipatti (VIA), Thanjavur - 613402', '1', '2025-10-09 00:00:00', '2025-10-09 05:59:21'),
(39, '35', '6', '5', 'SBI-PI-25-002', '2025-11-04', 'Quotation', 'Jaber Sherif R', '+918807219924', '1603, Pandiman Kovil Street', '', 'Ponnamaravathy', 'India', 'Tamil Nadu', '622408', 'N/A', '3000', '0', '0', '3000', '270', '270', '540', '3540', 'SBCK CUB', 'City Union Bank', '510909010137075', 'current account', 'CIUB0000441', '641054025', 'N/A', '2 weeks', 'PAYMENT: 75% ADVANCE, 25% AT THE TIME OF DELIVERY.\nTRANSPORT: EXTRA\nDELIVERY: 2 week from the date of your confirmed order.\nMATERIAL VERIFICATION: Before the delivery schedule we inform you that the\nequipment’s is ready for delivery. You or your authorized person has come to our factory\nand inspect the equipments. To confirm that the equipment are perfect as per your PO or your requirement. Then only we cannot able to dispatch the equipment.\nWORKS: Civil work, Electrical work, water plumbing line work, unloading of materials,\nscuff folding work , Laying of new gas pipe line works ,cylinder cost & deposit all are at-your scope.\nGUARANTEE: For 1 Year against any manufacturing defects.\nSERVICE: Service on calls by priority basis.\nVALIDITY: This quotation valid up to 30 Days from the date of quotation', 'SRI BRAMHA INDUSTRIES', 'COMMERCIAL KITCHEN & BAKERY EQUIPMENTS', '33AVTPS8228G1Z0', 'Quality With Integrity', 'Near Reliance Market, Opp to SIT Hostel, Thanjavur-Trichy Main Rd,', 'Ariyamangalam Area, Trichy - 620010', '98636 99922, 98424 71388', '95781 71388', 'www.sribramhaindustries.in', 'bramhaindustries@gmail.com', 'SRI BRAMHA INDUSTRIES, T.S. No. 214/5-B Thanjavur-Trichy Main road, Opposite to Navalur road, Pudukudi North Village (PO), Sengipatti (VIA), Thanjavur - 613402', '1', '2025-11-04 00:00:00', '2025-11-04 09:57:00'),
(40, '34', '6', '4', 'SBI-PI-25-001', '2025-11-11', 'Proforma Invoice', 'VASUDEVAN NAGARAJAN', '+918148081690', 'pudukkottai', 'Keelavekuppatti', 'ponnamaravathi', 'India', 'Tamil Nadu', '622407', 'N/A', '28900', '0', '0', '28900', '2601', '2601', '5202', '34102', 'SBI 113', 'KVB', '1262280000000113', 'current account', 'KVBL0001262', '620053004', 'N/A', '2 weeks', 'PAYMENT: 75% ADVANCE, 25% AT THE TIME OF DELIVERY.\nTRANSPORT: EXTRA\nDELIVERY: 2 week from the date of your confirmed order.\nMATERIAL VERIFICATION: Before the delivery schedule we inform you that the\nequipment’s is ready for delivery. You or your authorized person has come to our factory\nand inspect the equipments. To confirm that the equipment are perfect as per your PO or your requirement. Then only we cannot able to dispatch the equipment.\nWORKS: Civil work, Electrical work, water plumbing line work, unloading of materials,\nscuff folding work , Laying of new gas pipe line works ,cylinder cost & deposit all are at-your scope.\nGUARANTEE: For 1 Year against any manufacturing defects.\nSERVICE: Service on calls by priority basis.\nVALIDITY: This quotation valid up to 30 Days from the date of quotation', 'SRI BRAMHA INDUSTRIES', 'COMMERCIAL KITCHEN & BAKERY EQUIPMENTS', '33AVTPS8228G1Z0', 'Quality With Integrity', 'Near Reliance Market, Opp to SIT Hostel, Thanjavur-Trichy Main Rd,', 'Ariyamangalam Area, Trichy - 620010', '98636 99922, 98424 71388', '95781 71388', 'www.sribramhaindustries.in', 'bramhaindustries@gmail.com', 'SRI BRAMHA INDUSTRIES, T.S. No. 214/5-B Thanjavur-Trichy Main road, Opposite to Navalur road, Pudukudi North Village (PO), Sengipatti (VIA), Thanjavur - 613402', '1', '2025-11-11 00:00:00', '2025-11-11 11:24:26');

-- --------------------------------------------------------

--
-- Table structure for table `est_products`
--

CREATE TABLE `est_products` (
  `id` int(11) NOT NULL,
  `estId` text DEFAULT NULL,
  `serialNumber` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `prodCode` text DEFAULT NULL,
  `category` text DEFAULT NULL,
  `combo` text DEFAULT NULL,
  `size` text DEFAULT NULL,
  `specification` text DEFAULT NULL,
  `quantity` text DEFAULT NULL,
  `unitPrice` text DEFAULT NULL,
  `totalPrice` text DEFAULT NULL,
  `baseProductWeight` text DEFAULT NULL,
  `baseProductDefaultLength` text DEFAULT NULL,
  `baseProductDefaultWidth` text DEFAULT NULL,
  `baseProductDefaultThickness` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL,
  `updatedAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `est_products`
--

INSERT INTO `est_products` (`id`, `estId`, `serialNumber`, `name`, `prodCode`, `category`, `combo`, `size`, `specification`, `quantity`, `unitPrice`, `totalPrice`, `baseProductWeight`, `baseProductDefaultLength`, `baseProductDefaultWidth`, `baseProductDefaultThickness`, `notes`, `status`, `createdAt`, `updatedAt`) VALUES
(127, '37', '1', '3’ Standard Display counter 3+1 (Normal)', 'SBI-SP-079', 'Bakery Display counter', 'Bakery Display counter', 'N/A', 'The structure of this counter is constructed by SS 304 grade sheet/pipe, Front & Side elevation will be in stainless steel matt finish and shelf and all side will be toughened glass with sliding sleek doors. All the shelfs fitted with LED strip lights and it’s mounted on leg bush.', '1', '31500', '31500', '0', '0', '0', '0', 'standard prod - 1', 'active', '2025-10-09 00:00:00', '2025-10-09 04:08:30'),
(128, '37', '2', '3’ Standard Display counter 3+1 (Normal)', 'SBI-SP-079', 'test', 'test', 'N/A', 'The structure of this counter is constructed by SS 304 grade sheet/pipe, Front & Side elevation will be in stainless steel matt finish and shelf and all side will be toughened glass with sliding sleek doors. All the shelfs fitted with LED strip lights and it’s mounted on leg bush.', '1', '31500', '31500', '0', '0', '0', '0', '', 'active', '2025-10-09 00:00:00', '2025-10-09 04:08:30'),
(129, '38', '1', '3’ Standard Display counter 3+1 (Normal)', 'SBI-SP-079', 'test', 'new test', 'N/A', 'The structure of this counter is constructed by SS 304 grade sheet/pipe, Front & Side elevation will be in stainless steel matt finish and shelf and all side will be toughened glass with sliding sleek doors. All the shelfs fitted with LED strip lights and it’s mounted on leg bush.', '1', '31500', '31500', '0', '0', '0', '0', '', 'active', '2025-10-09 00:00:00', '2025-10-09 05:59:21'),
(130, '39', '1', 'retest', 'SBI-SP-090', 'test', 'new test', 'N/A', 'xyz', '1', '3000', '3000', '0', '0', '0', '0', 'main running', 'active', '2025-11-04 00:00:00', '2025-11-04 09:57:00'),
(131, '40', '1', '3’ Standard Display counter 3+1 (Normal)', 'SBI-SP-079', 'Bakery Display counter', 'test', 'N/A', 'The structure of this counter is constructed by SS 304 grade sheet/pipe, Front & Side elevation will be in stainless steel matt finish and shelf and all side will be toughened glass with sliding sleek doors. All the shelfs fitted with LED strip lights and it’s mounted on leg bush.', '1', '28900', '28900', '0', '0', '0', '0', '', 'active', '2025-11-11 00:00:00', '2025-11-11 11:24:26');

-- --------------------------------------------------------

--
-- Table structure for table `est_product_addons`
--

CREATE TABLE `est_product_addons` (
  `id` int(11) NOT NULL,
  `productId` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `prodCode` text DEFAULT NULL,
  `size` text DEFAULT NULL,
  `specification` text DEFAULT NULL,
  `quantity` text DEFAULT NULL,
  `unitPrice` text DEFAULT NULL,
  `totalPrice` text DEFAULT NULL,
  `baseProductWeight` text DEFAULT NULL,
  `baseProductDefaultLength` text DEFAULT NULL,
  `baseProductDefaultWidth` text DEFAULT NULL,
  `baseProductDefaultThickness` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL,
  `updatedAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `date` text NOT NULL,
  `email` text NOT NULL,
  `phoneNumber` text NOT NULL,
  `module` text NOT NULL,
  `source` text NOT NULL,
  `feedback` text DEFAULT NULL,
  `followup` text DEFAULT NULL,
  `isOrder` text NOT NULL,
  `status` text NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `name`, `date`, `email`, `phoneNumber`, `module`, `source`, `feedback`, `followup`, `isOrder`, `status`, `createdAt`, `updatedAt`) VALUES
(28, 'Lewis Hamilton', '2025-09-22', 'lewis@gmail.com', '1234455678', 'testing purpose only', 'Website', NULL, NULL, '0', '0', '2025-09-22 12:52:40', '2025-09-22 13:51:09'),
(29, 'Lewis Hamilton', '2025-09-22', 'lewis@gmail.com', '1324667879', 'testing purpose only', 'Social Media', 'testing purpose only', NULL, '0', '0', '2025-09-22 13:52:23', '2025-09-22 13:56:43'),
(30, 'Lewis Hamilton', '2025-09-22', 'lewis@gmail.com', '1234567890', 'testing purpose only', 'Referral', 'testing purpose only', 'testing purpose only', '0', '0', '2025-09-22 13:57:19', '2025-10-02 05:42:09'),
(31, 'Asheik Rahman R', '2025-10-02', 'asheikraha99@gmail.com', '9677712556', 'Restaurant ', 'Referral', NULL, NULL, '0', '1', '2025-10-02 05:43:16', '2025-10-02 05:43:16'),
(32, 'Lewis Hamilton', '2025-10-07', 'lewis@gmail.com', '12344467899', 'testing purpose only', 'Social Media', 'testing purpose only', 'testing purpose only', '1', '1', '2025-10-07 13:26:30', '2025-10-09 04:10:37'),
(33, 'tnaaa', '2025-10-09', 'sales@test.com', '9500505712', 'bakery', 'Referral', 'eeeee', 'eee', '1', '1', '2025-10-09 05:58:13', '2025-10-09 05:59:28'),
(34, 'Abdul', '2025-10-24', 'asheikrahaa99@gmail.com', '9677712556', 'Restaurant ', 'Advertisement', 'Need to call on Wednesday ', 'Need call on next Friday\n', '1', '1', '2025-10-24 12:44:02', '2025-11-11 11:24:38'),
(35, 'Jaber Sherif R', '2025-11-04', 'jaberraja416@gmail.com', '08807219924', 'barkery', 'Advertisement', 'ok move to next step', 'next week contact me', '1', '1', '2025-11-04 09:52:07', '2025-11-04 09:58:00'),
(36, 'Vinoth', '2025-12-12', 'bramha@456', '9842471888', 'Cafe', 'Social Media', 'Need quote', 'Monday', '0', '1', '2025-12-12 03:37:59', '2025-12-12 03:37:59');

-- --------------------------------------------------------

--
-- Table structure for table `mapping_products`
--

CREATE TABLE `mapping_products` (
  `id` int(11) NOT NULL,
  `date` mediumtext NOT NULL,
  `comboId` mediumtext NOT NULL,
  `catId` mediumtext NOT NULL,
  `productId` mediumtext NOT NULL,
  `status` mediumtext NOT NULL,
  `createdAt` mediumtext NOT NULL,
  `updatedAt` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `mapping_products`
--

INSERT INTO `mapping_products` (`id`, `date`, `comboId`, `catId`, `productId`, `status`, `createdAt`, `updatedAt`) VALUES
(70, '17-05-2025', '20', '21', '79', '0', '2025-10-05 18:15:50', '2025-10-09 05:20:14'),
(71, '17-05-2025', '21', '22', '79', '0', '2025-10-08 10:31:01', '2025-10-09 05:21:59'),
(72, '17-05-2025', '21', '22', '80', '0', '2025-10-08 10:31:01', '2025-10-08 10:47:17'),
(73, '17-05-2025', '21', '22', '81', '0', '2025-10-08 10:31:01', '2025-10-08 10:45:17'),
(74, '17-05-2025', '21', '22', '82', '0', '2025-10-08 10:31:01', '2025-10-08 10:45:17'),
(75, '17-05-2025', '21', '22', '79', '0', '2025-10-08 10:49:00', '2025-10-09 05:16:51'),
(76, '17-05-2025', '21', '22', '80', '0', '2025-10-08 10:49:00', '2025-10-08 11:02:27'),
(77, '17-05-2025', '21', '22', '82', '0', '2025-10-08 10:49:00', '2025-10-08 11:02:04'),
(78, '17-05-2025', '21', '22', '81', '0', '2025-10-08 10:49:00', '2025-10-08 11:02:04'),
(79, '17-05-2025', '21', '22', '80', '0', '2025-10-08 11:32:59', '2025-10-08 11:37:06'),
(80, '17-05-2025', '21', '22', '82', '0', '2025-10-08 11:32:59', '2025-10-08 11:37:00'),
(81, '17-05-2025', '21', '22', '81', '0', '2025-10-08 11:32:59', '2025-10-08 11:35:47'),
(82, '17-05-2025', '21', '22', '83', '0', '2025-10-08 11:32:59', '2025-10-08 11:34:54'),
(83, '17-05-2025', '21', '22', '80', '0', '2025-10-08 11:37:35', '2025-10-08 11:38:00'),
(84, '17-05-2025', '21', '22', '82', '0', '2025-10-08 11:37:35', '2025-10-08 11:38:00'),
(85, '17-05-2025', '21', '22', '83', '0', '2025-10-08 11:37:35', '2025-10-08 11:37:51'),
(86, '17-05-2025', '21', '22', '81', '0', '2025-10-08 11:37:35', '2025-10-08 11:37:51'),
(87, '17-05-2025', '21', '21', '79', '0', '2025-10-09 05:22:53', '2025-10-09 05:23:22'),
(88, '17-05-2025', '21', '21', '80', '0', '2025-10-09 05:22:53', '2025-10-09 05:23:28'),
(89, '17-05-2025', '21', '21', '79', '0', '2025-10-09 05:24:14', '2025-10-09 05:29:04'),
(90, '17-05-2025', '21', '21', '80', '0', '2025-10-09 05:24:14', '2025-10-09 05:28:05'),
(91, '17-05-2025', '21', '21', '81', '0', '2025-10-09 05:24:14', '2025-10-09 05:26:51'),
(92, '17-05-2025', '20', '21', '81', '0', '2025-10-09 05:49:07', '2025-10-09 05:54:26'),
(93, '17-05-2025', '22', '22', '81', '0', '2025-10-09 05:49:45', '2025-10-09 05:54:24'),
(94, '17-05-2025', '22', '22', '79', '0', '2025-10-09 05:51:23', '2025-10-09 06:00:25'),
(95, '17-05-2025', '22', '21', '79', '0', '2025-10-09 09:27:32', '2025-10-09 09:27:45'),
(96, '17-05-2025', '21', '21', '79', '1', '2025-10-09 09:33:02', '2025-10-09 09:33:02'),
(97, '17-05-2025', '21', '21', '80', '1', '2025-10-09 09:33:02', '2025-10-09 09:33:02'),
(98, '17-05-2025', '21', '21', '81', '1', '2025-10-09 09:33:02', '2025-10-09 09:33:02'),
(99, '17-05-2025', '23', '23', '79', '0', '2025-10-14 13:02:14', '2025-10-14 13:07:17'),
(100, '17-05-2025', '23', '24', '79', '0', '2025-10-14 13:03:45', '2025-10-14 13:07:21'),
(101, '17-05-2025', '23', '24', '81', '0', '2025-10-14 13:03:45', '2025-10-14 13:07:14'),
(102, '17-05-2025', '23', '26', '79', '0', '2025-10-14 13:10:53', '2025-10-14 13:25:31'),
(103, '17-05-2025', '23', '26', '81', '0', '2025-10-14 13:10:53', '2025-10-14 13:25:26'),
(104, '17-05-2025', '22', '22', '84', '1', '2025-10-14 13:45:41', '2025-10-14 13:45:41'),
(105, '17-05-2025', '21', '22', '85', '1', '2025-10-14 14:47:30', '2025-10-14 14:47:30'),
(106, '17-05-2025', '22', '22', '86', '1', '2025-10-14 14:54:52', '2025-10-14 14:54:52'),
(107, '17-05-2025', '20', '21', '87', '1', '2025-10-16 11:37:23', '2025-10-16 11:37:23'),
(108, '17-05-2025', '25', '27', '88', '1', '2025-10-24 09:27:53', '2025-10-24 09:27:53'),
(109, '17-05-2025', '25', '27', '89', '1', '2025-10-24 09:27:53', '2025-10-24 09:27:53'),
(110, '17-05-2025', '22', '22', '90', '1', '2025-11-04 09:40:02', '2025-11-04 09:40:02'),
(111, '17-05-2025', '26', '28', '91', '1', '2025-11-10 14:56:12', '2025-11-10 14:56:12'),
(112, '17-05-2025', '26', '24', '81', '1', '2025-11-13 10:11:20', '2025-11-13 10:11:20'),
(113, '17-05-2025', '26', '24', '79', '1', '2025-11-13 10:11:20', '2025-11-13 10:11:20'),
(114, '17-05-2025', '26', '24', '84', '1', '2025-11-13 10:11:20', '2025-11-13 10:11:20'),
(115, '17-05-2025', '26', '25', '79', '1', '2025-11-13 10:12:27', '2025-11-13 10:12:27'),
(116, '17-05-2025', '26', '25', '84', '1', '2025-11-13 10:12:27', '2025-11-13 10:12:27'),
(117, '17-05-2025', '26', '25', '81', '1', '2025-11-13 10:12:27', '2025-11-13 10:12:27'),
(118, '17-05-2025', '26', '25', '85', '1', '2025-11-13 10:12:27', '2025-11-13 10:12:27'),
(119, '17-05-2025', '27', '29', '92', '1', '2025-11-13 10:21:58', '2025-11-13 10:21:58'),
(120, '17-05-2025', '21', '21', '94', '0', '2025-12-14 15:37:59', '2025-12-14 15:40:39'),
(121, '17-05-2025', '24', '22', '94', '1', '2025-12-14 15:41:15', '2025-12-14 15:41:15');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `date` text NOT NULL,
  `leadId` text NOT NULL,
  `estId` text NOT NULL,
  `orderStatus` text NOT NULL,
  `deadlineStart` text DEFAULT NULL,
  `deadlineEnd` text DEFAULT NULL,
  `status` text NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `date`, `leadId`, `estId`, `orderStatus`, `deadlineStart`, `deadlineEnd`, `status`, `createdAt`, `updatedAt`) VALUES
(15, '31-07-2025', '32', '37', '2', NULL, NULL, '1', '2025-10-07 13:33:09', '2025-11-01 16:47:22'),
(16, '31-07-2025', '32', '37', '3', '2025-10-16', '2025-10-20', '1', '2025-10-09 04:10:37', '2025-11-11 10:16:01'),
(17, '31-07-2025', '33', '38', '3', '2025-10-16', '2025-10-18', '1', '2025-10-09 05:59:28', '2025-10-17 14:17:20'),
(18, '31-07-2025', '35', '39', '2', '2025-11-10', '2025-12-18', '1', '2025-11-04 09:58:00', '2025-11-09 13:39:59'),
(19, '31-07-2025', '34', '40', '2', '2025-11-11', '2025-12-31', '1', '2025-11-11 11:24:38', '2025-11-11 11:37:07');

-- --------------------------------------------------------

--
-- Table structure for table `order_deadline`
--

CREATE TABLE `order_deadline` (
  `id` int(11) NOT NULL,
  `orderId` text NOT NULL,
  `name` text NOT NULL,
  `startAt` text NOT NULL,
  `endAt` text NOT NULL,
  `delayReason` text DEFAULT NULL,
  `status` text NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `order_deadline`
--

INSERT INTO `order_deadline` (`id`, `orderId`, `name`, `startAt`, `endAt`, `delayReason`, `status`, `createdAt`, `updatedAt`) VALUES
(30, '17', 'cutting ', '2025-10-16', '2025-10-16', NULL, '3', '2025-10-17 14:17:12', '2025-10-17 14:17:12'),
(31, '17', 'welding', '2025-10-16', '2025-10-17', NULL, '3', '2025-10-17 14:17:12', '2025-10-17 14:17:12'),
(56, '16', 'finishing', '2025-10-17', '2025-10-20', NULL, '3', '2025-10-17 14:50:04', '2025-10-17 14:50:04'),
(57, '16', 'cutting', '2025-10-17', '2025-10-18', NULL, '3', '2025-10-17 14:50:04', '2025-10-17 14:50:04'),
(58, '16', 'testing', '2025-10-17', '2025-10-18', NULL, '3', '2025-10-17 14:50:04', '2025-10-17 14:50:04');

-- --------------------------------------------------------

--
-- Table structure for table `order_rawmaterial`
--

CREATE TABLE `order_rawmaterial` (
  `id` int(11) NOT NULL,
  `orderId` text NOT NULL,
  `rawMaterial` text NOT NULL,
  `qty` text NOT NULL,
  `status` text NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `order_rawmaterial`
--

INSERT INTO `order_rawmaterial` (`id`, `orderId`, `rawMaterial`, `qty`, `status`, `createdAt`, `updatedAt`) VALUES
(92, '17', 'SS 304 Grade sheet 8x4 1.2mm', '11', '1', '2025-10-17 14:11:21', '2025-10-17 14:11:21'),
(93, '16', 'SS 304 Grade sheet 8x4 1.2mm', '2', '1', '2025-10-17 14:19:02', '2025-10-17 14:19:02'),
(95, '15', 'SS 304 Grade sheet 8x4 1.2mm', '1', '1', '2025-11-01 16:47:46', '2025-11-01 16:47:46'),
(96, '15', 'SS 304 Grade sheet 8x4 1.2mm', '1', '1', '2025-11-01 16:47:46', '2025-11-01 16:47:46'),
(97, '18', 'TEST', '2', '1', '2025-11-09 13:35:15', '2025-11-09 13:35:15'),
(98, '18', 'bolt', '5', '1', '2025-11-09 13:35:15', '2025-11-09 13:35:15'),
(99, '19', 'TEST', '5', '1', '2025-11-11 11:32:27', '2025-11-11 11:32:27'),
(100, '19', 'bolt', '7', '1', '2025-11-11 11:32:27', '2025-11-11 11:32:27');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `orderId` text NOT NULL,
  `date` text NOT NULL,
  `paidAmt` text NOT NULL,
  `remark` text NOT NULL,
  `status` text NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `orderId`, `date`, `paidAmt`, `remark`, `status`, `createdAt`, `updatedAt`) VALUES
(26, '15', '2025-10-09', '10000', 'testing', '1', '2025-10-09 04:10:05', '2025-10-09 04:10:05'),
(27, '17', '2025-10-17', '27170', 'bala in 10 days', '1', '2025-10-09 06:03:11', '2025-10-17 14:34:25'),
(28, '15', '2025-11-11', '1000', 'test', '1', '2025-11-11 10:20:34', '2025-11-11 10:20:34');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `date` mediumtext NOT NULL,
  `productName` mediumtext NOT NULL,
  `ratePerQuantity` mediumtext NOT NULL,
  `grade` mediumtext NOT NULL,
  `weightOfObject` mediumtext DEFAULT NULL,
  `length` mediumtext NOT NULL,
  `width` mediumtext NOT NULL,
  `height` text DEFAULT NULL,
  `thickness` mediumtext NOT NULL,
  `minCost` mediumtext NOT NULL,
  `maxCost` mediumtext NOT NULL,
  `remark` mediumtext DEFAULT NULL,
  `isStandard` mediumtext NOT NULL,
  `status` mediumtext NOT NULL,
  `createdAt` mediumtext NOT NULL,
  `updatedAt` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `date`, `productName`, `ratePerQuantity`, `grade`, `weightOfObject`, `length`, `width`, `height`, `thickness`, `minCost`, `maxCost`, `remark`, `isStandard`, `status`, `createdAt`, `updatedAt`) VALUES
(79, '2025-05-14', '3’ Standard Display counter 3+1 (Normal)', '31500', '304', NULL, '36', '28', '50', '1.2', '26250', '36000', 'The structure of this counter is constructed by SS 304 grade sheet/pipe, Front & Side elevation will be in stainless steel matt finish and shelf and all side will be toughened glass with sliding sleek doors. All the shelfs fitted with LED strip lights and it’s mounted on leg bush.', '1', '1', '2025-10-02 05:22:16', '2025-10-24 06:28:08'),
(80, '2025-05-14', 'bakery', '5000', '304', NULL, '100', '25', '50', '1.2', '4500', '6000', 'bakery test', '1', '0', '2025-10-02 05:37:30', '2025-10-14 09:23:22'),
(81, '2025-05-14', 'test ', '100', '304', '1000', '100', '20', '150', '1.2', '2000', '3000', 'test', '0', '1', '2025-10-02 05:43:44', '2025-10-02 05:43:44'),
(82, '2025-05-14', 'dev_testing', '2', 'a+', NULL, '3', '4', NULL, '2', '300', '500', 'developer testing', '1', '0', '2025-10-02 07:42:20', '2025-10-09 06:06:44'),
(83, '2025-05-14', 'dev_testing2', '2', '2', NULL, '2', '2', NULL, '2', '200', '300', 'Developer', '1', '0', '2025-10-02 07:46:10', '2025-10-09 05:38:50'),
(84, '2025-05-14', '1 test', '50', '304', '10', '10', '10', '10', '1.2', '40', '60', '1 Test', '0', '1', '2025-10-14 13:45:20', '2025-10-14 13:45:20'),
(85, '2025-05-14', 'Hand wash sink Z series', '550', '304', '22.700', '72', '18', '12+6', '1.2', '11350', '14074', '', '0', '1', '2025-10-14 14:47:03', '2025-10-14 14:47:03'),
(86, '2025-05-14', 'hand wash sink j series', '550', '304', '22.700', '72', '15', '10+4', '1.2', '500', '620', '', '0', '1', '2025-10-14 14:54:33', '2025-10-14 14:54:33'),
(87, '2025-05-14', 'Work table II tier', '500', '305', '20.400', '36', '24', '34', '1.2', '475', '550', '', '0', '1', '2025-10-16 11:36:57', '2025-10-16 11:36:57'),
(88, '2025-05-14', 'Display Counter 4.5\' (Cold)', '110500', '304', NULL, '53', '25', '51', '1', '109000', '112500', 'Inner frame work by quality ISO 304 grade stainless steel pipes. Bottom & side paneling by SS 304 grade Sheet. Glass paneling by clear toughened glass. Display top by white Korean and shelf by SS 304 grade round tube. It is fitted with emerson compresser with digital controller, water condensing unit. It consist of three Shelves with UPVC sliding door and lock. It is mounted on Wheel.', '1', '1', '2025-10-24 09:18:15', '2025-10-24 09:18:15'),
(89, '2025-05-14', 'Display Counter 3.5\' (Hot)', '61500', '304', NULL, '41', '25', '51', '1', '60500', '64500', 'Inner frame work by quality ISO 304 grade stainless steel pipes. Bottom & side paneling by 304 grade SS Sheet. It is fitted with electrical heating element with digital electrical controller .Glass paneling by clear toughened glass. Display top by white Korean and shelf by SS round pipe. It consist of three Shelves with UPVC sliding door. It is mounted on Wheel.', '1', '1', '2025-10-24 09:23:40', '2025-10-24 09:23:40'),
(90, '2025-05-14', 'retest', '3000', '304', NULL, '10', '10', '20', '1.2', '2500', '3500', 'xyz', '1', '1', '2025-11-04 09:36:08', '2025-11-04 09:36:08'),
(91, '2025-05-14', 'a1 test', '100', '302', NULL, '10', '10', '10', '1.2', '80', '110', 'test', '1', '1', '2025-11-10 14:52:43', '2025-11-10 14:52:43'),
(92, '2025-05-14', 'B1', '200', '305', NULL, '10', '10', '10', '10', '150', '250', 'abcd', '1', '1', '2025-11-13 10:21:27', '2025-11-13 10:21:27'),
(93, '2025-05-14', 'Test1', '0', 'A', NULL, '0', '0', '0', '0', '0', '0', 'Test', '1', '1', '2025-12-14 13:54:09', '2025-12-14 13:54:09'),
(94, '2025-05-14', 'Test4', '0', 'A', NULL, '0', '0', '0', '0', '0', '0', 'test', '1', '1', '2025-12-14 14:18:01', '2025-12-14 14:18:01');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `variantName` varchar(255) DEFAULT NULL,
  `length` text NOT NULL,
  `width` text NOT NULL,
  `height` text DEFAULT NULL,
  `thickness` text NOT NULL,
  `ratePerQuantity` text NOT NULL,
  `minCost` text NOT NULL,
  `maxCost` text NOT NULL,
  `status` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `productId`, `variantName`, `length`, `width`, `height`, `thickness`, `ratePerQuantity`, `minCost`, `maxCost`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 94, NULL, '10', '5', '5', '6', '100', '80', '700', '1', '2025-12-14 14:18:01', '2025-12-14 14:18:01'),
(2, 94, NULL, '5', '8', '7', '4', '50', '30', '800', '1', '2025-12-14 14:18:01', '2025-12-14 14:18:01');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `id` int(11) NOT NULL,
  `vendorId` text DEFAULT NULL,
  `vendor` text NOT NULL,
  `vendorAddress` text NOT NULL,
  `totalAmount` text NOT NULL,
  `orderStatus` text DEFAULT NULL,
  `requestedBy` text NOT NULL,
  `requestedDate` text DEFAULT NULL,
  `approvedBy` text DEFAULT NULL,
  `approvedDate` text DEFAULT NULL,
  `cgst` text NOT NULL,
  `sgst` text NOT NULL,
  `deliveryDate` text NOT NULL,
  `paymentNote` text NOT NULL,
  `deliveryNote` text NOT NULL,
  `insurance` text NOT NULL,
  `warranty` text NOT NULL,
  `remarks` text NOT NULL,
  `notes` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL,
  `updatedAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `purchase_orders`
--

INSERT INTO `purchase_orders` (`id`, `vendorId`, `vendor`, `vendorAddress`, `totalAmount`, `orderStatus`, `requestedBy`, `requestedDate`, `approvedBy`, `approvedDate`, `cgst`, `sgst`, `deliveryDate`, `paymentNote`, `deliveryNote`, `insurance`, `warranty`, `remarks`, `notes`, `status`, `createdAt`, `updatedAt`) VALUES
(16, '8', 'Chris Benn', '#15, St.Antony street, Charles nagar, Pattabiram, Chennai - 600072', '150000', 'Approved', 'whm test', '2025-10-16', NULL, NULL, '9', '9', '2025-10-30', '15 Days', '', '', '', 'Quality products', '', '1', '2025-10-16 12:29:50', '2025-10-16 12:30:50');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order_items`
--

CREATE TABLE `purchase_order_items` (
  `id` int(11) NOT NULL,
  `purchaseId` text NOT NULL,
  `rawMaterialId` text NOT NULL,
  `rawMaterial` text NOT NULL,
  `quantity` text NOT NULL,
  `unitPrice` text NOT NULL,
  `unit` text NOT NULL,
  `specification` text NOT NULL,
  `gst` text NOT NULL,
  `deliveryDate` text NOT NULL,
  `totalPrice` text NOT NULL,
  `status` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL,
  `updatedAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `purchase_order_items`
--

INSERT INTO `purchase_order_items` (`id`, `purchaseId`, `rawMaterialId`, `rawMaterial`, `quantity`, `unitPrice`, `unit`, `specification`, `gst`, `deliveryDate`, `totalPrice`, `status`, `createdAt`, `updatedAt`) VALUES
(20, '16', '11', 'SS 304 Grade sheet 8x4 1.2mm', '5', '30000', 'pieces', 'Jindal', '18', '2025-10-30', '150000', '1', '2025-10-16 12:29:50', '2025-10-16 12:29:50');

-- --------------------------------------------------------

--
-- Table structure for table `raw_materials`
--

CREATE TABLE `raw_materials` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `barcode` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `unit` text NOT NULL,
  `category` text NOT NULL,
  `minimumStock` text NOT NULL,
  `currentStock` text NOT NULL,
  `unitPrice` text NOT NULL,
  `vendorId` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL,
  `updatedAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `raw_materials`
--

INSERT INTO `raw_materials` (`id`, `name`, `barcode`, `description`, `unit`, `category`, `minimumStock`, `currentStock`, `unitPrice`, `vendorId`, `status`, `createdAt`, `updatedAt`) VALUES
(11, 'SS 304 Grade sheet 8x4 1.2mm', 'SBICRM-10000011', 'Jindal steels matt finish', 'pieces', 'steel', '10', '36', '30000', NULL, '0', '2025-10-15 08:24:06', '2025-12-11 04:32:51'),
(12, 'bolt', 'SBICRM-10000012', '2/3', 'pieces', 'other', '50', '69', '10', NULL, '0', '2025-11-04 10:15:40', '2025-12-11 04:32:57'),
(13, 'Test', 'SBICRM-10000013', 'test', 'kg', 'steel', '4', '60', '600', '8', '0', '2025-11-05 04:16:31', '2025-12-11 04:33:00'),
(14, 'TEST', 'SBICRM-10000014', 'test', 'pieces', 'aluminum', '4', '61', '40', '8', '0', '2025-11-09 13:10:24', '2025-12-11 04:33:03'),
(15, 'Abro tape', 'SBICRM-10000015', 'Abro tape for glass, Matt work', 'pieces', 'glass', '5', '9', '30', NULL, '0', '2025-12-09 08:02:01', '2025-12-11 04:33:05'),
(16, 'Adjustable Revolving Bush', 'SBICRM-10000016', '1\'\'', 'kg', 'steel', '10', '15', '10', NULL, '0', '2025-12-11 04:36:44', '2025-12-11 04:36:53'),
(17, 'Adjustable Revolving Bush', 'SBICRM-10000017', '1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 04:36:44', '2025-12-11 04:56:05'),
(18, 'All MS Reduce Bush', 'SBICRM-10000018', 'N/A', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 04:38:05', '2025-12-11 04:38:05'),
(19, 'All SS Fittings TEE', 'SBICRM-10000019', 'N/A', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 04:38:59', '2025-12-11 04:38:59'),
(20, 'B.H.E.L Stool Bush', 'SBICRM-10000020', 'N/A', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 04:41:33', '2025-12-11 04:41:33'),
(21, 'Heater Box Villai', 'SBICRM-10000021', '1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 04:42:33', '2025-12-11 04:42:33'),
(22, 'Ball Valve (Gun Metal)', 'SBICRM-10000022', '1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 04:43:28', '2025-12-11 04:43:28'),
(23, 'Ball Valve (Racer)', 'SBICRM-10000023', '3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 04:45:22', '2025-12-11 04:45:22'),
(24, 'Ball Valve', 'SBICRM-10000024', '3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 04:56:57', '2025-12-11 04:56:57'),
(25, ' Heater box villai', 'SBICRM-10000025', ' 1 1/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:31:20', '2025-12-11 06:31:20'),
(26, 'Adjustable Revolving  Bush', 'SBICRM-10000026', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:38:04', '2025-12-11 06:38:04'),
(27, 'All MS Reduce Bush', 'SBICRM-10000027', 'not applicable', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:38:42', '2025-12-11 06:38:42'),
(28, 'All SS Fittings TEE', 'SBICRM-10000028', 'not applicable', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:39:16', '2025-12-11 06:39:16'),
(29, ' B.H.E.L Stool Bush ', 'SBICRM-10000029', 'not applicable', 'pieces', 'steel', '10', '15', '8', NULL, '1', '2025-12-11 06:39:46', '2025-12-11 06:39:46'),
(30, 'Ball Valve (Gun Metal)', 'SBICRM-10000030', ' 1\'\'', 'pieces', 'steel', '10', '14', '10', NULL, '1', '2025-12-11 06:40:24', '2025-12-11 06:40:24'),
(31, 'Ball Valve (Racer)', 'SBICRM-10000031', ' 3/4\"', 'pieces', 'steel', '10', '15', '9', NULL, '1', '2025-12-11 06:41:00', '2025-12-11 06:41:00'),
(32, ' Ball Valve', 'SBICRM-10000032', ' 3/8\"', 'pieces', 'steel', '10', '15', '8', NULL, '1', '2025-12-11 06:41:36', '2025-12-11 06:41:36'),
(33, 'Ball Valve (Racer)', 'SBICRM-10000033', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:42:09', '2025-12-11 06:42:09'),
(34, ' Ball Valve  (Racer)', 'SBICRM-10000034', ' 1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:42:44', '2025-12-11 06:42:44'),
(35, ' Ball Valve (Gun Metal)', 'SBICRM-10000035', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:43:16', '2025-12-11 06:43:16'),
(36, ' Ball Valve (Racer)', 'SBICRM-10000036', '1\"', 'pieces', 'steel', '10', '15', '9', NULL, '1', '2025-12-11 06:43:47', '2025-12-11 06:43:47'),
(37, 'Bend Meter', 'SBICRM-10000037', ' 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:44:23', '2025-12-11 06:44:23'),
(38, 'Boiler Safety Valve', 'SBICRM-10000038', '3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:45:00', '2025-12-11 06:45:00'),
(39, 'Bolt Bush', 'SBICRM-10000039', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:45:33', '2025-12-11 06:45:33'),
(40, 'Bolt Bush ', 'SBICRM-10000040', '3/8x1 1/2\'\'', 'pieces', 'steel', '10', '15', '9', NULL, '1', '2025-12-11 06:46:06', '2025-12-11 06:46:06'),
(41, 'Bolt bush (Black)-Small', 'SBICRM-10000041', '3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:46:38', '2025-12-11 06:46:38'),
(42, 'Bolt Bush Black', 'SBICRM-10000042', ' 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:47:08', '2025-12-11 06:47:08'),
(43, 'Bolt Bush white', 'SBICRM-10000043', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:47:44', '2025-12-11 06:47:44'),
(44, 'Bolt Mixed', 'SBICRM-10000044', 'None', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 06:48:10', '2025-12-11 06:48:10'),
(45, 'Bootan Nipple Washer', 'SBICRM-10000045', ' 3/4\" ', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:00:35', '2025-12-11 07:00:35'),
(46, 'Bootan Nut OLD', 'SBICRM-10000046', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:01:14', '2025-12-11 07:01:14'),
(47, ' Bootan Nut Rod', 'SBICRM-10000047', 'Brass', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:01:55', '2025-12-11 07:01:55'),
(48, 'Bootan Villai', 'SBICRM-10000048', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:02:32', '2025-12-11 07:02:32'),
(49, ' Brass Bootan Nut', 'SBICRM-10000049', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:03:00', '2025-12-11 07:03:00'),
(50, ' Brass cone  (Iddly)', 'SBICRM-10000050', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:03:38', '2025-12-11 07:03:38'),
(51, 'SS Nut (Iddly)', 'SBICRM-10000051', ' 5/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:04:30', '2025-12-11 07:04:30'),
(52, 'BURNER UNIT ONLY', 'SBICRM-10000052', ' G-9', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:05:02', '2025-12-11 07:05:02'),
(53, 'BURNER HEAD ', 'SBICRM-10000053', 'T-22 ', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:05:32', '2025-12-11 07:05:32'),
(54, 'Burner HEAD', 'SBICRM-10000054', 'T-78', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:06:12', '2025-12-11 07:06:12'),
(55, 'Burner HEAD', 'SBICRM-10000055', ' T-35', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:06:43', '2025-12-11 07:06:43'),
(56, 'Burner HEAD', 'SBICRM-10000056', 'T-50', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:07:12', '2025-12-11 07:07:12'),
(57, 'Burner HEAD', 'SBICRM-10000057', ' T-50', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:07:39', '2025-12-11 07:07:39'),
(58, 'Burner HEAD', 'SBICRM-10000058', ' G-8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:08:09', '2025-12-11 07:08:09'),
(59, 'Burner HEAD', 'SBICRM-10000059', 'G-9', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:08:38', '2025-12-11 07:08:38'),
(60, 'Burner HEAD', 'SBICRM-10000060', 'G-9', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:09:00', '2025-12-11 07:09:00'),
(61, 'Burner HEAD', 'SBICRM-10000061', ' G-10', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:09:33', '2025-12-11 07:09:33'),
(62, 'Burner HEAD', 'SBICRM-10000062', ' G-10', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:09:59', '2025-12-11 07:09:59'),
(63, 'Burner HEAD', 'SBICRM-10000063', ' G-11', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:11:25', '2025-12-11 07:11:25'),
(64, 'SS Cutting Coupling ', 'SBICRM-10000064', '1 1/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:11:53', '2025-12-11 07:11:53'),
(65, 'Burner Washer', 'SBICRM-10000065', ' T-78', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:12:33', '2025-12-11 07:12:33'),
(66, 'Burner Washer', 'SBICRM-10000066', ' T-50', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:13:39', '2025-12-11 07:13:39'),
(67, 'Burner Washer', 'SBICRM-10000067', ' T-35', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:14:15', '2025-12-11 07:14:15'),
(68, 'Burner Washer', 'SBICRM-10000068', ' T-22', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:14:44', '2025-12-11 07:14:44'),
(69, 'Bullet screw', 'SBICRM-10000069', '3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:16:51', '2025-12-11 07:16:51'),
(70, 'Canteen Burner', 'SBICRM-10000070', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:17:40', '2025-12-11 07:17:40'),
(71, 'Chinese  Doom Round', 'SBICRM-10000071', 'OD-14\" ID 13', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:18:11', '2025-12-11 07:18:11'),
(72, 'Chinese  Doom Square', 'SBICRM-10000072', 'OD-15x15; ID-13;H-7&3', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:18:45', '2025-12-11 07:18:45'),
(73, 'Chinese  Doom Square', 'SBICRM-10000073', ' OD-11;ID-7;H-4 1/2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:19:17', '2025-12-11 07:19:17'),
(74, 'Chair Leg Outer Bush ', 'SBICRM-10000074', '1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:19:52', '2025-12-11 07:19:52'),
(75, 'Chicken Filter  Pan', 'SBICRM-10000075', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:20:26', '2025-12-11 07:20:26'),
(76, 'Chinese  Doom Round', 'SBICRM-10000076', 'OD-15\";ID-12\"; H-7', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:20:56', '2025-12-11 07:20:56'),
(77, 'Cone Rubber', 'SBICRM-10000077', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:21:24', '2025-12-11 07:21:24'),
(78, 'GN Pan', 'SBICRM-10000078', '1X1X150', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:21:52', '2025-12-11 07:21:52'),
(79, 'GN Pan', 'SBICRM-10000079', '1X6X100', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:22:42', '2025-12-11 07:22:42'),
(80, 'GN Lid', 'SBICRM-10000080', ' 1x1', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:23:36', '2025-12-11 07:23:36'),
(81, 'GN Lid', 'SBICRM-10000081', '1X6', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:24:22', '2025-12-11 07:24:22'),
(82, 'GN Pan', 'SBICRM-10000082', ' 1x2x150', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:24:53', '2025-12-11 07:24:53'),
(83, 'GN Lid', 'SBICRM-10000083', ' 1x2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:25:21', '2025-12-11 07:25:21'),
(84, 'Copper Tube', 'SBICRM-10000084', ' 1 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:25:50', '2025-12-11 07:25:50'),
(85, 'Air Clamp', 'SBICRM-10000085', ' (B)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:26:20', '2025-12-11 07:26:20'),
(86, 'Copper Tube', 'SBICRM-10000086', ' 1 1/2 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:26:49', '2025-12-11 07:26:49'),
(87, 'Copper Tube', 'SBICRM-10000087', ' 2 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:27:16', '2025-12-11 07:27:16'),
(88, 'Copper Tube', 'SBICRM-10000088', ' 2 1/2 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:27:44', '2025-12-11 07:27:44'),
(89, 'Copper Tube', 'SBICRM-10000089', ' 3 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:28:08', '2025-12-11 07:28:08'),
(90, 'Cork', 'SBICRM-10000090', ' 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:30:30', '2025-12-11 07:30:30'),
(91, 'Domestic Burner', 'SBICRM-10000091', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:30:54', '2025-12-11 07:30:54'),
(92, 'Dosa Burner', 'SBICRM-10000092', ' 5 1/2 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:31:26', '2025-12-11 07:31:26'),
(93, 'Dosa Burner', 'SBICRM-10000093', ' 3 1/2 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:31:55', '2025-12-11 07:31:55'),
(94, 'Dosa Burner', 'SBICRM-10000094', '4 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:32:33', '2025-12-11 07:32:33'),
(95, 'Dosa Burner', 'SBICRM-10000095', '2.5 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:33:02', '2025-12-11 07:33:02'),
(96, 'Dosai Burner', 'SBICRM-10000096', '2 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:33:48', '2025-12-11 07:33:48'),
(97, 'SS Pipe Nipple', 'SBICRM-10000097', ' 1\" x 3\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:34:14', '2025-12-11 07:34:14'),
(98, 'Dummy Bootan Rod', 'SBICRM-10000098', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:35:20', '2025-12-11 07:35:20'),
(99, 'Dummy Bush', 'SBICRM-10000099', ' 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:36:17', '2025-12-11 07:36:17'),
(100, 'PILOT BURNER', 'SBICRM-100000100', ' CHINESE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:36:55', '2025-12-11 07:36:55'),
(101, 'Dummy Nut Brass', 'SBICRM-100000101', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:37:32', '2025-12-11 07:37:32'),
(102, 'Fire Bar', 'SBICRM-100000102', '15\'\'x15\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:38:00', '2025-12-11 07:38:00'),
(103, 'Fire Bar', 'SBICRM-100000103', ' 12\'\'x12\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:38:38', '2025-12-11 07:38:38'),
(104, 'FLANGE WASHER (RUBBER)', 'SBICRM-100000104', ' 5\" x 5\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:39:09', '2025-12-11 07:39:09'),
(105, 'DUMMY WASHER (RUBBER)', 'SBICRM-100000105', '10 1/2\" X 8 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:39:43', '2025-12-11 07:39:43'),
(106, 'GI BOLT', 'SBICRM-100000106', ' 2 1/2\" X 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:40:12', '2025-12-11 07:40:12'),
(107, ' Float Ball Brass valve', 'SBICRM-100000107', ' 3/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:40:40', '2025-12-11 07:40:40'),
(108, 'HEATER BOX VILLAI ', 'SBICRM-100000108', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:41:21', '2025-12-11 07:41:21'),
(109, 'DBC HOSE ', 'SBICRM-100000109', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:41:45', '2025-12-11 07:41:45'),
(110, 'G.I MIXED FITTINGS', 'SBICRM-100000110', ' 1/2\"x6', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:42:15', '2025-12-11 07:42:15'),
(111, 'SS BEND ', 'SBICRM-100000111', '3 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:42:46', '2025-12-11 07:42:46'),
(112, 'G.I \'U\'-Clamp', 'SBICRM-100000112', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:43:15', '2025-12-11 07:43:15'),
(113, 'G.I \'U\'-Clamp', 'SBICRM-100000113', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:43:45', '2025-12-11 07:43:45'),
(114, 'G.I \'U\'-Clamp', 'SBICRM-100000114', ' 1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:44:08', '2025-12-11 07:44:08'),
(115, 'G.& M.SI Union BOLT & NUT Mixed', 'SBICRM-100000115', ' G.I', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:44:42', '2025-12-11 07:44:42'),
(116, 'Gas Clamp', 'SBICRM-100000116', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:45:13', '2025-12-11 07:45:13'),
(117, 'Gas Clamp', 'SBICRM-100000117', ' 1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:45:38', '2025-12-11 07:45:38'),
(118, 'GI BOLT', 'SBICRM-100000118', ' 2\" X 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:46:08', '2025-12-11 07:46:08'),
(119, 'Gas Nipple', 'SBICRM-100000119', '2\" X 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:46:35', '2025-12-11 07:46:35'),
(120, 'Gas Nipple', 'SBICRM-100000120', ' 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:47:09', '2025-12-11 07:47:09'),
(121, 'Gas NRV', 'SBICRM-100000121', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:47:34', '2025-12-11 07:47:34'),
(122, 'Gate Valve (Wheel) [OLD]', 'SBICRM-100000122', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:48:05', '2025-12-11 07:48:05'),
(123, 'Gate Valve (Wheel)[OLD]', 'SBICRM-100000123', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:48:32', '2025-12-11 07:48:32'),
(124, 'Gauge class Set', 'SBICRM-100000124', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:48:58', '2025-12-11 07:48:58'),
(125, 'Gauge Glass tube', 'SBICRM-100000125', ' 1/2\" x 16\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:49:29', '2025-12-11 07:49:29'),
(126, 'Gauge Glass tube', 'SBICRM-100000126', ' 1/2\" x 18\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:49:50', '2025-12-11 07:49:50'),
(127, 'Gauge Glass tube', 'SBICRM-100000127', '1/2\" x 12\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:50:23', '2025-12-11 07:50:23'),
(128, 'Gauge Glass tube', 'SBICRM-100000128', ' 3/4\" x 12\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:50:49', '2025-12-11 07:50:49'),
(129, 'Gauge Glass tube', 'SBICRM-100000129', ' 1/2\" x 22\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:51:10', '2025-12-11 07:51:10'),
(130, 'Gauge guard  ', 'SBICRM-100000130', '16\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:51:47', '2025-12-11 07:51:47'),
(131, 'Gauge guard  ', 'SBICRM-100000131', '12\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:52:16', '2025-12-11 07:52:16'),
(132, 'GI Bolt ', 'SBICRM-100000132', '3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:53:42', '2025-12-11 07:53:42'),
(133, 'GI Bend', 'SBICRM-100000133', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:54:10', '2025-12-11 07:54:10'),
(134, 'GI Bend', 'SBICRM-100000134', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:54:44', '2025-12-11 07:54:44'),
(135, 'GI Bend', 'SBICRM-100000135', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:55:10', '2025-12-11 07:55:10'),
(136, 'GI Bolt', 'SBICRM-100000136', ' 1/4\" x 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:55:37', '2025-12-11 07:55:37'),
(137, 'GI Bolt', 'SBICRM-100000137', ' 1/2\" x 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:56:04', '2025-12-11 07:56:04'),
(138, 'GI Bolt', 'SBICRM-100000138', '1/4\" x 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:56:33', '2025-12-11 07:56:33'),
(139, 'GI Bolt', 'SBICRM-100000139', ' 5/16\" x 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:56:56', '2025-12-11 07:56:56'),
(140, 'GI Bolt', 'SBICRM-100000140', ' 5/16\" x 1', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:57:29', '2025-12-11 07:57:29'),
(141, 'GI Bolt', 'SBICRM-100000141', '3/8\" x 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:58:05', '2025-12-11 07:58:05'),
(142, 'GI Bolt', 'SBICRM-100000142', '3/8\" x 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:58:41', '2025-12-11 07:58:41'),
(143, 'GI Nut', 'SBICRM-100000143', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:59:22', '2025-12-11 07:59:22'),
(144, 'GI Nut', 'SBICRM-100000144', '1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 07:59:55', '2025-12-11 07:59:55'),
(145, 'GI Pipe Nipple', 'SBICRM-100000145', ' 1\" x 9\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:00:47', '2025-12-11 08:00:47'),
(146, 'GI Pipe Nipple', 'SBICRM-100000146', ' 3/4\" x 12\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:01:35', '2025-12-11 08:01:35'),
(147, 'GI Pipe Nipple', 'SBICRM-100000147', ' 1\'\' x 6\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:02:07', '2025-12-11 08:02:07'),
(148, 'GI Pipe Nipple', 'SBICRM-100000148', '3/4\" x  9\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:02:45', '2025-12-11 08:02:45'),
(149, 'GI Pipe Nipple', 'SBICRM-100000149', ' 1\" X 4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:03:08', '2025-12-11 08:03:08'),
(150, 'GI Pipe Nipple', 'SBICRM-100000150', ' 3/4\" X 6\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:03:37', '2025-12-11 08:03:37'),
(151, 'GI Pipe Nipple', 'SBICRM-100000151', '3/4\" X 4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:04:03', '2025-12-11 08:04:03'),
(152, 'GI Reducer Elbow', 'SBICRM-100000152', ' 3/4\" X 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:04:46', '2025-12-11 08:04:46'),
(153, 'MS Rivets', 'SBICRM-100000153', ' 3/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:05:14', '2025-12-11 08:05:14'),
(154, 'GI Pipe Nipple', 'SBICRM-100000154', ' 1\"X3\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:05:42', '2025-12-11 08:05:42'),
(155, 'H Nipple', 'SBICRM-100000155', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:06:13', '2025-12-11 08:06:13'),
(156, 'H Nipple', 'SBICRM-100000156', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:07:14', '2025-12-11 08:07:14'),
(157, 'H Nipple', 'SBICRM-100000157', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:07:48', '2025-12-11 08:07:48'),
(158, ' Handle knob (Iddly)', 'SBICRM-100000158', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:37:52', '2025-12-11 08:37:52'),
(159, 'Handle Rod (Iddly)', 'SBICRM-100000159', ' 1/2\" x 4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:38:26', '2025-12-11 08:38:26'),
(160, 'Handrail Cup Round', 'SBICRM-100000160', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:39:47', '2025-12-11 08:39:47'),
(161, 'Handrail Cup Round', 'SBICRM-100000161', ' 1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:40:16', '2025-12-11 08:40:16'),
(162, 'Handrail Cup Round', 'SBICRM-100000162', ' 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:40:50', '2025-12-11 08:40:50'),
(163, 'Handrail Cup Round', 'SBICRM-100000163', ' 3/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:41:11', '2025-12-11 08:41:11'),
(164, 'Handrail Cup Square', 'SBICRM-100000164', ' 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:41:44', '2025-12-11 08:41:44'),
(165, 'Handrail Cup Square', 'SBICRM-100000165', ' 1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:42:10', '2025-12-11 08:42:10'),
(166, 'Handrill Materials', 'SBICRM-100000166', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:42:38', '2025-12-11 08:42:38'),
(167, 'Handrill Work Ball', 'SBICRM-100000167', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:43:10', '2025-12-11 08:43:10'),
(168, 'Grinding Disc (Green)', 'SBICRM-100000168', ' 4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:43:53', '2025-12-11 08:43:53'),
(169, 'Hinges ', 'SBICRM-100000169', '5\" x 8 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:44:26', '2025-12-11 08:44:26'),
(170, 'Hinges ', 'SBICRM-100000170', '6\" x 5\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:44:50', '2025-12-11 08:44:50'),
(171, 'Hinges ms', 'SBICRM-100000171', ' 3\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:45:21', '2025-12-11 08:45:21'),
(172, 'GI BOLT', 'SBICRM-100000172', ' 1\" X 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:46:01', '2025-12-11 08:46:01'),
(173, 'Hot Case Container ( 21\" X 13\" 6\")', 'SBICRM-100000173', ' 530x325x150 mm 20Lit', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:46:59', '2025-12-11 08:46:59'),
(174, 'Hot Case Container ( 21\" X 13\" 6\")', 'SBICRM-100000174', ' 530x325x200 mm 20Lit', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:47:39', '2025-12-11 08:47:39'),
(175, 'Hot Case Container ( 21\" X 13\"X 2\") ', 'SBICRM-100000175', '530x325x60 mm 5 Lits', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:48:11', '2025-12-11 08:48:11'),
(176, 'Hot Case Container ( 21\" X 13\"X 4\")', 'SBICRM-100000176', ' 530x325x100 mm10 Lits', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:48:46', '2025-12-11 08:48:46'),
(177, 'Hot Case Container (12 3/4\"x10 \"x8\")', 'SBICRM-100000177', ' 320x260x200(mm) 10Lit', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:49:19', '2025-12-11 08:49:19'),
(178, 'Hot Case Container (13\" X 10 1/2\"X 4\")', 'SBICRM-100000178', '325x265x95 mm 5Lit', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:49:55', '2025-12-11 08:49:55'),
(179, 'Hot Case Container (13\"x10 1/2\"x6\")', 'SBICRM-100000179', ' 330x270x150 mm 10 Lits', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:50:31', '2025-12-11 08:50:31'),
(180, 'Hot Case knob', 'SBICRM-100000180', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:50:53', '2025-12-11 08:50:53'),
(181, 'Iddly Gasket', 'SBICRM-100000181', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:51:40', '2025-12-11 08:51:40'),
(182, ' Jacket Bootan', 'SBICRM-100000182', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:52:04', '2025-12-11 08:52:04'),
(183, 'SS BEND 1 1/2\" ', 'SBICRM-100000183', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:52:32', '2025-12-11 08:52:32'),
(184, 'Lid Rubber', 'SBICRM-100000184', ' 17\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:52:58', '2025-12-11 08:52:58'),
(185, ' Lid Rubber', 'SBICRM-100000185', ' 19\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:53:30', '2025-12-11 08:53:30'),
(186, 'Love Joint Coupling', 'SBICRM-100000186', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:53:58', '2025-12-11 08:53:58'),
(187, 'LPG Adopter [OLD]', 'SBICRM-100000187', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:54:25', '2025-12-11 08:54:25'),
(188, 'LPG Adopter ', 'SBICRM-100000188', '22 mm (private)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:54:53', '2025-12-11 08:54:53'),
(189, 'LPG adopter (Govt)', 'SBICRM-100000189', ' 25mm Govt', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:55:27', '2025-12-11 08:55:27'),
(190, 'LPG Hose', 'SBICRM-100000190', ' 5 Feet 1/2x 1/2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:56:49', '2025-12-11 08:56:49'),
(191, 'LPG Hose', 'SBICRM-100000191', ' 4 Feet 1/2x 1/2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:57:21', '2025-12-11 08:57:21'),
(192, 'LPG Hose', 'SBICRM-100000192', ' 3 Feet  1/2x1/2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:57:48', '2025-12-11 08:57:48'),
(193, 'LPG Hose', 'SBICRM-100000193', '2 Feet   1/2x1/2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:58:22', '2025-12-11 08:58:22'),
(194, 'LPG Hose', 'SBICRM-100000194', ' 1 Feet  1/2x 1/2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:59:06', '2025-12-11 08:59:06'),
(195, 'LPG Hose', 'SBICRM-100000195', ' 1/2x 3/8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 08:59:37', '2025-12-11 08:59:37'),
(196, 'Main Cork Valve (Iddly)', 'SBICRM-100000196', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:00:13', '2025-12-11 09:00:13'),
(197, 'Mango piece (Iddly)', 'SBICRM-100000197', 'SS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:00:35', '2025-12-11 09:00:35'),
(198, 'Masala Container(13\"x7\"x6\")', 'SBICRM-100000198', '325x175x145 mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:01:18', '2025-12-11 09:01:18'),
(199, 'Masala Container(13\"x7\"x6\")', 'SBICRM-100000199', ' 325x175x145 mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:03:34', '2025-12-11 09:03:34'),
(200, 'Masala Container(7\" x 4 1/2\")', 'SBICRM-100000200', ' 175x110x95 mm ', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:03:57', '2025-12-11 09:03:57'),
(201, ' Masala Container(7\" x 6 1/2\" x 5 1/2\"H)', 'SBICRM-100000201', ' 175x160x140mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:04:22', '2025-12-11 09:04:22'),
(202, ' Masala Container(7\" x 6 1/2\")', 'SBICRM-100000202', ' 175x160x95mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:04:47', '2025-12-11 09:04:47'),
(203, 'Masala sampattam', 'SBICRM-100000203', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:05:15', '2025-12-11 09:05:15'),
(204, 'Mini Iddly Tray ', 'SBICRM-100000204', '80 Iddly', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:05:40', '2025-12-11 09:05:40'),
(205, 'Mini Iddly Tray ', 'SBICRM-100000205', '49 Iddly', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:06:05', '2025-12-11 09:06:05'),
(206, 'Mini Iddly Tray ', 'SBICRM-100000206', '35 Iddly', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:06:20', '2025-12-11 09:06:20'),
(207, ' Mini Iddly Tray ', 'SBICRM-100000207', '63 Iddly', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:06:43', '2025-12-11 09:06:43'),
(208, ' Mixed Pipe Nipple', 'SBICRM-100000208', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:07:03', '2025-12-11 09:07:03'),
(209, ' Mixed Pipe\'s', 'SBICRM-100000209', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:07:23', '2025-12-11 09:07:23'),
(210, ' Mixed Screws', 'SBICRM-100000210', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:07:41', '2025-12-11 09:07:41'),
(211, 'SS dummy', 'SBICRM-100000211', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:08:08', '2025-12-11 09:08:08'),
(212, 'SS dummy', 'SBICRM-100000212', '1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:08:27', '2025-12-11 09:08:28'),
(213, ' MS Angle', 'SBICRM-100000213', ' MS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:08:51', '2025-12-11 09:08:51'),
(214, 'MS Coupling', 'SBICRM-100000214', '1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:09:16', '2025-12-11 09:09:16'),
(215, 'MS Coupling', 'SBICRM-100000215', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:09:35', '2025-12-11 09:09:35'),
(216, 'MS Coupling', 'SBICRM-100000216', '3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:09:57', '2025-12-11 09:09:57'),
(217, 'MS Coupling', 'SBICRM-100000217', ' 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:10:25', '2025-12-11 09:10:25'),
(218, ' MS Elbow', 'SBICRM-100000218', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:10:53', '2025-12-11 09:10:53'),
(219, ' MS Elbow', 'SBICRM-100000219', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:11:18', '2025-12-11 09:11:19'),
(220, ' MS Elbow', 'SBICRM-100000220', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:12:12', '2025-12-11 09:12:12'),
(221, ' MS Elbow', 'SBICRM-100000221', ' 2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:12:23', '2025-12-11 09:12:23'),
(222, 'MS Flange', 'SBICRM-100000222', ' 1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:12:48', '2025-12-11 09:12:48'),
(223, 'MS Flange', 'SBICRM-100000223', ' 3/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:13:26', '2025-12-11 09:13:26'),
(224, 'MS Pipe nipple', 'SBICRM-100000224', ' 1 1/4\" x 8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:13:49', '2025-12-11 09:13:49'),
(225, ' TEA STALL BURNER  WITH COPPER TUBE', 'SBICRM-100000225', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:14:09', '2025-12-11 09:14:09'),
(226, ' SS BEND 2\"', 'SBICRM-100000226', '2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:14:33', '2025-12-11 09:14:33'),
(227, 'MS Pipe Nipple MIXED ', 'SBICRM-100000227', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:14:55', '2025-12-11 09:14:55'),
(228, 'SS BEND 1 \"', 'SBICRM-100000228', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:15:18', '2025-12-11 09:15:18'),
(229, 'MS Plug', 'SBICRM-100000229', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:15:41', '2025-12-11 09:15:41'),
(230, ' MS Plug', 'SBICRM-100000230', ' \"1  x 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:16:00', '2025-12-11 09:16:00'),
(231, 'MS Plug', 'SBICRM-100000231', ' \"1  x 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:16:26', '2025-12-11 09:16:26'),
(232, 'MS Plug', 'SBICRM-100000232', ' \"1  x 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:17:08', '2025-12-11 09:17:08'),
(233, 'MS Plug', 'SBICRM-100000233', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:17:34', '2025-12-11 09:17:34'),
(234, 'MS Plug', 'SBICRM-100000234', ' 2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:17:58', '2025-12-11 09:17:58'),
(235, 'MS Reducer Coupling', 'SBICRM-100000235', ' 3/4\" x 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:18:22', '2025-12-11 09:18:22'),
(236, 'MS Reducer Coupling', 'SBICRM-100000236', ' 1\'\'  x 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:18:43', '2025-12-11 09:18:43'),
(237, 'MS Reducer Coupling', 'SBICRM-100000237', ' 1\'\'  x 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:19:09', '2025-12-11 09:19:09'),
(238, 'MS Reducer Coupling', 'SBICRM-100000238', ' 2\" x 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:19:34', '2025-12-11 09:19:34'),
(239, 'MS Rivets', 'SBICRM-100000239', ' 1/4\"', 'pieces', 'steel', '10', '15', '9', NULL, '1', '2025-12-11 09:20:01', '2025-12-11 09:20:01'),
(240, 'MS Rivets Washer', 'SBICRM-100000240', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:20:21', '2025-12-11 09:20:21'),
(241, 'MS Rivets', 'SBICRM-100000241', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:20:55', '2025-12-11 09:20:55'),
(242, 'MS Rivets', 'SBICRM-100000242', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:21:21', '2025-12-11 09:21:21'),
(243, 'MS Rivets', 'SBICRM-100000243', '1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:21:37', '2025-12-11 09:21:37'),
(244, ' MS Screw', 'SBICRM-100000244', ' 1/4\"x2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:21:59', '2025-12-11 09:21:59'),
(245, ' MS Sheet', 'SBICRM-100000245', ' 18G,8X4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:22:19', '2025-12-11 09:22:19'),
(246, ' MS Sheet', 'SBICRM-100000246', '3mm,8x4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:22:44', '2025-12-11 09:22:44'),
(247, ' MS Sheet', 'SBICRM-100000247', ' 5mm 8x4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:23:04', '2025-12-11 09:23:04'),
(248, 'MS Tee', 'SBICRM-100000248', '3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:23:26', '2025-12-11 09:23:26'),
(249, 'MS TEE', 'SBICRM-100000249', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:23:48', '2025-12-11 09:23:48'),
(250, ' MS Tee', 'SBICRM-100000250', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:24:14', '2025-12-11 09:24:14'),
(251, ' MS Tee', 'SBICRM-100000251', ' 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:25:11', '2025-12-11 09:25:11'),
(252, 'MS Union', 'SBICRM-100000252', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:25:34', '2025-12-11 09:25:34'),
(253, 'thread ball', 'SBICRM-100000253', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:25:53', '2025-12-11 09:25:53'),
(254, 'MS Union', 'SBICRM-100000254', ' 3/4\" ', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:26:14', '2025-12-11 09:26:14'),
(255, 'MS Weld Bend', 'SBICRM-100000255', '1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:26:35', '2025-12-11 09:26:35'),
(256, 'NC Valve', 'SBICRM-100000256', 'Long', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:26:53', '2025-12-11 09:26:53'),
(257, 'NC Valve', 'SBICRM-100000257', 'Short', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:27:07', '2025-12-11 09:27:07'),
(258, 'NC Valve', 'SBICRM-100000258', ' Long - Red', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:27:25', '2025-12-11 09:27:25'),
(259, 'NC Valve', 'SBICRM-100000259', ' Long - Black', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:27:50', '2025-12-11 09:27:50'),
(260, 'NC Valve OLD', 'SBICRM-100000260', ' 3/8\" x 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:28:08', '2025-12-11 09:28:08'),
(261, 'Name Plate (Rectangle)', 'SBICRM-100000261', ' 380 x 50', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:28:32', '2025-12-11 09:28:32'),
(262, 'SS DRAINAGE PLATE', 'SBICRM-100000262', ' 6\'X6\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:30:26', '2025-12-11 09:30:26'),
(263, 'Needle  Valve Racer', 'SBICRM-100000263', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:30:54', '2025-12-11 09:30:54'),
(264, 'NO:13 Lid', 'SBICRM-100000264', ' 5LTRS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:31:16', '2025-12-11 09:31:16'),
(265, 'NO:17 Lid', 'SBICRM-100000265', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:31:35', '2025-12-11 09:31:35'),
(266, 'NO:18 Lid', 'SBICRM-100000266', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:31:56', '2025-12-11 09:31:56'),
(267, 'NO:19 Lid', 'SBICRM-100000267', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:32:15', '2025-12-11 09:32:15'),
(268, ' Normal Iddly Tray ', 'SBICRM-100000268', '20 Iddly', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:32:39', '2025-12-11 09:32:39'),
(269, 'Normal Iddly Tray', 'SBICRM-100000269', '12 Iddly', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:33:01', '2025-12-11 09:33:01'),
(270, 'Normal Iddly Tray', 'SBICRM-100000270', '16 Iddly', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:33:32', '2025-12-11 09:33:32'),
(271, 'NRV', 'SBICRM-100000271', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:34:33', '2025-12-11 09:34:33'),
(272, ' NRV ', 'SBICRM-100000272', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:34:54', '2025-12-11 09:34:54'),
(273, ' NRV Brass Nut Type', 'SBICRM-100000273', ' 1/2x 3/8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:35:16', '2025-12-11 09:35:16'),
(274, 'Oil Pressre Guage', 'SBICRM-100000274', '2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:35:37', '2025-12-11 09:35:37'),
(275, 'Hinges ms', 'SBICRM-100000275', ' 4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:35:57', '2025-12-11 09:35:57'),
(276, 'SHOWER HINGES', 'SBICRM-100000276', '3\"', 'pieces', 'steel', '10', '15', '9', NULL, '1', '2025-12-11 09:36:19', '2025-12-11 09:36:19'),
(277, 'Hinges SS', 'SBICRM-100000277', ' 3\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:36:41', '2025-12-11 09:36:41'),
(278, 'BURNER UNIT', 'SBICRM-100000278', ' T22', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:37:07', '2025-12-11 09:37:07'),
(279, 'Pressure Gauge meter (berrow)', 'SBICRM-100000279', ' 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:37:40', '2025-12-11 09:37:40'),
(280, 'MS Reducer Tee  ', 'SBICRM-100000280', '1\' x 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:38:05', '2025-12-11 09:38:05'),
(281, 'M.S BUSH ', 'SBICRM-100000281', '1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:38:29', '2025-12-11 09:38:29'),
(282, 'Revolving  Bush  (Revolving Table)', 'SBICRM-100000282', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:38:55', '2025-12-11 09:38:55'),
(283, 'Rice Bootan', 'SBICRM-100000283', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:39:29', '2025-12-11 09:39:29'),
(284, ' Rope ASPETAS', 'SBICRM-100000284', '1/8\" or 3 mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:39:53', '2025-12-11 09:39:53'),
(285, 'Round  Container', 'SBICRM-100000285', ' 10 Litres', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:40:20', '2025-12-11 09:40:20'),
(286, 'Round 3 Support', 'SBICRM-100000286', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:40:54', '2025-12-11 09:40:54'),
(287, 'Round 3 Support', 'SBICRM-100000287', ' OD-17\" ID-14 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:41:14', '2025-12-11 09:41:14'),
(288, ' Round 3 Support', 'SBICRM-100000288', ' OD-12\" ID-9', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:41:41', '2025-12-11 09:41:41'),
(289, ' Round 3 Support', 'SBICRM-100000289', ' OD-10 1/2\" ID-8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:42:02', '2025-12-11 09:42:02'),
(290, 'Round 3 Support', 'SBICRM-100000290', ' OD-19 1/2\":ID -15 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:42:29', '2025-12-11 09:42:29'),
(291, 'Round 3 Support', 'SBICRM-100000291', ' OD - 13, ID - 10 3/4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:42:48', '2025-12-11 09:42:48'),
(292, 'Round 4 Support', 'SBICRM-100000292', ' OD-17 1/2\" ID-11 1/2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:43:11', '2025-12-11 09:43:11'),
(293, 'Round 4 Support', 'SBICRM-100000293', 'OD-22\" ID-16', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:43:36', '2025-12-11 09:43:36'),
(294, 'Round Adjustable Bush', 'SBICRM-100000294', ' 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:44:04', '2025-12-11 09:44:04'),
(295, 'Round Adjustable Bush ', 'SBICRM-100000295', '2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:44:28', '2025-12-11 09:44:28'),
(296, 'Round Adjustable Bush  U Type', 'SBICRM-100000296', ' 1 1/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:44:51', '2025-12-11 09:44:51'),
(297, 'Round Adjustable Bush ', 'SBICRM-100000297', '1 1/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:45:11', '2025-12-11 09:45:11'),
(298, 'Round Bottom Bush', 'SBICRM-100000298', ' 1 3/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:45:33', '2025-12-11 09:45:33'),
(299, 'Round Bottom Bush ', 'SBICRM-100000299', '2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:45:57', '2025-12-11 09:45:57'),
(300, 'Round Bottom Bush Hole Type', 'SBICRM-100000300', ' 2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:46:20', '2025-12-11 09:46:20'),
(301, 'Round Bottom Bush \'U\' Type', 'SBICRM-100000301', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:46:45', '2025-12-11 09:46:45'),
(302, 'Round Bush', 'SBICRM-100000302', ' Black', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:47:08', '2025-12-11 09:47:08'),
(303, 'Round Container', 'SBICRM-100000303', ' 20 Litres', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:47:30', '2025-12-11 09:47:30'),
(304, 'Round Ring 3 Supported', 'SBICRM-100000304', ' 13 1/2\'\' x  10 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:48:20', '2025-12-11 09:48:20'),
(305, 'Round Sticker', 'SBICRM-100000305', ' On / Off', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:48:43', '2025-12-11 09:48:43'),
(306, ' SS Screw ', 'SBICRM-100000306', '3/16\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:49:03', '2025-12-11 09:49:03'),
(307, 'M.SWASHER  Mixed', 'SBICRM-100000307', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:49:24', '2025-12-11 09:49:24'),
(308, 'Silver Coated Bush', 'SBICRM-100000308', ' 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:49:46', '2025-12-11 09:49:46'),
(309, 'Silver Coated Bush', 'SBICRM-100000309', ' 2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:50:14', '2025-12-11 09:50:14'),
(310, 'Silver Coated Bush', 'SBICRM-100000310', ' 3/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:50:37', '2025-12-11 09:50:37'),
(311, 'Silver Coated Bush', 'SBICRM-100000311', ' 1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:51:05', '2025-12-11 09:51:05'),
(312, 'Silver Coated Bush', 'SBICRM-100000312', ' 1 1/4\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:51:23', '2025-12-11 09:51:23'),
(313, 'Silver Coated Bush', 'SBICRM-100000313', ' 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:51:51', '2025-12-11 09:51:51'),
(314, ' Silver Sampattam', 'SBICRM-100000314', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:52:11', '2025-12-11 09:52:11'),
(315, ' WIRE SLEEVE', 'SBICRM-100000315', ' 6 MM- (1MTR)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:52:57', '2025-12-11 09:52:57'),
(316, ' WIRE SLEEVE', 'SBICRM-100000316', '10 MM-(1 MTR)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:53:19', '2025-12-11 09:53:19'),
(317, 'Spring Washer (Iddly)', 'SBICRM-100000317', ' 2mm thick', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:53:43', '2025-12-11 09:53:43'),
(318, ' Square Adjustable Bush ', 'SBICRM-100000318', '1 1/4\" ', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:54:04', '2025-12-11 09:54:04'),
(319, ' Square Adjustable Bush', 'SBICRM-100000319', ' 2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:54:27', '2025-12-11 09:54:27'),
(320, 'Square Adjustable Bush', 'SBICRM-100000320', ' 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:54:49', '2025-12-11 09:54:49'),
(321, 'Square bottom bush', 'SBICRM-100000321', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:55:09', '2025-12-11 09:55:09'),
(322, 'Square bottom bush', 'SBICRM-100000322', ' 2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:55:34', '2025-12-11 09:55:34'),
(323, 'Square Bottom Bush', 'SBICRM-100000323', ' 1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:55:57', '2025-12-11 09:55:57'),
(324, 'Square Bottom Bush', 'SBICRM-100000324', ' 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:56:16', '2025-12-11 09:56:16'),
(325, 'Square bottom Bush Black', 'SBICRM-100000325', ' 1 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:56:51', '2025-12-11 09:56:51'),
(326, 'Square Container', 'SBICRM-100000326', ' 20 Litres', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:57:17', '2025-12-11 09:57:17'),
(327, ' Square Flower Ring 8 Center Support   ', 'SBICRM-100000327', 'OD-14x14: ID-8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:57:38', '2025-12-11 09:57:38'),
(328, 'Square Ring 4 Center Support ', 'SBICRM-100000328', '12x12', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:58:00', '2025-12-11 09:58:00'),
(329, 'Square Ring 4 Center Support ', 'SBICRM-100000329', '10x10', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:58:15', '2025-12-11 09:58:15'),
(330, 'Square Ring 4 Corner Support ', 'SBICRM-100000330', 'OD-13x13: ID-10x10', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:58:37', '2025-12-11 09:58:37'),
(331, 'Square Ring 8 Corner Support ', 'SBICRM-100000331', 'OD-16X16: ID-11', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:59:07', '2025-12-11 09:59:07'),
(332, 'Square Ring 8 Corner Support ', 'SBICRM-100000332', 'OD-13X13: ID-9', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:59:25', '2025-12-11 09:59:25'),
(333, ' Square Ring 8 Center Support  ', 'SBICRM-100000333', 'OD-12X12: ID-8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 09:59:54', '2025-12-11 09:59:54'),
(334, ' Square Ring 8 Center Support  ', 'SBICRM-100000334', 'OD-12x12: ID-71/2 H-1 1/2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:00:16', '2025-12-11 10:00:16'),
(335, 'SS BEND', 'SBICRM-100000335', '1 1/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:01:11', '2025-12-11 10:01:11'),
(336, 'SS Bolt', 'SBICRM-100000336', ' 1/2\" x 1  1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:01:33', '2025-12-11 10:01:33'),
(337, 'SS Bolt', 'SBICRM-100000337', '1/4\" x 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:02:07', '2025-12-11 10:02:07'),
(338, 'SS Bolt', 'SBICRM-100000338', ' 1/2\" x 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:02:26', '2025-12-11 10:02:26'),
(339, 'SS Bolt', 'SBICRM-100000339', '1/4\'\'x1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:02:50', '2025-12-11 10:02:50'),
(340, 'SS BOLT', 'SBICRM-100000340', ' 6\'X12\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:03:11', '2025-12-11 10:03:11'),
(341, 'GI WASHER', 'SBICRM-100000341', '6\'X12\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:03:34', '2025-12-11 10:03:34'),
(342, ' SS SCREW', 'SBICRM-100000342', ' 4\'X12\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:04:02', '2025-12-11 10:04:02');
INSERT INTO `raw_materials` (`id`, `name`, `barcode`, `description`, `unit`, `category`, `minimumStock`, `currentStock`, `unitPrice`, `vendorId`, `status`, `createdAt`, `updatedAt`) VALUES
(343, 'SS SCREW', 'SBICRM-100000343', ' 4\"X1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:04:48', '2025-12-11 10:04:48'),
(344, 'SS SCREW', 'SBICRM-100000344', '4X20', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:06:27', '2025-12-11 10:06:27'),
(345, 'SS SCREW', 'SBICRM-100000345', ' 4MM INCH THREAD', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:06:50', '2025-12-11 10:06:50'),
(346, 'SS SCREW', 'SBICRM-100000346', ' 4\"X10\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:07:13', '2025-12-11 10:07:13'),
(347, 'SS Bootan Rod Bits', 'SBICRM-100000347', ' 2 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:07:37', '2025-12-11 10:07:37'),
(348, ' SS Coupling', 'SBICRM-100000348', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:07:57', '2025-12-11 10:07:57'),
(349, ' SS Coupling', 'SBICRM-100000349', ' 1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:08:15', '2025-12-11 10:08:15'),
(350, ' SS Coupling', 'SBICRM-100000350', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:08:41', '2025-12-11 10:08:41'),
(351, ' SS Coupling', 'SBICRM-100000351', ' 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:09:01', '2025-12-11 10:09:01'),
(352, ' SS Coupling', 'SBICRM-100000352', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:09:28', '2025-12-11 10:09:28'),
(353, ' SS Coupling', 'SBICRM-100000353', ' 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:09:51', '2025-12-11 10:09:51'),
(354, 'SS Flange', 'SBICRM-100000354', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:10:13', '2025-12-11 10:10:13'),
(355, 'SS Guage Class set ', 'SBICRM-100000355', 'none', 'pieces', 'steel', '10', '15', '8', NULL, '1', '2025-12-11 10:10:43', '2025-12-11 10:10:43'),
(356, 'SS Pipe Nipple', 'SBICRM-100000356', ' 3/4\" x 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:11:03', '2025-12-11 10:11:03'),
(357, 'GI Nut', 'SBICRM-100000357', '5/16\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:11:22', '2025-12-11 10:11:22'),
(358, 'SS Bolt', 'SBICRM-100000358', ' 1/2\" x 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:11:47', '2025-12-11 10:11:47'),
(359, 'Hinges SS', 'SBICRM-100000359', ' 4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:12:34', '2025-12-11 10:12:34'),
(360, ' SS Nut', 'SBICRM-100000360', '1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:13:15', '2025-12-11 10:13:15'),
(361, ' Stool Leg Bush(Round)', 'SBICRM-100000361', ' 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:13:52', '2025-12-11 10:13:52'),
(362, 'SS Pipe Nipple', 'SBICRM-100000362', ' 3/4\" x 3\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:14:15', '2025-12-11 10:14:15'),
(363, 'SS Pipe Nipple', 'SBICRM-100000363', ' 1\" x 2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:14:32', '2025-12-11 10:14:32'),
(364, 'SS Pipe Nipple', 'SBICRM-100000364', ' 3/4\" x 2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:15:16', '2025-12-11 10:15:16'),
(365, 'SS Pipe Nipple', 'SBICRM-100000365', ' 3/4\"x9\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:15:41', '2025-12-11 10:15:41'),
(366, 'SS Pipe Nipple', 'SBICRM-100000366', ' 3/4\"x12\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:15:59', '2025-12-11 10:15:59'),
(367, ' SS Pipe Nipple', 'SBICRM-100000367', '3/4\"x6\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:16:30', '2025-12-11 10:16:30'),
(368, ' SS PLATE', 'SBICRM-100000368', ' 13\"-ROUND (SEAT)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:16:49', '2025-12-11 10:16:49'),
(369, ' SS PLATE', 'SBICRM-100000369', ' NO.19', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:17:04', '2025-12-11 10:17:04'),
(370, 'SS PLATE', 'SBICRM-100000370', ' NO.11', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:17:30', '2025-12-11 10:17:30'),
(371, ' SS Round Plate', 'SBICRM-100000371', ' NO.19', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:17:53', '2025-12-11 10:17:53'),
(372, 'SS Round Villai Plate', 'SBICRM-100000372', ' 2 1/2\"x1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:18:31', '2025-12-11 10:18:31'),
(373, 'ROTAR PIT', 'SBICRM-100000373', '10 mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:18:50', '2025-12-11 10:18:50'),
(374, 'ROTAR PIT', 'SBICRM-100000374', ' 12 MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:19:11', '2025-12-11 10:19:11'),
(375, 'TIG SPARES CABLE SET', 'SBICRM-100000375', ' Tig Welding', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:19:34', '2025-12-11 10:19:34'),
(376, ' Fly Rail double run', 'SBICRM-100000376', ' 65 MM - [1 BOX-EACH 4NO] 1 SET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:20:44', '2025-12-11 10:20:44'),
(377, 'Washer - COLLER', 'SBICRM-100000377', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:21:04', '2025-12-11 10:21:04'),
(378, 'Plain washer', 'SBICRM-100000378', ' 5/16\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:21:23', '2025-12-11 10:21:23'),
(379, ' Plain Washer  ', 'SBICRM-100000379', '3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:21:42', '2025-12-11 10:21:42'),
(380, 'Ball Valve', 'SBICRM-100000380', '40 mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:22:06', '2025-12-11 10:22:06'),
(381, ' Silicon gel ', 'SBICRM-100000381', '789 clear', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:22:25', '2025-12-11 10:22:25'),
(382, ' Carbon brush ', 'SBICRM-100000382', 'AG4 - N489912', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:22:47', '2025-12-11 10:22:49'),
(383, ' Carbon brush ', 'SBICRM-100000383', 'AG4 - N489912', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:22:48', '2025-12-11 10:22:49'),
(384, 'Jaquar  pipe', 'SBICRM-100000384', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:23:29', '2025-12-11 10:23:29'),
(385, 'Tig  spares', 'SBICRM-100000385', ' nozzle', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:23:54', '2025-12-11 10:23:54'),
(386, 'Tig spares', 'SBICRM-100000386', ' nozzle rod ', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:24:14', '2025-12-11 10:24:14'),
(387, 'Tig  spares', 'SBICRM-100000387', ' cylinder pressure guage', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:24:36', '2025-12-11 10:24:36'),
(388, ' Tower Bolt SS', 'SBICRM-100000388', ' 8\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:24:58', '2025-12-11 10:24:58'),
(389, 'CUTTING HINGES', 'SBICRM-100000389', ' 3\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:25:20', '2025-12-11 10:25:20'),
(390, ' CUTTING HINGES', 'SBICRM-100000390', ' 4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:25:55', '2025-12-11 10:25:55'),
(391, 'Drawer Hinges ', 'SBICRM-100000391', '8\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:26:26', '2025-12-11 10:26:26'),
(392, 'Drawer Hinges ', 'SBICRM-100000392', '10\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:26:49', '2025-12-11 10:26:49'),
(393, ' Drawer Hinges ', 'SBICRM-100000393', '16\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:27:13', '2025-12-11 10:27:13'),
(394, 'Drawer Hinges MS', 'SBICRM-100000394', ' 14\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:27:35', '2025-12-11 10:27:35'),
(395, 'rivets plier ', 'SBICRM-100000395', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:27:55', '2025-12-11 10:27:55'),
(396, 'SS SCREW', 'SBICRM-100000396', ' 4MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:28:15', '2025-12-11 10:28:15'),
(397, ' SS Screw', 'SBICRM-100000397', ' Minus( panel board screw )', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:28:36', '2025-12-11 10:28:36'),
(398, ' SS  Pipe Nipple', 'SBICRM-100000398', ' 1\"X1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:28:58', '2025-12-11 10:28:58'),
(399, ' SS Nut', 'SBICRM-100000399', ' 3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:29:21', '2025-12-11 10:29:21'),
(400, ' Fire Door Bush', 'SBICRM-100000400', ' 2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:29:43', '2025-12-11 10:29:43'),
(401, 'MS Hook', 'SBICRM-100000401', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:30:01', '2025-12-11 10:30:01'),
(402, 'Glass door runner ', 'SBICRM-100000402', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:30:19', '2025-12-11 10:30:19'),
(403, 'Door Magnet', 'SBICRM-100000403', 'Small', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:30:39', '2025-12-11 10:30:39'),
(404, 'SS Tap', 'SBICRM-100000404', 'Sink Tap Short Body w/cup', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:31:09', '2025-12-11 10:31:09'),
(405, 'SS TAP CUP', 'SBICRM-100000405', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:31:34', '2025-12-11 10:31:34'),
(406, 'SS Tap', 'SBICRM-100000406', ' Sink Tap Long Body w/cup', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:32:06', '2025-12-11 10:32:06'),
(407, 'SS Door Pat Lock', 'SBICRM-100000407', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:32:31', '2025-12-11 10:32:31'),
(408, 'SS Handle', 'SBICRM-100000408', ' 4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:33:04', '2025-12-11 10:33:04'),
(409, 'Tea boiler tap', 'SBICRM-100000409', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:33:27', '2025-12-11 10:33:27'),
(410, 'Tea boiler cup', 'SBICRM-100000410', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:33:47', '2025-12-11 10:33:47'),
(411, 'SS Nut', 'SBICRM-100000411', '5/16\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:34:09', '2025-12-11 10:34:09'),
(412, 'Rivet Rod SS', 'SBICRM-100000412', ' 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:34:32', '2025-12-11 10:34:32'),
(413, 'SS hook', 'SBICRM-100000413', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:34:51', '2025-12-11 10:34:51'),
(414, 'Car Dickey shock absorber', 'SBICRM-100000414', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:35:15', '2025-12-11 10:35:15'),
(415, ' Tea boiler tap', 'SBICRM-100000415', 'old', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:35:49', '2025-12-11 10:35:49'),
(416, 'SS Cutting Coupling', 'SBICRM-100000416', ' 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:36:13', '2025-12-11 10:36:13'),
(417, 'SS pipe Nipple', 'SBICRM-100000417', ' 1\"x1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:36:36', '2025-12-11 10:36:36'),
(418, 'H nipple SS', 'SBICRM-100000418', ' 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:37:02', '2025-12-11 10:37:02'),
(419, 'LED channel ', 'SBICRM-100000419', 'ALUMINIUM PROFILE (2 MTR)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:37:26', '2025-12-11 10:37:26'),
(420, 'LED channel - DOUBLE LIGHT', 'SBICRM-100000420', 'ALUMINIUM PROFILE (2 MTR)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:37:48', '2025-12-11 10:37:48'),
(421, 'Warm white LED Tube Light', 'SBICRM-100000421', ' 4 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:38:09', '2025-12-11 10:38:09'),
(422, ' LED STRIP CONNECTOR', 'SBICRM-100000422', ' TWO WAY CONNECTOR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:38:40', '2025-12-11 10:38:40'),
(423, ' LED STRIP CONNECTOR', 'SBICRM-100000423', 'LED WIRE CONNECTOR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:39:05', '2025-12-11 10:39:05'),
(424, ' SS bolt', 'SBICRM-100000424', ' 6\"X12\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:39:25', '2025-12-11 10:39:25'),
(425, 'REXNORD FAN', 'SBICRM-100000425', ' 4\"-120MM-22038 A2 W', 'pieces', 'steel', '10', '15', '8', NULL, '1', '2025-12-11 10:39:49', '2025-12-11 10:39:49'),
(426, 'REXNORD FAN', 'SBICRM-100000426', ' 6\" -172MM-21725A2MW', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:40:07', '2025-12-11 10:40:07'),
(427, ' REXNORD FAN', 'SBICRM-100000427', ' 8\" - 22060S A2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:40:38', '2025-12-11 10:40:38'),
(428, 'PAKING PAD WITH NUT', 'SBICRM-100000428', ' AG4 - N489912', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:40:59', '2025-12-11 10:40:59'),
(429, ' Red oxdide', 'SBICRM-100000429', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:41:17', '2025-12-11 10:41:17'),
(430, 'Tower Plate no-25 + nob', 'SBICRM-100000430', ' no-25', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:41:41', '2025-12-11 10:41:41'),
(431, 'SS hand drill cup ', 'SBICRM-100000431', '1 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:42:04', '2025-12-11 10:42:04'),
(432, 'SS push&pull tap', 'SBICRM-100000432', ' 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:42:24', '2025-12-11 10:42:24'),
(433, 'SS h nipple', 'SBICRM-100000433', ' 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:42:52', '2025-12-11 10:42:52'),
(434, 'Dosa Burner CENTER COUPLING ', 'SBICRM-100000434', '2.5feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:43:11', '2025-12-11 10:43:11'),
(435, 'Square Ring 4 Center Support  ', 'SBICRM-100000435', '10 x 10', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:43:33', '2025-12-11 10:43:33'),
(436, 'GN pan', 'SBICRM-100000436', ' 1 x 1 x 200', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:43:54', '2025-12-11 10:43:54'),
(437, 'GN pan', 'SBICRM-100000437', '1 X 9 X100', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:44:12', '2025-12-11 10:44:12'),
(438, 'GN Lid', 'SBICRM-100000438', ' 1 x 9', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:44:34', '2025-12-11 10:44:34'),
(439, 'CONTROL CONTACTOR-L&T', 'SBICRM-100000439', ' 2 NO + 2 NC', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:44:57', '2025-12-11 10:44:57'),
(440, 'CONTROL CONTACTOR-DIXELL', 'SBICRM-100000440', ' ( SUB ZERO )- XRO2CX-5NOC1', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:45:19', '2025-12-11 10:45:19'),
(441, 'Air clamp', 'SBICRM-100000441', ' (s)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:45:44', '2025-12-11 10:45:44'),
(442, 'LED ADOPTOR - DRIVER', 'SBICRM-100000442', 'DRIVER SLIM 12V-300 W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:46:24', '2025-12-11 10:46:24'),
(443, 'WIRE TAG', 'SBICRM-100000443', ' 150 X 2.6 MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:47:02', '2025-12-11 10:47:02'),
(444, 'WIRE TAG', 'SBICRM-100000444', ' 250 X 3.6 MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:47:31', '2025-12-11 10:47:31'),
(445, 'WIRE TAG', 'SBICRM-100000445', ' 250X4.6 MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:48:00', '2025-12-11 10:48:00'),
(446, 'WIRE GLANT', 'SBICRM-100000446', ' PG - 7', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:48:37', '2025-12-11 10:48:37'),
(447, 'BULP LIGHT-GN PAN TOP', 'SBICRM-100000447', ' PAN TOP BULP', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:49:06', '2025-12-11 10:49:06'),
(448, 'WIRE LEG ', 'SBICRM-100000448', 'SWITCH PIN LEG', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:49:35', '2025-12-11 10:49:35'),
(449, 'WIRE LEG ', 'SBICRM-100000449', 'SWITCH PIN LEG-BRASS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:49:59', '2025-12-11 10:49:59'),
(450, 'LED ADOPTOR - DRIVER', 'SBICRM-100000450', ' DRIVER SLIM 12V-60W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:50:24', '2025-12-11 10:50:24'),
(451, 'LED ADOPTOR - DRIVER', 'SBICRM-100000451', ' DRIVER SLIM 12V-100W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:51:43', '2025-12-11 10:51:43'),
(452, 'LED ADOPTOR - DRIVER', 'SBICRM-100000452', 'DRIVER SLIM 12V-120W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:52:51', '2025-12-11 10:52:51'),
(453, 'CSK SS screw', 'SBICRM-100000453', ' 4 x 12 (-)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:53:55', '2025-12-11 10:53:55'),
(454, 'CSK SS screw', 'SBICRM-100000454', ' 4 x 20 (-)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:54:23', '2025-12-11 10:54:23'),
(455, 'SS Handle', 'SBICRM-100000455', ' 6\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:54:53', '2025-12-11 10:54:53'),
(456, 'Allen screw', 'SBICRM-100000456', ' 6MM-1/2\" - GLASS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:55:20', '2025-12-11 10:55:20'),
(457, 'Allen screw capwasher nut', 'SBICRM-100000457', 'SS STEP WASHER - GLASS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:55:49', '2025-12-11 10:55:49'),
(458, 'Allen screw', 'SBICRM-100000458', ' 6MM- 1\"- GLASS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:56:19', '2025-12-11 10:56:19'),
(459, 'Allen screw', 'SBICRM-100000459', ' 6MM-1 1/2\" - GLASS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:56:47', '2025-12-11 10:56:47'),
(460, 'SS gauge glass set', 'SBICRM-100000460', ' 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 10:59:43', '2025-12-11 10:59:43'),
(461, 'SS  Pipe Nipple', 'SBICRM-100000461', '3/4\" X 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 11:00:10', '2025-12-11 11:00:10'),
(462, 'Plain washer brass ', 'SBICRM-100000462', '5/8\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 11:00:47', '2025-12-11 11:00:47'),
(463, 'Welding holder', 'SBICRM-100000463', ' heavy duty', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 11:01:20', '2025-12-11 11:01:20'),
(464, 'Square ring 8 centre support', 'SBICRM-100000464', ' 15 x 15', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 11:03:01', '2025-12-11 11:03:01'),
(465, 'Square ring 4 centre support', 'SBICRM-100000465', ' 15 x 15', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 11:03:26', '2025-12-11 11:03:26'),
(466, ' Round ring 3 Supported', 'SBICRM-100000466', ' 20 x 16', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 11:03:55', '2025-12-11 11:03:55'),
(467, 'Round ring 3 Supported', 'SBICRM-100000467', ' 24X19 1/2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 11:04:24', '2025-12-11 11:04:24'),
(468, 'Dosa Burner unit', 'SBICRM-100000468', ' 2 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 11:04:55', '2025-12-11 11:04:55'),
(469, 'Gi Bolt', 'SBICRM-100000469', ' 1 1/2\" X 1/4\" KF 4.6', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 11:05:22', '2025-12-11 11:05:22'),
(470, 'NC valve (black handle)', 'SBICRM-100000470', ' long', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:24:01', '2025-12-11 13:24:01'),
(471, 'SS door handle', 'SBICRM-100000471', ' 4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:24:26', '2025-12-11 13:24:26'),
(472, 'Round ring 3 Supported', 'SBICRM-100000472', ' 10 1/2\' X 8\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:24:56', '2025-12-11 13:24:56'),
(473, ' Telescopic', 'SBICRM-100000473', ' 14\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:25:17', '2025-12-11 13:25:17'),
(474, 'Square lock', 'SBICRM-100000474', '25mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:25:47', '2025-12-11 13:25:47'),
(475, 'Square lock', 'SBICRM-100000475', '22MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:32:56', '2025-12-11 13:32:56'),
(476, 'Square lock', 'SBICRM-100000476', '20mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:33:31', '2025-12-11 13:33:31'),
(477, 'Telescopic', 'SBICRM-100000477', '16\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:34:12', '2025-12-11 13:34:12'),
(478, 'Telescopic', 'SBICRM-100000478', '18\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:34:31', '2025-12-11 13:34:31'),
(479, 'SS door tappa', 'SBICRM-100000479', '8\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:34:51', '2025-12-11 13:34:51'),
(480, 'SS Bolt', 'SBICRM-100000480', '1/2 x 1 1/2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:35:34', '2025-12-11 13:35:34'),
(481, 'MS Flange', 'SBICRM-100000481', '1\" (GAS BOILER)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:35:53', '2025-12-11 13:35:53'),
(482, 'Gauge class Set [OLD]', 'SBICRM-100000482', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:36:16', '2025-12-11 13:36:16'),
(483, 'Bootan Nipple', 'SBICRM-100000483', '3/4\" X 4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:36:35', '2025-12-11 13:36:35'),
(484, 'Bootan Nipple', 'SBICRM-100000484', '3/4\" X 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:36:53', '2025-12-11 13:36:53'),
(485, 'CURVO LOCK', 'SBICRM-100000485', '2.5CM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:37:12', '2025-12-11 13:37:12'),
(486, 'DOSA BURNER ONLY', 'SBICRM-100000486', 'SPL 2 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:37:30', '2025-12-11 13:37:30'),
(487, 'DOSA BURNER ONLY', 'SBICRM-100000487', 'SPL 1 1/2 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:37:49', '2025-12-11 13:37:49'),
(488, 'KORIEN RING BURNER', 'SBICRM-100000488', 'NO1  (OD:8 ID:4)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:38:10', '2025-12-11 13:38:10'),
(489, 'KORIEN RING BURNER', 'SBICRM-100000489', 'NO2  (OD:14 ID:10)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:38:32', '2025-12-11 13:38:32'),
(490, 'KORIEN RING BURNER', 'SBICRM-100000490', 'NO3  (OD:21 ID:17)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:38:54', '2025-12-11 13:38:54'),
(491, 'INFRA RED RADI. BURNER', 'SBICRM-100000491', '12\" (UW) SMALL', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:39:17', '2025-12-11 13:39:17'),
(492, 'BURNER', 'SBICRM-100000492', 'VAPA', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:39:37', '2025-12-11 13:39:37'),
(493, 'HEATER', 'SBICRM-100000493', '1 1/2 x 3000w /2 Heater Element', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:39:56', '2025-12-11 13:39:56'),
(494, 'HEATER', 'SBICRM-100000494', '1 1/4 x 2000w /2 Heater Element', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:40:15', '2025-12-11 13:40:15'),
(495, 'HEATER', 'SBICRM-100000495', 'U - 500W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:40:34', '2025-12-11 13:40:34'),
(496, 'HEATER', 'SBICRM-100000496', '4 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:40:52', '2025-12-11 13:40:52'),
(497, 'HEATER', 'SBICRM-100000497', '2 FEET', 'pieces', 'steel', '10', '15', '9', NULL, '1', '2025-12-11 13:41:11', '2025-12-11 13:41:11'),
(498, 'HEATER', 'SBICRM-100000498', '2 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:41:49', '2025-12-11 13:41:49'),
(499, 'HEATER SWITCH CONTROL BOX', 'SBICRM-100000499', 'PANEL - (1 1/2 X 3000W )', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:42:23', '2025-12-11 13:42:23'),
(500, 'HEATER SWITCH CONTROL BOX', 'SBICRM-100000500', 'PANEL - (1 1/4 X 2000W )', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:42:43', '2025-12-11 13:42:43'),
(501, 'HEATER SWITCH CONTROL BOX', 'SBICRM-100000501', 'PANEL - ( 500W )', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:43:06', '2025-12-11 13:43:06'),
(502, 'ELECTRONIC HEATER PANEL', 'SBICRM-100000502', '4 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:44:49', '2025-12-11 13:44:49'),
(503, 'HEATER SWITCH CONTROL BOX', 'SBICRM-100000503', '2 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:45:14', '2025-12-11 13:45:14'),
(504, 'GRATINGS', 'SBICRM-100000504', '13\'X13\' - GRATINGS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:46:07', '2025-12-11 13:46:07'),
(505, 'GRATINGS', 'SBICRM-100000505', '14\'X14\'-FRAME', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:46:27', '2025-12-11 13:46:27'),
(506, 'GRATINGS', 'SBICRM-100000506', '13\'X13- \'PROPERITOR TANK', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:46:51', '2025-12-11 13:46:51'),
(507, 'GAS COMPRESSOR', 'SBICRM-100000507', 'KCN463HAG-U336H', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:47:12', '2025-12-11 13:47:12'),
(508, 'GAS COMPRESSOR', 'SBICRM-100000508', 'KCJ467HAG-T220H', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:47:35', '2025-12-11 13:47:35'),
(509, 'GAS COMPRESSOR', 'SBICRM-100000509', 'KCE444HAG-V334H', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:47:53', '2025-12-11 13:47:53'),
(510, 'CONDENSSOR COIL', 'SBICRM-100000510', '10X11X4 R', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:48:12', '2025-12-11 13:48:12'),
(511, 'CONDENSSOR COIL', 'SBICRM-100000511', '10X11X3 R', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:48:32', '2025-12-11 13:48:32'),
(512, 'CONDENSSOR COIL', 'SBICRM-100000512', '10X19X3', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:48:49', '2025-12-11 13:48:49'),
(513, 'PIN VALVE', 'SBICRM-100000513', '1/4\"- HEAVY', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:49:13', '2025-12-11 13:49:13'),
(514, 'BUTANE GAS', 'SBICRM-100000514', 'N-BUTANE C4H10', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:49:36', '2025-12-11 13:49:36'),
(515, 'DRY ALL FILTER DRIER', 'SBICRM-100000515', 'DMH 032S 1/4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:49:56', '2025-12-11 13:49:56'),
(516, 'Floron propel butane gas', 'SBICRM-100000516', '134A', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:50:16', '2025-12-11 13:50:16'),
(517, 'METCAP- CAPILLARY', 'SBICRM-100000517', '0.5 MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:50:39', '2025-12-11 13:50:39'),
(518, 'WELDING ROD', 'SBICRM-100000518', 'BLACK - RE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:51:00', '2025-12-11 13:51:00'),
(519, 'COOLING COIL', 'SBICRM-100000519', '24X5X4 ROW', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:51:19', '2025-12-11 13:51:19'),
(520, 'COOLING COIL', 'SBICRM-100000520', '36x5x4 ROW', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:51:38', '2025-12-11 13:51:38'),
(521, 'COOLING COIL', 'SBICRM-100000521', '36X5X8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:52:01', '2025-12-11 13:52:01'),
(522, 'COPPER PIPE', 'SBICRM-100000522', '1/4  (6.35)X0.56MM RE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:52:27', '2025-12-11 13:52:27'),
(523, 'COPPER PIPE', 'SBICRM-100000523', '5/16   (7.94)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:52:49', '2025-12-11 13:52:49'),
(524, 'COPPER PIPE', 'SBICRM-100000524', '3/8(9.52)X0.57MM RE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:53:09', '2025-12-11 13:53:09'),
(525, 'INSULATING GLASS DOUBLE LAYER', 'SBICRM-100000525', '20MM CLEAR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:53:28', '2025-12-11 13:53:28'),
(526, 'INSULATING GLASS DOUBLE LAYER', 'SBICRM-100000526', '18MM CLEAR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:53:49', '2025-12-11 13:53:49'),
(527, 'TOUGHENED FLAT GLASS PI NO: PY2425101', 'SBICRM-100000527', '6MM CLEAR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:54:08', '2025-12-11 13:54:08'),
(528, 'TOUGHENED FLAT GLASS PI NO: PY2425101', 'SBICRM-100000528', '8MM CLEAR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:54:38', '2025-12-11 13:54:38'),
(529, 'TOUGHENED FLAT GLASS PI NO: PY2425101', 'SBICRM-100000529', '10 MM CLEAR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:54:58', '2025-12-11 13:54:58'),
(530, 'WINDOWS TWO TRACK SLINDING', 'SBICRM-100000530', '1220 X 763', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:55:30', '2025-12-11 13:55:30'),
(531, 'WINDOWS TWO TRACK SLINDING', 'SBICRM-100000531', '915 X 763', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:55:50', '2025-12-11 13:55:50'),
(532, 'WINDOWS TWO TRACK SLINDING', 'SBICRM-100000532', '1220 X 1068', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:56:12', '2025-12-11 13:56:12'),
(533, 'WINDOWS SINGLE OPEN', 'SBICRM-100000533', '763 X 763', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:56:41', '2025-12-11 13:56:41'),
(534, 'WINDOWS SIDE BEEDING', 'SBICRM-100000534', '2 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:57:00', '2025-12-11 13:57:00'),
(535, 'WINDOWS SIDE BEEDING', 'SBICRM-100000535', '3 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:57:19', '2025-12-11 13:57:19'),
(536, 'TOUGHENED GLASS with CNC polish', 'SBICRM-100000536', '6MM CLEAR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:57:39', '2025-12-11 13:57:39'),
(537, 'TOUGHENED GLASS with CNC polish', 'SBICRM-100000537', '8MM CLEAR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:57:56', '2025-12-11 13:57:56'),
(538, 'INSULATING GLASS UNIT -18 MM', 'SBICRM-100000538', '6MM CLEAR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:58:16', '2025-12-11 13:58:16'),
(539, 'INSULATING GLASS UNIT -20 MM', 'SBICRM-100000539', '8MM CLEAR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:58:35', '2025-12-11 13:58:35'),
(540, 'CSK SS screw', 'SBICRM-100000540', '6x40mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:58:59', '2025-12-11 13:58:59'),
(541, 'SS Washer screw', 'SBICRM-100000541', '6x15mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:59:18', '2025-12-11 13:59:18'),
(542, 'Dosa Burner', 'SBICRM-100000542', '4 1/2 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:59:38', '2025-12-11 13:59:38'),
(543, 'SS Nut', 'SBICRM-100000543', '4mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 13:59:56', '2025-12-11 13:59:56'),
(544, 'SS Handle', 'SBICRM-100000544', '8\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:00:14', '2025-12-11 14:00:14'),
(545, 'Door Magnet', 'SBICRM-100000545', 'Big', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:00:33', '2025-12-11 14:00:33'),
(546, 'SS Hand drill cup', 'SBICRM-100000546', '3/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:00:53', '2025-12-11 14:00:53'),
(547, 'SS Hand drill cup', 'SBICRM-100000547', '1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:01:10', '2025-12-11 14:01:10'),
(548, 'Al drop SS', 'SBICRM-100000548', '6\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:01:29', '2025-12-11 14:01:29'),
(549, 'GN Pan', 'SBICRM-100000549', '1x2x200', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:02:13', '2025-12-11 14:02:13'),
(550, 'GN Pan', 'SBICRM-100000550', '1x2x100', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:02:38', '2025-12-11 14:02:38'),
(551, 'GN Pan', 'SBICRM-100000551', '1x3x150', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:02:59', '2025-12-11 14:02:59'),
(552, 'GN Lid', 'SBICRM-100000552', '1x3', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:03:21', '2025-12-11 14:03:21'),
(553, 'GN Pan', 'SBICRM-100000553', '1x4x150', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:03:51', '2025-12-11 14:03:51'),
(554, 'GN Lid', 'SBICRM-100000554', '1x4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:04:12', '2025-12-11 14:04:12'),
(555, 'Retrieving data. Wait a few seconds and try to cut or copy again.', 'SBICRM-100000555', 'DRIVER SLIM 12V-200 W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:04:36', '2025-12-11 14:04:36'),
(556, 'Silicon gel', 'SBICRM-100000556', '789-Grey', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:04:55', '2025-12-11 14:04:55'),
(557, 'LED ADOPTOR - DRIVER', 'SBICRM-100000557', 'DRIVER SLIM 24V-100W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:05:15', '2025-12-11 14:05:15'),
(558, 'HEATER SWITCH CONTROL BOX', 'SBICRM-100000558', 'PANEL - (U Heater 1500W )', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:05:35', '2025-12-11 14:05:35'),
(559, 'SS Bolt', 'SBICRM-100000559', '1/4\'\' x 2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:05:54', '2025-12-11 14:05:54'),
(560, 'SS Bolt', 'SBICRM-100000560', '1/4\'\' x 1 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:06:34', '2025-12-11 14:06:34'),
(561, 'Silicon gel', 'SBICRM-100000561', '789-Black', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:07:07', '2025-12-11 14:07:07'),
(562, 'SS pipe Nipple', 'SBICRM-100000562', '2\'\' x 6\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:07:33', '2025-12-11 14:07:33'),
(563, 'Warm white LED Tube Light', 'SBICRM-100000563', '2 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:07:53', '2025-12-11 14:07:53'),
(564, 'Warm white LED Tube Light', 'SBICRM-100000564', '1 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:08:15', '2025-12-11 14:08:15'),
(565, 'SS Bootan handle Rod', 'SBICRM-100000565', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:08:33', '2025-12-11 14:08:33'),
(566, 'Welding Earth cable', 'SBICRM-100000566', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:08:59', '2025-12-11 14:08:59'),
(567, 'GN Pan', 'SBICRM-100000567', '1x6x150', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:09:51', '2025-12-11 14:09:51'),
(568, 'Bolt Bush', 'SBICRM-100000568', '3/8\'\'x1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:10:10', '2025-12-11 14:10:10'),
(569, 'Tig collet', 'SBICRM-100000569', '1.6mm dia', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:10:30', '2025-12-11 14:10:30'),
(570, 'SS Washer Nut', 'SBICRM-100000570', '6mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:10:51', '2025-12-11 14:10:51'),
(571, 'SS Plate', 'SBICRM-100000571', 'No.14', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:11:09', '2025-12-11 14:11:09'),
(572, 'R-134A', 'SBICRM-100000572', '1,1,1,2 Tetrafluoroethane cans', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:11:29', '2025-12-11 14:11:29'),
(573, 'Charging Nipple', 'SBICRM-100000573', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:11:48', '2025-12-11 14:11:48'),
(574, 'Copper Phos Alloy wire', 'SBICRM-100000574', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:12:04', '2025-12-11 14:12:04'),
(575, 'Brass tags Plated', 'SBICRM-100000575', 'Straight', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:12:27', '2025-12-11 14:12:27'),
(576, 'Flex eco class 1 Tubes', 'SBICRM-100000576', '09x10x1.83/(3/8) 9mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:13:25', '2025-12-11 14:13:25'),
(577, 'Vijay wheel', 'SBICRM-100000577', '6mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:13:47', '2025-12-11 14:13:47'),
(578, '2 Core Led Flat wire', 'SBICRM-100000578', '1 SQMM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:14:04', '2025-12-11 14:14:04'),
(579, 'White sticker', 'SBICRM-100000579', 'LG Shine', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:14:24', '2025-12-11 14:14:24'),
(580, 'Cappilary', 'SBICRM-100000580', '0.050\'\' Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:14:44', '2025-12-11 14:14:44'),
(581, 'Sliding door roller', 'SBICRM-100000581', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:15:02', '2025-12-11 14:15:02'),
(582, 'LED ADOPTOR - DRIVER', 'SBICRM-100000582', 'DRIVER SLIM 12V-36 W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:15:23', '2025-12-11 14:15:23'),
(583, 'Switch box', 'SBICRM-100000583', '16 AMPS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:15:43', '2025-12-11 14:15:43'),
(584, 'White Led tube light', 'SBICRM-100000584', '4 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:16:01', '2025-12-11 14:16:01'),
(585, 'White Led tube light', 'SBICRM-100000585', '2 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:16:19', '2025-12-11 14:16:19'),
(586, 'White Led tube light', 'SBICRM-100000586', '1 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:16:35', '2025-12-11 14:16:35'),
(587, 'Glass lock', 'SBICRM-100000587', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:16:51', '2025-12-11 14:16:51'),
(588, 'COOLING COIL', 'SBICRM-100000588', '20x5x4 Row', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:17:08', '2025-12-11 14:17:08'),
(589, 'CONDENSSOR COIL', 'SBICRM-100000589', '20x10x3', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:17:27', '2025-12-11 14:17:27'),
(590, 'MS Bucket grill 10', 'SBICRM-100000590', 'With guard', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:17:44', '2025-12-11 14:17:44'),
(591, 'REC 8325 - 16 A2 MOTOR', 'SBICRM-100000591', 'REXNORD', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:18:06', '2025-12-11 14:18:06'),
(592, 'Pipe Round washer', 'SBICRM-100000592', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:18:21', '2025-12-11 14:18:21'),
(593, 'Stabilizer', 'SBICRM-100000593', '4KV-Double Boost', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:18:37', '2025-12-11 14:18:37'),
(594, 'COOLING COIL', 'SBICRM-100000594', '35x5x4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:18:52', '2025-12-11 14:18:52'),
(595, 'Black tape', 'SBICRM-100000595', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:19:10', '2025-12-11 14:19:10'),
(596, 'HEATER', 'SBICRM-100000596', '1 1/2 x 3000w /1 Heater Element', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:19:26', '2025-12-11 14:19:26'),
(597, 'HEATER', 'SBICRM-100000597', '1 1/4 x 2000w /1 Heater Element', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:19:43', '2025-12-11 14:19:43'),
(598, 'Burner', 'SBICRM-100000598', 'G12', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:20:00', '2025-12-11 14:20:00'),
(599, 'Burner UNIT', 'SBICRM-100000599', 'G12', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:20:18', '2025-12-11 14:20:18'),
(600, 'CURVO LOCK', 'SBICRM-100000600', '32mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:20:39', '2025-12-11 14:20:39'),
(601, 'Anchor bolt', 'SBICRM-100000601', 'M10', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:20:57', '2025-12-11 14:20:57'),
(602, 'LED ADOPTOR - DRIVER', 'SBICRM-100000602', 'DRIVER SLIM 24V-150W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:21:31', '2025-12-11 14:21:31'),
(603, 'Dosa Burner unit', 'SBICRM-100000603', '4 1/2 Feet', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:21:48', '2025-12-11 14:21:48'),
(604, 'Bolt Bush', 'SBICRM-100000604', '5/8\'\'x2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 14:22:18', '2025-12-11 14:22:18'),
(605, 'AG7 Grinding Wheel', 'SBICRM-100000605', 'AG7', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:41:36', '2025-12-11 17:41:36'),
(606, 'Grinding Stone', 'SBICRM-100000606', '6mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:42:16', '2025-12-11 17:42:16'),
(607, 'AIR BRUSH', 'SBICRM-100000607', '12\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:42:38', '2025-12-11 17:42:38'),
(608, 'AIR BRUSH', 'SBICRM-100000608', '10\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:43:01', '2025-12-11 17:43:01'),
(609, 'Air Brush', 'SBICRM-100000609', '4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:43:23', '2025-12-11 17:43:23'),
(610, 'Air Brush', 'SBICRM-100000610', '6\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:43:45', '2025-12-11 17:43:45'),
(611, 'Air Brush', 'SBICRM-100000611', '8x5', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:44:03', '2025-12-11 17:44:03'),
(612, 'Air Brush', 'SBICRM-100000612', '5x4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:44:22', '2025-12-11 17:44:22'),
(613, 'Air Brush', 'SBICRM-100000613', '6x2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:44:39', '2025-12-11 17:44:39'),
(614, 'Bench Grinding Wheel', 'SBICRM-100000614', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:44:55', '2025-12-11 17:44:55'),
(615, 'Bootan Nipple', 'SBICRM-100000615', '3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:45:10', '2025-12-11 17:45:10'),
(616, 'CD Marker', 'SBICRM-100000616', 'BLUE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:45:29', '2025-12-11 17:45:29'),
(617, 'Chalk (white)', 'SBICRM-100000617', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:45:45', '2025-12-11 17:45:45'),
(618, 'Cut off wheel', 'SBICRM-100000618', '4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:46:03', '2025-12-11 17:46:03'),
(619, 'Cut off wheel', 'SBICRM-100000619', '14\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:46:27', '2025-12-11 17:46:27'),
(620, 'Paint Flat Brush', 'SBICRM-100000620', '2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:46:42', '2025-12-11 17:46:42'),
(621, 'Paint Letter Brush', 'SBICRM-100000621', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:46:59', '2025-12-11 17:46:59'),
(622, 'Grease', 'SBICRM-100000622', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:47:17', '2025-12-11 17:47:17'),
(623, 'M.S BUSH', 'SBICRM-100000623', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:47:33', '2025-12-11 17:47:33'),
(624, 'Grinding Wheel', 'SBICRM-100000624', 'AG5', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:47:54', '2025-12-11 17:47:54'),
(625, 'Grinding Wheel', 'SBICRM-100000625', 'AG4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:48:14', '2025-12-11 17:48:14'),
(626, 'Grinding Wheel - GREEN', 'SBICRM-100000626', 'AG4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:48:31', '2025-12-11 17:48:31'),
(627, 'Hand Gloves', 'SBICRM-100000627', 'Jeans', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:48:46', '2025-12-11 17:48:46'),
(628, 'Hand Gloves', 'SBICRM-100000628', 'Tig Welding', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:49:03', '2025-12-11 17:49:03'),
(629, 'Hand Gloves', 'SBICRM-100000629', 'Lathar ARC', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:49:32', '2025-12-11 17:49:32'),
(630, 'Goggles', 'SBICRM-100000630', 'White', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:49:48', '2025-12-11 17:49:48'),
(631, 'Goggles', 'SBICRM-100000631', 'Black', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:50:05', '2025-12-11 17:50:05'),
(632, 'Insulation tap', 'SBICRM-100000632', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:50:27', '2025-12-11 17:50:27'),
(633, 'Mat Sheet', 'SBICRM-100000633', '6X3  SCOTCH BRIGHT', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:51:02', '2025-12-11 17:51:02'),
(634, 'MAT WHEEL {ROSE}', 'SBICRM-100000634', '6X2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:51:21', '2025-12-11 17:51:21'),
(635, 'MAT WHEEL {ROSE}', 'SBICRM-100000635', '6x1', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:51:38', '2025-12-11 17:51:38'),
(636, 'MAT WHEEL {ROSE}', 'SBICRM-100000636', '6X2 (1+1) 120', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:51:54', '2025-12-11 17:51:54'),
(637, 'MAT WHEEL {ROSE}', 'SBICRM-100000637', '6X1 (1+1)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:52:11', '2025-12-11 17:52:11'),
(638, 'Mob Wheel', 'SBICRM-100000638', '12 x 8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:52:30', '2025-12-11 17:52:30'),
(639, 'Mob Wheel', 'SBICRM-100000639', '8x8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:52:49', '2025-12-11 17:52:49'),
(640, 'Mob Wheel', 'SBICRM-100000640', '8x6', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:53:02', '2025-12-11 17:53:02'),
(641, 'Mob Wheel', 'SBICRM-100000641', '6x8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:53:16', '2025-12-11 17:53:16'),
(642, 'Mob Wheel', 'SBICRM-100000642', '6x4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:53:32', '2025-12-11 17:53:32'),
(643, 'Mob Wheel', 'SBICRM-100000643', '5x10', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:53:46', '2025-12-11 17:53:46'),
(644, 'Mob Wheel', 'SBICRM-100000644', '8x4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:54:01', '2025-12-11 17:54:01'),
(645, 'Mob Wheel', 'SBICRM-100000645', '4\"x4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:54:21', '2025-12-11 17:54:21'),
(646, 'Mob Wheel', 'SBICRM-100000646', '4\"x2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:54:39', '2025-12-11 17:54:39'),
(647, 'Mob Wheel', 'SBICRM-100000647', '10x8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:54:56', '2025-12-11 17:54:56'),
(648, 'Mob Wheel', 'SBICRM-100000648', '6x2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:55:13', '2025-12-11 17:55:13'),
(649, 'Mob Wheel', 'SBICRM-100000649', '6X1', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:55:30', '2025-12-11 17:55:30'),
(650, 'padapat wheel', 'SBICRM-100000650', '6x2', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:55:58', '2025-12-11 17:55:58'),
(651, 'padapat wheel', 'SBICRM-100000651', '6x1', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:56:17', '2025-12-11 17:56:17'),
(652, 'Name Plate (Small)', 'SBICRM-100000652', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:56:43', '2025-12-11 17:56:43'),
(653, 'Name Plate (Big)', 'SBICRM-100000653', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:56:59', '2025-12-11 17:56:59'),
(654, 'SAWARMA SS PLATE', 'SBICRM-100000654', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:57:16', '2025-12-11 17:57:16'),
(655, 'SAWARMA SS KNIFE', 'SBICRM-100000655', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:57:40', '2025-12-11 17:57:40'),
(656, 'O2 Cylinder', 'SBICRM-100000656', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:57:58', '2025-12-11 17:57:58'),
(657, 'Packing Roll', 'SBICRM-100000657', '12\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:58:13', '2025-12-11 17:58:13'),
(658, 'Packing Roll', 'SBICRM-100000658', '6\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:58:28', '2025-12-11 17:58:28'),
(659, 'STAR GEL', 'SBICRM-100000659', 'SS WELD CLEANING GEL', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:58:46', '2025-12-11 17:58:46'),
(660, 'THINNER', 'SBICRM-100000660', 'NC', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:59:04', '2025-12-11 17:59:04'),
(661, 'THINNER', 'SBICRM-100000661', 'NORMAL', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:59:22', '2025-12-11 17:59:22'),
(662, 'CAROSINE', 'SBICRM-100000662', 'WHITE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:59:39', '2025-12-11 17:59:39'),
(663, 'Paint', 'SBICRM-100000663', 'WHITE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 17:59:57', '2025-12-11 17:59:57'),
(664, 'Paint', 'SBICRM-100000664', 'Aluminium', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:00:20', '2025-12-11 18:00:20'),
(665, 'Paint', 'SBICRM-100000665', 'AD Gray', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:00:37', '2025-12-11 18:00:37'),
(666, 'Paint', 'SBICRM-100000666', 'Black', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:00:53', '2025-12-11 18:00:53'),
(667, 'Paint', 'SBICRM-100000667', 'Red', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:01:08', '2025-12-11 18:01:08'),
(668, 'Paint', 'SBICRM-100000668', 'Silver Ash', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:01:26', '2025-12-11 18:01:26'),
(669, 'Paint', 'SBICRM-100000669', 'MATEL PU PRIMER', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:01:44', '2025-12-11 18:01:44'),
(670, 'Paint Primer', 'SBICRM-100000670', 'Wood Primer', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:02:02', '2025-12-11 18:02:02'),
(671, 'Patta Rope', 'SBICRM-100000671', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:02:18', '2025-12-11 18:02:18'),
(672, 'Pencil', 'SBICRM-100000672', 'BLACK', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:03:18', '2025-12-11 18:03:18'),
(673, 'Pencil', 'SBICRM-100000673', 'White', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:04:03', '2025-12-11 18:04:03');
INSERT INTO `raw_materials` (`id`, `name`, `barcode`, `description`, `unit`, `category`, `minimumStock`, `currentStock`, `unitPrice`, `vendorId`, `status`, `createdAt`, `updatedAt`) VALUES
(674, 'Pencil (slate)', 'SBICRM-100000674', 'White', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:04:20', '2025-12-11 18:04:20'),
(675, 'Pencil (CHALK)', 'SBICRM-100000675', 'White', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:04:34', '2025-12-11 18:04:34'),
(676, 'POLISH WHEEL', 'SBICRM-100000676', '4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:04:49', '2025-12-11 18:04:49'),
(677, 'Polish Soap', 'SBICRM-100000677', 'Green', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:05:04', '2025-12-11 18:05:04'),
(678, 'Polish Soap', 'SBICRM-100000678', 'yellow', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:05:18', '2025-12-11 18:05:18'),
(679, 'Rope ASPETAS', 'SBICRM-100000679', '6mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:05:52', '2025-12-11 18:05:52'),
(680, 'FLAP DISC', 'SBICRM-100000680', '4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:06:37', '2025-12-11 18:06:37'),
(681, 'Shellac', 'SBICRM-100000681', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:07:05', '2025-12-11 18:07:05'),
(682, 'Siilicon Gun', 'SBICRM-100000682', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:07:20', '2025-12-11 18:07:20'),
(683, 'Sponge  Wheel {ROSE}', 'SBICRM-100000683', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:07:37', '2025-12-11 18:07:37'),
(684, 'ALUMINIUM TAPE', 'SBICRM-100000684', '2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:07:58', '2025-12-11 18:07:58'),
(685, 'Waste coupling', 'SBICRM-100000685', '4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:08:21', '2025-12-11 18:08:21'),
(686, 'SILICON GEL - WHITE', 'SBICRM-100000686', 'SILICONISED CS+ (SOUDAL)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:08:39', '2025-12-11 18:08:39'),
(687, 'Paint Brush', 'SBICRM-100000687', '75MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:08:56', '2025-12-11 18:08:56'),
(688, 'Paint Brush', 'SBICRM-100000688', '25MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:09:55', '2025-12-11 18:09:55'),
(689, 'THREE CLAMP-GLASS', 'SBICRM-100000689', 'counter glass clamp', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:10:13', '2025-12-11 18:10:13'),
(690, 'ABRO masking tape', 'SBICRM-100000690', '1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:10:28', '2025-12-11 18:10:28'),
(691, 'NUTRAL WHITE LED STRIP LIGHT', 'SBICRM-100000691', '10MM-4K ( 5 MTR ROLL) 12V-2835-180', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:10:45', '2025-12-11 18:10:45'),
(692, 'WHITE LED STRIP LIGHT', 'SBICRM-100000692', '10MM-6K ( 5 MTR ROLL) 12V-2835-180', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:11:02', '2025-12-11 18:11:02'),
(693, 'WARM WHITE LED STRIP LIGHT', 'SBICRM-100000693', '10MM-3K (5 MTR ROLL) 12V-2835-180', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:11:50', '2025-12-11 18:11:50'),
(694, 'RED DOUBLE SIDE TAPE', 'SBICRM-100000694', 'GLASS- FOAM TAPE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:12:11', '2025-12-11 18:12:11'),
(695, 'wire 2 CORE', 'SBICRM-100000695', '1.5 SQMM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:12:27', '2025-12-11 18:12:27'),
(696, 'wire 3 CORE', 'SBICRM-100000696', '1.5 SQMM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:12:47', '2025-12-11 18:12:47'),
(697, 'LED WIRE', 'SBICRM-100000697', 'TWIN FLAT WIRE 23/60', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:13:03', '2025-12-11 18:13:03'),
(698, '1 CORE WIRE', 'SBICRM-100000698', '1 SQMM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:13:19', '2025-12-11 18:13:19'),
(699, 'WIRE', 'SBICRM-100000699', '1.5 SQMM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:13:36', '2025-12-11 18:13:36'),
(700, 'TWO CORE WIRE', 'SBICRM-100000700', '0.5 SQMM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:13:51', '2025-12-11 18:13:51'),
(701, 'THREE CORE WIRE', 'SBICRM-100000701', '2.5 SQMM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:14:07', '2025-12-11 18:14:07'),
(702, 'Polish paper', 'SBICRM-100000702', 'P-100', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:14:26', '2025-12-11 18:14:26'),
(703, 'Polish paper', 'SBICRM-100000703', 'P-120', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:14:42', '2025-12-11 18:14:42'),
(704, 'Polish paper', 'SBICRM-100000704', 'P-320', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:15:02', '2025-12-11 18:15:02'),
(705, 'Polish paper grinding', 'SBICRM-100000705', 'CRIP-80', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:15:18', '2025-12-11 18:15:18'),
(706, 'Polish paper', 'SBICRM-100000706', 'P-180', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:15:36', '2025-12-11 18:15:36'),
(707, 'Zigzag blade', 'SBICRM-100000707', '5mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:15:52', '2025-12-11 18:15:52'),
(708, 'Wood cutter blade', 'SBICRM-100000708', '4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:16:07', '2025-12-11 18:16:07'),
(709, 'Granite cutting wheel', 'SBICRM-100000709', '4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:16:22', '2025-12-11 18:16:22'),
(710, 'CASH COUNTER BOWL', 'SBICRM-100000710', '2Nos', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:16:40', '2025-12-11 18:16:40'),
(711, 'CASH COUNTER BOWL', 'SBICRM-100000711', '3Nos', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:17:01', '2025-12-11 18:17:01'),
(712, 'Sponge  Wheel', 'SBICRM-100000712', '6\'\'x2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:17:14', '2025-12-11 18:17:14'),
(713, 'Sponge  Wheel', 'SBICRM-100000713', '4\'\'', 'pieces', 'steel', '10', '15', '9', NULL, '1', '2025-12-11 18:17:32', '2025-12-11 18:17:32'),
(714, 'Sponge  Wheel', 'SBICRM-100000714', '6\'\'x1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:17:51', '2025-12-11 18:17:51'),
(715, 'Waste coupling', 'SBICRM-100000715', '3\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:18:14', '2025-12-11 18:18:14'),
(716, 'Ear Plug', 'SBICRM-100000716', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:18:30', '2025-12-11 18:18:30'),
(717, 'Locker Bush', 'SBICRM-100000717', '2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:18:47', '2025-12-11 18:18:47'),
(718, 'INDICATION SWITCH COUNTER', 'SBICRM-100000718', 'RED - ON / OFF', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:19:05', '2025-12-11 18:19:05'),
(719, 'INDICATION SWITCH COUNTER', 'SBICRM-100000719', 'GREEN- ON / OFF', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:19:19', '2025-12-11 18:19:19'),
(720, 'WIRE GLANT', 'SBICRM-100000720', 'PG-9', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:19:37', '2025-12-11 18:19:37'),
(721, 'WIRE GLANT', 'SBICRM-100000721', 'PG-11', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:19:57', '2025-12-11 18:19:57'),
(722, 'TWO PIN PLUG', 'SBICRM-100000722', 'PLUG TOP', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:20:13', '2025-12-11 18:20:13'),
(723, 'THREE PIN PLUG', 'SBICRM-100000723', 'PLUG TOP-6 AMP', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:20:32', '2025-12-11 18:20:32'),
(724, 'THREE PIN PLUG', 'SBICRM-100000724', 'PLUG TOP-16 AMP', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:20:50', '2025-12-11 18:20:50'),
(725, 'LED ADOPTOR - DRIVER', 'SBICRM-100000725', '12V-12.5A ULTRA SLIM SMPS-150W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:21:09', '2025-12-11 18:21:09'),
(726, 'LED ADOPTOR - DRIVER', 'SBICRM-100000726', 'DRIVER SLIM 12V-20W', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:21:29', '2025-12-11 18:21:29'),
(727, 'Goli', 'SBICRM-100000727', 's', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:21:47', '2025-12-11 18:21:47'),
(728, 'Emery grinding sheet corien', 'SBICRM-100000728', 'no 80', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:22:05', '2025-12-11 18:22:05'),
(729, 'Mob wheel', 'SBICRM-100000729', '5x100', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:22:25', '2025-12-11 18:22:25'),
(730, 'Mob wheel', 'SBICRM-100000730', '6x1', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:22:46', '2025-12-11 18:22:46'),
(731, 'Mob wheel', 'SBICRM-100000731', '8x7', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:22:58', '2025-12-11 18:22:58'),
(732, 'Cutting nozzle', 'SBICRM-100000732', '1x16', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:23:18', '2025-12-11 18:23:18'),
(733, 'Cutting nozzle', 'SBICRM-100000733', '1x32', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:23:39', '2025-12-11 18:23:39'),
(734, 'Cutting nozzle', 'SBICRM-100000734', '3x64', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:23:58', '2025-12-11 18:23:58'),
(735, 'Gloves', 'SBICRM-100000735', 'cotton blue', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:24:24', '2025-12-11 18:24:24'),
(736, 'REFRACTORY CASTABLE INSULYTE', 'SBICRM-100000736', '7', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:24:46', '2025-12-11 18:24:46'),
(737, 'CERAMIC FIBER BLANKETS', 'SBICRM-100000737', '64kg', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:25:01', '2025-12-11 18:25:01'),
(738, 'ADHESIVE', 'SBICRM-100000738', 'WHITE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:25:22', '2025-12-11 18:25:22'),
(739, 'ADHESIVE', 'SBICRM-100000739', 'SLATE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:25:36', '2025-12-11 18:25:36'),
(740, 'ADHESIVE', 'SBICRM-100000740', 'BLACK', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:25:52', '2025-12-11 18:25:52'),
(741, 'ADHESIVE', 'SBICRM-100000741', 'YELLOW', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:26:07', '2025-12-11 18:26:07'),
(742, 'ADHESIVE', 'SBICRM-100000742', 'MOCHA', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:26:29', '2025-12-11 18:26:29'),
(743, 'WASTE', 'SBICRM-100000743', 'COTTON', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:26:49', '2025-12-11 18:26:49'),
(744, 'WHITE WASTE', 'SBICRM-100000744', 'Thread', 'kg', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:27:08', '2025-12-11 18:27:08'),
(745, 'MARBLES - BLACK', 'SBICRM-100000745', '48\'\'X12\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:27:29', '2025-12-11 18:27:29'),
(746, 'MARBLES - WHITE', 'SBICRM-100000746', '48\'\'X12\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:27:51', '2025-12-11 18:27:51'),
(747, 'MARBLES - WHITE', 'SBICRM-100000747', '72\'\'X12\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:28:07', '2025-12-11 18:28:07'),
(748, 'MARBLES - WHITE', 'SBICRM-100000748', '60X12', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:28:33', '2025-12-11 18:28:33'),
(749, 'MARBLES - WHITE', 'SBICRM-100000749', '36X12', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:28:50', '2025-12-11 18:28:50'),
(750, 'MARBLES - WHITE', 'SBICRM-100000750', '30X12', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:29:03', '2025-12-11 18:29:03'),
(751, 'MARBLES - WHITE', 'SBICRM-100000751', '29X12', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:29:26', '2025-12-11 18:29:26'),
(752, 'Packing Roll', 'SBICRM-100000752', 'BIG - 12\" - 300 MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:29:49', '2025-12-11 18:29:49'),
(753, 'Packing Roll', 'SBICRM-100000753', 'SMALL - 6\" - 150 MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:30:05', '2025-12-11 18:30:05'),
(754, 'Packing Roll-Paper', 'SBICRM-100000754', '2FT', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:30:23', '2025-12-11 18:30:23'),
(755, 'CUTTER BLADE - KNIFE', 'SBICRM-100000755', 'Small', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:30:42', '2025-12-11 18:30:42'),
(756, 'Paint', 'SBICRM-100000756', 'Yellow', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:30:59', '2025-12-11 18:30:59'),
(757, 'Waste coupling', 'SBICRM-100000757', '1 1/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:31:18', '2025-12-11 18:31:18'),
(758, 'WHITE LED STRIP LIGHT', 'SBICRM-100000758', '10MM-6K ( 5 MTR ROLL) 24V-2835-180', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:31:37', '2025-12-11 18:31:37'),
(759, 'wire 3 CORE', 'SBICRM-100000759', '2.5 SQMM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:31:57', '2025-12-11 18:31:57'),
(760, 'Polish paper', 'SBICRM-100000760', 'P-400', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:32:13', '2025-12-11 18:32:13'),
(761, 'Polish paper', 'SBICRM-100000761', 'P-600', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-11 18:32:32', '2025-12-11 18:32:32'),
(762, 'CR Sheet', 'SBICRM-100000762', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:02:06', '2025-12-12 05:02:06'),
(763, 'Gas Mane fold', 'SBICRM-100000763', '8+x63\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:02:31', '2025-12-12 05:02:31'),
(764, 'Gas Mane fold', 'SBICRM-100000764', '6+46 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:03:17', '2025-12-12 05:03:17'),
(765, 'Gas Mane Fold', 'SBICRM-100000765', '2+x15\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:03:47', '2025-12-12 05:03:47'),
(766, 'Gas Mane Fold', 'SBICRM-100000766', '2+x15\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:04:30', '2025-12-12 05:04:30'),
(767, 'Gas Mane Fold', 'SBICRM-100000767', '4+4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:05:04', '2025-12-12 05:05:04'),
(768, 'GI Round Pipe', 'SBICRM-100000768', '1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:05:34', '2025-12-12 05:05:34'),
(769, 'GI Round Pipe', 'SBICRM-100000769', '3/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:05:58', '2025-12-12 05:05:58'),
(770, 'MS Angle', 'SBICRM-100000770', '50 x 6mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:06:23', '2025-12-12 05:06:23'),
(771, 'MS Angle', 'SBICRM-100000771', '1 1/4\" x 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:06:46', '2025-12-12 05:06:46'),
(772, 'MS Flat', 'SBICRM-100000772', '50 x 12mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:07:11', '2025-12-12 05:07:11'),
(773, 'MS Gas Pipe', 'SBICRM-100000773', 'PO', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:07:33', '2025-12-12 05:07:33'),
(774, 'MS Gas Pipe', 'SBICRM-100000774', '1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:07:55', '2025-12-12 05:07:55'),
(775, 'MS Rectangle Pipe', 'SBICRM-100000775', '1\"x2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:08:58', '2025-12-12 05:08:58'),
(776, 'MS Round Pipe', 'SBICRM-100000776', '1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:09:22', '2025-12-12 05:09:22'),
(777, 'MS Round Pipe', 'SBICRM-100000777', '2 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:09:49', '2025-12-12 05:09:49'),
(778, 'MS Round Pipe', 'SBICRM-100000778', '3\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:10:20', '2025-12-12 05:10:20'),
(779, 'MS Round Pipe', 'SBICRM-100000779', '1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:10:37', '2025-12-12 05:10:37'),
(780, 'GI SHEET', 'SBICRM-100000780', '18SWG (8\'X4\')', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:11:03', '2025-12-12 05:11:03'),
(781, 'MS Square Pipe', 'SBICRM-100000781', '1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:11:23', '2025-12-12 05:11:23'),
(782, 'MS Square Pipe', 'SBICRM-100000782', '2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:11:55', '2025-12-12 05:11:55'),
(783, 'MS Square Pipe', 'SBICRM-100000783', '1 1/4\"x1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:12:17', '2025-12-12 05:12:17'),
(784, 'MS Square Pipe', 'SBICRM-100000784', '1 1/2\"x1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:12:28', '2025-12-12 05:12:28'),
(785, 'MS Square Pipe', 'SBICRM-100000785', '1/2x1/2 (15mm)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:12:39', '2025-12-12 05:12:39'),
(786, 'MS Square Pipe', 'SBICRM-100000786', '1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:12:52', '2025-12-12 05:12:52'),
(787, 'MS Square Pipe', 'SBICRM-100000787', '1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:13:03', '2025-12-12 05:13:03'),
(788, 'MS Square Pipe', 'SBICRM-100000788', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:13:15', '2025-12-12 05:13:15'),
(789, 'M.S PLAIN  Washer', 'SBICRM-100000789', '2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:13:47', '2025-12-12 05:13:47'),
(790, 'SS Angle', 'SBICRM-100000790', '1\"x1/4\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:14:13', '2025-12-12 05:14:13'),
(791, 'SS Angle', 'SBICRM-100000791', '1\"x1\"x3mm& 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:14:32', '2025-12-12 05:14:32'),
(792, 'SS Angle', 'SBICRM-100000792', '1 1/4\"x1/4\" & 202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:14:45', '2025-12-12 05:14:45'),
(793, 'SS Angle', 'SBICRM-100000793', '1 1/4\"x3mm & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:15:02', '2025-12-12 05:15:02'),
(794, 'SS Angle', 'SBICRM-100000794', '1x3 MM  304', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:15:12', '2025-12-12 05:15:12'),
(795, 'SS Angle', 'SBICRM-100000795', '1 1/4\"x3mm & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:15:24', '2025-12-12 05:15:24'),
(796, 'SS Flat', 'SBICRM-100000796', '1\"x1/4\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:15:58', '2025-12-12 05:15:58'),
(797, 'SS Flat', 'SBICRM-100000797', '1 1/4\"x1/4\" & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:16:46', '2025-12-12 05:16:46'),
(798, 'SS Flat', 'SBICRM-100000798', '3/4\"x6mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:16:59', '2025-12-12 05:16:59'),
(799, 'SS Flat', 'SBICRM-100000799', '1\"x3mm 304', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:17:12', '2025-12-12 05:17:12'),
(800, 'SS Flat', 'SBICRM-100000800', '1 1/2x1/4\'\'  304', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:18:03', '2025-12-12 05:18:03'),
(801, 'SS Flat', 'SBICRM-100000801', '1 1/4\" x3mm 304', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:18:15', '2025-12-12 05:18:15'),
(802, 'SS Flat(A\'Frame)', 'SBICRM-100000802', '150mmx6mm 202', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:18:42', '2025-12-12 05:18:42'),
(803, 'SS Flat(Dinnig Table)', 'SBICRM-100000803', '100mmx6mm 202', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:19:07', '2025-12-12 05:19:07'),
(804, 'SS Rectangle Pipe', 'SBICRM-100000804', '3/4\"x1 1/2\"  & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:19:39', '2025-12-12 05:19:39'),
(805, 'SS Rectangle Pipe', 'SBICRM-100000805', '1\"x2\"& 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:19:59', '2025-12-12 05:19:59'),
(806, 'SS Rectangle Pipe', 'SBICRM-100000806', '1x1/2\'\' & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:20:12', '2025-12-12 05:20:12'),
(807, 'SS Rectangle Pipe', 'SBICRM-100000807', '3/4\"x1 1/2\"  & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:20:24', '2025-12-12 05:20:24'),
(808, 'SS Rectangle Pipe', 'SBICRM-100000808', '1\"x2\"& 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:20:37', '2025-12-12 05:20:37'),
(809, 'SS Rectangle Pipe', 'SBICRM-100000809', '1\"x2\"& 304 Gr.16swg', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:20:51', '2025-12-12 05:20:51'),
(810, 'SS Rectangle Pipe', 'SBICRM-100000810', '1/2\'\'x1\"& 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:21:05', '2025-12-12 05:21:05'),
(811, 'SS Rectangle Pipe', 'SBICRM-100000811', '1/2\'\'x1 1/2\'\' & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:21:15', '2025-12-12 05:21:15'),
(812, 'SS Rectangle Pipe', 'SBICRM-100000812', '1\'\'x3/4\'\' & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:21:28', '2025-12-12 05:21:28'),
(813, 'SS Rod', 'SBICRM-100000813', '3MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:21:55', '2025-12-12 05:21:55'),
(814, 'SS Rod', 'SBICRM-100000814', '4MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:22:07', '2025-12-12 05:22:07'),
(815, 'SS Rod', 'SBICRM-100000815', '5MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:22:15', '2025-12-12 05:22:15'),
(816, 'SS Rod', 'SBICRM-100000816', '8MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:22:23', '2025-12-12 05:22:23'),
(817, 'SS Round Pipe', 'SBICRM-100000817', '1/2\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:22:48', '2025-12-12 05:22:48'),
(818, 'SS Round Pipe', 'SBICRM-100000818', '3/4\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:22:59', '2025-12-12 05:22:59'),
(819, 'SS Round Pipe', 'SBICRM-100000819', '1\" & 202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:23:10', '2025-12-12 05:23:10'),
(820, 'SS Round Pipe', 'SBICRM-100000820', '1 1/4\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:23:20', '2025-12-12 05:23:20'),
(821, 'SS Round Pipe', 'SBICRM-100000821', '1 1/2\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:23:31', '2025-12-12 05:23:31'),
(822, 'SS Round Pipe', 'SBICRM-100000822', '2\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:23:45', '2025-12-12 05:23:45'),
(823, 'SS Round Pipe', 'SBICRM-100000823', '2 1/2\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:23:56', '2025-12-12 05:23:56'),
(824, 'SS Round Pipe', 'SBICRM-100000824', '3\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:24:08', '2025-12-12 05:24:08'),
(825, 'SS Round Pipe', 'SBICRM-100000825', '4\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:24:19', '2025-12-12 05:24:19'),
(826, 'SS Round Pipe 304 18G', 'SBICRM-100000826', '1/2\" & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:24:41', '2025-12-12 05:24:42'),
(827, 'SS Round Pipe', 'SBICRM-100000827', '3/4\" & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:25:10', '2025-12-12 05:25:10'),
(828, 'SS Round Pipe', 'SBICRM-100000828', '1\" & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:25:29', '2025-12-12 05:25:29'),
(829, 'SS Round Pipe 304 18G', 'SBICRM-100000829', '1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:25:56', '2025-12-12 05:25:56'),
(830, 'SS Round Pipe 304 18G', 'SBICRM-100000830', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:26:19', '2025-12-12 05:26:19'),
(831, 'SS Round Pipe', 'SBICRM-100000831', '2\" & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:26:43', '2025-12-12 05:26:43'),
(832, 'SS Round Pipe', 'SBICRM-100000832', '2 1/2\" & 304 Gr..', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:26:54', '2025-12-12 05:26:54'),
(833, 'SS Round Pipe', 'SBICRM-100000833', '3\" & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:27:04', '2025-12-12 05:27:04'),
(834, 'SS Round Pipe', 'SBICRM-100000834', '5/8\" 304', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:27:14', '2025-12-12 05:27:14'),
(835, 'SS Round Pipe 304 18G', 'SBICRM-100000835', '2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:27:36', '2025-12-12 05:27:36'),
(836, 'SS Round Rod', 'SBICRM-100000836', '5MM (1 BUNDLE-88 NO/1 NO-.500gm)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:28:01', '2025-12-12 05:28:01'),
(837, 'SS Round Rod', 'SBICRM-100000837', '8mm  & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:28:12', '2025-12-12 05:28:12'),
(838, 'SS Round Rod', 'SBICRM-100000838', '10mm  & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:28:40', '2025-12-12 05:28:40'),
(839, 'SS Round Rod', 'SBICRM-100000839', '10mm  & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:29:14', '2025-12-12 05:29:14'),
(840, 'SS Round Rod', 'SBICRM-100000840', '32mm  & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:29:37', '2025-12-12 05:29:37'),
(841, 'SS Round Rod', 'SBICRM-100000841', '32mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:32:26', '2025-12-12 05:32:26'),
(842, 'SS Round Rod', 'SBICRM-100000842', '12MM  & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:33:23', '2025-12-12 05:33:23'),
(843, 'SS Round Rod', 'SBICRM-100000843', '28MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:33:49', '2025-12-12 05:33:49'),
(844, 'SS Schedule Round Pipe', 'SBICRM-100000844', '1/2\" & 304 Gr.(SCH)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:34:14', '2025-12-12 05:34:14'),
(845, 'SS Schedule Round Pipe', 'SBICRM-100000845', '1\"  & 304 Gr.(SCH)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:34:41', '2025-12-12 05:34:41'),
(846, 'SS Schedule Round Pipe', 'SBICRM-100000846', '3/4\" 304', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:35:06', '2025-12-12 05:35:06'),
(847, 'SS Schedule Round Pipe', 'SBICRM-100000847', '10 SWG ,4\'x8\',2B,202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:35:31', '2025-12-12 05:35:31'),
(848, 'SS PATTA', 'SBICRM-100000848', '1 1/4\" X 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:35:53', '2025-12-12 05:35:53'),
(849, 'SS PATTA', 'SBICRM-100000849', '1\"X3/8\" (5 FEET)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:36:17', '2025-12-12 05:36:17'),
(850, 'GOLD SHEET', 'SBICRM-100000850', '0.6MM (8\'X4\")', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:36:41', '2025-12-12 05:36:41'),
(851, 'SS SHEET & SS PERFORATION', 'SBICRM-100000851', '(12X4) FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:37:05', '2025-12-12 05:37:05'),
(852, 'SS Sheet', 'SBICRM-100000852', '16 SWG ,4\'x8\',2B,202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:37:29', '2025-12-12 05:37:29'),
(853, 'SS Sheet', 'SBICRM-100000853', '16 SWG ,4\'x8\',PVC,202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:38:02', '2025-12-12 05:38:02'),
(854, 'SS Sheet', 'SBICRM-100000854', '18 SWG ,4\'x8\',2B,202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:38:27', '2025-12-12 05:38:27'),
(855, 'SS Sheet', 'SBICRM-100000855', '18 SWG ,4\'x8\',PVC,202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:38:53', '2025-12-12 05:38:53'),
(856, 'SS Sheet', 'SBICRM-100000856', '18 SWG ,4\'x8\',Mirror,202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:39:15', '2025-12-12 05:39:15'),
(857, 'SS Sheet', 'SBICRM-100000857', '20 SWG ,1mx2m,PVC,202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:39:38', '2025-12-12 05:39:38'),
(858, 'SS Sheet', 'SBICRM-100000858', '20 SWG,4\'x8\',PVC,202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:40:05', '2025-12-12 05:40:05'),
(859, 'SS Sheet', 'SBICRM-100000859', '10 SWG ,4\'x8\',2B,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:40:33', '2025-12-12 05:40:33'),
(860, 'SS Sheet', 'SBICRM-100000860', '16 SWG ,1x2,2B,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:41:01', '2025-12-12 05:41:01'),
(861, 'SS Sheet', 'SBICRM-100000861', '14 SWG ,4\'x8\',2B,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:41:24', '2025-12-12 05:41:24'),
(862, 'SS Sheet', 'SBICRM-100000862', '14 SWG ,4\'x8\',pvc,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:41:48', '2025-12-12 05:41:48'),
(863, 'SS Sheet', 'SBICRM-100000863', '14 SWG ,5\'x10\',PVC,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:42:12', '2025-12-12 05:42:12'),
(864, 'SS Sheet', 'SBICRM-100000864', '16swg ,4\'x8\', 304, pvc', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:42:38', '2025-12-12 05:42:38'),
(865, 'SS Sheet', 'SBICRM-100000865', '16 SWG ,4\'x8\',2B,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:43:02', '2025-12-12 05:43:02'),
(866, 'SS Sheet', 'SBICRM-100000866', '16 SWG ,5\'x10\',2B,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:43:27', '2025-12-12 05:43:27'),
(867, 'SS Sheet', 'SBICRM-100000867', '16 SWG ,5\'x10\',PVC,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:43:48', '2025-12-12 05:43:48'),
(868, 'SS Sheet', 'SBICRM-100000868', '18 SWG ,4\'x8\',2B,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:44:10', '2025-12-12 05:44:10'),
(869, 'SS Sheet', 'SBICRM-100000869', '18 SWG ,4\'x8\',PVC,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:44:35', '2025-12-12 05:44:35'),
(870, 'SS Sheet', 'SBICRM-100000870', '18 SWG ,4\'x8\',Mirror,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:44:55', '2025-12-12 05:44:55'),
(871, 'SS Sheet', 'SBICRM-100000871', '18 SWG ,5\'x10\',2B,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:45:18', '2025-12-12 05:45:18'),
(872, 'SS Sheet', 'SBICRM-100000872', '18 SWG ,5\'x10\',PVC,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:45:41', '2025-12-12 05:45:41'),
(873, 'SS Sheet', 'SBICRM-100000873', '20 SWG ,4\'x8\',2B,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:46:02', '2025-12-12 05:46:02'),
(874, 'SS Sheet', 'SBICRM-100000874', '20 SWG ,5\'x10\',2B,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:46:27', '2025-12-12 05:46:27'),
(875, 'SS Sheet', 'SBICRM-100000875', '20 SWG ,4\'x8\',PVC,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:46:50', '2025-12-12 05:46:50'),
(876, 'SS Sheet', 'SBICRM-100000876', '20 SWG,5x10,PVC 304', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:47:10', '2025-12-12 05:47:10'),
(877, 'SS Sheet', 'SBICRM-100000877', '22 SWG 0.8mm 8\'x4\' 304 Gr', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:47:30', '2025-12-12 05:47:30'),
(878, 'SS Sheet', 'SBICRM-100000878', '14 SWG ,8\'x4\',2B,202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:47:49', '2025-12-12 05:47:49'),
(879, 'SS Sheet', 'SBICRM-100000879', '0.8mm 202 Gr.PVC', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:48:12', '2025-12-12 05:48:12'),
(880, 'SS Sheet', 'SBICRM-100000880', '0.8 mm 4\'x8\',2B,202Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:48:58', '2025-12-12 05:48:58'),
(881, 'SS Sheet', 'SBICRM-100000881', '0.8mm 4\'x8\' 304 Gr.PVC', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:49:11', '2025-12-12 05:49:11'),
(882, 'SS Sheet', 'SBICRM-100000882', '10 SWG ,5\'x10\',2B,304Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:49:33', '2025-12-12 05:49:33'),
(883, 'SS Sheet', 'SBICRM-100000883', '22 SWG 0.8mm 304 Gr.Mirror', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:50:10', '2025-12-12 05:50:10'),
(884, 'SS Square Pipe', 'SBICRM-100000884', '1/2\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:50:33', '2025-12-12 05:50:33'),
(885, 'SS Square Pipe', 'SBICRM-100000885', '3/4\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:50:57', '2025-12-12 05:50:57'),
(886, 'SS Square Pipe', 'SBICRM-100000886', '1\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:51:17', '2025-12-12 05:51:17'),
(887, 'SS Square Pipe', 'SBICRM-100000887', '1 1/4\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:51:36', '2025-12-12 05:51:36'),
(888, 'SS Square Pipe', 'SBICRM-100000888', '1 1/2\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:51:57', '2025-12-12 05:51:57'),
(889, 'SS Square Pipe', 'SBICRM-100000889', '2\" & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:52:29', '2025-12-12 05:52:29'),
(890, 'SS square Pipe', 'SBICRM-100000890', '1/2\'\' & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:53:29', '2025-12-12 05:53:29'),
(891, 'SS Square Pipe', 'SBICRM-100000891', '3/4\" & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:53:52', '2025-12-12 05:53:52'),
(892, 'SS Square Pipe 304 18G', 'SBICRM-100000892', '1\"X1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:54:16', '2025-12-12 05:54:16'),
(893, 'SS Square Pipe 304 18G', 'SBICRM-100000893', '1 1/4\" X 1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 05:54:46', '2025-12-12 05:54:46'),
(894, 'SS Square Pipe', 'SBICRM-100000894', '1 1/2\" & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:33:18', '2025-12-12 06:33:18'),
(895, 'SS Square Pipe', 'SBICRM-100000895', '2\" & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:33:42', '2025-12-12 06:33:42'),
(896, 'SS Square Pipe', 'SBICRM-100000896', '2 1/2\"\" & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:34:05', '2025-12-12 06:34:05'),
(897, 'SS Square Pipe', 'SBICRM-100000897', '3\'\' 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:34:29', '2025-12-12 06:34:29'),
(898, 'SS Square Pipe', 'SBICRM-100000898', '3\'\' 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:34:52', '2025-12-12 06:34:52'),
(899, 'SS Square Pipe 202', 'SBICRM-100000899', '2 1/2\'\' 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:35:16', '2025-12-12 06:35:16'),
(900, 'SS Square Pipe 304 18G', 'SBICRM-100000900', '1 1/2\"X 1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:35:53', '2025-12-12 06:35:53'),
(901, 'SS Square Rod', 'SBICRM-100000901', '1/4\"  & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:36:20', '2025-12-12 06:36:20'),
(902, 'SS Square Rod', 'SBICRM-100000902', '1/2\" 14mm  & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:36:41', '2025-12-12 06:36:41'),
(903, 'SS Square Rod', 'SBICRM-100000903', '3/4\" 16mm & 304 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:36:57', '2025-12-12 06:36:57'),
(904, 'SS Square Rod', 'SBICRM-100000904', '20mm  & 202 Gr.', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:38:00', '2025-12-12 06:38:00'),
(905, 'SS Square Rod', 'SBICRM-100000905', '12mm&304', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:38:31', '2025-12-12 06:38:31'),
(906, 'SS Square Rod', 'SBICRM-100000906', '16mm&304', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:38:52', '2025-12-12 06:38:52'),
(907, 'SS U Clamp', 'SBICRM-100000907', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:39:17', '2025-12-12 06:39:17'),
(908, 'SS Union  (Iddly)', 'SBICRM-100000908', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:40:49', '2025-12-12 06:40:49'),
(909, 'SS Union Material', 'SBICRM-100000909', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:41:28', '2025-12-12 06:41:28'),
(910, 'SS Washer (Iddly)', 'SBICRM-100000910', '1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:41:52', '2025-12-12 06:41:52'),
(911, 'SS  Bend', 'SBICRM-100000911', '3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:44:19', '2025-12-12 06:44:19'),
(912, 'Steam Trap Racer', 'SBICRM-100000912', '3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:44:41', '2025-12-12 06:44:41'),
(913, 'Steam Trap', 'SBICRM-100000913', '3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:45:02', '2025-12-12 06:45:02'),
(914, 'Steam Weight (1Kg) old', 'SBICRM-100000914', '1Kg', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:46:09', '2025-12-12 06:46:09'),
(915, 'Steam Weight (2Kg)', 'SBICRM-100000915', '2 Kg', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:46:29', '2025-12-12 06:46:29'),
(916, 'Stool  Top  Bush', 'SBICRM-100000916', '2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:46:49', '2025-12-12 06:46:49'),
(917, 'Stool Leg Bush(Round)', 'SBICRM-100000917', '1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:47:09', '2025-12-12 06:47:09'),
(918, 'Stool Pin Bush', 'SBICRM-100000918', 'White', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:47:33', '2025-12-12 06:47:33'),
(919, 'Tap Set', 'SBICRM-100000919', '3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:48:02', '2025-12-12 06:48:02'),
(920, 'Tap Set', 'SBICRM-100000920', '1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:48:36', '2025-12-12 06:48:36'),
(921, 'Tap Set', 'SBICRM-100000921', '5/16\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:49:02', '2025-12-12 06:49:02'),
(922, 'Tap Set', 'SBICRM-100000922', '3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:49:25', '2025-12-12 06:49:25'),
(923, 'Tap Set', 'SBICRM-100000923', '1\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:49:43', '2025-12-12 06:49:43'),
(924, 'Tap Set', 'SBICRM-100000924', '4mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:49:57', '2025-12-12 06:49:57'),
(925, 'Tea can', 'SBICRM-100000925', '2 1/2  Lits', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:50:20', '2025-12-12 06:50:20'),
(926, 'Tea Cup', 'SBICRM-100000926', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:50:42', '2025-12-12 06:50:42'),
(927, 'Tefflon Tape', 'SBICRM-100000927', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:51:01', '2025-12-12 06:51:01'),
(928, 'Thermometer', 'SBICRM-100000928', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:51:18', '2025-12-12 06:51:18'),
(929, 'TIG  SPARES', 'SBICRM-100000929', 'ceramic cup', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:51:46', '2025-12-12 06:51:46'),
(930, 'TIG Welding Filler rod', 'SBICRM-100000930', '1.6mm dia', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:52:11', '2025-12-12 06:52:11'),
(931, 'TIG Welding Filler rod', 'SBICRM-100000931', '2mm Dia', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:52:32', '2025-12-12 06:52:32'),
(932, 'Tig Welding Switch', 'SBICRM-100000932', 'Tig Welding', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:52:55', '2025-12-12 06:52:55'),
(933, 'Tower Bolt SS', 'SBICRM-100000933', '10\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:53:17', '2025-12-12 06:53:17'),
(934, 'Tower Bolt SS', 'SBICRM-100000934', '4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:53:37', '2025-12-12 06:53:37'),
(935, 'Trolly  Revolving Wheel BLUE', 'SBICRM-100000935', '100 x 38   (4\"X1 1/2\")', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:53:57', '2025-12-12 06:53:57'),
(936, 'Trolly Brake Wheel BLUE', 'SBICRM-100000936', '100 X 38   (4\"X1 1/2\")', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:54:33', '2025-12-12 06:54:33'),
(937, 'Trolly Brake Wheel (Black)', 'SBICRM-100000937', '75 x 32   (3\"X1 1/4\")', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:55:48', '2025-12-12 06:55:48'),
(938, 'Trolly Brake Wheel (Black)', 'SBICRM-100000938', '75 x 32   (3\"X1 1/4\")', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:56:09', '2025-12-12 06:56:09'),
(939, 'Trolly Brake Wheel (White)', 'SBICRM-100000939', '75 x 32  (3\"X1 1/4\")', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:57:26', '2025-12-12 06:57:26'),
(940, 'Trolly Metal Wheel', 'SBICRM-100000940', '4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:58:01', '2025-12-12 06:58:01'),
(941, 'Trolly Revolving  Wheel (Black)', 'SBICRM-100000941', '2  1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:58:22', '2025-12-12 06:58:22'),
(942, 'Trolly Revolving  Wheel (White)', 'SBICRM-100000942', '2  1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:58:48', '2025-12-12 06:58:48'),
(943, 'Trolly Revolving  Wheel (White)', 'SBICRM-100000943', '75 x 32  (3\"X1 1/4\")', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:59:10', '2025-12-12 06:59:10'),
(944, 'Trolly Revoving Wheel', 'SBICRM-100000944', '100 x 38', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:59:35', '2025-12-12 06:59:35'),
(945, 'Trolly Revolving Wheel (Black)', 'SBICRM-100000945', '75 x 32  (3\"X1 1/4\")', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 06:59:56', '2025-12-12 06:59:56'),
(946, 'Trolly Wheel (Revolving)', 'SBICRM-100000946', '8\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 07:00:19', '2025-12-12 07:00:19'),
(947, 'Trolly Wheel fiber', 'SBICRM-100000947', '75x32', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 07:00:46', '2025-12-12 07:00:46'),
(948, 'Trolly Wheel Metal', 'SBICRM-100000948', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 07:01:09', '2025-12-12 07:01:09'),
(949, 'Trolly Wheel PVC', 'SBICRM-100000949', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 07:01:37', '2025-12-12 07:01:37'),
(950, 'Trolly Wheel PVC', 'SBICRM-100000950', '2 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 07:02:36', '2025-12-12 07:02:36'),
(951, 'Rubber Wheel Black', 'SBICRM-100000951', '2 1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 07:03:01', '2025-12-12 07:03:01'),
(952, 'Break Wheel Rubber', 'SBICRM-100000952', '3\'\' x 1 1/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 07:03:23', '2025-12-12 07:03:23'),
(953, 'Revolving Wheel Rubber', 'SBICRM-100000953', '3\'\' x 1 1/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 07:03:49', '2025-12-12 07:03:49'),
(954, 'T-Square', 'SBICRM-100000954', '1 ft', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 07:04:08', '2025-12-12 07:04:08'),
(955, 'Tungston Rod', 'SBICRM-100000955', 'D 1.6mm x150', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 07:04:50', '2025-12-12 07:04:50'),
(956, 'Vaccum Bush', 'SBICRM-100000956', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:45:30', '2025-12-12 09:45:30'),
(957, 'Vessel Handel pipe', 'SBICRM-100000957', 'SS 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:46:16', '2025-12-12 09:46:16'),
(958, 'Vessel Handel pipe', 'SBICRM-100000958', 'SS 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:46:47', '2025-12-12 09:46:47'),
(959, 'Vessel Lock Bush', 'SBICRM-100000959', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:47:15', '2025-12-12 09:47:15'),
(960, 'Vessel Safety Valve', 'SBICRM-100000960', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:47:42', '2025-12-12 09:47:42'),
(961, 'Wall Clamp', 'SBICRM-100000961', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:48:26', '2025-12-12 09:48:26'),
(962, 'SS BUSH 1 \"', 'SBICRM-100000962', 'SS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:49:26', '2025-12-12 09:49:26'),
(963, 'MS Bend', 'SBICRM-100000963', 'mixed', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:49:47', '2025-12-12 09:49:47'),
(964, 'Weld Tee (OLD)', 'SBICRM-100000964', 'MS 3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:50:49', '2025-12-12 09:50:49'),
(965, 'MS Welding Electrode', 'SBICRM-100000965', '4mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:51:38', '2025-12-12 09:51:38'),
(966, 'MS Welding Electrode', 'SBICRM-100000966', '2.5mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:52:14', '2025-12-12 09:52:14'),
(967, 'MS Welding Electrode', 'SBICRM-100000967', '3.15mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:52:47', '2025-12-12 09:52:47'),
(968, 'SS Welding Electrode', 'SBICRM-100000968', '3.15mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:53:16', '2025-12-12 09:53:16'),
(969, 'SS Welding Electrode', 'SBICRM-100000969', '2.5mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:57:28', '2025-12-12 09:57:28'),
(970, 'Welding Glass', 'SBICRM-100000970', 'white', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:57:52', '2025-12-12 09:57:52'),
(971, 'Wet Grinder Wood Plate', 'SBICRM-100000971', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:58:29', '2025-12-12 09:58:29'),
(972, 'Wood Hammer', 'SBICRM-100000972', 'none', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:59:01', '2025-12-12 09:59:01'),
(973, 'Welding Glass', 'SBICRM-100000973', 'black', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:59:25', '2025-12-12 09:59:25'),
(974, 'SS Bolt', 'SBICRM-100000974', '5/16\"x1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 09:59:48', '2025-12-12 09:59:48'),
(975, 'SS Bolt', 'SBICRM-100000975', '5/16\"x2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:00:04', '2025-12-12 10:00:04'),
(976, 'SS Nut', 'SBICRM-100000976', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:00:33', '2025-12-12 10:00:33'),
(977, 'Burner Unit', 'SBICRM-100000977', 'G11', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:01:04', '2025-12-12 10:01:04'),
(978, 'BURNER UNIT', 'SBICRM-100000978', 'G10', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:01:27', '2025-12-12 10:01:27'),
(979, 'Burner Unit', 'SBICRM-100000979', 'G9', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:01:46', '2025-12-12 10:01:46'),
(980, 'BURNER UNIT', 'SBICRM-100000980', 'G8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:02:05', '2025-12-12 10:02:05'),
(981, 'Burner UNIT', 'SBICRM-100000981', 'T35', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:02:27', '2025-12-12 10:02:27'),
(982, 'Mango piece (Iddly) BRASS', 'SBICRM-100000982', 'BOLT', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:02:59', '2025-12-12 10:02:59'),
(983, 'SS BUSH 1 1/2\"', 'SBICRM-100000983', 'SS', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:03:23', '2025-12-12 10:03:23'),
(984, 'GI Bolt', 'SBICRM-100000984', '1/4\" x 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:03:48', '2025-12-12 10:03:48'),
(985, 'SS  Bend', 'SBICRM-100000985', '1 1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:04:12', '2025-12-12 10:04:13'),
(986, 'GI Nut', 'SBICRM-100000986', '3/8\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:04:35', '2025-12-12 10:04:35'),
(987, 'MS FILLER ROD', 'SBICRM-100000987', '2mm', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:05:07', '2025-12-12 10:05:07'),
(988, 'Dosa Burner', 'SBICRM-100000988', '1.5 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:05:28', '2025-12-12 10:05:28'),
(989, 'Dosa Burner CENTER COUPLING', 'SBICRM-100000989', '1 FEET', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:05:50', '2025-12-12 10:05:50'),
(990, 'Square Ring 4 Center Support', 'SBICRM-100000990', 'OD-17x17 :ID-13.5x13.5', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:07:24', '2025-12-12 10:07:24'),
(991, 'Square Ring 8 Center Support', 'SBICRM-100000991', 'OD-14X14: ID-10', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:07:56', '2025-12-12 10:07:56'),
(992, 'Round Ring 3 Supported', 'SBICRM-100000992', 'OD  17.5 ID 13.5', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:08:46', '2025-12-12 10:08:46'),
(993, 'SS Square Pipe 304 18G', 'SBICRM-100000993', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:10:14', '2025-12-12 10:10:14'),
(994, 'SS Square Pipe 304 18G', 'SBICRM-100000994', '3/4\"X3/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:10:35', '2025-12-12 10:10:35'),
(995, 'SS Round Pipe 304 18G', 'SBICRM-100000995', '1 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:10:59', '2025-12-12 10:10:59'),
(996, 'SS Square Pipe 304 18G', 'SBICRM-100000996', '2\"X2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:11:19', '2025-12-12 10:11:19'),
(997, 'SS Square Pipe 304 18G', 'SBICRM-100000997', '2\"X1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:11:40', '2025-12-12 10:11:40'),
(998, 'SS Round Rod', 'SBICRM-100000998', '10MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:12:02', '2025-12-12 10:12:02'),
(999, 'SS Round Rod', 'SBICRM-100000999', '5MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:12:36', '2025-12-12 10:12:36');
INSERT INTO `raw_materials` (`id`, `name`, `barcode`, `description`, `unit`, `category`, `minimumStock`, `currentStock`, `unitPrice`, `vendorId`, `status`, `createdAt`, `updatedAt`) VALUES
(1000, 'SS Square Pipe 304 18G', 'SBICRM-1000001000', '1/2\" x 1\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:12:59', '2025-12-12 10:12:59'),
(1001, 'Plywood', 'SBICRM-1000001001', '8MM, 8\'X4\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:13:33', '2025-12-12 10:13:33'),
(1002, 'Plywood', 'SBICRM-1000001002', '6mm , 8\'x4\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:14:06', '2025-12-12 10:14:06'),
(1003, 'SS Rectangle Pipe', 'SBICRM-1000001003', '4\'\' x 2\'\' 304 GR', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:15:39', '2025-12-12 10:15:39'),
(1004, 'SS square pipe 16swg', 'SBICRM-1000001004', '1\'\'  304gr', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:16:03', '2025-12-12 10:16:03'),
(1005, 'SS sheet', 'SBICRM-1000001005', '(8\' x 4\')202gr,mirror,20swg(1mm)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:16:27', '2025-12-12 10:16:27'),
(1006, 'SS angle', 'SBICRM-1000001006', '1\'\' x 1\'\'   304gr (25 x 25 x 3mm)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:17:14', '2025-12-12 10:17:14'),
(1007, 'SS angle', 'SBICRM-1000001007', '1\'\' x 1/4\'\'   304gr', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:17:47', '2025-12-12 10:17:47'),
(1008, 'SS angle', 'SBICRM-1000001008', '1 1/4\'\' x 1/4\'\'  304gr', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:18:23', '2025-12-12 10:18:23'),
(1009, 'Round ring 3 Supported', 'SBICRM-1000001009', '13 x 16', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:18:43', '2025-12-12 10:18:43'),
(1010, 'SS bend', 'SBICRM-1000001010', '1 1/4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:19:04', '2025-12-12 10:19:04'),
(1011, 'Steam weight (5kg)', 'SBICRM-1000001011', '5KG', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:19:27', '2025-12-12 10:19:27'),
(1012, 'HR PLATE', 'SBICRM-1000001012', '36 X 23 1/2 X20 MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:19:48', '2025-12-12 10:19:48'),
(1013, 'HR PLATE', 'SBICRM-1000001013', '35 X 19 1/2 X 8MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:20:08', '2025-12-12 10:20:08'),
(1014, 'HR PLATE', 'SBICRM-1000001014', '27 X 19 1/2 X 8MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:20:30', '2025-12-12 10:20:30'),
(1015, 'HR PLATE', 'SBICRM-1000001015', '4 X 2 1/2 X 20MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:20:50', '2025-12-12 10:20:50'),
(1016, 'MS L ANGLE', 'SBICRM-1000001016', '1 X 1/8', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:21:10', '2025-12-12 10:21:10'),
(1017, 'MS L ANGLE', 'SBICRM-1000001017', '1 1/4 X 1/4', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:21:33', '2025-12-12 10:21:33'),
(1018, 'MS  BAR', 'SBICRM-1000001018', '2\' X 10MM', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:21:54', '2025-12-12 10:21:54'),
(1019, 'MS  BAR', 'SBICRM-1000001019', '1 1/2\"X 1/4\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:22:19', '2025-12-12 10:22:19'),
(1020, 'MS SQUARE ROD', 'SBICRM-1000001020', '1/2\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:22:50', '2025-12-12 10:22:50'),
(1021, 'Telescopic', 'SBICRM-1000001021', '22\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:23:14', '2025-12-12 10:23:14'),
(1022, 'RN ACRYLIC SHEET', 'SBICRM-1000001022', 'RN-303 (8X2)', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:23:36', '2025-12-12 10:23:36'),
(1023, 'Acrylic solid surface sheet', 'SBICRM-1000001023', '6T-2 1/2X8X6MM / WHITE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:23:56', '2025-12-12 10:23:56'),
(1024, 'Acrylic solid surface sheet', 'SBICRM-1000001024', '6T-2 1/2X8X6MM / BROWN', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:24:17', '2025-12-12 10:24:17'),
(1025, 'Acrylic solid surface sheet', 'SBICRM-1000001025', '6T-2 1/2X8X6MM / YELLOW', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:24:37', '2025-12-12 10:24:37'),
(1026, 'Acrylic solid surface sheet', 'SBICRM-1000001026', '12-T (2 1/2X12X 12MM) / WHITE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:24:56', '2025-12-12 10:24:56'),
(1027, 'Acrylic solid surface sheet', 'SBICRM-1000001027', '12-T (2 1/2X12X 12MM) / BROWN', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:25:15', '2025-12-12 10:25:15'),
(1028, 'Acrylic solid surface sheet', 'SBICRM-1000001028', '12-T (2 1/2X12X 12MM) / YELLOW', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:25:39', '2025-12-12 10:25:39'),
(1029, 'MICA SHEET', 'SBICRM-1000001029', '8\'X4\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:26:01', '2025-12-12 10:26:01'),
(1030, 'FOAME SHEET', 'SBICRM-1000001030', '8\'X4\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:26:18', '2025-12-12 10:26:18'),
(1031, 'Welding Nozzle', 'SBICRM-1000001031', 'NO : 7', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:26:41', '2025-12-12 10:26:41'),
(1032, 'Hospital medicine trolley wheel - Revolving', 'SBICRM-1000001032', '4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:27:06', '2025-12-12 10:27:06'),
(1033, 'Hospital medicine trolley wheel - Break', 'SBICRM-1000001033', '4\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:27:23', '2025-12-12 10:27:23'),
(1034, 'Hospital medicine trolley wheel - Break', 'SBICRM-1000001034', '6\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:27:42', '2025-12-12 10:27:42'),
(1035, 'Trolly Wheel (Break)', 'SBICRM-1000001035', '8\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:27:59', '2025-12-12 10:27:59'),
(1036, 'Hospital medicine trolley wheel - Revolving', 'SBICRM-1000001036', '6\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:28:18', '2025-12-12 10:28:18'),
(1037, 'Vessel lock Tee', 'SBICRM-1000001037', 'NONE', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:28:37', '2025-12-12 10:28:37'),
(1038, 'SS Stool Top', 'SBICRM-1000001038', '11½\'\'', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:28:56', '2025-12-12 10:28:56'),
(1039, 'S.S PLAIN  Washer', 'SBICRM-1000001039', '1/2\"', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:29:17', '2025-12-12 10:29:17'),
(1040, 'ROSE GOLD SHEET', 'SBICRM-1000001040', '0.8MM (8\'X4\")', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:29:38', '2025-12-12 10:29:38'),
(1041, 'Tig welding torch cap', 'SBICRM-1000001041', 'SHORT', 'pieces', 'steel', '10', '15', '10', NULL, '1', '2025-12-12 10:29:58', '2025-12-12 10:29:58');

-- --------------------------------------------------------

--
-- Table structure for table `raw_materials_log`
--

CREATE TABLE `raw_materials_log` (
  `id` int(11) NOT NULL,
  `orderId` text DEFAULT NULL,
  `rawMaterial` text NOT NULL,
  `qty` text NOT NULL,
  `date` text NOT NULL,
  `type` text NOT NULL,
  `status` text NOT NULL,
  `createdAt` text NOT NULL,
  `updatedAt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `raw_materials_log`
--

INSERT INTO `raw_materials_log` (`id`, `orderId`, `rawMaterial`, `qty`, `date`, `type`, `status`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'TEST', '4', '2025-11-09 13:24:30', '0', '1', '2025-11-09 13:24:30', '2025-11-09 13:24:30'),
(2, NULL, 'TEST', '5', '2025-11-09 13:27:28', '0', '1', '2025-11-09 13:27:28', '2025-11-09 13:27:28'),
(3, '18', 'bolt', '5', '2025-11-09 13:39:36', '1', '1', '2025-11-09 13:39:36', '2025-11-09 13:39:36'),
(4, '18', 'TEST', '2', '2025-11-09 13:39:36', '1', '1', '2025-11-09 13:39:36', '2025-11-09 13:39:36'),
(7, '19', 'bolt', '7', '2025-11-11 11:34:29', '1', '1', '2025-11-11 11:34:29', '2025-11-11 11:34:29'),
(8, '19', 'TEST', '5', '2025-11-11 11:34:29', '1', '1', '2025-11-11 11:34:29', '2025-11-11 11:34:29'),
(13, NULL, 'Abro tape', '9', 'Invalid date', '0', '1', '2025-12-09 08:02:02', '2025-12-09 08:02:02'),
(14, NULL, 'Adjustable Revolving Bush', '15', 'Invalid date', '0', '1', '2025-12-11 04:36:44', '2025-12-11 04:36:44'),
(15, NULL, 'Adjustable Revolving Bush', '15', 'Invalid date', '0', '1', '2025-12-11 04:36:44', '2025-12-11 04:36:44'),
(16, NULL, 'All MS Reduce Bush', '15', 'Invalid date', '0', '1', '2025-12-11 04:38:05', '2025-12-11 04:38:05'),
(17, NULL, 'All SS Fittings TEE', '15', 'Invalid date', '0', '1', '2025-12-11 04:38:59', '2025-12-11 04:38:59'),
(18, NULL, 'B.H.E.L Stool Bush', '15', 'Invalid date', '0', '1', '2025-12-11 04:41:33', '2025-12-11 04:41:33'),
(19, NULL, 'Heater Box Villai', '15', 'Invalid date', '0', '1', '2025-12-11 04:42:33', '2025-12-11 04:42:33'),
(20, NULL, 'Ball Valve (Gun Metal)', '15', 'Invalid date', '0', '1', '2025-12-11 04:43:28', '2025-12-11 04:43:28'),
(21, NULL, 'Ball Valve (Racer)', '15', 'Invalid date', '0', '1', '2025-12-11 04:45:22', '2025-12-11 04:45:22'),
(22, NULL, 'Adjustable Revolving Bush', '0', '2025-12-11 04:56:05', '0', '1', '2025-12-11 04:56:05', '2025-12-11 04:56:05'),
(23, NULL, 'Ball Valve', '15', 'Invalid date', '0', '1', '2025-12-11 04:56:57', '2025-12-11 04:56:57'),
(24, NULL, ' Heater box villai', '15', 'Invalid date', '0', '1', '2025-12-11 06:31:20', '2025-12-11 06:31:20'),
(25, NULL, 'Adjustable Revolving  Bush', '15', 'Invalid date', '0', '1', '2025-12-11 06:38:04', '2025-12-11 06:38:04'),
(26, NULL, 'All MS Reduce Bush', '15', 'Invalid date', '0', '1', '2025-12-11 06:38:42', '2025-12-11 06:38:42'),
(27, NULL, 'All SS Fittings TEE', '15', 'Invalid date', '0', '1', '2025-12-11 06:39:16', '2025-12-11 06:39:16'),
(28, NULL, ' B.H.E.L Stool Bush ', '15', 'Invalid date', '0', '1', '2025-12-11 06:39:46', '2025-12-11 06:39:46'),
(29, NULL, 'Ball Valve (Gun Metal)', '14', 'Invalid date', '0', '1', '2025-12-11 06:40:24', '2025-12-11 06:40:24'),
(30, NULL, 'Ball Valve (Racer)', '15', 'Invalid date', '0', '1', '2025-12-11 06:41:00', '2025-12-11 06:41:00'),
(31, NULL, ' Ball Valve', '15', 'Invalid date', '0', '1', '2025-12-11 06:41:36', '2025-12-11 06:41:36'),
(32, NULL, 'Ball Valve (Racer)', '15', 'Invalid date', '0', '1', '2025-12-11 06:42:09', '2025-12-11 06:42:09'),
(33, NULL, ' Ball Valve  (Racer)', '15', 'Invalid date', '0', '1', '2025-12-11 06:42:44', '2025-12-11 06:42:44'),
(34, NULL, ' Ball Valve (Gun Metal)', '15', 'Invalid date', '0', '1', '2025-12-11 06:43:16', '2025-12-11 06:43:16'),
(35, NULL, ' Ball Valve (Racer)', '15', 'Invalid date', '0', '1', '2025-12-11 06:43:47', '2025-12-11 06:43:47'),
(36, NULL, 'Bend Meter', '15', 'Invalid date', '0', '1', '2025-12-11 06:44:23', '2025-12-11 06:44:23'),
(37, NULL, 'Boiler Safety Valve', '15', 'Invalid date', '0', '1', '2025-12-11 06:45:00', '2025-12-11 06:45:00'),
(38, NULL, 'Bolt Bush', '15', 'Invalid date', '0', '1', '2025-12-11 06:45:33', '2025-12-11 06:45:33'),
(39, NULL, 'Bolt Bush ', '15', 'Invalid date', '0', '1', '2025-12-11 06:46:06', '2025-12-11 06:46:06'),
(40, NULL, 'Bolt bush (Black)-Small', '15', 'Invalid date', '0', '1', '2025-12-11 06:46:38', '2025-12-11 06:46:38'),
(41, NULL, 'Bolt Bush Black', '15', 'Invalid date', '0', '1', '2025-12-11 06:47:08', '2025-12-11 06:47:08'),
(42, NULL, 'Bolt Bush white', '15', 'Invalid date', '0', '1', '2025-12-11 06:47:44', '2025-12-11 06:47:44'),
(43, NULL, 'Bolt Mixed', '15', 'Invalid date', '0', '1', '2025-12-11 06:48:10', '2025-12-11 06:48:10'),
(44, NULL, 'Bootan Nipple Washer', '15', 'Invalid date', '0', '1', '2025-12-11 07:00:35', '2025-12-11 07:00:35'),
(45, NULL, 'Bootan Nut OLD', '15', 'Invalid date', '0', '1', '2025-12-11 07:01:14', '2025-12-11 07:01:14'),
(46, NULL, ' Bootan Nut Rod', '15', 'Invalid date', '0', '1', '2025-12-11 07:01:55', '2025-12-11 07:01:55'),
(47, NULL, 'Bootan Villai', '15', 'Invalid date', '0', '1', '2025-12-11 07:02:32', '2025-12-11 07:02:32'),
(48, NULL, ' Brass Bootan Nut', '15', 'Invalid date', '0', '1', '2025-12-11 07:03:00', '2025-12-11 07:03:00'),
(49, NULL, ' Brass cone  (Iddly)', '15', 'Invalid date', '0', '1', '2025-12-11 07:03:38', '2025-12-11 07:03:38'),
(50, NULL, 'SS Nut (Iddly)', '15', 'Invalid date', '0', '1', '2025-12-11 07:04:30', '2025-12-11 07:04:30'),
(51, NULL, 'BURNER UNIT ONLY', '15', 'Invalid date', '0', '1', '2025-12-11 07:05:02', '2025-12-11 07:05:02'),
(52, NULL, 'BURNER HEAD ', '15', 'Invalid date', '0', '1', '2025-12-11 07:05:32', '2025-12-11 07:05:32'),
(53, NULL, 'Burner HEAD', '15', 'Invalid date', '0', '1', '2025-12-11 07:06:12', '2025-12-11 07:06:12'),
(54, NULL, 'Burner HEAD', '15', 'Invalid date', '0', '1', '2025-12-11 07:06:43', '2025-12-11 07:06:43'),
(55, NULL, 'Burner HEAD', '15', 'Invalid date', '0', '1', '2025-12-11 07:07:12', '2025-12-11 07:07:12'),
(56, NULL, 'Burner HEAD', '15', 'Invalid date', '0', '1', '2025-12-11 07:07:39', '2025-12-11 07:07:39'),
(57, NULL, 'Burner HEAD', '15', 'Invalid date', '0', '1', '2025-12-11 07:08:09', '2025-12-11 07:08:09'),
(58, NULL, 'Burner HEAD', '15', 'Invalid date', '0', '1', '2025-12-11 07:08:38', '2025-12-11 07:08:38'),
(59, NULL, 'Burner HEAD', '15', 'Invalid date', '0', '1', '2025-12-11 07:09:00', '2025-12-11 07:09:00'),
(60, NULL, 'Burner HEAD', '15', 'Invalid date', '0', '1', '2025-12-11 07:09:33', '2025-12-11 07:09:33'),
(61, NULL, 'Burner HEAD', '15', 'Invalid date', '0', '1', '2025-12-11 07:09:59', '2025-12-11 07:09:59'),
(62, NULL, 'Burner HEAD', '15', 'Invalid date', '0', '1', '2025-12-11 07:11:25', '2025-12-11 07:11:25'),
(63, NULL, 'SS Cutting Coupling ', '15', 'Invalid date', '0', '1', '2025-12-11 07:11:53', '2025-12-11 07:11:53'),
(64, NULL, 'Burner Washer', '15', 'Invalid date', '0', '1', '2025-12-11 07:12:33', '2025-12-11 07:12:33'),
(65, NULL, 'Burner Washer', '15', 'Invalid date', '0', '1', '2025-12-11 07:13:39', '2025-12-11 07:13:39'),
(66, NULL, 'Burner Washer', '15', 'Invalid date', '0', '1', '2025-12-11 07:14:15', '2025-12-11 07:14:15'),
(67, NULL, 'Burner Washer', '15', 'Invalid date', '0', '1', '2025-12-11 07:14:44', '2025-12-11 07:14:44'),
(68, NULL, 'Bullet screw', '15', 'Invalid date', '0', '1', '2025-12-11 07:16:51', '2025-12-11 07:16:51'),
(69, NULL, 'Canteen Burner', '15', 'Invalid date', '0', '1', '2025-12-11 07:17:40', '2025-12-11 07:17:40'),
(70, NULL, 'Chinese  Doom Round', '15', 'Invalid date', '0', '1', '2025-12-11 07:18:11', '2025-12-11 07:18:11'),
(71, NULL, 'Chinese  Doom Square', '15', 'Invalid date', '0', '1', '2025-12-11 07:18:45', '2025-12-11 07:18:45'),
(72, NULL, 'Chinese  Doom Square', '15', 'Invalid date', '0', '1', '2025-12-11 07:19:17', '2025-12-11 07:19:17'),
(73, NULL, 'Chair Leg Outer Bush ', '15', 'Invalid date', '0', '1', '2025-12-11 07:19:52', '2025-12-11 07:19:52'),
(74, NULL, 'Chicken Filter  Pan', '15', 'Invalid date', '0', '1', '2025-12-11 07:20:26', '2025-12-11 07:20:26'),
(75, NULL, 'Chinese  Doom Round', '15', 'Invalid date', '0', '1', '2025-12-11 07:20:56', '2025-12-11 07:20:56'),
(76, NULL, 'Cone Rubber', '15', 'Invalid date', '0', '1', '2025-12-11 07:21:24', '2025-12-11 07:21:24'),
(77, NULL, 'GN Pan', '15', 'Invalid date', '0', '1', '2025-12-11 07:21:52', '2025-12-11 07:21:52'),
(78, NULL, 'GN Pan', '15', 'Invalid date', '0', '1', '2025-12-11 07:22:42', '2025-12-11 07:22:42'),
(79, NULL, 'GN Lid', '15', 'Invalid date', '0', '1', '2025-12-11 07:23:36', '2025-12-11 07:23:36'),
(80, NULL, 'GN Lid', '15', 'Invalid date', '0', '1', '2025-12-11 07:24:22', '2025-12-11 07:24:22'),
(81, NULL, 'GN Pan', '15', 'Invalid date', '0', '1', '2025-12-11 07:24:53', '2025-12-11 07:24:53'),
(82, NULL, 'GN Lid', '15', 'Invalid date', '0', '1', '2025-12-11 07:25:21', '2025-12-11 07:25:21'),
(83, NULL, 'Copper Tube', '15', 'Invalid date', '0', '1', '2025-12-11 07:25:50', '2025-12-11 07:25:50'),
(84, NULL, 'Air Clamp', '15', 'Invalid date', '0', '1', '2025-12-11 07:26:20', '2025-12-11 07:26:20'),
(85, NULL, 'Copper Tube', '15', 'Invalid date', '0', '1', '2025-12-11 07:26:49', '2025-12-11 07:26:49'),
(86, NULL, 'Copper Tube', '15', 'Invalid date', '0', '1', '2025-12-11 07:27:16', '2025-12-11 07:27:16'),
(87, NULL, 'Copper Tube', '15', 'Invalid date', '0', '1', '2025-12-11 07:27:44', '2025-12-11 07:27:44'),
(88, NULL, 'Copper Tube', '15', 'Invalid date', '0', '1', '2025-12-11 07:28:08', '2025-12-11 07:28:08'),
(89, NULL, 'Cork', '15', 'Invalid date', '0', '1', '2025-12-11 07:30:30', '2025-12-11 07:30:30'),
(90, NULL, 'Domestic Burner', '15', 'Invalid date', '0', '1', '2025-12-11 07:30:54', '2025-12-11 07:30:54'),
(91, NULL, 'Dosa Burner', '15', 'Invalid date', '0', '1', '2025-12-11 07:31:26', '2025-12-11 07:31:26'),
(92, NULL, 'Dosa Burner', '15', 'Invalid date', '0', '1', '2025-12-11 07:31:55', '2025-12-11 07:31:55'),
(93, NULL, 'Dosa Burner', '15', 'Invalid date', '0', '1', '2025-12-11 07:32:33', '2025-12-11 07:32:33'),
(94, NULL, 'Dosa Burner', '15', 'Invalid date', '0', '1', '2025-12-11 07:33:03', '2025-12-11 07:33:03'),
(95, NULL, 'Dosai Burner', '15', 'Invalid date', '0', '1', '2025-12-11 07:33:48', '2025-12-11 07:33:48'),
(96, NULL, 'SS Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 07:34:14', '2025-12-11 07:34:14'),
(97, NULL, 'Dummy Bootan Rod', '15', 'Invalid date', '0', '1', '2025-12-11 07:35:20', '2025-12-11 07:35:20'),
(98, NULL, 'Dummy Bush', '15', 'Invalid date', '0', '1', '2025-12-11 07:36:17', '2025-12-11 07:36:17'),
(99, NULL, 'PILOT BURNER', '15', 'Invalid date', '0', '1', '2025-12-11 07:36:55', '2025-12-11 07:36:55'),
(100, NULL, 'Dummy Nut Brass', '15', 'Invalid date', '0', '1', '2025-12-11 07:37:32', '2025-12-11 07:37:32'),
(101, NULL, 'Fire Bar', '15', 'Invalid date', '0', '1', '2025-12-11 07:38:00', '2025-12-11 07:38:00'),
(102, NULL, 'Fire Bar', '15', 'Invalid date', '0', '1', '2025-12-11 07:38:38', '2025-12-11 07:38:38'),
(103, NULL, 'FLANGE WASHER (RUBBER)', '15', 'Invalid date', '0', '1', '2025-12-11 07:39:09', '2025-12-11 07:39:09'),
(104, NULL, 'DUMMY WASHER (RUBBER)', '15', 'Invalid date', '0', '1', '2025-12-11 07:39:43', '2025-12-11 07:39:43'),
(105, NULL, 'GI BOLT', '15', 'Invalid date', '0', '1', '2025-12-11 07:40:12', '2025-12-11 07:40:12'),
(106, NULL, ' Float Ball Brass valve', '15', 'Invalid date', '0', '1', '2025-12-11 07:40:40', '2025-12-11 07:40:40'),
(107, NULL, 'HEATER BOX VILLAI ', '15', 'Invalid date', '0', '1', '2025-12-11 07:41:21', '2025-12-11 07:41:21'),
(108, NULL, 'DBC HOSE ', '15', 'Invalid date', '0', '1', '2025-12-11 07:41:45', '2025-12-11 07:41:45'),
(109, NULL, 'G.I MIXED FITTINGS', '15', 'Invalid date', '0', '1', '2025-12-11 07:42:15', '2025-12-11 07:42:15'),
(110, NULL, 'SS BEND ', '15', 'Invalid date', '0', '1', '2025-12-11 07:42:46', '2025-12-11 07:42:46'),
(111, NULL, 'G.I \'U\'-Clamp', '15', 'Invalid date', '0', '1', '2025-12-11 07:43:15', '2025-12-11 07:43:15'),
(112, NULL, 'G.I \'U\'-Clamp', '15', 'Invalid date', '0', '1', '2025-12-11 07:43:45', '2025-12-11 07:43:45'),
(113, NULL, 'G.I \'U\'-Clamp', '15', 'Invalid date', '0', '1', '2025-12-11 07:44:08', '2025-12-11 07:44:08'),
(114, NULL, 'G.& M.SI Union BOLT & NUT Mixed', '15', 'Invalid date', '0', '1', '2025-12-11 07:44:42', '2025-12-11 07:44:42'),
(115, NULL, 'Gas Clamp', '15', 'Invalid date', '0', '1', '2025-12-11 07:45:13', '2025-12-11 07:45:13'),
(116, NULL, 'Gas Clamp', '15', 'Invalid date', '0', '1', '2025-12-11 07:45:38', '2025-12-11 07:45:38'),
(117, NULL, 'GI BOLT', '15', 'Invalid date', '0', '1', '2025-12-11 07:46:08', '2025-12-11 07:46:08'),
(118, NULL, 'Gas Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 07:46:35', '2025-12-11 07:46:35'),
(119, NULL, 'Gas Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 07:47:09', '2025-12-11 07:47:09'),
(120, NULL, 'Gas NRV', '15', 'Invalid date', '0', '1', '2025-12-11 07:47:34', '2025-12-11 07:47:34'),
(121, NULL, 'Gate Valve (Wheel) [OLD]', '15', 'Invalid date', '0', '1', '2025-12-11 07:48:05', '2025-12-11 07:48:05'),
(122, NULL, 'Gate Valve (Wheel)[OLD]', '15', 'Invalid date', '0', '1', '2025-12-11 07:48:32', '2025-12-11 07:48:32'),
(123, NULL, 'Gauge class Set', '15', 'Invalid date', '0', '1', '2025-12-11 07:48:58', '2025-12-11 07:48:58'),
(124, NULL, 'Gauge Glass tube', '15', 'Invalid date', '0', '1', '2025-12-11 07:49:29', '2025-12-11 07:49:29'),
(125, NULL, 'Gauge Glass tube', '15', 'Invalid date', '0', '1', '2025-12-11 07:49:50', '2025-12-11 07:49:50'),
(126, NULL, 'Gauge Glass tube', '15', 'Invalid date', '0', '1', '2025-12-11 07:50:23', '2025-12-11 07:50:23'),
(127, NULL, 'Gauge Glass tube', '15', 'Invalid date', '0', '1', '2025-12-11 07:50:49', '2025-12-11 07:50:49'),
(128, NULL, 'Gauge Glass tube', '15', 'Invalid date', '0', '1', '2025-12-11 07:51:10', '2025-12-11 07:51:10'),
(129, NULL, 'Gauge guard  ', '15', 'Invalid date', '0', '1', '2025-12-11 07:51:47', '2025-12-11 07:51:47'),
(130, NULL, 'Gauge guard  ', '15', 'Invalid date', '0', '1', '2025-12-11 07:52:16', '2025-12-11 07:52:16'),
(131, NULL, 'GI Bolt ', '15', 'Invalid date', '0', '1', '2025-12-11 07:53:42', '2025-12-11 07:53:42'),
(132, NULL, 'GI Bend', '15', 'Invalid date', '0', '1', '2025-12-11 07:54:10', '2025-12-11 07:54:10'),
(133, NULL, 'GI Bend', '15', 'Invalid date', '0', '1', '2025-12-11 07:54:44', '2025-12-11 07:54:44'),
(134, NULL, 'GI Bend', '15', 'Invalid date', '0', '1', '2025-12-11 07:55:10', '2025-12-11 07:55:10'),
(135, NULL, 'GI Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 07:55:37', '2025-12-11 07:55:37'),
(136, NULL, 'GI Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 07:56:04', '2025-12-11 07:56:04'),
(137, NULL, 'GI Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 07:56:33', '2025-12-11 07:56:33'),
(138, NULL, 'GI Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 07:56:56', '2025-12-11 07:56:56'),
(139, NULL, 'GI Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 07:57:29', '2025-12-11 07:57:29'),
(140, NULL, 'GI Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 07:58:05', '2025-12-11 07:58:05'),
(141, NULL, 'GI Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 07:58:41', '2025-12-11 07:58:41'),
(142, NULL, 'GI Nut', '15', 'Invalid date', '0', '1', '2025-12-11 07:59:22', '2025-12-11 07:59:22'),
(143, NULL, 'GI Nut', '15', 'Invalid date', '0', '1', '2025-12-11 07:59:55', '2025-12-11 07:59:55'),
(144, NULL, 'GI Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:00:47', '2025-12-11 08:00:47'),
(145, NULL, 'GI Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:01:35', '2025-12-11 08:01:35'),
(146, NULL, 'GI Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:02:07', '2025-12-11 08:02:07'),
(147, NULL, 'GI Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:02:45', '2025-12-11 08:02:45'),
(148, NULL, 'GI Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:03:08', '2025-12-11 08:03:08'),
(149, NULL, 'GI Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:03:37', '2025-12-11 08:03:37'),
(150, NULL, 'GI Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:04:03', '2025-12-11 08:04:03'),
(151, NULL, 'GI Reducer Elbow', '15', 'Invalid date', '0', '1', '2025-12-11 08:04:46', '2025-12-11 08:04:46'),
(152, NULL, 'MS Rivets', '15', 'Invalid date', '0', '1', '2025-12-11 08:05:14', '2025-12-11 08:05:14'),
(153, NULL, 'GI Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:05:42', '2025-12-11 08:05:42'),
(154, NULL, 'H Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:06:13', '2025-12-11 08:06:13'),
(155, NULL, 'H Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:07:14', '2025-12-11 08:07:14'),
(156, NULL, 'H Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 08:07:48', '2025-12-11 08:07:48'),
(157, NULL, ' Handle knob (Iddly)', '15', 'Invalid date', '0', '1', '2025-12-11 08:37:52', '2025-12-11 08:37:52'),
(158, NULL, 'Handle Rod (Iddly)', '15', 'Invalid date', '0', '1', '2025-12-11 08:38:26', '2025-12-11 08:38:26'),
(159, NULL, 'Handrail Cup Round', '15', 'Invalid date', '0', '1', '2025-12-11 08:39:47', '2025-12-11 08:39:47'),
(160, NULL, 'Handrail Cup Round', '15', 'Invalid date', '0', '1', '2025-12-11 08:40:16', '2025-12-11 08:40:16'),
(161, NULL, 'Handrail Cup Round', '15', 'Invalid date', '0', '1', '2025-12-11 08:40:50', '2025-12-11 08:40:50'),
(162, NULL, 'Handrail Cup Round', '15', 'Invalid date', '0', '1', '2025-12-11 08:41:11', '2025-12-11 08:41:11'),
(163, NULL, 'Handrail Cup Square', '15', 'Invalid date', '0', '1', '2025-12-11 08:41:44', '2025-12-11 08:41:44'),
(164, NULL, 'Handrail Cup Square', '15', 'Invalid date', '0', '1', '2025-12-11 08:42:10', '2025-12-11 08:42:10'),
(165, NULL, 'Handrill Materials', '15', 'Invalid date', '0', '1', '2025-12-11 08:42:38', '2025-12-11 08:42:38'),
(166, NULL, 'Handrill Work Ball', '15', 'Invalid date', '0', '1', '2025-12-11 08:43:10', '2025-12-11 08:43:10'),
(167, NULL, 'Grinding Disc (Green)', '15', 'Invalid date', '0', '1', '2025-12-11 08:43:53', '2025-12-11 08:43:53'),
(168, NULL, 'Hinges ', '15', 'Invalid date', '0', '1', '2025-12-11 08:44:26', '2025-12-11 08:44:26'),
(169, NULL, 'Hinges ', '15', 'Invalid date', '0', '1', '2025-12-11 08:44:50', '2025-12-11 08:44:50'),
(170, NULL, 'Hinges ms', '15', 'Invalid date', '0', '1', '2025-12-11 08:45:21', '2025-12-11 08:45:21'),
(171, NULL, 'GI BOLT', '15', 'Invalid date', '0', '1', '2025-12-11 08:46:01', '2025-12-11 08:46:01'),
(172, NULL, 'Hot Case Container ( 21\" X 13\" 6\")', '15', 'Invalid date', '0', '1', '2025-12-11 08:46:59', '2025-12-11 08:46:59'),
(173, NULL, 'Hot Case Container ( 21\" X 13\" 6\")', '15', 'Invalid date', '0', '1', '2025-12-11 08:47:39', '2025-12-11 08:47:39'),
(174, NULL, 'Hot Case Container ( 21\" X 13\"X 2\") ', '15', 'Invalid date', '0', '1', '2025-12-11 08:48:11', '2025-12-11 08:48:11'),
(175, NULL, 'Hot Case Container ( 21\" X 13\"X 4\")', '15', 'Invalid date', '0', '1', '2025-12-11 08:48:46', '2025-12-11 08:48:46'),
(176, NULL, 'Hot Case Container (12 3/4\"x10 \"x8\")', '15', 'Invalid date', '0', '1', '2025-12-11 08:49:19', '2025-12-11 08:49:19'),
(177, NULL, 'Hot Case Container (13\" X 10 1/2\"X 4\")', '15', 'Invalid date', '0', '1', '2025-12-11 08:49:55', '2025-12-11 08:49:55'),
(178, NULL, 'Hot Case Container (13\"x10 1/2\"x6\")', '15', 'Invalid date', '0', '1', '2025-12-11 08:50:31', '2025-12-11 08:50:31'),
(179, NULL, 'Hot Case knob', '15', 'Invalid date', '0', '1', '2025-12-11 08:50:53', '2025-12-11 08:50:53'),
(180, NULL, 'Iddly Gasket', '15', 'Invalid date', '0', '1', '2025-12-11 08:51:40', '2025-12-11 08:51:40'),
(181, NULL, ' Jacket Bootan', '15', 'Invalid date', '0', '1', '2025-12-11 08:52:04', '2025-12-11 08:52:04'),
(182, NULL, 'SS BEND 1 1/2\" ', '15', 'Invalid date', '0', '1', '2025-12-11 08:52:32', '2025-12-11 08:52:32'),
(183, NULL, 'Lid Rubber', '15', 'Invalid date', '0', '1', '2025-12-11 08:52:58', '2025-12-11 08:52:58'),
(184, NULL, ' Lid Rubber', '15', 'Invalid date', '0', '1', '2025-12-11 08:53:30', '2025-12-11 08:53:30'),
(185, NULL, 'Love Joint Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 08:53:58', '2025-12-11 08:53:58'),
(186, NULL, 'LPG Adopter [OLD]', '15', 'Invalid date', '0', '1', '2025-12-11 08:54:25', '2025-12-11 08:54:25'),
(187, NULL, 'LPG Adopter ', '15', 'Invalid date', '0', '1', '2025-12-11 08:54:53', '2025-12-11 08:54:53'),
(188, NULL, 'LPG adopter (Govt)', '15', 'Invalid date', '0', '1', '2025-12-11 08:55:27', '2025-12-11 08:55:27'),
(189, NULL, 'LPG Hose', '15', 'Invalid date', '0', '1', '2025-12-11 08:56:49', '2025-12-11 08:56:49'),
(190, NULL, 'LPG Hose', '15', 'Invalid date', '0', '1', '2025-12-11 08:57:21', '2025-12-11 08:57:21'),
(191, NULL, 'LPG Hose', '15', 'Invalid date', '0', '1', '2025-12-11 08:57:48', '2025-12-11 08:57:48'),
(192, NULL, 'LPG Hose', '15', 'Invalid date', '0', '1', '2025-12-11 08:58:22', '2025-12-11 08:58:22'),
(193, NULL, 'LPG Hose', '15', 'Invalid date', '0', '1', '2025-12-11 08:59:06', '2025-12-11 08:59:06'),
(194, NULL, 'LPG Hose', '15', 'Invalid date', '0', '1', '2025-12-11 08:59:37', '2025-12-11 08:59:37'),
(195, NULL, 'Main Cork Valve (Iddly)', '15', 'Invalid date', '0', '1', '2025-12-11 09:00:13', '2025-12-11 09:00:13'),
(196, NULL, 'Mango piece (Iddly)', '15', 'Invalid date', '0', '1', '2025-12-11 09:00:35', '2025-12-11 09:00:35'),
(197, NULL, 'Masala Container(13\"x7\"x6\")', '15', 'Invalid date', '0', '1', '2025-12-11 09:01:18', '2025-12-11 09:01:18'),
(198, NULL, 'Masala Container(13\"x7\"x6\")', '15', 'Invalid date', '0', '1', '2025-12-11 09:03:34', '2025-12-11 09:03:34'),
(199, NULL, 'Masala Container(7\" x 4 1/2\")', '15', 'Invalid date', '0', '1', '2025-12-11 09:03:57', '2025-12-11 09:03:57'),
(200, NULL, ' Masala Container(7\" x 6 1/2\" x 5 1/2\"H)', '15', 'Invalid date', '0', '1', '2025-12-11 09:04:22', '2025-12-11 09:04:22'),
(201, NULL, ' Masala Container(7\" x 6 1/2\")', '15', 'Invalid date', '0', '1', '2025-12-11 09:04:47', '2025-12-11 09:04:47'),
(202, NULL, 'Masala sampattam', '15', 'Invalid date', '0', '1', '2025-12-11 09:05:15', '2025-12-11 09:05:15'),
(203, NULL, 'Mini Iddly Tray ', '15', 'Invalid date', '0', '1', '2025-12-11 09:05:40', '2025-12-11 09:05:40'),
(204, NULL, 'Mini Iddly Tray ', '15', 'Invalid date', '0', '1', '2025-12-11 09:06:05', '2025-12-11 09:06:05'),
(205, NULL, 'Mini Iddly Tray ', '15', 'Invalid date', '0', '1', '2025-12-11 09:06:20', '2025-12-11 09:06:20'),
(206, NULL, ' Mini Iddly Tray ', '15', 'Invalid date', '0', '1', '2025-12-11 09:06:43', '2025-12-11 09:06:43'),
(207, NULL, ' Mixed Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 09:07:03', '2025-12-11 09:07:03'),
(208, NULL, ' Mixed Pipe\'s', '15', 'Invalid date', '0', '1', '2025-12-11 09:07:23', '2025-12-11 09:07:23'),
(209, NULL, ' Mixed Screws', '15', 'Invalid date', '0', '1', '2025-12-11 09:07:41', '2025-12-11 09:07:41'),
(210, NULL, 'SS dummy', '15', 'Invalid date', '0', '1', '2025-12-11 09:08:08', '2025-12-11 09:08:08'),
(211, NULL, 'SS dummy', '15', 'Invalid date', '0', '1', '2025-12-11 09:08:28', '2025-12-11 09:08:28'),
(212, NULL, ' MS Angle', '15', 'Invalid date', '0', '1', '2025-12-11 09:08:51', '2025-12-11 09:08:51'),
(213, NULL, 'MS Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 09:09:16', '2025-12-11 09:09:16'),
(214, NULL, 'MS Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 09:09:35', '2025-12-11 09:09:35'),
(215, NULL, 'MS Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 09:09:57', '2025-12-11 09:09:57'),
(216, NULL, 'MS Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 09:10:25', '2025-12-11 09:10:25'),
(217, NULL, ' MS Elbow', '15', 'Invalid date', '0', '1', '2025-12-11 09:10:53', '2025-12-11 09:10:53'),
(218, NULL, ' MS Elbow', '15', 'Invalid date', '0', '1', '2025-12-11 09:11:19', '2025-12-11 09:11:19'),
(219, NULL, ' MS Elbow', '15', 'Invalid date', '0', '1', '2025-12-11 09:12:12', '2025-12-11 09:12:12'),
(220, NULL, ' MS Elbow', '15', 'Invalid date', '0', '1', '2025-12-11 09:12:23', '2025-12-11 09:12:23'),
(221, NULL, 'MS Flange', '15', 'Invalid date', '0', '1', '2025-12-11 09:12:48', '2025-12-11 09:12:48'),
(222, NULL, 'MS Flange', '15', 'Invalid date', '0', '1', '2025-12-11 09:13:26', '2025-12-11 09:13:26'),
(223, NULL, 'MS Pipe nipple', '15', 'Invalid date', '0', '1', '2025-12-11 09:13:49', '2025-12-11 09:13:49'),
(224, NULL, ' TEA STALL BURNER  WITH COPPER TUBE', '15', 'Invalid date', '0', '1', '2025-12-11 09:14:09', '2025-12-11 09:14:09'),
(225, NULL, ' SS BEND 2\"', '15', 'Invalid date', '0', '1', '2025-12-11 09:14:33', '2025-12-11 09:14:33'),
(226, NULL, 'MS Pipe Nipple MIXED ', '15', 'Invalid date', '0', '1', '2025-12-11 09:14:55', '2025-12-11 09:14:55'),
(227, NULL, 'SS BEND 1 \"', '15', 'Invalid date', '0', '1', '2025-12-11 09:15:18', '2025-12-11 09:15:18'),
(228, NULL, 'MS Plug', '15', 'Invalid date', '0', '1', '2025-12-11 09:15:41', '2025-12-11 09:15:41'),
(229, NULL, ' MS Plug', '15', 'Invalid date', '0', '1', '2025-12-11 09:16:00', '2025-12-11 09:16:00'),
(230, NULL, 'MS Plug', '15', 'Invalid date', '0', '1', '2025-12-11 09:16:26', '2025-12-11 09:16:26'),
(231, NULL, 'MS Plug', '15', 'Invalid date', '0', '1', '2025-12-11 09:17:08', '2025-12-11 09:17:08'),
(232, NULL, 'MS Plug', '15', 'Invalid date', '0', '1', '2025-12-11 09:17:34', '2025-12-11 09:17:34'),
(233, NULL, 'MS Plug', '15', 'Invalid date', '0', '1', '2025-12-11 09:17:58', '2025-12-11 09:17:58'),
(234, NULL, 'MS Reducer Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 09:18:22', '2025-12-11 09:18:22'),
(235, NULL, 'MS Reducer Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 09:18:43', '2025-12-11 09:18:43'),
(236, NULL, 'MS Reducer Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 09:19:09', '2025-12-11 09:19:09'),
(237, NULL, 'MS Reducer Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 09:19:34', '2025-12-11 09:19:34'),
(238, NULL, 'MS Rivets', '15', 'Invalid date', '0', '1', '2025-12-11 09:20:01', '2025-12-11 09:20:01'),
(239, NULL, 'MS Rivets Washer', '15', 'Invalid date', '0', '1', '2025-12-11 09:20:21', '2025-12-11 09:20:21'),
(240, NULL, 'MS Rivets', '15', 'Invalid date', '0', '1', '2025-12-11 09:20:55', '2025-12-11 09:20:55'),
(241, NULL, 'MS Rivets', '15', 'Invalid date', '0', '1', '2025-12-11 09:21:21', '2025-12-11 09:21:21'),
(242, NULL, 'MS Rivets', '15', 'Invalid date', '0', '1', '2025-12-11 09:21:37', '2025-12-11 09:21:37'),
(243, NULL, ' MS Screw', '15', 'Invalid date', '0', '1', '2025-12-11 09:21:59', '2025-12-11 09:21:59'),
(244, NULL, ' MS Sheet', '15', 'Invalid date', '0', '1', '2025-12-11 09:22:19', '2025-12-11 09:22:19'),
(245, NULL, ' MS Sheet', '15', 'Invalid date', '0', '1', '2025-12-11 09:22:44', '2025-12-11 09:22:44'),
(246, NULL, ' MS Sheet', '15', 'Invalid date', '0', '1', '2025-12-11 09:23:04', '2025-12-11 09:23:04'),
(247, NULL, 'MS Tee', '15', 'Invalid date', '0', '1', '2025-12-11 09:23:26', '2025-12-11 09:23:26'),
(248, NULL, 'MS TEE', '15', 'Invalid date', '0', '1', '2025-12-11 09:23:48', '2025-12-11 09:23:48'),
(249, NULL, ' MS Tee', '15', 'Invalid date', '0', '1', '2025-12-11 09:24:14', '2025-12-11 09:24:14'),
(250, NULL, ' MS Tee', '15', 'Invalid date', '0', '1', '2025-12-11 09:25:11', '2025-12-11 09:25:11'),
(251, NULL, 'MS Union', '15', 'Invalid date', '0', '1', '2025-12-11 09:25:34', '2025-12-11 09:25:34'),
(252, NULL, 'thread ball', '15', 'Invalid date', '0', '1', '2025-12-11 09:25:53', '2025-12-11 09:25:53'),
(253, NULL, 'MS Union', '15', 'Invalid date', '0', '1', '2025-12-11 09:26:14', '2025-12-11 09:26:14'),
(254, NULL, 'MS Weld Bend', '15', 'Invalid date', '0', '1', '2025-12-11 09:26:35', '2025-12-11 09:26:35'),
(255, NULL, 'NC Valve', '15', 'Invalid date', '0', '1', '2025-12-11 09:26:53', '2025-12-11 09:26:53'),
(256, NULL, 'NC Valve', '15', 'Invalid date', '0', '1', '2025-12-11 09:27:07', '2025-12-11 09:27:07'),
(257, NULL, 'NC Valve', '15', 'Invalid date', '0', '1', '2025-12-11 09:27:25', '2025-12-11 09:27:25'),
(258, NULL, 'NC Valve', '15', 'Invalid date', '0', '1', '2025-12-11 09:27:50', '2025-12-11 09:27:50'),
(259, NULL, 'NC Valve OLD', '15', 'Invalid date', '0', '1', '2025-12-11 09:28:08', '2025-12-11 09:28:08'),
(260, NULL, 'Name Plate (Rectangle)', '15', 'Invalid date', '0', '1', '2025-12-11 09:28:32', '2025-12-11 09:28:32'),
(261, NULL, 'SS DRAINAGE PLATE', '15', 'Invalid date', '0', '1', '2025-12-11 09:30:26', '2025-12-11 09:30:26'),
(262, NULL, 'Needle  Valve Racer', '15', 'Invalid date', '0', '1', '2025-12-11 09:30:54', '2025-12-11 09:30:54'),
(263, NULL, 'NO:13 Lid', '15', 'Invalid date', '0', '1', '2025-12-11 09:31:16', '2025-12-11 09:31:16'),
(264, NULL, 'NO:17 Lid', '15', 'Invalid date', '0', '1', '2025-12-11 09:31:35', '2025-12-11 09:31:35'),
(265, NULL, 'NO:18 Lid', '15', 'Invalid date', '0', '1', '2025-12-11 09:31:56', '2025-12-11 09:31:56'),
(266, NULL, 'NO:19 Lid', '15', 'Invalid date', '0', '1', '2025-12-11 09:32:15', '2025-12-11 09:32:15'),
(267, NULL, ' Normal Iddly Tray ', '15', 'Invalid date', '0', '1', '2025-12-11 09:32:39', '2025-12-11 09:32:39'),
(268, NULL, 'Normal Iddly Tray', '15', 'Invalid date', '0', '1', '2025-12-11 09:33:01', '2025-12-11 09:33:01'),
(269, NULL, 'Normal Iddly Tray', '15', 'Invalid date', '0', '1', '2025-12-11 09:33:32', '2025-12-11 09:33:32'),
(270, NULL, 'NRV', '15', 'Invalid date', '0', '1', '2025-12-11 09:34:33', '2025-12-11 09:34:33'),
(271, NULL, ' NRV ', '15', 'Invalid date', '0', '1', '2025-12-11 09:34:54', '2025-12-11 09:34:54'),
(272, NULL, ' NRV Brass Nut Type', '15', 'Invalid date', '0', '1', '2025-12-11 09:35:16', '2025-12-11 09:35:16'),
(273, NULL, 'Oil Pressre Guage', '15', 'Invalid date', '0', '1', '2025-12-11 09:35:37', '2025-12-11 09:35:37'),
(274, NULL, 'Hinges ms', '15', 'Invalid date', '0', '1', '2025-12-11 09:35:57', '2025-12-11 09:35:57'),
(275, NULL, 'SHOWER HINGES', '15', 'Invalid date', '0', '1', '2025-12-11 09:36:19', '2025-12-11 09:36:19'),
(276, NULL, 'Hinges SS', '15', 'Invalid date', '0', '1', '2025-12-11 09:36:41', '2025-12-11 09:36:41'),
(277, NULL, 'BURNER UNIT', '15', 'Invalid date', '0', '1', '2025-12-11 09:37:07', '2025-12-11 09:37:07'),
(278, NULL, 'Pressure Gauge meter (berrow)', '15', 'Invalid date', '0', '1', '2025-12-11 09:37:40', '2025-12-11 09:37:40'),
(279, NULL, 'MS Reducer Tee  ', '15', 'Invalid date', '0', '1', '2025-12-11 09:38:05', '2025-12-11 09:38:05'),
(280, NULL, 'M.S BUSH ', '15', 'Invalid date', '0', '1', '2025-12-11 09:38:29', '2025-12-11 09:38:29'),
(281, NULL, 'Revolving  Bush  (Revolving Table)', '15', 'Invalid date', '0', '1', '2025-12-11 09:38:55', '2025-12-11 09:38:55'),
(282, NULL, 'Rice Bootan', '15', 'Invalid date', '0', '1', '2025-12-11 09:39:29', '2025-12-11 09:39:29'),
(283, NULL, ' Rope ASPETAS', '15', 'Invalid date', '0', '1', '2025-12-11 09:39:53', '2025-12-11 09:39:53'),
(284, NULL, 'Round  Container', '15', 'Invalid date', '0', '1', '2025-12-11 09:40:20', '2025-12-11 09:40:20'),
(285, NULL, 'Round 3 Support', '15', 'Invalid date', '0', '1', '2025-12-11 09:40:54', '2025-12-11 09:40:54'),
(286, NULL, 'Round 3 Support', '15', 'Invalid date', '0', '1', '2025-12-11 09:41:14', '2025-12-11 09:41:14'),
(287, NULL, ' Round 3 Support', '15', 'Invalid date', '0', '1', '2025-12-11 09:41:41', '2025-12-11 09:41:41'),
(288, NULL, ' Round 3 Support', '15', 'Invalid date', '0', '1', '2025-12-11 09:42:02', '2025-12-11 09:42:02'),
(289, NULL, 'Round 3 Support', '15', 'Invalid date', '0', '1', '2025-12-11 09:42:29', '2025-12-11 09:42:29'),
(290, NULL, 'Round 3 Support', '15', 'Invalid date', '0', '1', '2025-12-11 09:42:48', '2025-12-11 09:42:48'),
(291, NULL, 'Round 4 Support', '15', 'Invalid date', '0', '1', '2025-12-11 09:43:11', '2025-12-11 09:43:11'),
(292, NULL, 'Round 4 Support', '15', 'Invalid date', '0', '1', '2025-12-11 09:43:36', '2025-12-11 09:43:36'),
(293, NULL, 'Round Adjustable Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:44:04', '2025-12-11 09:44:04'),
(294, NULL, 'Round Adjustable Bush ', '15', 'Invalid date', '0', '1', '2025-12-11 09:44:28', '2025-12-11 09:44:28'),
(295, NULL, 'Round Adjustable Bush  U Type', '15', 'Invalid date', '0', '1', '2025-12-11 09:44:51', '2025-12-11 09:44:51'),
(296, NULL, 'Round Adjustable Bush ', '15', 'Invalid date', '0', '1', '2025-12-11 09:45:11', '2025-12-11 09:45:11'),
(297, NULL, 'Round Bottom Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:45:33', '2025-12-11 09:45:33'),
(298, NULL, 'Round Bottom Bush ', '15', 'Invalid date', '0', '1', '2025-12-11 09:45:57', '2025-12-11 09:45:57'),
(299, NULL, 'Round Bottom Bush Hole Type', '15', 'Invalid date', '0', '1', '2025-12-11 09:46:20', '2025-12-11 09:46:20'),
(300, NULL, 'Round Bottom Bush \'U\' Type', '15', 'Invalid date', '0', '1', '2025-12-11 09:46:45', '2025-12-11 09:46:45'),
(301, NULL, 'Round Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:47:08', '2025-12-11 09:47:08'),
(302, NULL, 'Round Container', '15', 'Invalid date', '0', '1', '2025-12-11 09:47:30', '2025-12-11 09:47:30'),
(303, NULL, 'Round Ring 3 Supported', '15', 'Invalid date', '0', '1', '2025-12-11 09:48:20', '2025-12-11 09:48:20'),
(304, NULL, 'Round Sticker', '15', 'Invalid date', '0', '1', '2025-12-11 09:48:43', '2025-12-11 09:48:43'),
(305, NULL, ' SS Screw ', '15', 'Invalid date', '0', '1', '2025-12-11 09:49:03', '2025-12-11 09:49:03'),
(306, NULL, 'M.SWASHER  Mixed', '15', 'Invalid date', '0', '1', '2025-12-11 09:49:24', '2025-12-11 09:49:24'),
(307, NULL, 'Silver Coated Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:49:46', '2025-12-11 09:49:46'),
(308, NULL, 'Silver Coated Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:50:14', '2025-12-11 09:50:14'),
(309, NULL, 'Silver Coated Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:50:37', '2025-12-11 09:50:37'),
(310, NULL, 'Silver Coated Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:51:05', '2025-12-11 09:51:05'),
(311, NULL, 'Silver Coated Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:51:23', '2025-12-11 09:51:23'),
(312, NULL, 'Silver Coated Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:51:51', '2025-12-11 09:51:51'),
(313, NULL, ' Silver Sampattam', '15', 'Invalid date', '0', '1', '2025-12-11 09:52:11', '2025-12-11 09:52:11'),
(314, NULL, ' WIRE SLEEVE', '15', 'Invalid date', '0', '1', '2025-12-11 09:52:57', '2025-12-11 09:52:57'),
(315, NULL, ' WIRE SLEEVE', '15', 'Invalid date', '0', '1', '2025-12-11 09:53:19', '2025-12-11 09:53:19'),
(316, NULL, 'Spring Washer (Iddly)', '15', 'Invalid date', '0', '1', '2025-12-11 09:53:43', '2025-12-11 09:53:43'),
(317, NULL, ' Square Adjustable Bush ', '15', 'Invalid date', '0', '1', '2025-12-11 09:54:04', '2025-12-11 09:54:04'),
(318, NULL, ' Square Adjustable Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:54:27', '2025-12-11 09:54:27'),
(319, NULL, 'Square Adjustable Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:54:49', '2025-12-11 09:54:49'),
(320, NULL, 'Square bottom bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:55:09', '2025-12-11 09:55:09'),
(321, NULL, 'Square bottom bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:55:34', '2025-12-11 09:55:34'),
(322, NULL, 'Square Bottom Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:55:57', '2025-12-11 09:55:57'),
(323, NULL, 'Square Bottom Bush', '15', 'Invalid date', '0', '1', '2025-12-11 09:56:16', '2025-12-11 09:56:16'),
(324, NULL, 'Square bottom Bush Black', '15', 'Invalid date', '0', '1', '2025-12-11 09:56:51', '2025-12-11 09:56:51'),
(325, NULL, 'Square Container', '15', 'Invalid date', '0', '1', '2025-12-11 09:57:17', '2025-12-11 09:57:17'),
(326, NULL, ' Square Flower Ring 8 Center Support   ', '15', 'Invalid date', '0', '1', '2025-12-11 09:57:38', '2025-12-11 09:57:38'),
(327, NULL, 'Square Ring 4 Center Support ', '15', 'Invalid date', '0', '1', '2025-12-11 09:58:00', '2025-12-11 09:58:00'),
(328, NULL, 'Square Ring 4 Center Support ', '15', 'Invalid date', '0', '1', '2025-12-11 09:58:15', '2025-12-11 09:58:15'),
(329, NULL, 'Square Ring 4 Corner Support ', '15', 'Invalid date', '0', '1', '2025-12-11 09:58:37', '2025-12-11 09:58:37'),
(330, NULL, 'Square Ring 8 Corner Support ', '15', 'Invalid date', '0', '1', '2025-12-11 09:59:07', '2025-12-11 09:59:07'),
(331, NULL, 'Square Ring 8 Corner Support ', '15', 'Invalid date', '0', '1', '2025-12-11 09:59:25', '2025-12-11 09:59:25'),
(332, NULL, ' Square Ring 8 Center Support  ', '15', 'Invalid date', '0', '1', '2025-12-11 09:59:54', '2025-12-11 09:59:54'),
(333, NULL, ' Square Ring 8 Center Support  ', '15', 'Invalid date', '0', '1', '2025-12-11 10:00:16', '2025-12-11 10:00:16'),
(334, NULL, 'SS BEND', '15', 'Invalid date', '0', '1', '2025-12-11 10:01:11', '2025-12-11 10:01:11'),
(335, NULL, 'SS Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 10:01:33', '2025-12-11 10:01:33'),
(336, NULL, 'SS Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 10:02:07', '2025-12-11 10:02:07'),
(337, NULL, 'SS Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 10:02:26', '2025-12-11 10:02:26'),
(338, NULL, 'SS Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 10:02:50', '2025-12-11 10:02:50'),
(339, NULL, 'SS BOLT', '15', 'Invalid date', '0', '1', '2025-12-11 10:03:11', '2025-12-11 10:03:11'),
(340, NULL, 'GI WASHER', '15', 'Invalid date', '0', '1', '2025-12-11 10:03:34', '2025-12-11 10:03:34'),
(341, NULL, ' SS SCREW', '15', 'Invalid date', '0', '1', '2025-12-11 10:04:02', '2025-12-11 10:04:02'),
(342, NULL, 'SS SCREW', '15', 'Invalid date', '0', '1', '2025-12-11 10:04:48', '2025-12-11 10:04:48'),
(343, NULL, 'SS SCREW', '15', 'Invalid date', '0', '1', '2025-12-11 10:06:27', '2025-12-11 10:06:27'),
(344, NULL, 'SS SCREW', '15', 'Invalid date', '0', '1', '2025-12-11 10:06:50', '2025-12-11 10:06:50'),
(345, NULL, 'SS SCREW', '15', 'Invalid date', '0', '1', '2025-12-11 10:07:13', '2025-12-11 10:07:13'),
(346, NULL, 'SS Bootan Rod Bits', '15', 'Invalid date', '0', '1', '2025-12-11 10:07:37', '2025-12-11 10:07:37'),
(347, NULL, ' SS Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 10:07:57', '2025-12-11 10:07:57'),
(348, NULL, ' SS Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 10:08:15', '2025-12-11 10:08:15'),
(349, NULL, ' SS Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 10:08:41', '2025-12-11 10:08:41'),
(350, NULL, ' SS Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 10:09:01', '2025-12-11 10:09:01'),
(351, NULL, ' SS Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 10:09:28', '2025-12-11 10:09:28'),
(352, NULL, ' SS Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 10:09:51', '2025-12-11 10:09:51'),
(353, NULL, 'SS Flange', '15', 'Invalid date', '0', '1', '2025-12-11 10:10:13', '2025-12-11 10:10:13'),
(354, NULL, 'SS Guage Class set ', '15', 'Invalid date', '0', '1', '2025-12-11 10:10:43', '2025-12-11 10:10:43'),
(355, NULL, 'SS Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 10:11:03', '2025-12-11 10:11:03'),
(356, NULL, 'GI Nut', '15', 'Invalid date', '0', '1', '2025-12-11 10:11:22', '2025-12-11 10:11:22'),
(357, NULL, 'SS Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 10:11:47', '2025-12-11 10:11:47'),
(358, NULL, 'Hinges SS', '15', 'Invalid date', '0', '1', '2025-12-11 10:12:34', '2025-12-11 10:12:34'),
(359, NULL, ' SS Nut', '15', 'Invalid date', '0', '1', '2025-12-11 10:13:15', '2025-12-11 10:13:15'),
(360, NULL, ' Stool Leg Bush(Round)', '15', 'Invalid date', '0', '1', '2025-12-11 10:13:52', '2025-12-11 10:13:52'),
(361, NULL, 'SS Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 10:14:15', '2025-12-11 10:14:15'),
(362, NULL, 'SS Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 10:14:32', '2025-12-11 10:14:32'),
(363, NULL, 'SS Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 10:15:16', '2025-12-11 10:15:16'),
(364, NULL, 'SS Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 10:15:41', '2025-12-11 10:15:41'),
(365, NULL, 'SS Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 10:15:59', '2025-12-11 10:15:59'),
(366, NULL, ' SS Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 10:16:30', '2025-12-11 10:16:30'),
(367, NULL, ' SS PLATE', '15', 'Invalid date', '0', '1', '2025-12-11 10:16:49', '2025-12-11 10:16:49'),
(368, NULL, ' SS PLATE', '15', 'Invalid date', '0', '1', '2025-12-11 10:17:04', '2025-12-11 10:17:04'),
(369, NULL, 'SS PLATE', '15', 'Invalid date', '0', '1', '2025-12-11 10:17:30', '2025-12-11 10:17:30'),
(370, NULL, ' SS Round Plate', '15', 'Invalid date', '0', '1', '2025-12-11 10:17:53', '2025-12-11 10:17:53'),
(371, NULL, 'SS Round Villai Plate', '15', 'Invalid date', '0', '1', '2025-12-11 10:18:31', '2025-12-11 10:18:31'),
(372, NULL, 'ROTAR PIT', '15', 'Invalid date', '0', '1', '2025-12-11 10:18:50', '2025-12-11 10:18:50'),
(373, NULL, 'ROTAR PIT', '15', 'Invalid date', '0', '1', '2025-12-11 10:19:11', '2025-12-11 10:19:11'),
(374, NULL, 'TIG SPARES CABLE SET', '15', 'Invalid date', '0', '1', '2025-12-11 10:19:34', '2025-12-11 10:19:34'),
(375, NULL, ' Fly Rail double run', '15', 'Invalid date', '0', '1', '2025-12-11 10:20:44', '2025-12-11 10:20:44'),
(376, NULL, 'Washer - COLLER', '15', 'Invalid date', '0', '1', '2025-12-11 10:21:04', '2025-12-11 10:21:04'),
(377, NULL, 'Plain washer', '15', 'Invalid date', '0', '1', '2025-12-11 10:21:23', '2025-12-11 10:21:23'),
(378, NULL, ' Plain Washer  ', '15', 'Invalid date', '0', '1', '2025-12-11 10:21:42', '2025-12-11 10:21:42'),
(379, NULL, 'Ball Valve', '15', 'Invalid date', '0', '1', '2025-12-11 10:22:06', '2025-12-11 10:22:06'),
(380, NULL, ' Silicon gel ', '15', 'Invalid date', '0', '1', '2025-12-11 10:22:25', '2025-12-11 10:22:25'),
(381, NULL, ' Carbon brush ', '15', 'Invalid date', '0', '1', '2025-12-11 10:22:49', '2025-12-11 10:22:49'),
(382, NULL, ' Carbon brush ', '15', 'Invalid date', '0', '1', '2025-12-11 10:22:49', '2025-12-11 10:22:49'),
(383, NULL, 'Jaquar  pipe', '15', 'Invalid date', '0', '1', '2025-12-11 10:23:29', '2025-12-11 10:23:29'),
(384, NULL, 'Tig  spares', '15', 'Invalid date', '0', '1', '2025-12-11 10:23:54', '2025-12-11 10:23:54'),
(385, NULL, 'Tig spares', '15', 'Invalid date', '0', '1', '2025-12-11 10:24:14', '2025-12-11 10:24:14'),
(386, NULL, 'Tig  spares', '15', 'Invalid date', '0', '1', '2025-12-11 10:24:36', '2025-12-11 10:24:36'),
(387, NULL, ' Tower Bolt SS', '15', 'Invalid date', '0', '1', '2025-12-11 10:24:58', '2025-12-11 10:24:58'),
(388, NULL, 'CUTTING HINGES', '15', 'Invalid date', '0', '1', '2025-12-11 10:25:20', '2025-12-11 10:25:20'),
(389, NULL, ' CUTTING HINGES', '15', 'Invalid date', '0', '1', '2025-12-11 10:25:55', '2025-12-11 10:25:55'),
(390, NULL, 'Drawer Hinges ', '15', 'Invalid date', '0', '1', '2025-12-11 10:26:26', '2025-12-11 10:26:26'),
(391, NULL, 'Drawer Hinges ', '15', 'Invalid date', '0', '1', '2025-12-11 10:26:49', '2025-12-11 10:26:49'),
(392, NULL, ' Drawer Hinges ', '15', 'Invalid date', '0', '1', '2025-12-11 10:27:13', '2025-12-11 10:27:13'),
(393, NULL, 'Drawer Hinges MS', '15', 'Invalid date', '0', '1', '2025-12-11 10:27:35', '2025-12-11 10:27:35'),
(394, NULL, 'rivets plier ', '15', 'Invalid date', '0', '1', '2025-12-11 10:27:55', '2025-12-11 10:27:55'),
(395, NULL, 'SS SCREW', '15', 'Invalid date', '0', '1', '2025-12-11 10:28:15', '2025-12-11 10:28:15'),
(396, NULL, ' SS Screw', '15', 'Invalid date', '0', '1', '2025-12-11 10:28:36', '2025-12-11 10:28:36'),
(397, NULL, ' SS  Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 10:28:58', '2025-12-11 10:28:58'),
(398, NULL, ' SS Nut', '15', 'Invalid date', '0', '1', '2025-12-11 10:29:21', '2025-12-11 10:29:22'),
(399, NULL, ' Fire Door Bush', '15', 'Invalid date', '0', '1', '2025-12-11 10:29:43', '2025-12-11 10:29:43'),
(400, NULL, 'MS Hook', '15', 'Invalid date', '0', '1', '2025-12-11 10:30:01', '2025-12-11 10:30:01'),
(401, NULL, 'Glass door runner ', '15', 'Invalid date', '0', '1', '2025-12-11 10:30:19', '2025-12-11 10:30:19'),
(402, NULL, 'Door Magnet', '15', 'Invalid date', '0', '1', '2025-12-11 10:30:39', '2025-12-11 10:30:39'),
(403, NULL, 'SS Tap', '15', 'Invalid date', '0', '1', '2025-12-11 10:31:09', '2025-12-11 10:31:09'),
(404, NULL, 'SS TAP CUP', '15', 'Invalid date', '0', '1', '2025-12-11 10:31:34', '2025-12-11 10:31:34'),
(405, NULL, 'SS Tap', '15', 'Invalid date', '0', '1', '2025-12-11 10:32:06', '2025-12-11 10:32:06'),
(406, NULL, 'SS Door Pat Lock', '15', 'Invalid date', '0', '1', '2025-12-11 10:32:31', '2025-12-11 10:32:31'),
(407, NULL, 'SS Handle', '15', 'Invalid date', '0', '1', '2025-12-11 10:33:04', '2025-12-11 10:33:04'),
(408, NULL, 'Tea boiler tap', '15', 'Invalid date', '0', '1', '2025-12-11 10:33:27', '2025-12-11 10:33:27'),
(409, NULL, 'Tea boiler cup', '15', 'Invalid date', '0', '1', '2025-12-11 10:33:47', '2025-12-11 10:33:47'),
(410, NULL, 'SS Nut', '15', 'Invalid date', '0', '1', '2025-12-11 10:34:09', '2025-12-11 10:34:09'),
(411, NULL, 'Rivet Rod SS', '15', 'Invalid date', '0', '1', '2025-12-11 10:34:32', '2025-12-11 10:34:32'),
(412, NULL, 'SS hook', '15', 'Invalid date', '0', '1', '2025-12-11 10:34:51', '2025-12-11 10:34:51'),
(413, NULL, 'Car Dickey shock absorber', '15', 'Invalid date', '0', '1', '2025-12-11 10:35:15', '2025-12-11 10:35:15'),
(414, NULL, ' Tea boiler tap', '15', 'Invalid date', '0', '1', '2025-12-11 10:35:49', '2025-12-11 10:35:49'),
(415, NULL, 'SS Cutting Coupling', '15', 'Invalid date', '0', '1', '2025-12-11 10:36:13', '2025-12-11 10:36:13'),
(416, NULL, 'SS pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 10:36:36', '2025-12-11 10:36:36'),
(417, NULL, 'H nipple SS', '15', 'Invalid date', '0', '1', '2025-12-11 10:37:02', '2025-12-11 10:37:02'),
(418, NULL, 'LED channel ', '15', 'Invalid date', '0', '1', '2025-12-11 10:37:26', '2025-12-11 10:37:26'),
(419, NULL, 'LED channel - DOUBLE LIGHT', '15', 'Invalid date', '0', '1', '2025-12-11 10:37:48', '2025-12-11 10:37:48'),
(420, NULL, 'Warm white LED Tube Light', '15', 'Invalid date', '0', '1', '2025-12-11 10:38:09', '2025-12-11 10:38:09'),
(421, NULL, ' LED STRIP CONNECTOR', '15', 'Invalid date', '0', '1', '2025-12-11 10:38:40', '2025-12-11 10:38:40'),
(422, NULL, ' LED STRIP CONNECTOR', '15', 'Invalid date', '0', '1', '2025-12-11 10:39:05', '2025-12-11 10:39:05'),
(423, NULL, ' SS bolt', '15', 'Invalid date', '0', '1', '2025-12-11 10:39:25', '2025-12-11 10:39:25'),
(424, NULL, 'REXNORD FAN', '15', 'Invalid date', '0', '1', '2025-12-11 10:39:49', '2025-12-11 10:39:49'),
(425, NULL, 'REXNORD FAN', '15', 'Invalid date', '0', '1', '2025-12-11 10:40:07', '2025-12-11 10:40:07'),
(426, NULL, ' REXNORD FAN', '15', 'Invalid date', '0', '1', '2025-12-11 10:40:38', '2025-12-11 10:40:38'),
(427, NULL, 'PAKING PAD WITH NUT', '15', 'Invalid date', '0', '1', '2025-12-11 10:40:59', '2025-12-11 10:40:59'),
(428, NULL, ' Red oxdide', '15', 'Invalid date', '0', '1', '2025-12-11 10:41:17', '2025-12-11 10:41:17'),
(429, NULL, 'Tower Plate no-25 + nob', '15', 'Invalid date', '0', '1', '2025-12-11 10:41:41', '2025-12-11 10:41:41'),
(430, NULL, 'SS hand drill cup ', '15', 'Invalid date', '0', '1', '2025-12-11 10:42:04', '2025-12-11 10:42:04'),
(431, NULL, 'SS push&pull tap', '15', 'Invalid date', '0', '1', '2025-12-11 10:42:24', '2025-12-11 10:42:24'),
(432, NULL, 'SS h nipple', '15', 'Invalid date', '0', '1', '2025-12-11 10:42:52', '2025-12-11 10:42:52'),
(433, NULL, 'Dosa Burner CENTER COUPLING ', '15', 'Invalid date', '0', '1', '2025-12-11 10:43:11', '2025-12-11 10:43:11'),
(434, NULL, 'Square Ring 4 Center Support  ', '15', 'Invalid date', '0', '1', '2025-12-11 10:43:33', '2025-12-11 10:43:33'),
(435, NULL, 'GN pan', '15', 'Invalid date', '0', '1', '2025-12-11 10:43:54', '2025-12-11 10:43:54'),
(436, NULL, 'GN pan', '15', 'Invalid date', '0', '1', '2025-12-11 10:44:12', '2025-12-11 10:44:12'),
(437, NULL, 'GN Lid', '15', 'Invalid date', '0', '1', '2025-12-11 10:44:34', '2025-12-11 10:44:34'),
(438, NULL, 'CONTROL CONTACTOR-L&T', '15', 'Invalid date', '0', '1', '2025-12-11 10:44:57', '2025-12-11 10:44:57'),
(439, NULL, 'CONTROL CONTACTOR-DIXELL', '15', 'Invalid date', '0', '1', '2025-12-11 10:45:19', '2025-12-11 10:45:19'),
(440, NULL, 'Air clamp', '15', 'Invalid date', '0', '1', '2025-12-11 10:45:44', '2025-12-11 10:45:44'),
(441, NULL, 'LED ADOPTOR - DRIVER', '15', 'Invalid date', '0', '1', '2025-12-11 10:46:24', '2025-12-11 10:46:24'),
(442, NULL, 'WIRE TAG', '15', 'Invalid date', '0', '1', '2025-12-11 10:47:02', '2025-12-11 10:47:02'),
(443, NULL, 'WIRE TAG', '15', 'Invalid date', '0', '1', '2025-12-11 10:47:31', '2025-12-11 10:47:31'),
(444, NULL, 'WIRE TAG', '15', 'Invalid date', '0', '1', '2025-12-11 10:48:00', '2025-12-11 10:48:00'),
(445, NULL, 'WIRE GLANT', '15', 'Invalid date', '0', '1', '2025-12-11 10:48:37', '2025-12-11 10:48:37'),
(446, NULL, 'BULP LIGHT-GN PAN TOP', '15', 'Invalid date', '0', '1', '2025-12-11 10:49:06', '2025-12-11 10:49:06'),
(447, NULL, 'WIRE LEG ', '15', 'Invalid date', '0', '1', '2025-12-11 10:49:35', '2025-12-11 10:49:35'),
(448, NULL, 'WIRE LEG ', '15', 'Invalid date', '0', '1', '2025-12-11 10:49:59', '2025-12-11 10:49:59'),
(449, NULL, 'LED ADOPTOR - DRIVER', '15', 'Invalid date', '0', '1', '2025-12-11 10:50:24', '2025-12-11 10:50:24'),
(450, NULL, 'LED ADOPTOR - DRIVER', '15', 'Invalid date', '0', '1', '2025-12-11 10:51:43', '2025-12-11 10:51:43'),
(451, NULL, 'LED ADOPTOR - DRIVER', '15', 'Invalid date', '0', '1', '2025-12-11 10:52:51', '2025-12-11 10:52:51'),
(452, NULL, 'CSK SS screw', '15', 'Invalid date', '0', '1', '2025-12-11 10:53:55', '2025-12-11 10:53:55'),
(453, NULL, 'CSK SS screw', '15', 'Invalid date', '0', '1', '2025-12-11 10:54:23', '2025-12-11 10:54:23'),
(454, NULL, 'SS Handle', '15', 'Invalid date', '0', '1', '2025-12-11 10:54:53', '2025-12-11 10:54:53'),
(455, NULL, 'Allen screw', '15', 'Invalid date', '0', '1', '2025-12-11 10:55:20', '2025-12-11 10:55:20'),
(456, NULL, 'Allen screw capwasher nut', '15', 'Invalid date', '0', '1', '2025-12-11 10:55:49', '2025-12-11 10:55:49'),
(457, NULL, 'Allen screw', '15', 'Invalid date', '0', '1', '2025-12-11 10:56:19', '2025-12-11 10:56:19'),
(458, NULL, 'Allen screw', '15', 'Invalid date', '0', '1', '2025-12-11 10:56:47', '2025-12-11 10:56:47'),
(459, NULL, 'SS gauge glass set', '15', 'Invalid date', '0', '1', '2025-12-11 10:59:43', '2025-12-11 10:59:43'),
(460, NULL, 'SS  Pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 11:00:10', '2025-12-11 11:00:10'),
(461, NULL, 'Plain washer brass ', '15', 'Invalid date', '0', '1', '2025-12-11 11:00:47', '2025-12-11 11:00:47'),
(462, NULL, 'Welding holder', '15', 'Invalid date', '0', '1', '2025-12-11 11:01:20', '2025-12-11 11:01:20'),
(463, NULL, 'Square ring 8 centre support', '15', 'Invalid date', '0', '1', '2025-12-11 11:03:01', '2025-12-11 11:03:01'),
(464, NULL, 'Square ring 4 centre support', '15', 'Invalid date', '0', '1', '2025-12-11 11:03:26', '2025-12-11 11:03:26'),
(465, NULL, ' Round ring 3 Supported', '15', 'Invalid date', '0', '1', '2025-12-11 11:03:55', '2025-12-11 11:03:55'),
(466, NULL, 'Round ring 3 Supported', '15', 'Invalid date', '0', '1', '2025-12-11 11:04:24', '2025-12-11 11:04:24'),
(467, NULL, 'Dosa Burner unit', '15', 'Invalid date', '0', '1', '2025-12-11 11:04:55', '2025-12-11 11:04:55'),
(468, NULL, 'Gi Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 11:05:22', '2025-12-11 11:05:22'),
(469, NULL, 'NC valve (black handle)', '15', 'Invalid date', '0', '1', '2025-12-11 13:24:01', '2025-12-11 13:24:01'),
(470, NULL, 'SS door handle', '15', 'Invalid date', '0', '1', '2025-12-11 13:24:26', '2025-12-11 13:24:26');
INSERT INTO `raw_materials_log` (`id`, `orderId`, `rawMaterial`, `qty`, `date`, `type`, `status`, `createdAt`, `updatedAt`) VALUES
(471, NULL, 'Round ring 3 Supported', '15', 'Invalid date', '0', '1', '2025-12-11 13:24:56', '2025-12-11 13:24:56'),
(472, NULL, ' Telescopic', '15', 'Invalid date', '0', '1', '2025-12-11 13:25:17', '2025-12-11 13:25:17'),
(473, NULL, 'Square lock', '15', 'Invalid date', '0', '1', '2025-12-11 13:25:47', '2025-12-11 13:25:47'),
(474, NULL, 'Square lock', '15', 'Invalid date', '0', '1', '2025-12-11 13:32:56', '2025-12-11 13:32:56'),
(475, NULL, 'Square lock', '15', 'Invalid date', '0', '1', '2025-12-11 13:33:31', '2025-12-11 13:33:31'),
(476, NULL, 'Telescopic', '15', 'Invalid date', '0', '1', '2025-12-11 13:34:12', '2025-12-11 13:34:12'),
(477, NULL, 'Telescopic', '15', 'Invalid date', '0', '1', '2025-12-11 13:34:32', '2025-12-11 13:34:32'),
(478, NULL, 'SS door tappa', '15', 'Invalid date', '0', '1', '2025-12-11 13:34:51', '2025-12-11 13:34:51'),
(479, NULL, 'SS Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 13:35:34', '2025-12-11 13:35:34'),
(480, NULL, 'MS Flange', '15', 'Invalid date', '0', '1', '2025-12-11 13:35:53', '2025-12-11 13:35:53'),
(481, NULL, 'Gauge class Set [OLD]', '15', 'Invalid date', '0', '1', '2025-12-11 13:36:16', '2025-12-11 13:36:16'),
(482, NULL, 'Bootan Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 13:36:35', '2025-12-11 13:36:35'),
(483, NULL, 'Bootan Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 13:36:53', '2025-12-11 13:36:53'),
(484, NULL, 'CURVO LOCK', '15', 'Invalid date', '0', '1', '2025-12-11 13:37:12', '2025-12-11 13:37:12'),
(485, NULL, 'DOSA BURNER ONLY', '15', 'Invalid date', '0', '1', '2025-12-11 13:37:30', '2025-12-11 13:37:30'),
(486, NULL, 'DOSA BURNER ONLY', '15', 'Invalid date', '0', '1', '2025-12-11 13:37:49', '2025-12-11 13:37:49'),
(487, NULL, 'KORIEN RING BURNER', '15', 'Invalid date', '0', '1', '2025-12-11 13:38:10', '2025-12-11 13:38:10'),
(488, NULL, 'KORIEN RING BURNER', '15', 'Invalid date', '0', '1', '2025-12-11 13:38:32', '2025-12-11 13:38:32'),
(489, NULL, 'KORIEN RING BURNER', '15', 'Invalid date', '0', '1', '2025-12-11 13:38:54', '2025-12-11 13:38:54'),
(490, NULL, 'INFRA RED RADI. BURNER', '15', 'Invalid date', '0', '1', '2025-12-11 13:39:17', '2025-12-11 13:39:17'),
(491, NULL, 'BURNER', '15', 'Invalid date', '0', '1', '2025-12-11 13:39:37', '2025-12-11 13:39:37'),
(492, NULL, 'HEATER', '15', 'Invalid date', '0', '1', '2025-12-11 13:39:56', '2025-12-11 13:39:56'),
(493, NULL, 'HEATER', '15', 'Invalid date', '0', '1', '2025-12-11 13:40:15', '2025-12-11 13:40:15'),
(494, NULL, 'HEATER', '15', 'Invalid date', '0', '1', '2025-12-11 13:40:34', '2025-12-11 13:40:34'),
(495, NULL, 'HEATER', '15', 'Invalid date', '0', '1', '2025-12-11 13:40:52', '2025-12-11 13:40:52'),
(496, NULL, 'HEATER', '15', 'Invalid date', '0', '1', '2025-12-11 13:41:11', '2025-12-11 13:41:11'),
(497, NULL, 'HEATER', '15', 'Invalid date', '0', '1', '2025-12-11 13:41:49', '2025-12-11 13:41:49'),
(498, NULL, 'HEATER SWITCH CONTROL BOX', '15', 'Invalid date', '0', '1', '2025-12-11 13:42:23', '2025-12-11 13:42:23'),
(499, NULL, 'HEATER SWITCH CONTROL BOX', '15', 'Invalid date', '0', '1', '2025-12-11 13:42:43', '2025-12-11 13:42:43'),
(500, NULL, 'HEATER SWITCH CONTROL BOX', '15', 'Invalid date', '0', '1', '2025-12-11 13:43:06', '2025-12-11 13:43:06'),
(501, NULL, 'ELECTRONIC HEATER PANEL', '15', 'Invalid date', '0', '1', '2025-12-11 13:44:49', '2025-12-11 13:44:49'),
(502, NULL, 'HEATER SWITCH CONTROL BOX', '15', 'Invalid date', '0', '1', '2025-12-11 13:45:14', '2025-12-11 13:45:14'),
(503, NULL, 'GRATINGS', '15', 'Invalid date', '0', '1', '2025-12-11 13:46:07', '2025-12-11 13:46:07'),
(504, NULL, 'GRATINGS', '15', 'Invalid date', '0', '1', '2025-12-11 13:46:27', '2025-12-11 13:46:27'),
(505, NULL, 'GRATINGS', '15', 'Invalid date', '0', '1', '2025-12-11 13:46:51', '2025-12-11 13:46:51'),
(506, NULL, 'GAS COMPRESSOR', '15', 'Invalid date', '0', '1', '2025-12-11 13:47:12', '2025-12-11 13:47:12'),
(507, NULL, 'GAS COMPRESSOR', '15', 'Invalid date', '0', '1', '2025-12-11 13:47:35', '2025-12-11 13:47:35'),
(508, NULL, 'GAS COMPRESSOR', '15', 'Invalid date', '0', '1', '2025-12-11 13:47:53', '2025-12-11 13:47:53'),
(509, NULL, 'CONDENSSOR COIL', '15', 'Invalid date', '0', '1', '2025-12-11 13:48:12', '2025-12-11 13:48:12'),
(510, NULL, 'CONDENSSOR COIL', '15', 'Invalid date', '0', '1', '2025-12-11 13:48:32', '2025-12-11 13:48:32'),
(511, NULL, 'CONDENSSOR COIL', '15', 'Invalid date', '0', '1', '2025-12-11 13:48:49', '2025-12-11 13:48:49'),
(512, NULL, 'PIN VALVE', '15', 'Invalid date', '0', '1', '2025-12-11 13:49:13', '2025-12-11 13:49:13'),
(513, NULL, 'BUTANE GAS', '15', 'Invalid date', '0', '1', '2025-12-11 13:49:36', '2025-12-11 13:49:36'),
(514, NULL, 'DRY ALL FILTER DRIER', '15', 'Invalid date', '0', '1', '2025-12-11 13:49:56', '2025-12-11 13:49:56'),
(515, NULL, 'Floron propel butane gas', '15', 'Invalid date', '0', '1', '2025-12-11 13:50:17', '2025-12-11 13:50:17'),
(516, NULL, 'METCAP- CAPILLARY', '15', 'Invalid date', '0', '1', '2025-12-11 13:50:39', '2025-12-11 13:50:39'),
(517, NULL, 'WELDING ROD', '15', 'Invalid date', '0', '1', '2025-12-11 13:51:00', '2025-12-11 13:51:00'),
(518, NULL, 'COOLING COIL', '15', 'Invalid date', '0', '1', '2025-12-11 13:51:19', '2025-12-11 13:51:19'),
(519, NULL, 'COOLING COIL', '15', 'Invalid date', '0', '1', '2025-12-11 13:51:38', '2025-12-11 13:51:38'),
(520, NULL, 'COOLING COIL', '15', 'Invalid date', '0', '1', '2025-12-11 13:52:02', '2025-12-11 13:52:02'),
(521, NULL, 'COPPER PIPE', '15', 'Invalid date', '0', '1', '2025-12-11 13:52:27', '2025-12-11 13:52:27'),
(522, NULL, 'COPPER PIPE', '15', 'Invalid date', '0', '1', '2025-12-11 13:52:49', '2025-12-11 13:52:49'),
(523, NULL, 'COPPER PIPE', '15', 'Invalid date', '0', '1', '2025-12-11 13:53:09', '2025-12-11 13:53:09'),
(524, NULL, 'INSULATING GLASS DOUBLE LAYER', '15', 'Invalid date', '0', '1', '2025-12-11 13:53:28', '2025-12-11 13:53:28'),
(525, NULL, 'INSULATING GLASS DOUBLE LAYER', '15', 'Invalid date', '0', '1', '2025-12-11 13:53:49', '2025-12-11 13:53:49'),
(526, NULL, 'TOUGHENED FLAT GLASS PI NO: PY2425101', '15', 'Invalid date', '0', '1', '2025-12-11 13:54:08', '2025-12-11 13:54:08'),
(527, NULL, 'TOUGHENED FLAT GLASS PI NO: PY2425101', '15', 'Invalid date', '0', '1', '2025-12-11 13:54:38', '2025-12-11 13:54:38'),
(528, NULL, 'TOUGHENED FLAT GLASS PI NO: PY2425101', '15', 'Invalid date', '0', '1', '2025-12-11 13:54:58', '2025-12-11 13:54:58'),
(529, NULL, 'WINDOWS TWO TRACK SLINDING', '15', 'Invalid date', '0', '1', '2025-12-11 13:55:30', '2025-12-11 13:55:30'),
(530, NULL, 'WINDOWS TWO TRACK SLINDING', '15', 'Invalid date', '0', '1', '2025-12-11 13:55:50', '2025-12-11 13:55:50'),
(531, NULL, 'WINDOWS TWO TRACK SLINDING', '15', 'Invalid date', '0', '1', '2025-12-11 13:56:12', '2025-12-11 13:56:12'),
(532, NULL, 'WINDOWS SINGLE OPEN', '15', 'Invalid date', '0', '1', '2025-12-11 13:56:41', '2025-12-11 13:56:41'),
(533, NULL, 'WINDOWS SIDE BEEDING', '15', 'Invalid date', '0', '1', '2025-12-11 13:57:00', '2025-12-11 13:57:00'),
(534, NULL, 'WINDOWS SIDE BEEDING', '15', 'Invalid date', '0', '1', '2025-12-11 13:57:19', '2025-12-11 13:57:19'),
(535, NULL, 'TOUGHENED GLASS with CNC polish', '15', 'Invalid date', '0', '1', '2025-12-11 13:57:39', '2025-12-11 13:57:39'),
(536, NULL, 'TOUGHENED GLASS with CNC polish', '15', 'Invalid date', '0', '1', '2025-12-11 13:57:56', '2025-12-11 13:57:56'),
(537, NULL, 'INSULATING GLASS UNIT -18 MM', '15', 'Invalid date', '0', '1', '2025-12-11 13:58:16', '2025-12-11 13:58:16'),
(538, NULL, 'INSULATING GLASS UNIT -20 MM', '15', 'Invalid date', '0', '1', '2025-12-11 13:58:35', '2025-12-11 13:58:35'),
(539, NULL, 'CSK SS screw', '15', 'Invalid date', '0', '1', '2025-12-11 13:58:59', '2025-12-11 13:58:59'),
(540, NULL, 'SS Washer screw', '15', 'Invalid date', '0', '1', '2025-12-11 13:59:18', '2025-12-11 13:59:18'),
(541, NULL, 'Dosa Burner', '15', 'Invalid date', '0', '1', '2025-12-11 13:59:38', '2025-12-11 13:59:38'),
(542, NULL, 'SS Nut', '15', 'Invalid date', '0', '1', '2025-12-11 13:59:56', '2025-12-11 13:59:56'),
(543, NULL, 'SS Handle', '15', 'Invalid date', '0', '1', '2025-12-11 14:00:14', '2025-12-11 14:00:14'),
(544, NULL, 'Door Magnet', '15', 'Invalid date', '0', '1', '2025-12-11 14:00:33', '2025-12-11 14:00:33'),
(545, NULL, 'SS Hand drill cup', '15', 'Invalid date', '0', '1', '2025-12-11 14:00:53', '2025-12-11 14:00:53'),
(546, NULL, 'SS Hand drill cup', '15', 'Invalid date', '0', '1', '2025-12-11 14:01:10', '2025-12-11 14:01:10'),
(547, NULL, 'Al drop SS', '15', 'Invalid date', '0', '1', '2025-12-11 14:01:29', '2025-12-11 14:01:29'),
(548, NULL, 'GN Pan', '15', 'Invalid date', '0', '1', '2025-12-11 14:02:13', '2025-12-11 14:02:13'),
(549, NULL, 'GN Pan', '15', 'Invalid date', '0', '1', '2025-12-11 14:02:38', '2025-12-11 14:02:38'),
(550, NULL, 'GN Pan', '15', 'Invalid date', '0', '1', '2025-12-11 14:02:59', '2025-12-11 14:02:59'),
(551, NULL, 'GN Lid', '15', 'Invalid date', '0', '1', '2025-12-11 14:03:21', '2025-12-11 14:03:21'),
(552, NULL, 'GN Pan', '15', 'Invalid date', '0', '1', '2025-12-11 14:03:51', '2025-12-11 14:03:51'),
(553, NULL, 'GN Lid', '15', 'Invalid date', '0', '1', '2025-12-11 14:04:12', '2025-12-11 14:04:12'),
(554, NULL, 'Retrieving data. Wait a few seconds and try to cut or copy again.', '15', 'Invalid date', '0', '1', '2025-12-11 14:04:36', '2025-12-11 14:04:36'),
(555, NULL, 'Silicon gel', '15', 'Invalid date', '0', '1', '2025-12-11 14:04:55', '2025-12-11 14:04:55'),
(556, NULL, 'LED ADOPTOR - DRIVER', '15', 'Invalid date', '0', '1', '2025-12-11 14:05:15', '2025-12-11 14:05:15'),
(557, NULL, 'HEATER SWITCH CONTROL BOX', '15', 'Invalid date', '0', '1', '2025-12-11 14:05:35', '2025-12-11 14:05:35'),
(558, NULL, 'SS Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 14:05:54', '2025-12-11 14:05:54'),
(559, NULL, 'SS Bolt', '15', 'Invalid date', '0', '1', '2025-12-11 14:06:34', '2025-12-11 14:06:34'),
(560, NULL, 'Silicon gel', '15', 'Invalid date', '0', '1', '2025-12-11 14:07:07', '2025-12-11 14:07:07'),
(561, NULL, 'SS pipe Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 14:07:33', '2025-12-11 14:07:33'),
(562, NULL, 'Warm white LED Tube Light', '15', 'Invalid date', '0', '1', '2025-12-11 14:07:53', '2025-12-11 14:07:53'),
(563, NULL, 'Warm white LED Tube Light', '15', 'Invalid date', '0', '1', '2025-12-11 14:08:15', '2025-12-11 14:08:15'),
(564, NULL, 'SS Bootan handle Rod', '15', 'Invalid date', '0', '1', '2025-12-11 14:08:33', '2025-12-11 14:08:33'),
(565, NULL, 'Welding Earth cable', '15', 'Invalid date', '0', '1', '2025-12-11 14:08:59', '2025-12-11 14:08:59'),
(566, NULL, 'GN Pan', '15', 'Invalid date', '0', '1', '2025-12-11 14:09:51', '2025-12-11 14:09:51'),
(567, NULL, 'Bolt Bush', '15', 'Invalid date', '0', '1', '2025-12-11 14:10:10', '2025-12-11 14:10:10'),
(568, NULL, 'Tig collet', '15', 'Invalid date', '0', '1', '2025-12-11 14:10:30', '2025-12-11 14:10:30'),
(569, NULL, 'SS Washer Nut', '15', 'Invalid date', '0', '1', '2025-12-11 14:10:51', '2025-12-11 14:10:51'),
(570, NULL, 'SS Plate', '15', 'Invalid date', '0', '1', '2025-12-11 14:11:09', '2025-12-11 14:11:09'),
(571, NULL, 'R-134A', '15', 'Invalid date', '0', '1', '2025-12-11 14:11:29', '2025-12-11 14:11:29'),
(572, NULL, 'Charging Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 14:11:48', '2025-12-11 14:11:48'),
(573, NULL, 'Copper Phos Alloy wire', '15', 'Invalid date', '0', '1', '2025-12-11 14:12:04', '2025-12-11 14:12:04'),
(574, NULL, 'Brass tags Plated', '15', 'Invalid date', '0', '1', '2025-12-11 14:12:27', '2025-12-11 14:12:27'),
(575, NULL, 'Flex eco class 1 Tubes', '15', 'Invalid date', '0', '1', '2025-12-11 14:13:25', '2025-12-11 14:13:25'),
(576, NULL, 'Vijay wheel', '15', 'Invalid date', '0', '1', '2025-12-11 14:13:47', '2025-12-11 14:13:47'),
(577, NULL, '2 Core Led Flat wire', '15', 'Invalid date', '0', '1', '2025-12-11 14:14:04', '2025-12-11 14:14:04'),
(578, NULL, 'White sticker', '15', 'Invalid date', '0', '1', '2025-12-11 14:14:24', '2025-12-11 14:14:24'),
(579, NULL, 'Cappilary', '15', 'Invalid date', '0', '1', '2025-12-11 14:14:44', '2025-12-11 14:14:44'),
(580, NULL, 'Sliding door roller', '15', 'Invalid date', '0', '1', '2025-12-11 14:15:02', '2025-12-11 14:15:02'),
(581, NULL, 'LED ADOPTOR - DRIVER', '15', 'Invalid date', '0', '1', '2025-12-11 14:15:23', '2025-12-11 14:15:23'),
(582, NULL, 'Switch box', '15', 'Invalid date', '0', '1', '2025-12-11 14:15:43', '2025-12-11 14:15:43'),
(583, NULL, 'White Led tube light', '15', 'Invalid date', '0', '1', '2025-12-11 14:16:01', '2025-12-11 14:16:01'),
(584, NULL, 'White Led tube light', '15', 'Invalid date', '0', '1', '2025-12-11 14:16:19', '2025-12-11 14:16:19'),
(585, NULL, 'White Led tube light', '15', 'Invalid date', '0', '1', '2025-12-11 14:16:35', '2025-12-11 14:16:35'),
(586, NULL, 'Glass lock', '15', 'Invalid date', '0', '1', '2025-12-11 14:16:51', '2025-12-11 14:16:51'),
(587, NULL, 'COOLING COIL', '15', 'Invalid date', '0', '1', '2025-12-11 14:17:08', '2025-12-11 14:17:08'),
(588, NULL, 'CONDENSSOR COIL', '15', 'Invalid date', '0', '1', '2025-12-11 14:17:27', '2025-12-11 14:17:27'),
(589, NULL, 'MS Bucket grill 10', '15', 'Invalid date', '0', '1', '2025-12-11 14:17:44', '2025-12-11 14:17:44'),
(590, NULL, 'REC 8325 - 16 A2 MOTOR', '15', 'Invalid date', '0', '1', '2025-12-11 14:18:06', '2025-12-11 14:18:06'),
(591, NULL, 'Pipe Round washer', '15', 'Invalid date', '0', '1', '2025-12-11 14:18:21', '2025-12-11 14:18:21'),
(592, NULL, 'Stabilizer', '15', 'Invalid date', '0', '1', '2025-12-11 14:18:37', '2025-12-11 14:18:37'),
(593, NULL, 'COOLING COIL', '15', 'Invalid date', '0', '1', '2025-12-11 14:18:52', '2025-12-11 14:18:52'),
(594, NULL, 'Black tape', '15', 'Invalid date', '0', '1', '2025-12-11 14:19:10', '2025-12-11 14:19:10'),
(595, NULL, 'HEATER', '15', 'Invalid date', '0', '1', '2025-12-11 14:19:26', '2025-12-11 14:19:26'),
(596, NULL, 'HEATER', '15', 'Invalid date', '0', '1', '2025-12-11 14:19:43', '2025-12-11 14:19:43'),
(597, NULL, 'Burner', '15', 'Invalid date', '0', '1', '2025-12-11 14:20:00', '2025-12-11 14:20:00'),
(598, NULL, 'Burner UNIT', '15', 'Invalid date', '0', '1', '2025-12-11 14:20:18', '2025-12-11 14:20:18'),
(599, NULL, 'CURVO LOCK', '15', 'Invalid date', '0', '1', '2025-12-11 14:20:39', '2025-12-11 14:20:39'),
(600, NULL, 'Anchor bolt', '15', 'Invalid date', '0', '1', '2025-12-11 14:20:57', '2025-12-11 14:20:57'),
(601, NULL, 'LED ADOPTOR - DRIVER', '15', 'Invalid date', '0', '1', '2025-12-11 14:21:31', '2025-12-11 14:21:31'),
(602, NULL, 'Dosa Burner unit', '15', 'Invalid date', '0', '1', '2025-12-11 14:21:48', '2025-12-11 14:21:48'),
(603, NULL, 'Bolt Bush', '15', 'Invalid date', '0', '1', '2025-12-11 14:22:18', '2025-12-11 14:22:18'),
(604, NULL, 'AG7 Grinding Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:41:36', '2025-12-11 17:41:36'),
(605, NULL, 'Grinding Stone', '15', 'Invalid date', '0', '1', '2025-12-11 17:42:16', '2025-12-11 17:42:16'),
(606, NULL, 'AIR BRUSH', '15', 'Invalid date', '0', '1', '2025-12-11 17:42:38', '2025-12-11 17:42:38'),
(607, NULL, 'AIR BRUSH', '15', 'Invalid date', '0', '1', '2025-12-11 17:43:01', '2025-12-11 17:43:01'),
(608, NULL, 'Air Brush', '15', 'Invalid date', '0', '1', '2025-12-11 17:43:23', '2025-12-11 17:43:23'),
(609, NULL, 'Air Brush', '15', 'Invalid date', '0', '1', '2025-12-11 17:43:45', '2025-12-11 17:43:45'),
(610, NULL, 'Air Brush', '15', 'Invalid date', '0', '1', '2025-12-11 17:44:03', '2025-12-11 17:44:03'),
(611, NULL, 'Air Brush', '15', 'Invalid date', '0', '1', '2025-12-11 17:44:22', '2025-12-11 17:44:22'),
(612, NULL, 'Air Brush', '15', 'Invalid date', '0', '1', '2025-12-11 17:44:39', '2025-12-11 17:44:39'),
(613, NULL, 'Bench Grinding Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:44:55', '2025-12-11 17:44:55'),
(614, NULL, 'Bootan Nipple', '15', 'Invalid date', '0', '1', '2025-12-11 17:45:10', '2025-12-11 17:45:10'),
(615, NULL, 'CD Marker', '15', 'Invalid date', '0', '1', '2025-12-11 17:45:29', '2025-12-11 17:45:29'),
(616, NULL, 'Chalk (white)', '15', 'Invalid date', '0', '1', '2025-12-11 17:45:45', '2025-12-11 17:45:45'),
(617, NULL, 'Cut off wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:46:03', '2025-12-11 17:46:03'),
(618, NULL, 'Cut off wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:46:27', '2025-12-11 17:46:27'),
(619, NULL, 'Paint Flat Brush', '15', 'Invalid date', '0', '1', '2025-12-11 17:46:42', '2025-12-11 17:46:42'),
(620, NULL, 'Paint Letter Brush', '15', 'Invalid date', '0', '1', '2025-12-11 17:46:59', '2025-12-11 17:46:59'),
(621, NULL, 'Grease', '15', 'Invalid date', '0', '1', '2025-12-11 17:47:17', '2025-12-11 17:47:17'),
(622, NULL, 'M.S BUSH', '15', 'Invalid date', '0', '1', '2025-12-11 17:47:33', '2025-12-11 17:47:33'),
(623, NULL, 'Grinding Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:47:54', '2025-12-11 17:47:54'),
(624, NULL, 'Grinding Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:48:14', '2025-12-11 17:48:14'),
(625, NULL, 'Grinding Wheel - GREEN', '15', 'Invalid date', '0', '1', '2025-12-11 17:48:31', '2025-12-11 17:48:31'),
(626, NULL, 'Hand Gloves', '15', 'Invalid date', '0', '1', '2025-12-11 17:48:46', '2025-12-11 17:48:46'),
(627, NULL, 'Hand Gloves', '15', 'Invalid date', '0', '1', '2025-12-11 17:49:03', '2025-12-11 17:49:03'),
(628, NULL, 'Hand Gloves', '15', 'Invalid date', '0', '1', '2025-12-11 17:49:32', '2025-12-11 17:49:32'),
(629, NULL, 'Goggles', '15', 'Invalid date', '0', '1', '2025-12-11 17:49:48', '2025-12-11 17:49:48'),
(630, NULL, 'Goggles', '15', 'Invalid date', '0', '1', '2025-12-11 17:50:05', '2025-12-11 17:50:05'),
(631, NULL, 'Insulation tap', '15', 'Invalid date', '0', '1', '2025-12-11 17:50:27', '2025-12-11 17:50:27'),
(632, NULL, 'Mat Sheet', '15', 'Invalid date', '0', '1', '2025-12-11 17:51:02', '2025-12-11 17:51:02'),
(633, NULL, 'MAT WHEEL {ROSE}', '15', 'Invalid date', '0', '1', '2025-12-11 17:51:21', '2025-12-11 17:51:21'),
(634, NULL, 'MAT WHEEL {ROSE}', '15', 'Invalid date', '0', '1', '2025-12-11 17:51:38', '2025-12-11 17:51:38'),
(635, NULL, 'MAT WHEEL {ROSE}', '15', 'Invalid date', '0', '1', '2025-12-11 17:51:54', '2025-12-11 17:51:54'),
(636, NULL, 'MAT WHEEL {ROSE}', '15', 'Invalid date', '0', '1', '2025-12-11 17:52:11', '2025-12-11 17:52:11'),
(637, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:52:30', '2025-12-11 17:52:30'),
(638, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:52:49', '2025-12-11 17:52:49'),
(639, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:53:02', '2025-12-11 17:53:02'),
(640, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:53:16', '2025-12-11 17:53:16'),
(641, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:53:32', '2025-12-11 17:53:32'),
(642, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:53:46', '2025-12-11 17:53:46'),
(643, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:54:01', '2025-12-11 17:54:01'),
(644, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:54:21', '2025-12-11 17:54:21'),
(645, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:54:39', '2025-12-11 17:54:39'),
(646, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:54:56', '2025-12-11 17:54:56'),
(647, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:55:13', '2025-12-11 17:55:13'),
(648, NULL, 'Mob Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:55:30', '2025-12-11 17:55:30'),
(649, NULL, 'padapat wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:55:58', '2025-12-11 17:55:58'),
(650, NULL, 'padapat wheel', '15', 'Invalid date', '0', '1', '2025-12-11 17:56:17', '2025-12-11 17:56:17'),
(651, NULL, 'Name Plate (Small)', '15', 'Invalid date', '0', '1', '2025-12-11 17:56:43', '2025-12-11 17:56:43'),
(652, NULL, 'Name Plate (Big)', '15', 'Invalid date', '0', '1', '2025-12-11 17:56:59', '2025-12-11 17:56:59'),
(653, NULL, 'SAWARMA SS PLATE', '15', 'Invalid date', '0', '1', '2025-12-11 17:57:16', '2025-12-11 17:57:16'),
(654, NULL, 'SAWARMA SS KNIFE', '15', 'Invalid date', '0', '1', '2025-12-11 17:57:40', '2025-12-11 17:57:40'),
(655, NULL, 'O2 Cylinder', '15', 'Invalid date', '0', '1', '2025-12-11 17:57:58', '2025-12-11 17:57:58'),
(656, NULL, 'Packing Roll', '15', 'Invalid date', '0', '1', '2025-12-11 17:58:13', '2025-12-11 17:58:13'),
(657, NULL, 'Packing Roll', '15', 'Invalid date', '0', '1', '2025-12-11 17:58:28', '2025-12-11 17:58:28'),
(658, NULL, 'STAR GEL', '15', 'Invalid date', '0', '1', '2025-12-11 17:58:46', '2025-12-11 17:58:46'),
(659, NULL, 'THINNER', '15', 'Invalid date', '0', '1', '2025-12-11 17:59:04', '2025-12-11 17:59:04'),
(660, NULL, 'THINNER', '15', 'Invalid date', '0', '1', '2025-12-11 17:59:22', '2025-12-11 17:59:22'),
(661, NULL, 'CAROSINE', '15', 'Invalid date', '0', '1', '2025-12-11 17:59:39', '2025-12-11 17:59:39'),
(662, NULL, 'Paint', '15', 'Invalid date', '0', '1', '2025-12-11 17:59:57', '2025-12-11 17:59:57'),
(663, NULL, 'Paint', '15', 'Invalid date', '0', '1', '2025-12-11 18:00:20', '2025-12-11 18:00:20'),
(664, NULL, 'Paint', '15', 'Invalid date', '0', '1', '2025-12-11 18:00:37', '2025-12-11 18:00:37'),
(665, NULL, 'Paint', '15', 'Invalid date', '0', '1', '2025-12-11 18:00:53', '2025-12-11 18:00:53'),
(666, NULL, 'Paint', '15', 'Invalid date', '0', '1', '2025-12-11 18:01:08', '2025-12-11 18:01:08'),
(667, NULL, 'Paint', '15', 'Invalid date', '0', '1', '2025-12-11 18:01:26', '2025-12-11 18:01:26'),
(668, NULL, 'Paint', '15', 'Invalid date', '0', '1', '2025-12-11 18:01:44', '2025-12-11 18:01:44'),
(669, NULL, 'Paint Primer', '15', 'Invalid date', '0', '1', '2025-12-11 18:02:02', '2025-12-11 18:02:02'),
(670, NULL, 'Patta Rope', '15', 'Invalid date', '0', '1', '2025-12-11 18:02:18', '2025-12-11 18:02:18'),
(671, NULL, 'Pencil', '15', 'Invalid date', '0', '1', '2025-12-11 18:03:18', '2025-12-11 18:03:18'),
(672, NULL, 'Pencil', '15', 'Invalid date', '0', '1', '2025-12-11 18:04:03', '2025-12-11 18:04:03'),
(673, NULL, 'Pencil (slate)', '15', 'Invalid date', '0', '1', '2025-12-11 18:04:20', '2025-12-11 18:04:20'),
(674, NULL, 'Pencil (CHALK)', '15', 'Invalid date', '0', '1', '2025-12-11 18:04:34', '2025-12-11 18:04:34'),
(675, NULL, 'POLISH WHEEL', '15', 'Invalid date', '0', '1', '2025-12-11 18:04:49', '2025-12-11 18:04:49'),
(676, NULL, 'Polish Soap', '15', 'Invalid date', '0', '1', '2025-12-11 18:05:04', '2025-12-11 18:05:04'),
(677, NULL, 'Polish Soap', '15', 'Invalid date', '0', '1', '2025-12-11 18:05:18', '2025-12-11 18:05:18'),
(678, NULL, 'Rope ASPETAS', '15', 'Invalid date', '0', '1', '2025-12-11 18:05:52', '2025-12-11 18:05:52'),
(679, NULL, 'FLAP DISC', '15', 'Invalid date', '0', '1', '2025-12-11 18:06:37', '2025-12-11 18:06:37'),
(680, NULL, 'Shellac', '15', 'Invalid date', '0', '1', '2025-12-11 18:07:05', '2025-12-11 18:07:05'),
(681, NULL, 'Siilicon Gun', '15', 'Invalid date', '0', '1', '2025-12-11 18:07:20', '2025-12-11 18:07:20'),
(682, NULL, 'Sponge  Wheel {ROSE}', '15', 'Invalid date', '0', '1', '2025-12-11 18:07:37', '2025-12-11 18:07:37'),
(683, NULL, 'ALUMINIUM TAPE', '15', 'Invalid date', '0', '1', '2025-12-11 18:07:58', '2025-12-11 18:07:58'),
(684, NULL, 'Waste coupling', '15', 'Invalid date', '0', '1', '2025-12-11 18:08:21', '2025-12-11 18:08:21'),
(685, NULL, 'SILICON GEL - WHITE', '15', 'Invalid date', '0', '1', '2025-12-11 18:08:39', '2025-12-11 18:08:39'),
(686, NULL, 'Paint Brush', '15', 'Invalid date', '0', '1', '2025-12-11 18:08:56', '2025-12-11 18:08:56'),
(687, NULL, 'Paint Brush', '15', 'Invalid date', '0', '1', '2025-12-11 18:09:55', '2025-12-11 18:09:55'),
(688, NULL, 'THREE CLAMP-GLASS', '15', 'Invalid date', '0', '1', '2025-12-11 18:10:13', '2025-12-11 18:10:13'),
(689, NULL, 'ABRO masking tape', '15', 'Invalid date', '0', '1', '2025-12-11 18:10:28', '2025-12-11 18:10:28'),
(690, NULL, 'NUTRAL WHITE LED STRIP LIGHT', '15', 'Invalid date', '0', '1', '2025-12-11 18:10:45', '2025-12-11 18:10:45'),
(691, NULL, 'WHITE LED STRIP LIGHT', '15', 'Invalid date', '0', '1', '2025-12-11 18:11:02', '2025-12-11 18:11:02'),
(692, NULL, 'WARM WHITE LED STRIP LIGHT', '15', 'Invalid date', '0', '1', '2025-12-11 18:11:50', '2025-12-11 18:11:50'),
(693, NULL, 'RED DOUBLE SIDE TAPE', '15', 'Invalid date', '0', '1', '2025-12-11 18:12:11', '2025-12-11 18:12:11'),
(694, NULL, 'wire 2 CORE', '15', 'Invalid date', '0', '1', '2025-12-11 18:12:27', '2025-12-11 18:12:27'),
(695, NULL, 'wire 3 CORE', '15', 'Invalid date', '0', '1', '2025-12-11 18:12:47', '2025-12-11 18:12:47'),
(696, NULL, 'LED WIRE', '15', 'Invalid date', '0', '1', '2025-12-11 18:13:03', '2025-12-11 18:13:03'),
(697, NULL, '1 CORE WIRE', '15', 'Invalid date', '0', '1', '2025-12-11 18:13:19', '2025-12-11 18:13:19'),
(698, NULL, 'WIRE', '15', 'Invalid date', '0', '1', '2025-12-11 18:13:36', '2025-12-11 18:13:36'),
(699, NULL, 'TWO CORE WIRE', '15', 'Invalid date', '0', '1', '2025-12-11 18:13:51', '2025-12-11 18:13:51'),
(700, NULL, 'THREE CORE WIRE', '15', 'Invalid date', '0', '1', '2025-12-11 18:14:07', '2025-12-11 18:14:07'),
(701, NULL, 'Polish paper', '15', 'Invalid date', '0', '1', '2025-12-11 18:14:26', '2025-12-11 18:14:26'),
(702, NULL, 'Polish paper', '15', 'Invalid date', '0', '1', '2025-12-11 18:14:42', '2025-12-11 18:14:42'),
(703, NULL, 'Polish paper', '15', 'Invalid date', '0', '1', '2025-12-11 18:15:02', '2025-12-11 18:15:02'),
(704, NULL, 'Polish paper grinding', '15', 'Invalid date', '0', '1', '2025-12-11 18:15:18', '2025-12-11 18:15:18'),
(705, NULL, 'Polish paper', '15', 'Invalid date', '0', '1', '2025-12-11 18:15:36', '2025-12-11 18:15:36'),
(706, NULL, 'Zigzag blade', '15', 'Invalid date', '0', '1', '2025-12-11 18:15:52', '2025-12-11 18:15:52'),
(707, NULL, 'Wood cutter blade', '15', 'Invalid date', '0', '1', '2025-12-11 18:16:07', '2025-12-11 18:16:07'),
(708, NULL, 'Granite cutting wheel', '15', 'Invalid date', '0', '1', '2025-12-11 18:16:22', '2025-12-11 18:16:22'),
(709, NULL, 'CASH COUNTER BOWL', '15', 'Invalid date', '0', '1', '2025-12-11 18:16:40', '2025-12-11 18:16:40'),
(710, NULL, 'CASH COUNTER BOWL', '15', 'Invalid date', '0', '1', '2025-12-11 18:17:01', '2025-12-11 18:17:01'),
(711, NULL, 'Sponge  Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 18:17:14', '2025-12-11 18:17:14'),
(712, NULL, 'Sponge  Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 18:17:32', '2025-12-11 18:17:32'),
(713, NULL, 'Sponge  Wheel', '15', 'Invalid date', '0', '1', '2025-12-11 18:17:51', '2025-12-11 18:17:51'),
(714, NULL, 'Waste coupling', '15', 'Invalid date', '0', '1', '2025-12-11 18:18:14', '2025-12-11 18:18:14'),
(715, NULL, 'Ear Plug', '15', 'Invalid date', '0', '1', '2025-12-11 18:18:30', '2025-12-11 18:18:30'),
(716, NULL, 'Locker Bush', '15', 'Invalid date', '0', '1', '2025-12-11 18:18:47', '2025-12-11 18:18:47'),
(717, NULL, 'INDICATION SWITCH COUNTER', '15', 'Invalid date', '0', '1', '2025-12-11 18:19:05', '2025-12-11 18:19:05'),
(718, NULL, 'INDICATION SWITCH COUNTER', '15', 'Invalid date', '0', '1', '2025-12-11 18:19:19', '2025-12-11 18:19:19'),
(719, NULL, 'WIRE GLANT', '15', 'Invalid date', '0', '1', '2025-12-11 18:19:37', '2025-12-11 18:19:37'),
(720, NULL, 'WIRE GLANT', '15', 'Invalid date', '0', '1', '2025-12-11 18:19:57', '2025-12-11 18:19:57'),
(721, NULL, 'TWO PIN PLUG', '15', 'Invalid date', '0', '1', '2025-12-11 18:20:13', '2025-12-11 18:20:13'),
(722, NULL, 'THREE PIN PLUG', '15', 'Invalid date', '0', '1', '2025-12-11 18:20:32', '2025-12-11 18:20:32'),
(723, NULL, 'THREE PIN PLUG', '15', 'Invalid date', '0', '1', '2025-12-11 18:20:50', '2025-12-11 18:20:50'),
(724, NULL, 'LED ADOPTOR - DRIVER', '15', 'Invalid date', '0', '1', '2025-12-11 18:21:09', '2025-12-11 18:21:09'),
(725, NULL, 'LED ADOPTOR - DRIVER', '15', 'Invalid date', '0', '1', '2025-12-11 18:21:29', '2025-12-11 18:21:29'),
(726, NULL, 'Goli', '15', 'Invalid date', '0', '1', '2025-12-11 18:21:47', '2025-12-11 18:21:47'),
(727, NULL, 'Emery grinding sheet corien', '15', 'Invalid date', '0', '1', '2025-12-11 18:22:05', '2025-12-11 18:22:05'),
(728, NULL, 'Mob wheel', '15', 'Invalid date', '0', '1', '2025-12-11 18:22:25', '2025-12-11 18:22:25'),
(729, NULL, 'Mob wheel', '15', 'Invalid date', '0', '1', '2025-12-11 18:22:46', '2025-12-11 18:22:46'),
(730, NULL, 'Mob wheel', '15', 'Invalid date', '0', '1', '2025-12-11 18:22:58', '2025-12-11 18:22:58'),
(731, NULL, 'Cutting nozzle', '15', 'Invalid date', '0', '1', '2025-12-11 18:23:18', '2025-12-11 18:23:18'),
(732, NULL, 'Cutting nozzle', '15', 'Invalid date', '0', '1', '2025-12-11 18:23:39', '2025-12-11 18:23:39'),
(733, NULL, 'Cutting nozzle', '15', 'Invalid date', '0', '1', '2025-12-11 18:23:58', '2025-12-11 18:23:58'),
(734, NULL, 'Gloves', '15', 'Invalid date', '0', '1', '2025-12-11 18:24:24', '2025-12-11 18:24:24'),
(735, NULL, 'REFRACTORY CASTABLE INSULYTE', '15', 'Invalid date', '0', '1', '2025-12-11 18:24:46', '2025-12-11 18:24:46'),
(736, NULL, 'CERAMIC FIBER BLANKETS', '15', 'Invalid date', '0', '1', '2025-12-11 18:25:01', '2025-12-11 18:25:01'),
(737, NULL, 'ADHESIVE', '15', 'Invalid date', '0', '1', '2025-12-11 18:25:22', '2025-12-11 18:25:22'),
(738, NULL, 'ADHESIVE', '15', 'Invalid date', '0', '1', '2025-12-11 18:25:36', '2025-12-11 18:25:36'),
(739, NULL, 'ADHESIVE', '15', 'Invalid date', '0', '1', '2025-12-11 18:25:52', '2025-12-11 18:25:52'),
(740, NULL, 'ADHESIVE', '15', 'Invalid date', '0', '1', '2025-12-11 18:26:07', '2025-12-11 18:26:07'),
(741, NULL, 'ADHESIVE', '15', 'Invalid date', '0', '1', '2025-12-11 18:26:29', '2025-12-11 18:26:29'),
(742, NULL, 'WASTE', '15', 'Invalid date', '0', '1', '2025-12-11 18:26:49', '2025-12-11 18:26:49'),
(743, NULL, 'WHITE WASTE', '15', 'Invalid date', '0', '1', '2025-12-11 18:27:08', '2025-12-11 18:27:08'),
(744, NULL, 'MARBLES - BLACK', '15', 'Invalid date', '0', '1', '2025-12-11 18:27:29', '2025-12-11 18:27:29'),
(745, NULL, 'MARBLES - WHITE', '15', 'Invalid date', '0', '1', '2025-12-11 18:27:51', '2025-12-11 18:27:51'),
(746, NULL, 'MARBLES - WHITE', '15', 'Invalid date', '0', '1', '2025-12-11 18:28:07', '2025-12-11 18:28:07'),
(747, NULL, 'MARBLES - WHITE', '15', 'Invalid date', '0', '1', '2025-12-11 18:28:33', '2025-12-11 18:28:33'),
(748, NULL, 'MARBLES - WHITE', '15', 'Invalid date', '0', '1', '2025-12-11 18:28:50', '2025-12-11 18:28:50'),
(749, NULL, 'MARBLES - WHITE', '15', 'Invalid date', '0', '1', '2025-12-11 18:29:03', '2025-12-11 18:29:03'),
(750, NULL, 'MARBLES - WHITE', '15', 'Invalid date', '0', '1', '2025-12-11 18:29:26', '2025-12-11 18:29:26'),
(751, NULL, 'Packing Roll', '15', 'Invalid date', '0', '1', '2025-12-11 18:29:49', '2025-12-11 18:29:49'),
(752, NULL, 'Packing Roll', '15', 'Invalid date', '0', '1', '2025-12-11 18:30:05', '2025-12-11 18:30:05'),
(753, NULL, 'Packing Roll-Paper', '15', 'Invalid date', '0', '1', '2025-12-11 18:30:23', '2025-12-11 18:30:23'),
(754, NULL, 'CUTTER BLADE - KNIFE', '15', 'Invalid date', '0', '1', '2025-12-11 18:30:42', '2025-12-11 18:30:42'),
(755, NULL, 'Paint', '15', 'Invalid date', '0', '1', '2025-12-11 18:30:59', '2025-12-11 18:30:59'),
(756, NULL, 'Waste coupling', '15', 'Invalid date', '0', '1', '2025-12-11 18:31:18', '2025-12-11 18:31:18'),
(757, NULL, 'WHITE LED STRIP LIGHT', '15', 'Invalid date', '0', '1', '2025-12-11 18:31:37', '2025-12-11 18:31:37'),
(758, NULL, 'wire 3 CORE', '15', 'Invalid date', '0', '1', '2025-12-11 18:31:57', '2025-12-11 18:31:57'),
(759, NULL, 'Polish paper', '15', 'Invalid date', '0', '1', '2025-12-11 18:32:13', '2025-12-11 18:32:13'),
(760, NULL, 'Polish paper', '15', 'Invalid date', '0', '1', '2025-12-11 18:32:32', '2025-12-11 18:32:32'),
(761, NULL, 'CR Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:02:06', '2025-12-12 05:02:06'),
(762, NULL, 'Gas Mane fold', '15', 'Invalid date', '0', '1', '2025-12-12 05:02:31', '2025-12-12 05:02:31'),
(763, NULL, 'Gas Mane fold', '15', 'Invalid date', '0', '1', '2025-12-12 05:03:18', '2025-12-12 05:03:18'),
(764, NULL, 'Gas Mane Fold', '15', 'Invalid date', '0', '1', '2025-12-12 05:03:47', '2025-12-12 05:03:47'),
(765, NULL, 'Gas Mane Fold', '15', 'Invalid date', '0', '1', '2025-12-12 05:04:30', '2025-12-12 05:04:30'),
(766, NULL, 'Gas Mane Fold', '15', 'Invalid date', '0', '1', '2025-12-12 05:05:04', '2025-12-12 05:05:04'),
(767, NULL, 'GI Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:05:34', '2025-12-12 05:05:34'),
(768, NULL, 'GI Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:05:58', '2025-12-12 05:05:58'),
(769, NULL, 'MS Angle', '15', 'Invalid date', '0', '1', '2025-12-12 05:06:23', '2025-12-12 05:06:23'),
(770, NULL, 'MS Angle', '15', 'Invalid date', '0', '1', '2025-12-12 05:06:46', '2025-12-12 05:06:46'),
(771, NULL, 'MS Flat', '15', 'Invalid date', '0', '1', '2025-12-12 05:07:11', '2025-12-12 05:07:11'),
(772, NULL, 'MS Gas Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:07:33', '2025-12-12 05:07:33'),
(773, NULL, 'MS Gas Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:07:55', '2025-12-12 05:07:55'),
(774, NULL, 'MS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:08:58', '2025-12-12 05:08:58'),
(775, NULL, 'MS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:09:22', '2025-12-12 05:09:22'),
(776, NULL, 'MS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:09:49', '2025-12-12 05:09:49'),
(777, NULL, 'MS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:10:20', '2025-12-12 05:10:20'),
(778, NULL, 'MS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:10:37', '2025-12-12 05:10:37'),
(779, NULL, 'GI SHEET', '15', 'Invalid date', '0', '1', '2025-12-12 05:11:03', '2025-12-12 05:11:03'),
(780, NULL, 'MS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:11:23', '2025-12-12 05:11:23'),
(781, NULL, 'MS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:11:55', '2025-12-12 05:11:55'),
(782, NULL, 'MS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:12:17', '2025-12-12 05:12:17'),
(783, NULL, 'MS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:12:28', '2025-12-12 05:12:28'),
(784, NULL, 'MS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:12:39', '2025-12-12 05:12:39'),
(785, NULL, 'MS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:12:52', '2025-12-12 05:12:52'),
(786, NULL, 'MS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:13:03', '2025-12-12 05:13:03'),
(787, NULL, 'MS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:13:15', '2025-12-12 05:13:15'),
(788, NULL, 'M.S PLAIN  Washer', '15', 'Invalid date', '0', '1', '2025-12-12 05:13:47', '2025-12-12 05:13:47'),
(789, NULL, 'SS Angle', '15', 'Invalid date', '0', '1', '2025-12-12 05:14:13', '2025-12-12 05:14:13'),
(790, NULL, 'SS Angle', '15', 'Invalid date', '0', '1', '2025-12-12 05:14:32', '2025-12-12 05:14:32'),
(791, NULL, 'SS Angle', '15', 'Invalid date', '0', '1', '2025-12-12 05:14:45', '2025-12-12 05:14:45'),
(792, NULL, 'SS Angle', '15', 'Invalid date', '0', '1', '2025-12-12 05:15:02', '2025-12-12 05:15:02'),
(793, NULL, 'SS Angle', '15', 'Invalid date', '0', '1', '2025-12-12 05:15:12', '2025-12-12 05:15:12'),
(794, NULL, 'SS Angle', '15', 'Invalid date', '0', '1', '2025-12-12 05:15:24', '2025-12-12 05:15:24'),
(795, NULL, 'SS Flat', '15', 'Invalid date', '0', '1', '2025-12-12 05:15:58', '2025-12-12 05:15:58'),
(796, NULL, 'SS Flat', '15', 'Invalid date', '0', '1', '2025-12-12 05:16:46', '2025-12-12 05:16:46'),
(797, NULL, 'SS Flat', '15', 'Invalid date', '0', '1', '2025-12-12 05:16:59', '2025-12-12 05:16:59'),
(798, NULL, 'SS Flat', '15', 'Invalid date', '0', '1', '2025-12-12 05:17:12', '2025-12-12 05:17:12'),
(799, NULL, 'SS Flat', '15', 'Invalid date', '0', '1', '2025-12-12 05:18:03', '2025-12-12 05:18:03'),
(800, NULL, 'SS Flat', '15', 'Invalid date', '0', '1', '2025-12-12 05:18:15', '2025-12-12 05:18:15'),
(801, NULL, 'SS Flat(A\'Frame)', '15', 'Invalid date', '0', '1', '2025-12-12 05:18:42', '2025-12-12 05:18:42'),
(802, NULL, 'SS Flat(Dinnig Table)', '15', 'Invalid date', '0', '1', '2025-12-12 05:19:07', '2025-12-12 05:19:07'),
(803, NULL, 'SS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:19:39', '2025-12-12 05:19:39'),
(804, NULL, 'SS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:19:59', '2025-12-12 05:19:59'),
(805, NULL, 'SS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:20:12', '2025-12-12 05:20:12'),
(806, NULL, 'SS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:20:24', '2025-12-12 05:20:24'),
(807, NULL, 'SS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:20:37', '2025-12-12 05:20:37'),
(808, NULL, 'SS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:20:51', '2025-12-12 05:20:51'),
(809, NULL, 'SS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:21:05', '2025-12-12 05:21:05'),
(810, NULL, 'SS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:21:16', '2025-12-12 05:21:16'),
(811, NULL, 'SS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:21:28', '2025-12-12 05:21:28'),
(812, NULL, 'SS Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:21:55', '2025-12-12 05:21:55'),
(813, NULL, 'SS Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:22:07', '2025-12-12 05:22:07'),
(814, NULL, 'SS Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:22:15', '2025-12-12 05:22:15'),
(815, NULL, 'SS Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:22:23', '2025-12-12 05:22:23'),
(816, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:22:48', '2025-12-12 05:22:48'),
(817, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:22:59', '2025-12-12 05:22:59'),
(818, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:23:10', '2025-12-12 05:23:10'),
(819, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:23:20', '2025-12-12 05:23:20'),
(820, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:23:31', '2025-12-12 05:23:31'),
(821, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:23:45', '2025-12-12 05:23:45'),
(822, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:23:56', '2025-12-12 05:23:56'),
(823, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:24:08', '2025-12-12 05:24:08'),
(824, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:24:19', '2025-12-12 05:24:19'),
(825, NULL, 'SS Round Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 05:24:42', '2025-12-12 05:24:42'),
(826, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:25:10', '2025-12-12 05:25:10'),
(827, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:25:29', '2025-12-12 05:25:29'),
(828, NULL, 'SS Round Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 05:25:56', '2025-12-12 05:25:56'),
(829, NULL, 'SS Round Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 05:26:19', '2025-12-12 05:26:19'),
(830, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:26:43', '2025-12-12 05:26:43'),
(831, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:26:54', '2025-12-12 05:26:54'),
(832, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:27:04', '2025-12-12 05:27:04'),
(833, NULL, 'SS Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:27:14', '2025-12-12 05:27:14'),
(834, NULL, 'SS Round Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 05:27:36', '2025-12-12 05:27:36'),
(835, NULL, 'SS Round Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:28:01', '2025-12-12 05:28:01'),
(836, NULL, 'SS Round Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:28:12', '2025-12-12 05:28:12'),
(837, NULL, 'SS Round Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:28:40', '2025-12-12 05:28:40'),
(838, NULL, 'SS Round Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:29:14', '2025-12-12 05:29:14'),
(839, NULL, 'SS Round Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:29:37', '2025-12-12 05:29:37'),
(840, NULL, 'SS Round Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:32:26', '2025-12-12 05:32:26'),
(841, NULL, 'SS Round Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:33:23', '2025-12-12 05:33:23'),
(842, NULL, 'SS Round Rod', '15', 'Invalid date', '0', '1', '2025-12-12 05:33:49', '2025-12-12 05:33:49'),
(843, NULL, 'SS Schedule Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:34:14', '2025-12-12 05:34:14'),
(844, NULL, 'SS Schedule Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:34:41', '2025-12-12 05:34:41'),
(845, NULL, 'SS Schedule Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:35:06', '2025-12-12 05:35:06'),
(846, NULL, 'SS Schedule Round Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:35:31', '2025-12-12 05:35:31'),
(847, NULL, 'SS PATTA', '15', 'Invalid date', '0', '1', '2025-12-12 05:35:53', '2025-12-12 05:35:53'),
(848, NULL, 'SS PATTA', '15', 'Invalid date', '0', '1', '2025-12-12 05:36:17', '2025-12-12 05:36:17'),
(849, NULL, 'GOLD SHEET', '15', 'Invalid date', '0', '1', '2025-12-12 05:36:41', '2025-12-12 05:36:41'),
(850, NULL, 'SS SHEET & SS PERFORATION', '15', 'Invalid date', '0', '1', '2025-12-12 05:37:05', '2025-12-12 05:37:05'),
(851, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:37:29', '2025-12-12 05:37:29'),
(852, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:38:02', '2025-12-12 05:38:02'),
(853, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:38:27', '2025-12-12 05:38:27'),
(854, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:38:53', '2025-12-12 05:38:53'),
(855, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:39:15', '2025-12-12 05:39:15'),
(856, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:39:38', '2025-12-12 05:39:38'),
(857, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:40:05', '2025-12-12 05:40:05'),
(858, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:40:34', '2025-12-12 05:40:34'),
(859, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:41:01', '2025-12-12 05:41:01'),
(860, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:41:24', '2025-12-12 05:41:24'),
(861, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:41:48', '2025-12-12 05:41:48'),
(862, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:42:12', '2025-12-12 05:42:12'),
(863, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:42:38', '2025-12-12 05:42:38'),
(864, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:43:02', '2025-12-12 05:43:02'),
(865, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:43:27', '2025-12-12 05:43:27'),
(866, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:43:48', '2025-12-12 05:43:48'),
(867, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:44:10', '2025-12-12 05:44:10'),
(868, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:44:35', '2025-12-12 05:44:35'),
(869, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:44:55', '2025-12-12 05:44:55'),
(870, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:45:18', '2025-12-12 05:45:18'),
(871, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:45:41', '2025-12-12 05:45:41'),
(872, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:46:02', '2025-12-12 05:46:02'),
(873, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:46:27', '2025-12-12 05:46:27'),
(874, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:46:50', '2025-12-12 05:46:50'),
(875, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:47:10', '2025-12-12 05:47:10'),
(876, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:47:30', '2025-12-12 05:47:30'),
(877, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:47:49', '2025-12-12 05:47:49'),
(878, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:48:12', '2025-12-12 05:48:12'),
(879, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:48:58', '2025-12-12 05:48:58'),
(880, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:49:11', '2025-12-12 05:49:11'),
(881, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:49:33', '2025-12-12 05:49:33'),
(882, NULL, 'SS Sheet', '15', 'Invalid date', '0', '1', '2025-12-12 05:50:10', '2025-12-12 05:50:10'),
(883, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:50:33', '2025-12-12 05:50:33'),
(884, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:50:57', '2025-12-12 05:50:57'),
(885, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:51:17', '2025-12-12 05:51:17'),
(886, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:51:36', '2025-12-12 05:51:36'),
(887, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:51:57', '2025-12-12 05:51:57'),
(888, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:52:29', '2025-12-12 05:52:29'),
(889, NULL, 'SS square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:53:29', '2025-12-12 05:53:29'),
(890, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 05:53:52', '2025-12-12 05:53:52'),
(891, NULL, 'SS Square Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 05:54:16', '2025-12-12 05:54:16'),
(892, NULL, 'SS Square Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 05:54:46', '2025-12-12 05:54:46'),
(893, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 06:33:18', '2025-12-12 06:33:18'),
(894, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 06:33:42', '2025-12-12 06:33:42'),
(895, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 06:34:05', '2025-12-12 06:34:05'),
(896, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 06:34:29', '2025-12-12 06:34:29'),
(897, NULL, 'SS Square Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 06:34:52', '2025-12-12 06:34:52'),
(898, NULL, 'SS Square Pipe 202', '15', 'Invalid date', '0', '1', '2025-12-12 06:35:16', '2025-12-12 06:35:16'),
(899, NULL, 'SS Square Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 06:35:53', '2025-12-12 06:35:53'),
(900, NULL, 'SS Square Rod', '15', 'Invalid date', '0', '1', '2025-12-12 06:36:20', '2025-12-12 06:36:20'),
(901, NULL, 'SS Square Rod', '15', 'Invalid date', '0', '1', '2025-12-12 06:36:41', '2025-12-12 06:36:41'),
(902, NULL, 'SS Square Rod', '15', 'Invalid date', '0', '1', '2025-12-12 06:36:57', '2025-12-12 06:36:57'),
(903, NULL, 'SS Square Rod', '15', 'Invalid date', '0', '1', '2025-12-12 06:38:00', '2025-12-12 06:38:00'),
(904, NULL, 'SS Square Rod', '15', 'Invalid date', '0', '1', '2025-12-12 06:38:31', '2025-12-12 06:38:31'),
(905, NULL, 'SS Square Rod', '15', 'Invalid date', '0', '1', '2025-12-12 06:38:52', '2025-12-12 06:38:52'),
(906, NULL, 'SS U Clamp', '15', 'Invalid date', '0', '1', '2025-12-12 06:39:17', '2025-12-12 06:39:17'),
(907, NULL, 'SS Union  (Iddly)', '15', 'Invalid date', '0', '1', '2025-12-12 06:40:49', '2025-12-12 06:40:49'),
(908, NULL, 'SS Union Material', '15', 'Invalid date', '0', '1', '2025-12-12 06:41:28', '2025-12-12 06:41:28'),
(909, NULL, 'SS Washer (Iddly)', '15', 'Invalid date', '0', '1', '2025-12-12 06:41:52', '2025-12-12 06:41:52'),
(910, NULL, 'SS  Bend', '15', 'Invalid date', '0', '1', '2025-12-12 06:44:19', '2025-12-12 06:44:19'),
(911, NULL, 'Steam Trap Racer', '15', 'Invalid date', '0', '1', '2025-12-12 06:44:41', '2025-12-12 06:44:41'),
(912, NULL, 'Steam Trap', '15', 'Invalid date', '0', '1', '2025-12-12 06:45:02', '2025-12-12 06:45:02'),
(913, NULL, 'Steam Weight (1Kg) old', '15', 'Invalid date', '0', '1', '2025-12-12 06:46:09', '2025-12-12 06:46:09'),
(914, NULL, 'Steam Weight (2Kg)', '15', 'Invalid date', '0', '1', '2025-12-12 06:46:29', '2025-12-12 06:46:29'),
(915, NULL, 'Stool  Top  Bush', '15', 'Invalid date', '0', '1', '2025-12-12 06:46:49', '2025-12-12 06:46:49'),
(916, NULL, 'Stool Leg Bush(Round)', '15', 'Invalid date', '0', '1', '2025-12-12 06:47:10', '2025-12-12 06:47:10'),
(917, NULL, 'Stool Pin Bush', '15', 'Invalid date', '0', '1', '2025-12-12 06:47:33', '2025-12-12 06:47:33'),
(918, NULL, 'Tap Set', '15', 'Invalid date', '0', '1', '2025-12-12 06:48:02', '2025-12-12 06:48:02'),
(919, NULL, 'Tap Set', '15', 'Invalid date', '0', '1', '2025-12-12 06:48:36', '2025-12-12 06:48:36'),
(920, NULL, 'Tap Set', '15', 'Invalid date', '0', '1', '2025-12-12 06:49:03', '2025-12-12 06:49:03'),
(921, NULL, 'Tap Set', '15', 'Invalid date', '0', '1', '2025-12-12 06:49:25', '2025-12-12 06:49:25'),
(922, NULL, 'Tap Set', '15', 'Invalid date', '0', '1', '2025-12-12 06:49:43', '2025-12-12 06:49:43'),
(923, NULL, 'Tap Set', '15', 'Invalid date', '0', '1', '2025-12-12 06:49:57', '2025-12-12 06:49:57'),
(924, NULL, 'Tea can', '15', 'Invalid date', '0', '1', '2025-12-12 06:50:20', '2025-12-12 06:50:20'),
(925, NULL, 'Tea Cup', '15', 'Invalid date', '0', '1', '2025-12-12 06:50:42', '2025-12-12 06:50:42'),
(926, NULL, 'Tefflon Tape', '15', 'Invalid date', '0', '1', '2025-12-12 06:51:01', '2025-12-12 06:51:01'),
(927, NULL, 'Thermometer', '15', 'Invalid date', '0', '1', '2025-12-12 06:51:18', '2025-12-12 06:51:18'),
(928, NULL, 'TIG  SPARES', '15', 'Invalid date', '0', '1', '2025-12-12 06:51:46', '2025-12-12 06:51:46'),
(929, NULL, 'TIG Welding Filler rod', '15', 'Invalid date', '0', '1', '2025-12-12 06:52:11', '2025-12-12 06:52:11'),
(930, NULL, 'TIG Welding Filler rod', '15', 'Invalid date', '0', '1', '2025-12-12 06:52:32', '2025-12-12 06:52:32'),
(931, NULL, 'Tig Welding Switch', '15', 'Invalid date', '0', '1', '2025-12-12 06:52:55', '2025-12-12 06:52:55'),
(932, NULL, 'Tower Bolt SS', '15', 'Invalid date', '0', '1', '2025-12-12 06:53:17', '2025-12-12 06:53:17'),
(933, NULL, 'Tower Bolt SS', '15', 'Invalid date', '0', '1', '2025-12-12 06:53:37', '2025-12-12 06:53:37'),
(934, NULL, 'Trolly  Revolving Wheel BLUE', '15', 'Invalid date', '0', '1', '2025-12-12 06:53:57', '2025-12-12 06:53:57'),
(935, NULL, 'Trolly Brake Wheel BLUE', '15', 'Invalid date', '0', '1', '2025-12-12 06:54:33', '2025-12-12 06:54:33'),
(936, NULL, 'Trolly Brake Wheel (Black)', '15', 'Invalid date', '0', '1', '2025-12-12 06:55:48', '2025-12-12 06:55:48'),
(937, NULL, 'Trolly Brake Wheel (Black)', '15', 'Invalid date', '0', '1', '2025-12-12 06:56:09', '2025-12-12 06:56:09'),
(938, NULL, 'Trolly Brake Wheel (White)', '15', 'Invalid date', '0', '1', '2025-12-12 06:57:26', '2025-12-12 06:57:26');
INSERT INTO `raw_materials_log` (`id`, `orderId`, `rawMaterial`, `qty`, `date`, `type`, `status`, `createdAt`, `updatedAt`) VALUES
(939, NULL, 'Trolly Metal Wheel', '15', 'Invalid date', '0', '1', '2025-12-12 06:58:01', '2025-12-12 06:58:01'),
(940, NULL, 'Trolly Revolving  Wheel (Black)', '15', 'Invalid date', '0', '1', '2025-12-12 06:58:22', '2025-12-12 06:58:22'),
(941, NULL, 'Trolly Revolving  Wheel (White)', '15', 'Invalid date', '0', '1', '2025-12-12 06:58:48', '2025-12-12 06:58:48'),
(942, NULL, 'Trolly Revolving  Wheel (White)', '15', 'Invalid date', '0', '1', '2025-12-12 06:59:10', '2025-12-12 06:59:10'),
(943, NULL, 'Trolly Revoving Wheel', '15', 'Invalid date', '0', '1', '2025-12-12 06:59:35', '2025-12-12 06:59:35'),
(944, NULL, 'Trolly Revolving Wheel (Black)', '15', 'Invalid date', '0', '1', '2025-12-12 06:59:56', '2025-12-12 06:59:56'),
(945, NULL, 'Trolly Wheel (Revolving)', '15', 'Invalid date', '0', '1', '2025-12-12 07:00:19', '2025-12-12 07:00:19'),
(946, NULL, 'Trolly Wheel fiber', '15', 'Invalid date', '0', '1', '2025-12-12 07:00:46', '2025-12-12 07:00:46'),
(947, NULL, 'Trolly Wheel Metal', '15', 'Invalid date', '0', '1', '2025-12-12 07:01:09', '2025-12-12 07:01:09'),
(948, NULL, 'Trolly Wheel PVC', '15', 'Invalid date', '0', '1', '2025-12-12 07:01:37', '2025-12-12 07:01:37'),
(949, NULL, 'Trolly Wheel PVC', '15', 'Invalid date', '0', '1', '2025-12-12 07:02:36', '2025-12-12 07:02:36'),
(950, NULL, 'Rubber Wheel Black', '15', 'Invalid date', '0', '1', '2025-12-12 07:03:01', '2025-12-12 07:03:01'),
(951, NULL, 'Break Wheel Rubber', '15', 'Invalid date', '0', '1', '2025-12-12 07:03:23', '2025-12-12 07:03:23'),
(952, NULL, 'Revolving Wheel Rubber', '15', 'Invalid date', '0', '1', '2025-12-12 07:03:49', '2025-12-12 07:03:49'),
(953, NULL, 'T-Square', '15', 'Invalid date', '0', '1', '2025-12-12 07:04:08', '2025-12-12 07:04:08'),
(954, NULL, 'Tungston Rod', '15', 'Invalid date', '0', '1', '2025-12-12 07:04:50', '2025-12-12 07:04:50'),
(955, NULL, 'Vaccum Bush', '15', 'Invalid date', '0', '1', '2025-12-12 09:45:30', '2025-12-12 09:45:30'),
(956, NULL, 'Vessel Handel pipe', '15', 'Invalid date', '0', '1', '2025-12-12 09:46:16', '2025-12-12 09:46:16'),
(957, NULL, 'Vessel Handel pipe', '15', 'Invalid date', '0', '1', '2025-12-12 09:46:47', '2025-12-12 09:46:47'),
(958, NULL, 'Vessel Lock Bush', '15', 'Invalid date', '0', '1', '2025-12-12 09:47:15', '2025-12-12 09:47:15'),
(959, NULL, 'Vessel Safety Valve', '15', 'Invalid date', '0', '1', '2025-12-12 09:47:42', '2025-12-12 09:47:42'),
(960, NULL, 'Wall Clamp', '15', 'Invalid date', '0', '1', '2025-12-12 09:48:26', '2025-12-12 09:48:26'),
(961, NULL, 'SS BUSH 1 \"', '15', 'Invalid date', '0', '1', '2025-12-12 09:49:26', '2025-12-12 09:49:26'),
(962, NULL, 'MS Bend', '15', 'Invalid date', '0', '1', '2025-12-12 09:49:47', '2025-12-12 09:49:47'),
(963, NULL, 'Weld Tee (OLD)', '15', 'Invalid date', '0', '1', '2025-12-12 09:50:49', '2025-12-12 09:50:49'),
(964, NULL, 'MS Welding Electrode', '15', 'Invalid date', '0', '1', '2025-12-12 09:51:38', '2025-12-12 09:51:38'),
(965, NULL, 'MS Welding Electrode', '15', 'Invalid date', '0', '1', '2025-12-12 09:52:14', '2025-12-12 09:52:14'),
(966, NULL, 'MS Welding Electrode', '15', 'Invalid date', '0', '1', '2025-12-12 09:52:47', '2025-12-12 09:52:47'),
(967, NULL, 'SS Welding Electrode', '15', 'Invalid date', '0', '1', '2025-12-12 09:53:16', '2025-12-12 09:53:16'),
(968, NULL, 'SS Welding Electrode', '15', 'Invalid date', '0', '1', '2025-12-12 09:57:28', '2025-12-12 09:57:28'),
(969, NULL, 'Welding Glass', '15', 'Invalid date', '0', '1', '2025-12-12 09:57:52', '2025-12-12 09:57:52'),
(970, NULL, 'Wet Grinder Wood Plate', '15', 'Invalid date', '0', '1', '2025-12-12 09:58:29', '2025-12-12 09:58:29'),
(971, NULL, 'Wood Hammer', '15', 'Invalid date', '0', '1', '2025-12-12 09:59:01', '2025-12-12 09:59:01'),
(972, NULL, 'Welding Glass', '15', 'Invalid date', '0', '1', '2025-12-12 09:59:25', '2025-12-12 09:59:25'),
(973, NULL, 'SS Bolt', '15', 'Invalid date', '0', '1', '2025-12-12 09:59:49', '2025-12-12 09:59:49'),
(974, NULL, 'SS Bolt', '15', 'Invalid date', '0', '1', '2025-12-12 10:00:04', '2025-12-12 10:00:04'),
(975, NULL, 'SS Nut', '15', 'Invalid date', '0', '1', '2025-12-12 10:00:33', '2025-12-12 10:00:33'),
(976, NULL, 'Burner Unit', '15', 'Invalid date', '0', '1', '2025-12-12 10:01:04', '2025-12-12 10:01:04'),
(977, NULL, 'BURNER UNIT', '15', 'Invalid date', '0', '1', '2025-12-12 10:01:27', '2025-12-12 10:01:27'),
(978, NULL, 'Burner Unit', '15', 'Invalid date', '0', '1', '2025-12-12 10:01:46', '2025-12-12 10:01:46'),
(979, NULL, 'BURNER UNIT', '15', 'Invalid date', '0', '1', '2025-12-12 10:02:05', '2025-12-12 10:02:05'),
(980, NULL, 'Burner UNIT', '15', 'Invalid date', '0', '1', '2025-12-12 10:02:27', '2025-12-12 10:02:27'),
(981, NULL, 'Mango piece (Iddly) BRASS', '15', 'Invalid date', '0', '1', '2025-12-12 10:02:59', '2025-12-12 10:02:59'),
(982, NULL, 'SS BUSH 1 1/2\"', '15', 'Invalid date', '0', '1', '2025-12-12 10:03:23', '2025-12-12 10:03:23'),
(983, NULL, 'GI Bolt', '15', 'Invalid date', '0', '1', '2025-12-12 10:03:48', '2025-12-12 10:03:48'),
(984, NULL, 'SS  Bend', '15', 'Invalid date', '0', '1', '2025-12-12 10:04:13', '2025-12-12 10:04:13'),
(985, NULL, 'GI Nut', '15', 'Invalid date', '0', '1', '2025-12-12 10:04:35', '2025-12-12 10:04:35'),
(986, NULL, 'MS FILLER ROD', '15', 'Invalid date', '0', '1', '2025-12-12 10:05:07', '2025-12-12 10:05:07'),
(987, NULL, 'Dosa Burner', '15', 'Invalid date', '0', '1', '2025-12-12 10:05:28', '2025-12-12 10:05:28'),
(988, NULL, 'Dosa Burner CENTER COUPLING', '15', 'Invalid date', '0', '1', '2025-12-12 10:05:50', '2025-12-12 10:05:50'),
(989, NULL, 'Square Ring 4 Center Support', '15', 'Invalid date', '0', '1', '2025-12-12 10:07:24', '2025-12-12 10:07:24'),
(990, NULL, 'Square Ring 8 Center Support', '15', 'Invalid date', '0', '1', '2025-12-12 10:07:56', '2025-12-12 10:07:56'),
(991, NULL, 'Round Ring 3 Supported', '15', 'Invalid date', '0', '1', '2025-12-12 10:08:46', '2025-12-12 10:08:46'),
(992, NULL, 'SS Square Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 10:10:14', '2025-12-12 10:10:14'),
(993, NULL, 'SS Square Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 10:10:35', '2025-12-12 10:10:35'),
(994, NULL, 'SS Round Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 10:10:59', '2025-12-12 10:10:59'),
(995, NULL, 'SS Square Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 10:11:19', '2025-12-12 10:11:19'),
(996, NULL, 'SS Square Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 10:11:40', '2025-12-12 10:11:40'),
(997, NULL, 'SS Round Rod', '15', 'Invalid date', '0', '1', '2025-12-12 10:12:02', '2025-12-12 10:12:02'),
(998, NULL, 'SS Round Rod', '15', 'Invalid date', '0', '1', '2025-12-12 10:12:36', '2025-12-12 10:12:36'),
(999, NULL, 'SS Square Pipe 304 18G', '15', 'Invalid date', '0', '1', '2025-12-12 10:12:59', '2025-12-12 10:12:59'),
(1000, NULL, 'Plywood', '15', 'Invalid date', '0', '1', '2025-12-12 10:13:33', '2025-12-12 10:13:33'),
(1001, NULL, 'Plywood', '15', 'Invalid date', '0', '1', '2025-12-12 10:14:06', '2025-12-12 10:14:06'),
(1002, NULL, 'SS Rectangle Pipe', '15', 'Invalid date', '0', '1', '2025-12-12 10:15:39', '2025-12-12 10:15:39'),
(1003, NULL, 'SS square pipe 16swg', '15', 'Invalid date', '0', '1', '2025-12-12 10:16:03', '2025-12-12 10:16:03'),
(1004, NULL, 'SS sheet', '15', 'Invalid date', '0', '1', '2025-12-12 10:16:27', '2025-12-12 10:16:27'),
(1005, NULL, 'SS angle', '15', 'Invalid date', '0', '1', '2025-12-12 10:17:14', '2025-12-12 10:17:14'),
(1006, NULL, 'SS angle', '15', 'Invalid date', '0', '1', '2025-12-12 10:17:47', '2025-12-12 10:17:47'),
(1007, NULL, 'SS angle', '15', 'Invalid date', '0', '1', '2025-12-12 10:18:23', '2025-12-12 10:18:23'),
(1008, NULL, 'Round ring 3 Supported', '15', 'Invalid date', '0', '1', '2025-12-12 10:18:43', '2025-12-12 10:18:43'),
(1009, NULL, 'SS bend', '15', 'Invalid date', '0', '1', '2025-12-12 10:19:04', '2025-12-12 10:19:04'),
(1010, NULL, 'Steam weight (5kg)', '15', 'Invalid date', '0', '1', '2025-12-12 10:19:27', '2025-12-12 10:19:27'),
(1011, NULL, 'HR PLATE', '15', 'Invalid date', '0', '1', '2025-12-12 10:19:48', '2025-12-12 10:19:48'),
(1012, NULL, 'HR PLATE', '15', 'Invalid date', '0', '1', '2025-12-12 10:20:08', '2025-12-12 10:20:08'),
(1013, NULL, 'HR PLATE', '15', 'Invalid date', '0', '1', '2025-12-12 10:20:30', '2025-12-12 10:20:30'),
(1014, NULL, 'HR PLATE', '15', 'Invalid date', '0', '1', '2025-12-12 10:20:50', '2025-12-12 10:20:51'),
(1015, NULL, 'MS L ANGLE', '15', 'Invalid date', '0', '1', '2025-12-12 10:21:10', '2025-12-12 10:21:10'),
(1016, NULL, 'MS L ANGLE', '15', 'Invalid date', '0', '1', '2025-12-12 10:21:33', '2025-12-12 10:21:33'),
(1017, NULL, 'MS  BAR', '15', 'Invalid date', '0', '1', '2025-12-12 10:21:54', '2025-12-12 10:21:54'),
(1018, NULL, 'MS  BAR', '15', 'Invalid date', '0', '1', '2025-12-12 10:22:19', '2025-12-12 10:22:19'),
(1019, NULL, 'MS SQUARE ROD', '15', 'Invalid date', '0', '1', '2025-12-12 10:22:50', '2025-12-12 10:22:50'),
(1020, NULL, 'Telescopic', '15', 'Invalid date', '0', '1', '2025-12-12 10:23:14', '2025-12-12 10:23:14'),
(1021, NULL, 'RN ACRYLIC SHEET', '15', 'Invalid date', '0', '1', '2025-12-12 10:23:36', '2025-12-12 10:23:36'),
(1022, NULL, 'Acrylic solid surface sheet', '15', 'Invalid date', '0', '1', '2025-12-12 10:23:56', '2025-12-12 10:23:56'),
(1023, NULL, 'Acrylic solid surface sheet', '15', 'Invalid date', '0', '1', '2025-12-12 10:24:17', '2025-12-12 10:24:17'),
(1024, NULL, 'Acrylic solid surface sheet', '15', 'Invalid date', '0', '1', '2025-12-12 10:24:37', '2025-12-12 10:24:37'),
(1025, NULL, 'Acrylic solid surface sheet', '15', 'Invalid date', '0', '1', '2025-12-12 10:24:56', '2025-12-12 10:24:56'),
(1026, NULL, 'Acrylic solid surface sheet', '15', 'Invalid date', '0', '1', '2025-12-12 10:25:15', '2025-12-12 10:25:15'),
(1027, NULL, 'Acrylic solid surface sheet', '15', 'Invalid date', '0', '1', '2025-12-12 10:25:39', '2025-12-12 10:25:39'),
(1028, NULL, 'MICA SHEET', '15', 'Invalid date', '0', '1', '2025-12-12 10:26:01', '2025-12-12 10:26:01'),
(1029, NULL, 'FOAME SHEET', '15', 'Invalid date', '0', '1', '2025-12-12 10:26:18', '2025-12-12 10:26:18'),
(1030, NULL, 'Welding Nozzle', '15', 'Invalid date', '0', '1', '2025-12-12 10:26:41', '2025-12-12 10:26:41'),
(1031, NULL, 'Hospital medicine trolley wheel - Revolving', '15', 'Invalid date', '0', '1', '2025-12-12 10:27:06', '2025-12-12 10:27:06'),
(1032, NULL, 'Hospital medicine trolley wheel - Break', '15', 'Invalid date', '0', '1', '2025-12-12 10:27:23', '2025-12-12 10:27:23'),
(1033, NULL, 'Hospital medicine trolley wheel - Break', '15', 'Invalid date', '0', '1', '2025-12-12 10:27:42', '2025-12-12 10:27:42'),
(1034, NULL, 'Trolly Wheel (Break)', '15', 'Invalid date', '0', '1', '2025-12-12 10:27:59', '2025-12-12 10:27:59'),
(1035, NULL, 'Hospital medicine trolley wheel - Revolving', '15', 'Invalid date', '0', '1', '2025-12-12 10:28:18', '2025-12-12 10:28:18'),
(1036, NULL, 'Vessel lock Tee', '15', 'Invalid date', '0', '1', '2025-12-12 10:28:37', '2025-12-12 10:28:37'),
(1037, NULL, 'SS Stool Top', '15', 'Invalid date', '0', '1', '2025-12-12 10:28:56', '2025-12-12 10:28:56'),
(1038, NULL, 'S.S PLAIN  Washer', '15', 'Invalid date', '0', '1', '2025-12-12 10:29:17', '2025-12-12 10:29:17'),
(1039, NULL, 'ROSE GOLD SHEET', '15', 'Invalid date', '0', '1', '2025-12-12 10:29:38', '2025-12-12 10:29:38'),
(1040, NULL, 'Tig welding torch cap', '15', 'Invalid date', '0', '1', '2025-12-12 10:29:58', '2025-12-12 10:29:58');

-- --------------------------------------------------------

--
-- Table structure for table `requested_cons_materials`
--

CREATE TABLE `requested_cons_materials` (
  `id` int(11) NOT NULL,
  `requestId` text NOT NULL,
  `materialId` text NOT NULL,
  `materialName` text NOT NULL,
  `status` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requested_cons_materials`
--

INSERT INTO `requested_cons_materials` (`id`, `requestId`, `materialId`, `materialName`, `status`, `createdAt`, `updatedAt`, `quantity`) VALUES
(3, '6', '10', 'BHEL Stool\'s Pipe Bending Die Set 3/4\"', 'Fulfilled', '2025-12-13 12:50:52', '2025-12-13 18:20:52', 1),
(4, '7', '7', 'Adjustable Spanner', 'Fulfilled', '2025-12-13 18:31:03', '2025-12-13 18:33:13', 1),
(5, '8', '20', 'Die Set (New)', 'Fulfilled', '2025-12-13 18:49:51', '2025-12-13 18:50:43', 5),
(6, '9', '70', 'TestMat', 'Fulfilled', '2025-12-13 18:54:18', '2025-12-13 18:54:18', 10),
(7, '10', '61', 'Square File', 'Fulfilled', '2025-12-13 18:56:32', '2025-12-13 18:57:05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stock_assignments`
--

CREATE TABLE `stock_assignments` (
  `id` int(11) NOT NULL,
  `orderId` text NOT NULL,
  `rawMaterial` text NOT NULL,
  `rawMaterialId` text NOT NULL,
  `quantityAssigned` text NOT NULL,
  `assignedBy` text NOT NULL,
  `assignedDate` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL,
  `updatedAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `stock_assignments`
--

INSERT INTO `stock_assignments` (`id`, `orderId`, `rawMaterial`, `rawMaterialId`, `quantityAssigned`, `assignedBy`, `assignedDate`, `notes`, `status`, `createdAt`, `updatedAt`) VALUES
(59, '17', 'SS 304 Grade sheet 8x4 1.2mm', '11', '11', 'Warehouse User 1', '2025-10-17', 'test delivery', '1', '2025-10-17 14:15:29', '2025-10-17 14:15:29'),
(60, '16', 'SS 304 Grade sheet 8x4 1.2mm', '11', '2', 'Warehouse User 2', '2025-10-17', 'www', '1', '2025-10-17 14:45:12', '2025-10-17 14:45:12'),
(61, '15', 'SS 304 Grade sheet 8x4 1.2mm', '11', '1', 'Warehouse User 1', '2025-11-01', 'Stock assignment from order processing', '1', '2025-11-01 16:47:22', '2025-11-01 16:47:22'),
(64, '18', 'bolt', '12', '5', 'Warehouse User 1', '2025-11-09', 'Stock assignment from order processing', '1', '2025-11-09 13:39:59', '2025-11-09 13:39:59'),
(65, '18', 'TEST', '14', '2', 'Warehouse User 1', '2025-11-09', 'Stock assignment from order processing', '1', '2025-11-09 13:39:59', '2025-11-09 13:39:59'),
(70, '19', 'bolt', '12', '7', 'whm test', '2025-11-11', 'Stock assignment from order processing', '1', '2025-11-11 11:37:07', '2025-11-11 11:37:07'),
(71, '19', 'TEST', '14', '5', 'whm test', '2025-11-11', 'Stock assignment from order processing', '1', '2025-11-11 11:37:07', '2025-11-11 11:37:07');

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE `terms` (
  `id` int(11) NOT NULL,
  `title` mediumtext NOT NULL,
  `description` mediumtext NOT NULL,
  `status` mediumtext NOT NULL,
  `createdAt` mediumtext NOT NULL,
  `updatedAt` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`id`, `title`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(6, '2 weeks', 'PAYMENT: 75% ADVANCE, 25% AT THE TIME OF DELIVERY.\nTRANSPORT: EXTRA\nDELIVERY: 2 week from the date of your confirmed order.\nMATERIAL VERIFICATION: Before the delivery schedule we inform you that the\nequipment’s is ready for delivery. You or your authorized person has come to our factory\nand inspect the equipments. To confirm that the equipment are perfect as per your PO or your requirement. Then only we cannot able to dispatch the equipment.\nWORKS: Civil work, Electrical work, water plumbing line work, unloading of materials,\nscuff folding work , Laying of new gas pipe line works ,cylinder cost & deposit all are at-your scope.\nGUARANTEE: For 1 Year against any manufacturing defects.\nSERVICE: Service on calls by priority basis.\nVALIDITY: This quotation valid up to 30 Days from the date of quotation', '1', '2025-10-05 18:26:10', '2025-10-05 18:26:10'),
(7, '*', 'PAYMENT: 75% ADVANCE, 25% AT THE TIME OF DELIVERY.\nTRANSPORT: EXTRA\nDELIVERY: 2 week from the date of your confirmed order.\nMATERIAL VERIFICATION: Before the delivery schedule we inform you that the\nequipment’s is ready for delivery. You or your authorized person has come to our factory\nand inspect the equipments. To confirm that the equipment are perfect as per your PO or your requirement. Then only we cannot able to dispatch the equipment.\nWORKS: Civil work, Electrical work, water plumbing line work, unloading of materials,\nscuff folding work , Laying of new gas pipe line works ,cylinder cost & deposit all are at-your scope.\nGUARANTEE: For 1 Year against any manufacturing defects.\nSERVICE: Service on calls by priority basis.\nVALIDITY: This quotation valid up to 30 Days from the date of quotation', '1', '2025-10-24 06:21:28', '2025-10-24 06:21:28'),
(8, '3 weeks', 'PAYMENT: 75% ADVANCE, 25% AT THE TIME OF DELIVERY.\nDELIVERY: 3 weeks from the date of your confirmed order.\nTRANSPORT: Packing and forwarding charges, freight charges as an extra as actual, if\nyou are going to arrange transport by your own have to be intimated to us earlier.\nWORKS: Civil work, Electrical work, water plumbing line work, unloading of materials,\nscuff folding work ,Laying of new gas pipe line works, cylinder cost & deposit all are at your scope.\nMATERIAL VERIFICATION: After receipt of material/completion of work you have\nto verify the material and testing of equipments to be carry out with the help of our\ntechnician.\nGUARANTEE: For 1 Year against any manufacturing defects.\nSERVICE: Service on calls by priority basis.\nVALIDITY: This quotation valid upto 30 Days from the date of quotation.', '1', '2025-10-24 09:41:50', '2025-10-24 09:41:50');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `contactPerson` text NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `address` text NOT NULL,
  `gstNumber` text DEFAULT NULL,
  `paymentTerms` text NOT NULL,
  `status` text DEFAULT NULL,
  `createdAt` text DEFAULT NULL,
  `updatedAt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `name`, `contactPerson`, `email`, `phone`, `address`, `gstNumber`, `paymentTerms`, `status`, `createdAt`, `updatedAt`) VALUES
(8, 'Chris Benn', 'Mr.Stephen', 'stephen@chris-benn.com', '9840569817', '#15, St.Antony street, Charles nagar, Pattabiram, Chennai - 600072', '33AHPPA2683P1ZX', '15', '1', '2025-10-16 12:21:26', '2025-10-16 12:21:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addons`
--
ALTER TABLE `addons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `combo`
--
ALTER TABLE `combo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consumable_materials`
--
ALTER TABLE `consumable_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consumable_materials_request`
--
ALTER TABLE `consumable_materials_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consumable_stock_logs`
--
ALTER TABLE `consumable_stock_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `estimation`
--
ALTER TABLE `estimation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `est_products`
--
ALTER TABLE `est_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `est_product_addons`
--
ALTER TABLE `est_product_addons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mapping_products`
--
ALTER TABLE `mapping_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_deadline`
--
ALTER TABLE `order_deadline`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_rawmaterial`
--
ALTER TABLE `order_rawmaterial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_materials`
--
ALTER TABLE `raw_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raw_materials_log`
--
ALTER TABLE `raw_materials_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requested_cons_materials`
--
ALTER TABLE `requested_cons_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_assignments`
--
ALTER TABLE `stock_assignments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addons`
--
ALTER TABLE `addons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `combo`
--
ALTER TABLE `combo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `consumable_materials`
--
ALTER TABLE `consumable_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `consumable_materials_request`
--
ALTER TABLE `consumable_materials_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `consumable_stock_logs`
--
ALTER TABLE `consumable_stock_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `estimation`
--
ALTER TABLE `estimation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `est_products`
--
ALTER TABLE `est_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `est_product_addons`
--
ALTER TABLE `est_product_addons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `mapping_products`
--
ALTER TABLE `mapping_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `order_deadline`
--
ALTER TABLE `order_deadline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `order_rawmaterial`
--
ALTER TABLE `order_rawmaterial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `purchase_order_items`
--
ALTER TABLE `purchase_order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `raw_materials`
--
ALTER TABLE `raw_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1042;

--
-- AUTO_INCREMENT for table `raw_materials_log`
--
ALTER TABLE `raw_materials_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1041;

--
-- AUTO_INCREMENT for table `requested_cons_materials`
--
ALTER TABLE `requested_cons_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `stock_assignments`
--
ALTER TABLE `stock_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
