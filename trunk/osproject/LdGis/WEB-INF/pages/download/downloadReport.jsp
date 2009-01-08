<%@ page import= "java.io.*,java.net.*" %><%
    try{
        //取得虚拟的路径
        String fn = "attachment; filename=a.xls";  //必须改为UniCode编码的字符串
        System.out.println(fn);
        //把标题、内容写到输出流中
        response.setHeader("Content-Disposition", new String(fn.getBytes("GB2312"),
                                        "ISO-8859-1"));
        createOutput( response.getOutputStream(),"c:\\ltf.xls");
    }catch( Exception ee ){
        ee.printStackTrace();
    }
%><%!
public void createOutput( OutputStream out,String realpath ) throws IOException {
    int b;
    BufferedInputStream  m_input =
                new BufferedInputStream( new  FileInputStream(realpath) );
    while( (b = m_input.read()) != -1 ){
        out.write(b);
    }
    m_input.close();
    out.flush();
    out.close();
}
%>
<%--
		// 得到文件名字和路径
		String filename = request.getParameter("zipfilename");
		//String jsppath = "";             getServletConfig().getServletContext().getRealPath("") + 
 		String filepath = "c:\\ltf.xls";        //jsppath.substring(0,jsppath.lastIndexOf("")) + "reports\\";
		System.out.println("---------------=================" + filepath);
		java.io.FileInputStream fileInputStream = null;
		//out.println(filepath);
		// 设置响应头和下载保存的文件名
		response.setHeader("Content-Disposition",
		"attachment; filename=" + "a.xls");
		response.setContentType("application/msexcel");
	
		// 打开指定文件的流信息
		try{
		fileInputStream =
			new java.io.FileInputStream(filepath);
		
		// 写出流信息
		int i;
		while ((i=fileInputStream.read()) != -1) {
			out.write(i);
		}
		fileInputStream.close();
		out.close();
		System.out.println("---OK---------------");
		
		}catch(Exception ee){
		  ee.printStackTrace();
		}
--%>
