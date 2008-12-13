<%@ include file="/common/taglibs.jsp"%>
<html>
<title><fmt:message key="404.title"/></title>
<content tag="heading"><fmt:message key="404.title"/></content>

<body>
    <p>
        <fmt:message key="404.message">
            <fmt:param><c:url value="/"/></fmt:param>
        </fmt:message>
    </p>
    <p style="text-align: center; margin-top: 20px">
        <a href="http://community.webshots.com/photo/87848122/87848260vtOXvy"
            title="Emerald Lake - Western Canada, click to Zoom In">
        <img style="border: 0" 
            src="<c:url value="/images/404.jpg"/>" 
            alt="Emerald Lake - Western Canada" /></a>
    </p>
</body>
</html>