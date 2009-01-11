Oracle到mysql迁移指南

1/文件掐头去尾

2/数值类型：

   NUMBER  DECIMAL，精度刻度都不变，注：如果是序列用BIGINT

字符串类型：

   VARCHAR2  VARCHAR长度不变。
   LONG  LONGTEXT

这里有可能遇到的问题是超过主键key长度的问题，根据实际情况适当修改，如果是TEXT类型也需要指名长度，否则建立key会报错

日期类型：

   DATE  DATETIME
   TIMESTAMP(N)  TIMESTAMP

4/to_date	=>正则搜索(?),替换
	
	
	1)to_date{[(]+}{[^)]*[,]+}		=》替换为{2}
	2)'dd-mm-yyyy hh24:mi:ss'), 		=>替换为空字符串
	3)NUMBER{[(]+[0-9]*[,]*[0-9]*[)]+}{[ |n|o|t|u|l]*} 	=>替换为DECIMAL{1}{2}
	4)VARCHAR2							=>替换为varchar


