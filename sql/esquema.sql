-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2025 a las 22:02:22
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `baja_de_equipos`
--

CREATE TABLE `baja_de_equipos` (
  `Id_baja_equipos` int(11) NOT NULL,
  `Equipo_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL,
  `Fecha_baja` date NOT NULL,
  `Motivo_baja` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_equipo_informatico`
--

CREATE TABLE `categorias_equipo_informatico` (
  `Categoria_id` int(11) NOT NULL,
  `Nom_categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `categorias_equipo_informatico`
--

INSERT INTO `categorias_equipo_informatico` (`Categoria_id`, `Nom_categoria`) VALUES
(4, 'Dispositivos de almacenamiento'),
(2, 'Dispositivos de comunicación'),
(3, 'Dispositivos de red'),
(1, 'Equipos de computo'),
(5, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id_departamento` int(11) NOT NULL,
  `nombre_departamento` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id_departamento`, `nombre_departamento`) VALUES
(4, 'incidencias'),
(1, 'Sistemas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `devolucion_de_equipos`
--

CREATE TABLE `devolucion_de_equipos` (
  `Devolucion_id` int(11) NOT NULL,
  `Equipo_id` int(11) NOT NULL,
  `Empleado_id` int(11) NOT NULL,
  `Fecha_autorizacion` date NOT NULL,
  `User_id` int(11) NOT NULL,
  `Comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados_resguardantes`
--

CREATE TABLE `empleados_resguardantes` (
  `Empleado_id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Primer_apellido` varchar(100) NOT NULL,
  `Segundo_apellido` varchar(100) NOT NULL,
  `Empresa_id` int(11) NOT NULL,
  `Obra_id` int(11) NOT NULL,
  `Correo_electronico` varchar(255) NOT NULL,
  `id_frente` int(11) NOT NULL,
  `User_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `Empresa_id` int(11) NOT NULL,
  `Nom_empresa` varchar(255) NOT NULL,
  `Nom_corto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`Empresa_id`, `Nom_empresa`, `Nom_corto`) VALUES
(2, 'OPC Ingeniería Y Construcción', 'OPCIC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos_informaticos`
--

CREATE TABLE `equipos_informaticos` (
  `Equipo_id` int(11) NOT NULL,
  `Id_subcategoria` int(11) NOT NULL,
  `Id_marca` int(11) NOT NULL,
  `Modelo` varchar(100) NOT NULL,
  `Num_serie` varchar(100) NOT NULL,
  `Especificacion` text NOT NULL,
  `Fecha_compra` date DEFAULT NULL,
  `Fecha_garantia` date DEFAULT NULL,
  `Importe` decimal(10,2) NOT NULL,
  `Direccion_mac_wifi` varchar(17) DEFAULT NULL,
  `Direccion_mac_ethernet` varchar(17) DEFAULT NULL,
  `Num_ref_compaq` varchar(100) DEFAULT NULL,
  `Service_tag` varchar(100) NOT NULL,
  `Comentarios` text DEFAULT NULL,
  `Status_id` int(11) NOT NULL,
  `miId` varchar(50) NOT NULL,
  `num_telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `Factura_id` int(11) NOT NULL,
  `Factura_path` varchar(255) NOT NULL,
  `Equipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `frente`
--

CREATE TABLE `frente` (
  `Frente_id` int(11) NOT NULL,
  `Nom_frente` varchar(255) NOT NULL,
  `numero_frente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `frente`
--

INSERT INTO `frente` (`Frente_id`, `Nom_frente`, `numero_frente`) VALUES
(26, 'Pilas y Estructura', 414),
(27, 'Servicios Generales', 661),
(28, 'Civil', 401),
(29, 'Mecanico', 402),
(30, 'Tuberías', 403),
(31, 'Electrico', 404),
(32, 'Pintura y Aislamiento', 406),
(33, 'Ingenieria', 10),
(34, 'Procura', 20),
(35, 'Instrumentacion y control', 405),
(36, 'Seguridad indistrial', 407),
(37, 'Aire Acondicionado', 408),
(38, 'Telecomunicaciones', 409),
(39, 'Mantenimiento industrial', 410),
(40, 'Maquinaria', 80),
(41, 'Indirectos', 90),
(42, 'Centro de servicio', 411),
(43, 'Soldadura', 412),
(44, 'Mantto. Inmuebles', 928),
(45, 'Jisor', 413),
(46, 'Indirectos Maq', 95),
(47, 'Direccion Operativa', 641),
(48, 'DITE AIR', 415),
(103, 'Direccion General', 621),
(104, 'Gerencia de Calidad, Seg. y M.A.', 622),
(105, 'Direccion de Admon y Finanzas', 631),
(106, 'Fiscal', 632),
(107, 'Contabilidad', 635),
(108, 'Sistemas', 636),
(109, 'Tesoreria', 637),
(110, 'Control de Proyectos', 642),
(111, 'Concursos', 644),
(112, 'Dirección de Comercialización', 651),
(113, 'Gerencia de Construcción', 646),
(114, 'Juridico', 638),
(115, 'Compras', 634),
(116, 'Almacen', 639),
(117, 'Oficina Xalapa', 663),
(118, 'Recursos Humanos', 633),
(121, 'OBRA', 0),
(122, 'Calidad', 6022),
(123, 'Topografo', 1),
(124, 'Supervisor de Seguridad', 999);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos_de_los_equipos`
--

CREATE TABLE `gastos_de_los_equipos` (
  `Id_gastos` int(11) NOT NULL,
  `Equipo_id` int(11) NOT NULL,
  `orden_compra` int(11) DEFAULT NULL,
  `Piezas` varchar(100) NOT NULL,
  `Importe` decimal(10,2) NOT NULL,
  `Fecha` date NOT NULL,
  `Recibo_pdf` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `Imagen_id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Tipo_mime` varchar(50) NOT NULL,
  `Datos_imagen` varchar(255) DEFAULT NULL,
  `Equipo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

CREATE TABLE `incidencias` (
  `Incidencia_id` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `Usuario` int(11) NOT NULL,
  `Area` varchar(255) NOT NULL,
  `Equipo` int(11) NOT NULL,
  `Falla` text NOT NULL,
  `Diagnostico` text NOT NULL,
  `Entrega` date NOT NULL,
  `Hora_entrega` time NOT NULL,
  `Status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento`
--

CREATE TABLE `mantenimiento` (
  `Id_mantenimiento` int(11) NOT NULL,
  `Equipo_id` int(11) NOT NULL,
  `User_email` varchar(255) NOT NULL,
  `inicio_mante` date NOT NULL,
  `horaInicio` time NOT NULL,
  `resguardante` varchar(255) NOT NULL,
  `herramientas` text NOT NULL,
  `otros` text NOT NULL,
  `termino_mante` date DEFAULT NULL,
  `hora_termino` time DEFAULT NULL,
  `Motivo_mantenimiento` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca_del_equipo`
--

CREATE TABLE `marca_del_equipo` (
  `Id_Marca` int(11) NOT NULL,
  `Nom_marca` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `marca_del_equipo`
--

INSERT INTO `marca_del_equipo` (`Id_Marca`, `Nom_marca`) VALUES
(6, 'ACER'),
(13, 'ACTECK'),
(24, 'AOC'),
(33, 'APC'),
(4, 'ASUS'),
(15, 'BENQ'),
(23, 'BROTHER'),
(5, 'DELL'),
(16, 'EPSON'),
(21, 'EVOTEC'),
(20, 'FORZA'),
(25, 'GATEWAY'),
(29, 'GHIA'),
(40, 'HONOR'),
(2, 'HP'),
(1, 'HUAWEI'),
(30, 'HYTERA'),
(14, 'INTEL'),
(39, 'IPHONE'),
(35, 'KOBLENZ'),
(3, 'LENOVO'),
(22, 'LG'),
(26, 'MSI'),
(27, 'OPPO'),
(18, 'QUARONI'),
(31, 'REDMI'),
(19, 'SAMSUNG'),
(38, 'SOYEALINK'),
(17, 'STARLINK'),
(34, 'TELCEL'),
(7, 'TOSHIBA'),
(12, 'VORAGO'),
(28, 'XERON'),
(32, 'XIAOMI'),
(37, 'ZTE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obras`
--

CREATE TABLE `obras` (
  `Obra_id` int(11) NOT NULL,
  `Nombre_obra` varchar(255) NOT NULL,
  `Nom_corto_obra` varchar(50) NOT NULL,
  `Num_obra` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `obras`
--

INSERT INTO `obras` (`Obra_id`, `Nombre_obra`, `Nom_corto_obra`, `Num_obra`) VALUES
(1, 'Construcción de obra Eléctrica Compresores de Gas', 'Estacion de compresion O.Electrica', '8402'),
(2, 'Construcción de pilas de torre de enfriamiento para ampliación de planta', 'PILAS Torre Agua de Enfriamiento', '7917'),
(3, 'TUBERIAS PARA CLORO LIQUIDO LICUACION', 'Tuberías para cloro LICUACIÓN', '791601'),
(4, 'Construcción de Obra Civil base de transformador eléctrico', 'Base Transformador Electrico', '7918'),
(5, 'Construcción de obra civil Vialidades del TIAC', 'Vialidades del TIAC', '85'),
(6, 'Construcción de aislamiento térmico en casa de filtros SES 1 y SES 2', 'Aislamiento termico SES 1 y 2', '8501'),
(7, 'Cimentación RACK IQUISA norte ET1', 'Cimentacion Rack Norte IQUISA', '7919'),
(8, 'Proyecto Reconfiguración Área Cedida Terminal Marítima INSA', 'Pilotes ALTAMIRA', '86'),
(9, 'Taller de Prefabricado', 'Taller de Prefabricado', '19'),
(10, 'Instalación de tuberías bomba de cloro II', 'Tuberías de cloro bomba II', '8701'),
(11, 'Tuberías para cloro liquido llenadera II', 'Tuberías para llenadera II', '8702'),
(12, 'Reparacion y Mantto del Almacen', 'Reparacion y Mantto del Almacen', '8801'),
(13, 'Mantto Electrico Ofnas', 'Mantto Electrico Ofnas', '8802'),
(14, 'Cimentación profunda CONVERTIDOR', 'Pilas INNOPHOS', '8106'),
(15, 'Montaje Estructura Rack Iquisa Norte ET1', 'Montaje RACK IQUISA', '8703'),
(16, 'Oficinas Centrales', 'Oficinas Centrales', '60'),
(17, 'Cimentacion Caldera', 'Cimentacion caldera', '8109'),
(18, 'LM Cimentaciones de Equipos Fase1', 'Cimentación de Equipos Fase 1', '8503'),
(19, 'Paro de planta 2025', 'P planta 25', '8110'),
(20, 'Cimentación Plataforma', 'Cimentación Plataforma', '8111'),
(21, 'SISA', 'SISA', '8504'),
(22, 'Tubería para cloro', 'Tubería para cloro', '8704'),
(23, 'Spool de acero inoxidable de 4', 'Spool de acero inoxidable de 4', '9102');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obra_empresa`
--

CREATE TABLE `obra_empresa` (
  `Obra_id` int(11) NOT NULL,
  `Empresa_id` int(11) NOT NULL,
  `Empleado_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obra_frente`
--

CREATE TABLE `obra_frente` (
  `Obra_id` int(11) NOT NULL,
  `Frente_id` int(11) NOT NULL,
  `Empleado_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resguardos_de_equipos`
--

CREATE TABLE `resguardos_de_equipos` (
  `Resguardo_id` int(11) NOT NULL,
  `Equipo_id` int(11) NOT NULL,
  `Empleado_id` int(11) NOT NULL,
  `Fecha_autorizacion` date NOT NULL,
  `User_id` int(11) NOT NULL,
  `Comentario` text NOT NULL,
  `Identificador_resguardo` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'resguardado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `Rol_id` int(11) NOT NULL,
  `Nombre_rol` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`Rol_id`, `Nombre_rol`) VALUES
(1, 'Administrador'),
(3, 'empleado'),
(2, 'Usuario Estandar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `Status_id` int(11) NOT NULL,
  `Nom_Status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`Status_id`, `Nom_Status`) VALUES
(4, 'De baja'),
(1, 'Disponible'),
(3, 'En mantenimiento'),
(2, 'En resguardo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategoria`
--

CREATE TABLE `subcategoria` (
  `Subcategoria_id` int(11) NOT NULL,
  `Nom_subcategoria` varchar(100) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `subcategoria`
--

INSERT INTO `subcategoria` (`Subcategoria_id`, `Nom_subcategoria`, `id_categoria`) VALUES
(1, 'Laptop', 1),
(2, 'Monitor', 1),
(3, 'Computadora de escritorio', 1),
(4, 'All In One', 1),
(5, 'Impresora', 1),
(6, 'Proyector', 1),
(7, 'Servidor', 1),
(8, 'Teléfono', 2),
(9, 'Radio', 2),
(10, 'Batería de radio', 2),
(11, 'Teléfonos IP', 2),
(12, 'Router', 3),
(13, 'Modem', 3),
(14, 'Switch', 3),
(15, 'Acesspoint', 3),
(16, 'Fortinet', 3),
(17, 'Conmutador telefónico', 3),
(18, 'DVR DE CCtv', 3),
(19, 'UPS', 3),
(20, 'Regulador de voltaje', 3),
(21, 'Unidad de respaldo', 4),
(22, 'Bocina', 5),
(23, 'Centro de carga', 5),
(24, 'Reloj checador', 5),
(25, 'Llave neodata', 5),
(41, 'Minicpu', 1),
(42, 'Antena', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `User_id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Primer_apellido` varchar(100) NOT NULL,
  `Segundo_apellido` varchar(100) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Rol_id` int(11) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `departamento_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`User_id`, `Nombre`, `Primer_apellido`, `Segundo_apellido`, `Contraseña`, `Rol_id`, `correo_electronico`, `departamento_id`) VALUES
(12, 'Eliam', 'Jimenez', 'Santiago', '$2y$10$6hrc1Rl98OGOTWbrRxmqQ.OKcgePE1lpfimbZm8XGJe3lfSWZSvSW', 1, 'ejimenez@grupoopc.com', 1),
(76, 'Eliam', 'Jimenez', 'Santiago', '$2y$10$3N2cC13EsjKNN8JpAUDj2un2g292sU4m10Llgx.6TQh64LAV1k7Ri', 3, 'ejimenezs@grupoopc.com', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `baja_de_equipos`
--
ALTER TABLE `baja_de_equipos`
  ADD PRIMARY KEY (`Id_baja_equipos`),
  ADD KEY `Equipo_id` (`Equipo_id`),
  ADD KEY `User_id` (`User_id`);

--
-- Indices de la tabla `categorias_equipo_informatico`
--
ALTER TABLE `categorias_equipo_informatico`
  ADD PRIMARY KEY (`Categoria_id`),
  ADD UNIQUE KEY `nombre_cat` (`Nom_categoria`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id_departamento`),
  ADD UNIQUE KEY `nombre_departamento` (`nombre_departamento`);

--
-- Indices de la tabla `devolucion_de_equipos`
--
ALTER TABLE `devolucion_de_equipos`
  ADD PRIMARY KEY (`Devolucion_id`),
  ADD KEY `Equipo_id` (`Equipo_id`),
  ADD KEY `Empleado_id` (`Empleado_id`),
  ADD KEY `User_id` (`User_id`);

--
-- Indices de la tabla `empleados_resguardantes`
--
ALTER TABLE `empleados_resguardantes`
  ADD PRIMARY KEY (`Empleado_id`),
  ADD KEY `FK_Empresa_Empleado` (`Empresa_id`),
  ADD KEY `FK_Obra_Empleado` (`Obra_id`),
  ADD KEY `FK_id_frente` (`id_frente`),
  ADD KEY `FK_User_Empleado` (`User_id`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`Empresa_id`),
  ADD UNIQUE KEY `nom_empresa` (`Nom_empresa`),
  ADD UNIQUE KEY `nom_corto_empresa` (`Nom_corto`);

--
-- Indices de la tabla `equipos_informaticos`
--
ALTER TABLE `equipos_informaticos`
  ADD PRIMARY KEY (`Equipo_id`),
  ADD UNIQUE KEY `tag_service` (`Service_tag`),
  ADD UNIQUE KEY `num_serie` (`Num_serie`),
  ADD UNIQUE KEY `miId` (`miId`),
  ADD UNIQUE KEY `miId_2` (`miId`),
  ADD KEY `FK_Categoria` (`Id_subcategoria`),
  ADD KEY `FK_Marca` (`Id_marca`),
  ADD KEY `FK_Status_id` (`Status_id`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`Factura_id`),
  ADD KEY `FK_Equipo_id_facturas` (`Equipo_id`);

--
-- Indices de la tabla `frente`
--
ALTER TABLE `frente`
  ADD PRIMARY KEY (`Frente_id`),
  ADD UNIQUE KEY `frente_unico` (`Nom_frente`),
  ADD UNIQUE KEY `numero_frente` (`numero_frente`);

--
-- Indices de la tabla `gastos_de_los_equipos`
--
ALTER TABLE `gastos_de_los_equipos`
  ADD PRIMARY KEY (`Id_gastos`),
  ADD KEY `FK_Equipo_Gastos` (`Equipo_id`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`Imagen_id`),
  ADD KEY `FK_Equipo_id` (`Equipo_id`);

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD PRIMARY KEY (`Incidencia_id`),
  ADD KEY `FK_Usuario_Incidencia` (`Usuario`),
  ADD KEY `FK_Equipo_Incidencia` (`Equipo`);

--
-- Indices de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  ADD PRIMARY KEY (`Id_mantenimiento`),
  ADD KEY `Equipo_id` (`Equipo_id`),
  ADD KEY `User_email` (`User_email`);

--
-- Indices de la tabla `marca_del_equipo`
--
ALTER TABLE `marca_del_equipo`
  ADD PRIMARY KEY (`Id_Marca`),
  ADD UNIQUE KEY `marca_unica` (`Nom_marca`);

--
-- Indices de la tabla `obras`
--
ALTER TABLE `obras`
  ADD PRIMARY KEY (`Obra_id`),
  ADD UNIQUE KEY `nom_obra` (`Nombre_obra`),
  ADD UNIQUE KEY `nom_corto_obra` (`Nom_corto_obra`),
  ADD UNIQUE KEY `numero_obra` (`Num_obra`);

--
-- Indices de la tabla `obra_empresa`
--
ALTER TABLE `obra_empresa`
  ADD PRIMARY KEY (`Obra_id`,`Empresa_id`,`Empleado_id`),
  ADD KEY `FK_ObraEmpresa_Empresa` (`Empresa_id`);

--
-- Indices de la tabla `obra_frente`
--
ALTER TABLE `obra_frente`
  ADD PRIMARY KEY (`Obra_id`,`Frente_id`,`Empleado_id`),
  ADD KEY `FK_ObraFrente_Frente` (`Frente_id`);

--
-- Indices de la tabla `resguardos_de_equipos`
--
ALTER TABLE `resguardos_de_equipos`
  ADD PRIMARY KEY (`Resguardo_id`),
  ADD KEY `FK_Equipo_Resguardo` (`Equipo_id`),
  ADD KEY `FK_Empleado_Resguardo` (`Empleado_id`),
  ADD KEY `FK_User_Resguardo` (`User_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`Rol_id`),
  ADD UNIQUE KEY `nom_ro` (`Nombre_rol`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`Status_id`),
  ADD UNIQUE KEY `nombre_status` (`Nom_Status`);

--
-- Indices de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD PRIMARY KEY (`Subcategoria_id`),
  ADD UNIQUE KEY `nombre_subcategoria` (`Nom_subcategoria`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`User_id`),
  ADD UNIQUE KEY `correo_unico` (`correo_electronico`),
  ADD KEY `FK_Rol` (`Rol_id`),
  ADD KEY `departamento_id` (`departamento_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `baja_de_equipos`
--
ALTER TABLE `baja_de_equipos`
  MODIFY `Id_baja_equipos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias_equipo_informatico`
--
ALTER TABLE `categorias_equipo_informatico`
  MODIFY `Categoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id_departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `devolucion_de_equipos`
--
ALTER TABLE `devolucion_de_equipos`
  MODIFY `Devolucion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados_resguardantes`
--
ALTER TABLE `empleados_resguardantes`
  MODIFY `Empleado_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `Empresa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `equipos_informaticos`
--
ALTER TABLE `equipos_informaticos`
  MODIFY `Equipo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `Factura_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `frente`
--
ALTER TABLE `frente`
  MODIFY `Frente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT de la tabla `gastos_de_los_equipos`
--
ALTER TABLE `gastos_de_los_equipos`
  MODIFY `Id_gastos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `Imagen_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  MODIFY `Incidencia_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  MODIFY `Id_mantenimiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `marca_del_equipo`
--
ALTER TABLE `marca_del_equipo`
  MODIFY `Id_Marca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `obras`
--
ALTER TABLE `obras`
  MODIFY `Obra_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `resguardos_de_equipos`
--
ALTER TABLE `resguardos_de_equipos`
  MODIFY `Resguardo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `Rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `Status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  MODIFY `Subcategoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `User_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `baja_de_equipos`
--
ALTER TABLE `baja_de_equipos`
  ADD CONSTRAINT `baja_de_equipos_ibfk_1` FOREIGN KEY (`Equipo_id`) REFERENCES `equipos_informaticos` (`Equipo_id`),
  ADD CONSTRAINT `baja_de_equipos_ibfk_2` FOREIGN KEY (`User_id`) REFERENCES `usuarios` (`User_id`);

--
-- Filtros para la tabla `equipos_informaticos`
--
ALTER TABLE `equipos_informaticos`
  ADD CONSTRAINT `FK_Marca` FOREIGN KEY (`Id_marca`) REFERENCES `marca_del_equipo` (`Id_Marca`),
  ADD CONSTRAINT `FK_Status_id` FOREIGN KEY (`Status_id`) REFERENCES `status` (`Status_id`),
  ADD CONSTRAINT `FK_Subcategoria` FOREIGN KEY (`Id_subcategoria`) REFERENCES `subcategoria` (`Subcategoria_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
