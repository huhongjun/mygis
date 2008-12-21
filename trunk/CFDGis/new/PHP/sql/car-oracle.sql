prompt PL/SQL Developer import file
prompt Created on 2006��12��20�� by tanhw
set feedback off
set define off
prompt Creating SO_CAR_CURRENT_POS...
create table SO_CAR_CURRENT_POS
(
  ID        NUMBER(15) not null,
  CAR_CODE  VARCHAR2(100),
  CAR_NAME  VARCHAR2(100),
  CAR_TYPE  VARCHAR2(100),
  CAR_OWNER VARCHAR2(100),
  X         NUMBER(10),
  Y         NUMBER(10)
)
;

prompt Loading SO_CAR_CURRENT_POS...
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (1, '001', '����1', '����', '���ڹ�˾', 40850, 7388);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (2, '002', '����2', '����', '���ڹ�˾', 70769, 35822);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (3, '003', '����3', '����', '���ڹ�˾', 1191, 15378);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (4, '004', '����4', '����', '���ڹ�˾', 62451, 5527);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (5, '005', '����5', '����', '���ڹ�˾', 64037, 4331);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (6, '006', '����6', '����', '���ڹ�˾', 16443, 56015);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (7, '007', '����7', '����', '���ڹ�˾', 58064, 25534);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (8, '008', '����8', '����', '���ڹ�˾', 52505, 54814);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (9, '009', '����9', '����', '���ڹ�˾', 40626, 25487);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (10, '0010', '����10', '����', '���ڹ�˾', 66836, 50083);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (11, '0011', '����11', '����', '���ڹ�˾', 11210, 21637);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (12, '0012', '����12', '����', '���ڹ�˾', 44429, 2479);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (13, '0013', '����13', '����', '���ڹ�˾', 12248, 59601);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (14, '0014', '����14', '����', '���ڹ�˾', 39798, 45240);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (15, '0015', '����15', '����', '���ڹ�˾', 55527, 33010);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (16, '0016', '����16', '����', '���ڹ�˾', 56989, 34082);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (17, '0017', '����17', '����', '���ڹ�˾', 68335, 53352);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (18, '0018', '����18', '����', '���ڹ�˾', 9713, 68725);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (19, '0019', '����19', '����', '���ڹ�˾', 35006, 74448);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (20, '0020', '����20', '����', '���ڹ�˾', 75572, 49938);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (21, '0021', '����21', '����', '���ڹ�˾', 11111, 2695);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (22, '0022', '����22', '����', '���ڹ�˾', 38196, 17361);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (23, '0023', '����23', '����', '���ڹ�˾', 54688, 65999);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (24, '0024', '����24', '����', '���ڹ�˾', 48936, 54484);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (25, '0025', '����25', '����', '���ڹ�˾', 6186, 61476);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (26, '0026', '����26', '����', '���ڹ�˾', 34944, 6477);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (27, '0027', '����27', '����', '���ڹ�˾', 12666, 59102);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (28, '0028', '����28', '����', '���ڹ�˾', 13980, 50458);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (29, '0029', '����29', '����', '���ڹ�˾', 70529, 29052);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (30, '0030', '����30', '����', '���ڹ�˾', 5342, 53895);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (31, '0031', '����31', '����', '���ڹ�˾', 50947, 37480);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (32, '0032', '����32', '����', '���ڹ�˾', 41704, 49764);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (33, '0033', '����33', '����', '���ڹ�˾', 60729, 24858);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (34, '0034', '����34', '����', '���ڹ�˾', 51314, 12426);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (35, '0035', '����35', '����', '���ڹ�˾', 25251, 45682);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (36, '0036', '����36', '����', '���ڹ�˾', 30271, 49158);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (37, '0037', '����37', '����', '���ڹ�˾', 29670, 23788);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (38, '0038', '����38', '����', '���ڹ�˾', 70998, 62609);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (39, '0039', '����39', '����', '���ڹ�˾', 12252, 12701);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (40, '0040', '����40', '����', '���ڹ�˾', 59963, 17516);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (41, '0041', '����41', '����', '���ڹ�˾', 47450, 71008);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (42, '0042', '����42', '����', '���ڹ�˾', 54439, 64785);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (43, '0043', '����43', '����', '���ڹ�˾', 16959, 67422);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (44, '0044', '����44', '����', '���ڹ�˾', 8986, 55921);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (45, '0045', '����45', '����', '���ڹ�˾', 6737, 14301);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (46, '0046', '����46', '����', '���ڹ�˾', 49069, 5654);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (47, '0047', '����47', '����', '���ڹ�˾', 37813, 35410);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (48, '0048', '����48', '����', '���ڹ�˾', 24943, 68245);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (49, '0049', '����49', '����', '���ڹ�˾', 28995, 9030);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (50, '0050', '����50', '����', '���ڹ�˾', 31346, 75937);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (51, '0051', '����51', '����', '���ڹ�˾', 37549, 75240);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (52, '0052', '����52', '����', '���ڹ�˾', 29086, 34056);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (53, '0053', '����53', '����', '���ڹ�˾', 9739, 24637);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (54, '0054', '����54', '����', '���ڹ�˾', 72709, 23663);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (55, '0055', '����55', '����', '���ڹ�˾', 75568, 70236);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (56, '0056', '����56', '����', '���ڹ�˾', 71536, 36070);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (57, '0057', '����57', '����', '���ڹ�˾', 25309, 56780);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (58, '0058', '����58', '����', '���ڹ�˾', 44908, 64499);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (59, '0059', '����59', '����', '���ڹ�˾', 30404, 48143);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (60, '0060', '����60', '����', '���ڹ�˾', 31227, 64079);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (61, '0061', '����61', '����', '���ڹ�˾', 41200, 19348);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (62, '0062', '����62', '����', '���ڹ�˾', 19009, 59895);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (63, '0063', '����63', '����', '���ڹ�˾', 5337, 52436);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (64, '0064', '����64', '����', '���ڹ�˾', 43558, 55714);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (65, '0065', '����65', '����', '���ڹ�˾', 34519, 21208);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (66, '0066', '����66', '����', '���ڹ�˾', 65811, 47291);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (67, '0067', '����67', '����', '���ڹ�˾', 12542, 8576);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (68, '0068', '����68', '����', '���ڹ�˾', 54258, 54308);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (69, '0069', '����69', '����', '���ڹ�˾', 20649, 44768);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (70, '0070', '����70', '����', '���ڹ�˾', 13072, 11878);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (71, '0071', '����71', '����', '���ڹ�˾', 64872, 472);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (72, '0072', '����72', '����', '���ڹ�˾', 16799, 30419);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (73, '0073', '����73', '����', '���ڹ�˾', 74788, 13253);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (74, '0074', '����74', '����', '���ڹ�˾', 73810, 64779);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (75, '0075', '����75', '����', '���ڹ�˾', 7914, 53333);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (76, '0076', '����76', '����', '���ڹ�˾', 59251, 66657);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (77, '0077', '����77', '����', '���ڹ�˾', 29833, 47808);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (78, '0078', '����78', '����', '���ڹ�˾', 62941, 40712);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (79, '0079', '����79', '����', '���ڹ�˾', 54355, 68981);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (80, '0080', '����80', '����', '���ڹ�˾', 14454, 42013);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (81, '0081', '����81', '����', '���ڹ�˾', 48215, 55560);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (82, '0082', '����82', '����', '���ڹ�˾', 74644, 7671);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (83, '0083', '����83', '����', '���ڹ�˾', 2915, 43469);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (84, '0084', '����84', '����', '���ڹ�˾', 15088, 43624);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (85, '0085', '����85', '����', '���ڹ�˾', 26844, 55045);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (86, '0086', '����86', '����', '���ڹ�˾', 348, 14475);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (87, '0087', '����87', '����', '���ڹ�˾', 51123, 45586);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (88, '0088', '����88', '����', '���ڹ�˾', 19421, 34149);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (89, '0089', '����89', '����', '���ڹ�˾', 34265, 12138);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (90, '0090', '����90', '����', '���ڹ�˾', 51183, 12548);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (91, '0091', '����91', '����', '���ڹ�˾', 31282, 21627);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (92, '0092', '����92', '����', '���ڹ�˾', 48757, 61092);
commit;
prompt 92 records loaded
set feedback on
set define on
prompt Done.
