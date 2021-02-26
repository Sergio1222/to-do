
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL,
  `task_description` varchar(100) NOT NULL,
  `todo_list_id` int(10) UNSIGNED NOT NULL,
  `date` timestamp NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Complite task or not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tasks` (`task_id`, `task_description`, `todo_list_id`, `date`, `status`) VALUES
(29, 'add active task', 6, '2021-02-24 12:43:44', 1),
(30, 'Add inactive task', 6, '2021-02-24 12:44:16', 0),
(31, 'Add new todoList active task', 7, '2021-02-24 12:44:57', 1),
(32, 'Add new todoList Inactive task', 7, '2021-02-24 12:45:06', 0);

CREATE TABLE `todo_lists` (
  `id` int(10) UNSIGNED NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `todo_lists` (`id`, `create_at`) VALUES
(6, '2021-02-24 12:41:49'),
(7, '2021-02-24 12:44:44');

ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `todo_list_id` (`todo_list_id`);

ALTER TABLE `todo_lists`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tasks`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

ALTER TABLE `todo_lists`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`todo_list_id`) REFERENCES `todo_lists` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
