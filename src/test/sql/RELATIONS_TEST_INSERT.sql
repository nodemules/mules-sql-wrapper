INSERT INTO `SQLWR_TEST`.`HOUSEHOLD`
(NAME, DESCRIPTION)
VALUES
('Brent\'s House', 'A two bedroom condo in Jacksonville Beach, FL.'),
('Jay\'s House', 'A one bedroom converted apartment in our nation\'s capitol, Washington D.C.'),
('Laura\s House', 'A three bedroom condo in the Julington Creek Plantation area on Racetrack Rd.')
;

INSERT INTO `SQLWR_TEST`.`PERSON`
(FIRST_NAME, LAST_NAME, DATE_OF_BIRTH, HOUSEHOLD_ID)
VALUES
('Brent', 'Haertlein', '1986-08-16', 1),
('Jay', 'Reed', '1986-08-15', 2),
('Laura', 'Wiese', '1986-11-12', 3),
('Matthew', 'Wiese', null, 3),
('Ella', 'Wiese', null, 3),
('Silas', 'Wiese', null, 3)
;

INSERT INTO `SQLWR_TEST`.`CAR`
(OWNER_ID, MAKE, MODEL)
VALUES
(1, 'Ford', 'Mustang'),
(2, 'Subaru', 'Forester'),
(3, 'Hyundai', 'Elantra')
;

INSERT INTO `SQLWR_TEST`.`JOURNEY`
(CAR_ID, DRIVER_ID, START_TIME, END_TIME, DISTANCE, COMPLETED)
VALUES
(1, 1, '2017-10-22 10:39:42', '2017-10-22 10:46:42', 1.5, 1),
(3, 1, '2017-10-11 08:16:44', '2017-10-11 08:58:18', 14.02, 1),
(3, 1, '2017-10-20 09:16:22', '2017-10-20 11:39:16', 73.66, 1),
(2, 2, '2017-10-18 07:13:34', '2017-10-18 07:27:26', 4.1, 1),
(3, 3, '2017-10-22 12:39:41', '2017-10-22 12:54:15', 1.09, 1)
;

INSERT INTO `SQLWR_TEST`.`JOURNEY_PASSENGER`
(JOURNEY_ID, PASSENGER_ID)
VALUES
(2, 3),
(3, 3),
(5, 4),
(5, 5),
(5, 6)
;
