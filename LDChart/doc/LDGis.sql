select t2.name,flashtime,to_char(flashtime,'hh24') ,(t1.intension*10 - MOD(t1.intension*10,50))/10 
from tbl_thunder t1,TBL_AREA t2  
where t1.xian = t2.id  and to_char(t1.flashtime,'yyyymmdd')='20090613'

//////////////////////////////////////////////

select 
	t2.name xian,
	to_char(flashtime,'yyyy-mm-dd') ftime,
	to_char(flashtime,'hh24') period ,
	(t1.intension*10 - MOD(t1.intension*10,50))/10 phase
from tbl_thunder t1,TBL_AREA t2  
where t1.xian = t2.id  and to_char(t1.flashtime,'yyyymm') in ('201008','201009')



CREATE TABLE "SDE"."TBL_AREA" ("ID" NUMBER NOT NULL, "NAME" 
    VARCHAR2(255 byte), "PID" NUMBER DEFAULT 0, "ORDERLY" NUMBER 
    DEFAULT 0)  
    TABLESPACE "SYSTEM" PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS
    255 
    STORAGE ( INITIAL 64K NEXT 0K MINEXTENTS 1 MAXEXTENTS 
    2147483645 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1) 
    LOGGING 
    MONITORING 
    
    
CREATE TABLE "SDE"."TBL_THUNDER" 
   (	"OBJECTID" NUMBER(*,0) NOT NULL ENABLE, 
	"FLASHID" NVARCHAR2(50), 
	"INTENSION" NUMBER(38,8), 
	"LONGITUDE" NUMBER(38,8), 
	"LATITUDE" NUMBER(38,8), 
	"FLASHTIME" DATE, 
	"FLASHMSEC" NUMBER(10,0), 
	"DETECTORDT" NVARCHAR2(50), 
	"SECTIONID" NUMBER(10,0), 
	"DIQU" NUMBER(10,0), 
	"XIAN" NUMBER(10,0), 
	"X" NUMBER(38,8), 
	"Y" NUMBER(38,8)
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT)
  TABLESPACE "SYSTEM" ;
 
  ALTER TABLE "SDE"."TBL_THUNDER" MODIFY ("OBJECTID" NOT NULL ENABLE);    