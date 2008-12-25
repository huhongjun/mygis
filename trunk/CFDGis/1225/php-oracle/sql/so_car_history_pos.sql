prompt PL/SQL Developer import file
prompt Created on 2008Äê12ÔÂ23ÈÕ by tanhw
set feedback off
set define off
prompt Creating SO_CAR_HISTORY_POS...
create table SO_CAR_HISTORY_POS
(
  ID      NUMBER(15) not null,
  CAR_ID  NUMBER(15) not null,
  CARTIME DATE,
  X       NUMBER(10),
  Y       NUMBER(10)
)
;

prompt Loading SO_CAR_HISTORY_POS...
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (2, 999, to_date('23-12-2008 10:01:02', 'dd-mm-yyyy hh24:mi:ss'), 90900, 32788);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (3, 999, to_date('23-12-2008 10:01:03', 'dd-mm-yyyy hh24:mi:ss'), 90800, 32884);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (4, 999, to_date('23-12-2008 10:01:04', 'dd-mm-yyyy hh24:mi:ss'), 90700, 32980);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (5, 999, to_date('23-12-2008 10:01:05', 'dd-mm-yyyy hh24:mi:ss'), 90600, 33076);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (6, 999, to_date('23-12-2008 10:01:06', 'dd-mm-yyyy hh24:mi:ss'), 90500, 33172);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (7, 999, to_date('23-12-2008 10:01:07', 'dd-mm-yyyy hh24:mi:ss'), 90400, 33268);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (8, 999, to_date('23-12-2008 10:01:08', 'dd-mm-yyyy hh24:mi:ss'), 90300, 33364);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (9, 999, to_date('23-12-2008 10:01:09', 'dd-mm-yyyy hh24:mi:ss'), 90200, 33460);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (10, 999, to_date('23-12-2008 10:01:10', 'dd-mm-yyyy hh24:mi:ss'), 90100, 33556);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (11, 999, to_date('23-12-2008 10:01:11', 'dd-mm-yyyy hh24:mi:ss'), 90000, 33652);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (12, 999, to_date('23-12-2008 10:01:12', 'dd-mm-yyyy hh24:mi:ss'), 89900, 33748);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (13, 999, to_date('23-12-2008 10:01:13', 'dd-mm-yyyy hh24:mi:ss'), 89800, 33844);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (14, 999, to_date('23-12-2008 10:01:14', 'dd-mm-yyyy hh24:mi:ss'), 89700, 33940);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (15, 999, to_date('23-12-2008 10:01:15', 'dd-mm-yyyy hh24:mi:ss'), 89600, 34036);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (16, 999, to_date('23-12-2008 10:01:16', 'dd-mm-yyyy hh24:mi:ss'), 89500, 34132);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (17, 999, to_date('23-12-2008 10:01:17', 'dd-mm-yyyy hh24:mi:ss'), 89400, 34228);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (18, 999, to_date('23-12-2008 10:01:18', 'dd-mm-yyyy hh24:mi:ss'), 89300, 34324);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (19, 999, to_date('23-12-2008 10:01:19', 'dd-mm-yyyy hh24:mi:ss'), 89200, 34420);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (20, 999, to_date('23-12-2008 10:01:20', 'dd-mm-yyyy hh24:mi:ss'), 89100, 34516);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (21, 999, to_date('23-12-2008 10:01:21', 'dd-mm-yyyy hh24:mi:ss'), 89000, 34612);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (22, 999, to_date('23-12-2008 10:01:22', 'dd-mm-yyyy hh24:mi:ss'), 88900, 34708);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (23, 999, to_date('23-12-2008 10:01:23', 'dd-mm-yyyy hh24:mi:ss'), 88800, 34804);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (24, 999, to_date('23-12-2008 10:01:24', 'dd-mm-yyyy hh24:mi:ss'), 88700, 34900);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (25, 999, to_date('23-12-2008 10:01:25', 'dd-mm-yyyy hh24:mi:ss'), 88600, 34996);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (26, 999, to_date('23-12-2008 10:01:26', 'dd-mm-yyyy hh24:mi:ss'), 88500, 35092);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (27, 999, to_date('23-12-2008 10:01:27', 'dd-mm-yyyy hh24:mi:ss'), 88400, 35188);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (28, 999, to_date('23-12-2008 10:01:28', 'dd-mm-yyyy hh24:mi:ss'), 88300, 35284);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (29, 999, to_date('23-12-2008 10:01:29', 'dd-mm-yyyy hh24:mi:ss'), 88200, 35380);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (30, 999, to_date('23-12-2008 10:01:30', 'dd-mm-yyyy hh24:mi:ss'), 88100, 35476);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (31, 999, to_date('23-12-2008 10:01:31', 'dd-mm-yyyy hh24:mi:ss'), 88000, 35572);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (32, 999, to_date('23-12-2008 10:01:32', 'dd-mm-yyyy hh24:mi:ss'), 87900, 35668);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (33, 999, to_date('23-12-2008 10:01:33', 'dd-mm-yyyy hh24:mi:ss'), 87800, 35764);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (34, 999, to_date('23-12-2008 10:01:34', 'dd-mm-yyyy hh24:mi:ss'), 87700, 35860);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (35, 999, to_date('23-12-2008 10:01:35', 'dd-mm-yyyy hh24:mi:ss'), 87600, 35956);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (36, 999, to_date('23-12-2008 10:01:36', 'dd-mm-yyyy hh24:mi:ss'), 87500, 36052);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (37, 999, to_date('23-12-2008 10:01:37', 'dd-mm-yyyy hh24:mi:ss'), 87400, 36148);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (38, 999, to_date('23-12-2008 10:01:38', 'dd-mm-yyyy hh24:mi:ss'), 87300, 36244);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (39, 999, to_date('23-12-2008 10:01:39', 'dd-mm-yyyy hh24:mi:ss'), 87200, 36340);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (40, 999, to_date('23-12-2008 10:01:40', 'dd-mm-yyyy hh24:mi:ss'), 87100, 36436);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (41, 999, to_date('23-12-2008 10:01:41', 'dd-mm-yyyy hh24:mi:ss'), 87000, 36532);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (42, 999, to_date('23-12-2008 10:01:42', 'dd-mm-yyyy hh24:mi:ss'), 86900, 36628);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (43, 999, to_date('23-12-2008 10:01:43', 'dd-mm-yyyy hh24:mi:ss'), 86800, 36724);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (44, 999, to_date('23-12-2008 10:01:44', 'dd-mm-yyyy hh24:mi:ss'), 86700, 36820);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (45, 999, to_date('23-12-2008 10:01:45', 'dd-mm-yyyy hh24:mi:ss'), 86600, 36916);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (46, 999, to_date('23-12-2008 10:01:46', 'dd-mm-yyyy hh24:mi:ss'), 86500, 37012);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (47, 999, to_date('23-12-2008 10:01:47', 'dd-mm-yyyy hh24:mi:ss'), 86400, 37108);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (48, 999, to_date('23-12-2008 10:01:48', 'dd-mm-yyyy hh24:mi:ss'), 86300, 37204);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (49, 999, to_date('23-12-2008 10:01:49', 'dd-mm-yyyy hh24:mi:ss'), 86200, 37300);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (50, 999, to_date('23-12-2008 10:01:50', 'dd-mm-yyyy hh24:mi:ss'), 86100, 37396);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (51, 999, to_date('23-12-2008 10:01:51', 'dd-mm-yyyy hh24:mi:ss'), 86000, 37492);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (52, 999, to_date('23-12-2008 10:01:52', 'dd-mm-yyyy hh24:mi:ss'), 85900, 37588);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (53, 999, to_date('23-12-2008 10:01:53', 'dd-mm-yyyy hh24:mi:ss'), 85800, 37684);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (54, 999, to_date('23-12-2008 10:01:54', 'dd-mm-yyyy hh24:mi:ss'), 85700, 37780);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (55, 999, to_date('23-12-2008 10:01:55', 'dd-mm-yyyy hh24:mi:ss'), 85600, 37876);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (56, 999, to_date('23-12-2008 10:01:56', 'dd-mm-yyyy hh24:mi:ss'), 85500, 37972);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (57, 999, to_date('23-12-2008 10:01:57', 'dd-mm-yyyy hh24:mi:ss'), 85400, 38068);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (58, 999, to_date('23-12-2008 10:01:58', 'dd-mm-yyyy hh24:mi:ss'), 85300, 38164);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (59, 999, to_date('23-12-2008 10:01:59', 'dd-mm-yyyy hh24:mi:ss'), 85200, 38260);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (60, 999, to_date('23-12-2008 10:02:00', 'dd-mm-yyyy hh24:mi:ss'), 85100, 38356);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (61, 999, to_date('23-12-2008 10:02:01', 'dd-mm-yyyy hh24:mi:ss'), 85000, 38452);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (62, 999, to_date('23-12-2008 10:02:02', 'dd-mm-yyyy hh24:mi:ss'), 84900, 38548);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (63, 999, to_date('23-12-2008 10:02:03', 'dd-mm-yyyy hh24:mi:ss'), 84800, 38644);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (64, 999, to_date('23-12-2008 10:02:04', 'dd-mm-yyyy hh24:mi:ss'), 84700, 38740);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (65, 999, to_date('23-12-2008 10:02:05', 'dd-mm-yyyy hh24:mi:ss'), 84600, 38836);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (66, 999, to_date('23-12-2008 10:02:06', 'dd-mm-yyyy hh24:mi:ss'), 84500, 38932);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (67, 999, to_date('23-12-2008 10:02:07', 'dd-mm-yyyy hh24:mi:ss'), 84400, 39028);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (68, 999, to_date('23-12-2008 10:02:08', 'dd-mm-yyyy hh24:mi:ss'), 84300, 39124);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (69, 999, to_date('23-12-2008 10:02:09', 'dd-mm-yyyy hh24:mi:ss'), 84200, 39220);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (70, 999, to_date('23-12-2008 10:02:10', 'dd-mm-yyyy hh24:mi:ss'), 84100, 39316);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (71, 999, to_date('23-12-2008 10:02:11', 'dd-mm-yyyy hh24:mi:ss'), 84000, 39412);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (72, 999, to_date('23-12-2008 10:02:12', 'dd-mm-yyyy hh24:mi:ss'), 83500, 39412);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (73, 999, to_date('23-12-2008 10:02:13', 'dd-mm-yyyy hh24:mi:ss'), 83000, 39412);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (74, 999, to_date('23-12-2008 10:02:14', 'dd-mm-yyyy hh24:mi:ss'), 82600, 39508);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (75, 999, to_date('23-12-2008 10:02:15', 'dd-mm-yyyy hh24:mi:ss'), 82500, 39604);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (0, 999, to_date('23-12-2008 10:01:00', 'dd-mm-yyyy hh24:mi:ss'), 91100, 32596);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (1, 999, to_date('23-12-2008 10:01:01', 'dd-mm-yyyy hh24:mi:ss'), 91000, 32692);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (76, 999, to_date('23-12-2008 10:02:16', 'dd-mm-yyyy hh24:mi:ss'), 82400, 39700);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (77, 999, to_date('23-12-2008 10:02:17', 'dd-mm-yyyy hh24:mi:ss'), 82300, 39796);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (78, 999, to_date('23-12-2008 10:02:18', 'dd-mm-yyyy hh24:mi:ss'), 82200, 39892);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (79, 999, to_date('23-12-2008 10:02:19', 'dd-mm-yyyy hh24:mi:ss'), 82100, 39988);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (80, 999, to_date('23-12-2008 10:02:20', 'dd-mm-yyyy hh24:mi:ss'), 82000, 40084);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (81, 999, to_date('23-12-2008 10:02:21', 'dd-mm-yyyy hh24:mi:ss'), 81900, 40180);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (82, 999, to_date('23-12-2008 10:02:22', 'dd-mm-yyyy hh24:mi:ss'), 81800, 40276);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (83, 999, to_date('23-12-2008 10:02:23', 'dd-mm-yyyy hh24:mi:ss'), 81700, 40372);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (84, 999, to_date('23-12-2008 10:02:24', 'dd-mm-yyyy hh24:mi:ss'), 81600, 40468);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (85, 999, to_date('23-12-2008 10:02:25', 'dd-mm-yyyy hh24:mi:ss'), 81500, 40564);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (86, 999, to_date('23-12-2008 10:02:26', 'dd-mm-yyyy hh24:mi:ss'), 81400, 40660);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (87, 999, to_date('23-12-2008 10:02:27', 'dd-mm-yyyy hh24:mi:ss'), 81300, 40756);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (88, 999, to_date('23-12-2008 10:02:28', 'dd-mm-yyyy hh24:mi:ss'), 81200, 40852);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (89, 999, to_date('23-12-2008 10:02:29', 'dd-mm-yyyy hh24:mi:ss'), 81100, 40948);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (90, 999, to_date('23-12-2008 10:02:30', 'dd-mm-yyyy hh24:mi:ss'), 81000, 41044);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (91, 999, to_date('23-12-2008 10:02:31', 'dd-mm-yyyy hh24:mi:ss'), 80900, 41140);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (92, 999, to_date('23-12-2008 10:02:32', 'dd-mm-yyyy hh24:mi:ss'), 80800, 41236);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (93, 999, to_date('23-12-2008 10:02:33', 'dd-mm-yyyy hh24:mi:ss'), 80700, 41332);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (94, 999, to_date('23-12-2008 10:02:34', 'dd-mm-yyyy hh24:mi:ss'), 80600, 41428);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (95, 999, to_date('23-12-2008 10:02:35', 'dd-mm-yyyy hh24:mi:ss'), 80500, 41524);
insert into SO_CAR_HISTORY_POS (ID, CAR_ID, CARTIME, X, Y)
values (96, 999, to_date('23-12-2008 10:02:36', 'dd-mm-yyyy hh24:mi:ss'), 80400, 41620);
commit;
prompt 97 records loaded
set feedback on
set define on
prompt Done.
