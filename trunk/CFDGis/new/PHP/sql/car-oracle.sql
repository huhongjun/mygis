prompt PL/SQL Developer import file
prompt Created on 2006年12月20日 by tanhw
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
values (1, '001', '柳工1', '铲车', '联众公司', 40850, 7388);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (2, '002', '柳工2', '铲车', '联众公司', 70769, 35822);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (3, '003', '柳工3', '铲车', '联众公司', 1191, 15378);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (4, '004', '柳工4', '铲车', '联众公司', 62451, 5527);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (5, '005', '柳工5', '铲车', '联众公司', 64037, 4331);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (6, '006', '柳工6', '铲车', '联众公司', 16443, 56015);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (7, '007', '柳工7', '铲车', '联众公司', 58064, 25534);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (8, '008', '柳工8', '铲车', '联众公司', 52505, 54814);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (9, '009', '柳工9', '铲车', '联众公司', 40626, 25487);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (10, '0010', '柳工10', '铲车', '联众公司', 66836, 50083);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (11, '0011', '柳工11', '铲车', '联众公司', 11210, 21637);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (12, '0012', '柳工12', '铲车', '联众公司', 44429, 2479);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (13, '0013', '柳工13', '铲车', '联众公司', 12248, 59601);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (14, '0014', '柳工14', '铲车', '联众公司', 39798, 45240);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (15, '0015', '柳工15', '铲车', '联众公司', 55527, 33010);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (16, '0016', '柳工16', '铲车', '联众公司', 56989, 34082);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (17, '0017', '柳工17', '铲车', '联众公司', 68335, 53352);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (18, '0018', '柳工18', '铲车', '联众公司', 9713, 68725);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (19, '0019', '柳工19', '铲车', '联众公司', 35006, 74448);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (20, '0020', '柳工20', '铲车', '联众公司', 75572, 49938);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (21, '0021', '柳工21', '铲车', '联众公司', 11111, 2695);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (22, '0022', '柳工22', '铲车', '联众公司', 38196, 17361);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (23, '0023', '柳工23', '铲车', '联众公司', 54688, 65999);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (24, '0024', '柳工24', '铲车', '联众公司', 48936, 54484);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (25, '0025', '柳工25', '铲车', '联众公司', 6186, 61476);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (26, '0026', '柳工26', '铲车', '联众公司', 34944, 6477);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (27, '0027', '柳工27', '铲车', '联众公司', 12666, 59102);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (28, '0028', '柳工28', '铲车', '联众公司', 13980, 50458);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (29, '0029', '柳工29', '铲车', '联众公司', 70529, 29052);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (30, '0030', '柳工30', '铲车', '联众公司', 5342, 53895);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (31, '0031', '柳工31', '铲车', '联众公司', 50947, 37480);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (32, '0032', '柳工32', '铲车', '联众公司', 41704, 49764);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (33, '0033', '柳工33', '铲车', '联众公司', 60729, 24858);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (34, '0034', '柳工34', '铲车', '联众公司', 51314, 12426);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (35, '0035', '柳工35', '铲车', '联众公司', 25251, 45682);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (36, '0036', '柳工36', '铲车', '联众公司', 30271, 49158);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (37, '0037', '柳工37', '铲车', '联众公司', 29670, 23788);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (38, '0038', '柳工38', '铲车', '联众公司', 70998, 62609);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (39, '0039', '柳工39', '铲车', '联众公司', 12252, 12701);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (40, '0040', '柳工40', '铲车', '联众公司', 59963, 17516);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (41, '0041', '柳工41', '铲车', '联众公司', 47450, 71008);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (42, '0042', '柳工42', '铲车', '联众公司', 54439, 64785);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (43, '0043', '柳工43', '铲车', '联众公司', 16959, 67422);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (44, '0044', '柳工44', '铲车', '联众公司', 8986, 55921);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (45, '0045', '柳工45', '铲车', '联众公司', 6737, 14301);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (46, '0046', '柳工46', '铲车', '联众公司', 49069, 5654);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (47, '0047', '柳工47', '铲车', '联众公司', 37813, 35410);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (48, '0048', '柳工48', '铲车', '联众公司', 24943, 68245);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (49, '0049', '柳工49', '铲车', '联众公司', 28995, 9030);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (50, '0050', '柳工50', '铲车', '联众公司', 31346, 75937);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (51, '0051', '柳工51', '铲车', '联众公司', 37549, 75240);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (52, '0052', '柳工52', '铲车', '联众公司', 29086, 34056);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (53, '0053', '柳工53', '铲车', '联众公司', 9739, 24637);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (54, '0054', '柳工54', '铲车', '联众公司', 72709, 23663);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (55, '0055', '柳工55', '铲车', '联众公司', 75568, 70236);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (56, '0056', '柳工56', '铲车', '联众公司', 71536, 36070);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (57, '0057', '柳工57', '铲车', '联众公司', 25309, 56780);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (58, '0058', '柳工58', '铲车', '联众公司', 44908, 64499);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (59, '0059', '柳工59', '铲车', '联众公司', 30404, 48143);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (60, '0060', '柳工60', '铲车', '联众公司', 31227, 64079);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (61, '0061', '柳工61', '铲车', '联众公司', 41200, 19348);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (62, '0062', '柳工62', '铲车', '联众公司', 19009, 59895);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (63, '0063', '柳工63', '铲车', '联众公司', 5337, 52436);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (64, '0064', '柳工64', '铲车', '联众公司', 43558, 55714);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (65, '0065', '柳工65', '铲车', '联众公司', 34519, 21208);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (66, '0066', '柳工66', '铲车', '联众公司', 65811, 47291);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (67, '0067', '柳工67', '铲车', '联众公司', 12542, 8576);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (68, '0068', '柳工68', '铲车', '联众公司', 54258, 54308);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (69, '0069', '柳工69', '铲车', '联众公司', 20649, 44768);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (70, '0070', '柳工70', '铲车', '联众公司', 13072, 11878);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (71, '0071', '柳工71', '铲车', '联众公司', 64872, 472);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (72, '0072', '柳工72', '铲车', '联众公司', 16799, 30419);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (73, '0073', '柳工73', '铲车', '联众公司', 74788, 13253);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (74, '0074', '柳工74', '铲车', '联众公司', 73810, 64779);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (75, '0075', '柳工75', '铲车', '联众公司', 7914, 53333);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (76, '0076', '柳工76', '铲车', '联众公司', 59251, 66657);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (77, '0077', '柳工77', '铲车', '联众公司', 29833, 47808);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (78, '0078', '柳工78', '铲车', '联众公司', 62941, 40712);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (79, '0079', '柳工79', '铲车', '联众公司', 54355, 68981);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (80, '0080', '柳工80', '铲车', '联众公司', 14454, 42013);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (81, '0081', '柳工81', '铲车', '联众公司', 48215, 55560);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (82, '0082', '柳工82', '铲车', '联众公司', 74644, 7671);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (83, '0083', '柳工83', '铲车', '联众公司', 2915, 43469);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (84, '0084', '柳工84', '铲车', '联众公司', 15088, 43624);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (85, '0085', '柳工85', '铲车', '联众公司', 26844, 55045);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (86, '0086', '柳工86', '铲车', '联众公司', 348, 14475);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (87, '0087', '柳工87', '铲车', '联众公司', 51123, 45586);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (88, '0088', '柳工88', '铲车', '联众公司', 19421, 34149);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (89, '0089', '柳工89', '铲车', '联众公司', 34265, 12138);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (90, '0090', '柳工90', '铲车', '联众公司', 51183, 12548);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (91, '0091', '柳工91', '铲车', '联众公司', 31282, 21627);
insert into SO_CAR_CURRENT_POS (ID, CAR_CODE, CAR_NAME, CAR_TYPE, CAR_OWNER, X, Y)
values (92, '0092', '柳工92', '铲车', '联众公司', 48757, 61092);
commit;
prompt 92 records loaded
set feedback on
set define on
prompt Done.
