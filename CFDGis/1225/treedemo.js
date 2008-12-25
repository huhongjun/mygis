<SCRIPT LANGUAGE="JavaScript">
<!--
d = new dTree('d');  //创建一个dTree树形实例
d.add(0,-1,'系统功能列表',null,'系统功能列表','main'); //d.add方法的第1个参数(int)标识节点，需唯一，第二个参数为关系参数：-1为ROOT节点，非-1的其他节点表示已此值为父节点
d.add(1,0,'当前用户',null,'系统功能列表','main');
d.add(2,1,'基本信息',"Login_Info.asp",'当前登录帐户的基本信息','main','',''); //为节点加上链接
d.add(3,1,'注消登录',"Login.asp?Work=LoginOut",'','main');
d.add(4,0,'资源管理',null,'','main');
d.add(5,4,'添加资源',"News_Add.asp?Work=AddReco",'添加资源','main','','');
d.add(6,4,'常规资源',"News_List.asp",'常规资源列表','main');
d.add(7,4,'未审核资源',"News_List.asp?Work=UnChecked",'未审核资源','main');
d.add(8,4,'资源回收站',"News_List.asp?Work=Dustbin",'资源回收站','main');
d.add(9,4,'移动资源',"News_Move.asp",'移动资源','main');
d.add(10,4,'附属信息',null,'','main');
d.add(11,0,'DEMO',null,'','main');
d.add(12,11,'Child1',"../default.asp",'Child1','main','','');
d.add(13,11,'Child2',null,'','main');
document.write(d); //绘制目录树
//-->
</SCRIPT>

