prompt PL/SQL Developer import file
prompt Created on 2008年12月23日 by tanhw
set feedback off
set define off
prompt Creating SO_CAR_TYPE...
create table SO_CAR_TYPE
(
  TYPE_ID   NUMBER(15) not null,
  TYPE_NAME VARCHAR2(100)
)
;

prompt Loading SO_CAR_TYPE...
insert into SO_CAR_TYPE (TYPE_ID, TYPE_NAME)
values (1, '柳工');
insert into SO_CAR_TYPE (TYPE_ID, TYPE_NAME)
values (2, '龙工');
insert into SO_CAR_TYPE (TYPE_ID, TYPE_NAME)
values (3, '铲车');
insert into SO_CAR_TYPE (TYPE_ID, TYPE_NAME)
values (4, '联众');
commit;
prompt 4 records loaded
set feedback on
set define on
prompt Done.
