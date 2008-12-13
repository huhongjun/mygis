prompt PL/SQL Developer import file
prompt Created on 2008��12��13�� by tanhw
set feedback off
set define off
prompt Creating SDE.CAR...
create table SDE.CAR
(
  OBJECTID   INTEGER not null,
  FLASHID    NVARCHAR2(50),
  INTENSION  NUMBER(38,8),
  LONGITUDE  NUMBER(38,8),
  LATITUDE   NUMBER(38,8),
  FLASHTIME  DATE,
  FLASHMSEC  NUMBER(10),
  DETECTORDT NVARCHAR2(50),
  SECTIONID  NUMBER(10),
  DIQU       NUMBER(10),
  XIAN       NUMBER(10),
  X          NUMBER(38,8),
  Y          NUMBER(38,8)
)
;

prompt Loading SDE.CAR...
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (1, 'CU000514', 12.1, 116.705278, 40.273889, to_date('31-03-2008 19:36:25', 'dd-mm-yyyy hh24:mi:ss'), 11, '1,4,6,', 0, 1, 19, 7, 8);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (2, 'CU000518', 22.2, 116.68, 40.326389, to_date('31-03-2008 19:47:33', 'dd-mm-yyyy hh24:mi:ss'), 98, '1,4,6,', 0, 1, 19, 12, 15);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (3, 'CU000519', 10.3, 116.665556, 40.350556, to_date('31-03-2008 19:52:24', 'dd-mm-yyyy hh24:mi:ss'), 43, '1,4,6,', 0, 1, 19, 9, 16);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (4, 'CU000520', 7.9, 116.676667, 40.343333, to_date('31-03-2008 19:54:23', 'dd-mm-yyyy hh24:mi:ss'), 715, '1,4,6,', 0, 1, 19, 22, 66);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (5, 'D1000005', -9.4, 116.746944, 40.292222, to_date('02-04-2008 16:03:55', 'dd-mm-yyyy hh24:mi:ss'), 9, '1,5,6,', 0, 1, 10, 1, 55);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (6, 'D1000006', -9.5, 116.702778, 40.325833, to_date('02-04-2008 16:04:31', 'dd-mm-yyyy hh24:mi:ss'), 8, '1,5,6,', 0, 1, 19, 6, 200);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (7, 'D0000001', 19.41, 116.68, 39.407045, to_date('01-04-2008 21:04:22', 'dd-mm-yyyy hh24:mi:ss'), 13, '2,6,8,', 0, 0, 0, 100, 300);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (8, 'D0000002', 17.73, 116.65, 39.432, to_date('01-04-2008 21:06:34', 'dd-mm-yyyy hh24:mi:ss'), 33, '6,8,', 0, 0, 0, 77, 88);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (9, 'D0000003', 35.96, 116.92, 39.447028, to_date('01-04-2008 21:18:56', 'dd-mm-yyyy hh24:mi:ss'), 159, '2,6,8,', 0, 0, 0, 200, 100);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (1, 'CU000514', 12.1, 116.705278, 40.273889, to_date('31-03-2008 19:36:25', 'dd-mm-yyyy hh24:mi:ss'), 11, '1,4,6,', 0, 1, 19, 7, 8);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (2, 'CU000518', 22.2, 116.68, 40.326389, to_date('31-03-2008 19:47:33', 'dd-mm-yyyy hh24:mi:ss'), 98, '1,4,6,', 0, 1, 19, 12, 15);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (3, 'CU000519', 10.3, 116.665556, 40.350556, to_date('31-03-2008 19:52:24', 'dd-mm-yyyy hh24:mi:ss'), 43, '1,4,6,', 0, 1, 19, 9, 16);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (4, 'CU000520', 7.9, 116.676667, 40.343333, to_date('31-03-2008 19:54:23', 'dd-mm-yyyy hh24:mi:ss'), 715, '1,4,6,', 0, 1, 19, 22, 66);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (5, 'D1000005', -9.4, 116.746944, 40.292222, to_date('02-04-2008 16:03:55', 'dd-mm-yyyy hh24:mi:ss'), 9, '1,5,6,', 0, 1, 10, 1, 55);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (6, 'D1000006', -9.5, 116.702778, 40.325833, to_date('02-04-2008 16:04:31', 'dd-mm-yyyy hh24:mi:ss'), 8, '1,5,6,', 0, 1, 19, 6, 200);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (7, 'D0000001', 19.41, 116.68, 39.407045, to_date('01-04-2008 21:04:22', 'dd-mm-yyyy hh24:mi:ss'), 13, '2,6,8,', 0, 0, 0, 100, 300);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (8, 'D0000002', 17.73, 116.65, 39.432, to_date('01-04-2008 21:06:34', 'dd-mm-yyyy hh24:mi:ss'), 33, '6,8,', 0, 0, 0, 77, 88);
insert into SDE.CAR (OBJECTID, FLASHID, INTENSION, LONGITUDE, LATITUDE, FLASHTIME, FLASHMSEC, DETECTORDT, SECTIONID, DIQU, XIAN, X, Y)
values (9, 'D0000003', 35.96, 116.92, 39.447028, to_date('01-04-2008 21:18:56', 'dd-mm-yyyy hh24:mi:ss'), 159, '2,6,8,', 0, 0, 0, 200, 100);
commit;
prompt 18 records loaded
set feedback on
set define on
prompt Done.
