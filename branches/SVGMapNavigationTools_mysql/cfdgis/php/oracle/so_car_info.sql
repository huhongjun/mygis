prompt PL/SQL Developer import file
prompt Created on 2008��12��23�� by tanhw
set feedback off
set define off
prompt Creating SO_CAR_INFO...
create table SO_CAR_INFO
(
  ID          NUMBER(15) not null,
  TYPE_ID     NUMBER(15),
  CAR_CODE    VARCHAR2(100),
  CAR_NAME    VARCHAR2(100),
  CAR_TYPE_ID NUMBER(5),
  CAR_OWNER   VARCHAR2(100)
)
;

prompt Loading SO_CAR_INFO...
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (999, 4, '001', '����888', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (2, 1, '002', '����2', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (3, 1, '003', '����3', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (4, 1, '004', '����4', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (5, 1, '005', '����5', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (6, 1, '006', '����6', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (7, 1, '007', '����7', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (8, 1, '008', '����8', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (9, 1, '009', '����9', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (10, 1, '0010', '����10', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (11, 1, '0011', '����11', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (12, 1, '0012', '����12', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (13, 1, '0013', '����13', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (14, 1, '0014', '����14', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (15, 1, '0015', '����15', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (16, 1, '0016', '����16', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (17, 1, '0017', '����17', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (18, 1, '0018', '����18', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (19, 1, '0019', '����19', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (20, 1, '0020', '����20', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (21, 1, '0021', '����21', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (22, 1, '0022', '����22', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (23, 1, '0023', '����23', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (24, 1, '0024', '����24', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (25, 1, '0025', '����25', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (26, 1, '0026', '����26', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (27, 1, '0027', '����27', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (28, 1, '0028', '����28', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (29, 1, '0029', '����29', 1, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (30, 2, '0030', '����30', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (31, 2, '0031', '����31', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (32, 2, '0032', '����32', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (33, 2, '0033', '����33', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (34, 2, '0034', '����34', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (35, 2, '0035', '����35', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (36, 2, '0036', '����36', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (37, 2, '0037', '����37', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (38, 2, '0038', '����38', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (39, 2, '0039', '����39', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (40, 2, '0040', '����40', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (41, 2, '0041', '����41', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (42, 2, '0042', '����42', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (43, 2, '0043', '����43', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (44, 2, '0044', '����44', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (45, 2, '0045', '����45', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (46, 2, '0046', '����46', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (47, 2, '0047', '����47', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (48, 2, '0048', '����48', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (49, 2, '0049', '����49', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (50, 2, '0050', '����50', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (51, 2, '0051', '����51', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (52, 2, '0052', '����52', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (53, 2, '0053', '����53', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (54, 2, '0054', '����54', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (55, 2, '0055', '����55', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (56, 2, '0056', '����56', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (57, 2, '0057', '����57', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (58, 2, '0058', '����58', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (59, 2, '0059', '����59', 2, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (60, 3, '0060', '����60', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (61, 3, '0061', '����61', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (62, 3, '0062', '����62', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (63, 3, '0063', '����63', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (64, 3, '0064', '����64', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (65, 3, '0065', '����65', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (66, 3, '0066', '����66', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (67, 3, '0067', '����67', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (68, 3, '0068', '����68', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (69, 3, '0069', '����69', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (70, 3, '0070', '����70', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (71, 3, '0071', '����71', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (72, 3, '0072', '����72', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (73, 3, '0073', '����73', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (74, 3, '0074', '����74', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (75, 3, '0075', '����75', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (76, 3, '0076', '����76', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (77, 3, '0077', '����77', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (78, 3, '0078', '����78', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (79, 3, '0079', '����79', 3, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (80, 4, '0080', '����80', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (81, 4, '0081', '����81', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (82, 4, '0082', '����82', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (83, 4, '0083', '����83', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (84, 4, '0084', '����84', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (85, 4, '0085', '����85', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (86, 4, '0086', '����86', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (87, 4, '0087', '����87', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (88, 4, '0088', '����88', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (89, 4, '0089', '����89', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (90, 4, '0090', '����90', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (91, 4, '0091', '����91', 4, '���ڹ�˾');
insert into SO_CAR_INFO (ID, TYPE_ID, CAR_CODE, CAR_NAME, CAR_TYPE_ID, CAR_OWNER)
values (100, 4, '0100', '��λ���ݲɼ���', 4, '���ڹ�˾');
commit;
prompt 92 records loaded
set feedback on
set define on
prompt Done.
