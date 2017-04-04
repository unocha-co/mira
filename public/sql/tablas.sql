SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kobo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL,
  `value` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `respondent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boroughs`
--

CREATE TABLE `boroughs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `keyvar` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `label` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `parent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `text_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `keyvar` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `parent` int(11) DEFAULT NULL,
  `utilities` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `q_text`
--

CREATE TABLE `q_text` (
  `id` int(11) NOT NULL,
  `text` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respondents`
--

CREATE TABLE `respondents` (
  `id` int(11) NOT NULL,
  `poblacion` text COLLATE utf8_spanish_ci NOT NULL,
  `rol` text COLLATE utf8_spanish_ci NOT NULL,
  `surv_bor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `surveys`
--

CREATE TABLE `surveys` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `survey_borough`
--

CREATE TABLE `survey_borough` (
  `id` int(11) NOT NULL,
  `survey_id` int(11) NOT NULL,
  `borough_id` int(11) NOT NULL,
  `starting_date` datetime NOT NULL DEFAULT '2001-01-01 00:00:00',
  `finish_date` datetime NOT NULL DEFAULT '2002-02-02 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `topics`
--

CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `keyvar` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `surv_bor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `option_id` (`option_id`);

--
-- Indices de la tabla `boroughs`
--
ALTER TABLE `boroughs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `boroughs_fk0` (`department_id`);

--
-- Indices de la tabla `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indices de la tabla `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_fk0` (`topic_id`),
  ADD KEY `text_id` (`text_id`);

--
-- Indices de la tabla `q_text`
--
ALTER TABLE `q_text`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `respondents`
--
ALTER TABLE `respondents`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `survey_borough`
--
ALTER TABLE `survey_borough`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_id` (`survey_id`),
  ADD KEY `borough_id` (`borough_id`);

--
-- Indices de la tabla `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_id` (`surv_bor_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=896;
--
-- AUTO_INCREMENT de la tabla `boroughs`
--
ALTER TABLE `boroughs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=825;
--
-- AUTO_INCREMENT de la tabla `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;
--
-- AUTO_INCREMENT de la tabla `q_text`
--
ALTER TABLE `q_text`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT de la tabla `respondents`
--
ALTER TABLE `respondents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `survey_borough`
--
ALTER TABLE `survey_borough`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_fk2` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`);

--
-- Filtros para la tabla `boroughs`
--
ALTER TABLE `boroughs`
  ADD CONSTRAINT `boroughs_fk0` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);

--
-- Filtros para la tabla `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `option_fk0` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Filtros para la tabla `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `question_fk0` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`),
  ADD CONSTRAINT `question_fk1` FOREIGN KEY (`text_id`) REFERENCES `q_text` (`id`);

--
-- Filtros para la tabla `survey_borough`
--
ALTER TABLE `survey_borough`
  ADD CONSTRAINT `s_b_fk0` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`),
  ADD CONSTRAINT `s_b_fk1` FOREIGN KEY (`borough_id`) REFERENCES `boroughs` (`id`);

--
-- Filtros para la tabla `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `topic_fk0` FOREIGN KEY (`surv_bor_id`) REFERENCES `survey_borough` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
