Quick-Start FAQ
===============

To learn how to develop your J2EE webapps with AppFuse, see 
http://raibledesigns.com/wiki/Wiki.jsp?page=Articles (or docs/index.html if you 
downloaded the AppFuse source distribution). You can also download all the 
latest documentation to the "docs" directory by running "ant wiki".

To build this application - you must be using Ant 1.6.2+.  You will also need 
to copy junit.jar into your $ANT_HOME/lib directory.

Then setup Tomcat 4.1.x+ and install an SMTP server on localhost.  If you don't 
want to install an SMTP server, change web/WEB-INF/classes/mail.properties to 
point to an existing one.

To run this application, you will need to perform the following tasks:

1.  The default database setup expects a mysql database installed with
    an admin user named "root" and no password.  If your system is different,
    modify properties.xml or build.properties to override the default values.
2.  Run "ant setup-db".  This creates a mysql database named "LdGis" and
    grants the user "test" (password: test) full rights to this database.
3.  Test that the db access code works with:
    ant test-dao -Dtestcase=UserDAO
    ant test-service -Dtestcase=UserManager
4.  Setup Tomcat by running "ant setup-tomcat".  This puts a MySQL JDBC 
    driver (and jta.jar) in $CATALINA_HOME/common/lib, and also deploys an 
    LdGis.xml file to $CATALINA_HOME/webapps ($CATALINA_HOME/conf/Catalina/
    localhost on Tomcat 5) and deploys the application.
5.  Start Tomcat and test the web login using:
    ant test-canoo -Dtestcase=Login
        
** TO SETUP E-MAIL NOTIFICATION OF ERRORS **
Log4j has a pretty slick feature where you can have e-mail messages sent
to you when an ERROR is logged.  To set this up, perform the following
steps:
  1. Change the property "error.mailTo" in build.properties to be your
     e-mail address.
  2. Edit WEB-INF/classes/log4j.properties to add "mail" to the rootCategory.
     Example: log4j.rootCategory=INFO, stdout, mail


Features/Changes in 1.7
============================
- Added support for JSF (MyFaces) and Tapestry as web framework options.
    http://raibledesigns.com/page/rd?anchor=integrating_jsf_and_tapestry_into_LdGis
- Added support for exporting PDFs from a displaytag-rendered table.
- Changed URIs for imported XML files in build.xml to use relative paths.
    https://LdGis.dev.java.net/issues/show_bug.cgi?id=102
- Fixed package-name bug when generating a new WebWork projects.
    https://LdGis.dev.java.net/issues/show_bug.cgi?id=101
- Added "fixcrlf" target for Unix machines to run when they're having issues 
    installing packages in the "extras" folder.
- Dependent packages upgraded:
    * DisplayTag 1.0 RC2
    * Hibernate 2.1.7
    * iBATIS 2.0.8
    * Spring 1.1.3-dev 
        ** Would have done 1.1.2, except the following bug exists:
           http://forum.springframework.org/viewtopic.php?t=2118
    * WebWork 2.1.6
    

Features/Changes in 1.6.1
============================
- Changed Service Tests to use JMock for mocking DAO dependencies.
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=86
- Re-arranged filters-mappings in metadata/web/filter-mappings.xml to 
  fix exporting Excel with Display Tag. 
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=74
- Fixed LabelTag to read JSTL's fallback locale from web.xml.
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=75
- Changed copy-resources task to only run "native2ascii" task on 
  Chinese properties files. 
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=76
- Fixed XDoclet form-generation template (struts_form.xdt) for generating
  nested forms.
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=77
- Moved exportFilter and compressionFilter filter-mappings to come after
  encodingFilter to solve NoSuchMethodException when using zh_CN locale.
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=79
- [Spring MVC] Fixed JavaScript bug on signup page.
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=80
- Enhancements to test/web-tests.xml to be more i18n friendly.
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=81
- Fixed bug in Commons Validator support for Spring. An alternative
  solution is to put the validator beans in applicationContext-service.xml.
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=82
- [Spring MVC] Fixed server-side validation for Edit Profile when logged
  in as "tomcat" user.
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=83
- Fixed applicationContext-*.xml path to load each file individually so
  deploying AppFuse as a WAR works.  Will revert back after next release
  of Spring. https://LdGis.dev.java.net/issues/show_bug.cgi?id=85
- Changed UserManager.saveUser to throw checked UserExistsException when 
  DataIntegrityViolationException occurs.
- Patched XDoclet so that running "ant setup test-all" will work again.
  http://opensource.atlassian.com/projects/xdoclet/browse/XDT-879 
- Added CruiseControl files and documentation to extras/cruisecontrol.  
- Created tests for the "extras" like Equinox has.
- Created "appgen" tool that creates everything for CRUDing an object.
- Fixed Spring MVC implementation so getText() method uses the current
  request's locale. 
  https://LdGis.dev.java.net/issues/show_bug.cgi?id=89
- Dependent packages upgraded:
    * Ant Contrib 1.1b1
    * Canoo WebTest build 543
    * Cargo 0.3 (now supports Tomcat 5.5.x)
    * DisplayTag 1.0 RC2 Nightly (to fix unicode export)
    * XDoclet 1.2.2
- Dependent packages added:
    * jMock 1.0.1 - a library for testing Java code using mock objects.
    

Features/Changes in 1.6
============================
- Integrated WebWork as a web framework choice.  To install WebWork (replacing
  Struts) in a fresh AppFuse project, simply run "ant install-webwork".
- Refactored to use SiteMesh instead of Tiles.  Proposal and feedback at: 
    http://raibledesigns.com/page/rd?anchor=should_i_ditch_tiles_in
    Good Article: http://www.onjava.com/pub/a/onjava/2004/09/22/sitemesh.html
    Experience documented at: http://raibledesigns.com/page/rd/20040821
- Re-worked User and Roles relationship to take advantage of Hibernate more.
  Thanks to Daniel Kibler for the patch:
    https://LdGis.dev.java.net/issues/show_bug.cgi?id=69
- Removed UserFormEx and replaced with ability to "merge" methods into an 
  ActionForm using XDoclet.  See metadata/web for xdoclet-UserForm.java
  which now contains methods merged into the generated UserForm.java.
- Modified struts_form.xdt to support nested objects.  Moved address information
  from org.LdGis.model.User to org.LdGis.model.Address to and created
  NestedFormTest to verify it works.  This template will pick up any nested 
  object validations rules.
- Changed "org.LdGis.persistence" package name to "org.LdGis.dao".  Moved
  "*ManagerImpl" classes to "service.impl" package.
- Changed stylesheet colors for Spring MVC option to be green instead of red.
  Bug 47 - https://LdGis.dev.java.net/issues/show_bug.cgi?id=47.
- Refactored logging so Base classes contain a "log" variable that children
  don't need to override. More at:
    http://raibledesigns.com/page/rd?anchor=log_debug_vs_logger_debug
- Refactored toString(), equals() and hashCode() methods in BaseObject to be 
  abstract so child classes have to implement custom methods. Bug at: 
    https://LdGis.dev.java.net/issues/show_bug.cgi?id=65.
  Commonclipse (http://commonclipse.sf.net) can generate the methods for you.
  	Learn more at: http://www.leegrey.com/hmm/2004/09/29/1096491256000.html
- Added Cargo to simplify starting and stopping Tomcat before running Canoo 
  WebTests.  Unfortunately, the 0.2 release doesn't work with Tomcat 5.5.x.
- Refactored all web frameworks to allow for testing out-of-container.  This
  means that "test-web" will now work w/o Cactus or the container running.
    Learn more at: http://raibledesigns.com/page/rd?anchor=ann_cargo_0_2_released
- Removed MainMenuTest, which was a demonstration of how to write tests using
  HttpUnit.  This test caused more problems than it solved.
- Changed target names in build.xml: define-tasks -> init, init -> prepare. 
  Reworked build.xml so XDoclet tasks don't execute when they don't need to.
- Added translations for French and Spanish.
- Added PasswordHintTest for those controllers and actions that implement this
  feature.
- Added SimpleMappingExceptionResolver for Spring version to catch 
  DataAccessExceptions and forward the user to dataAccessFailure.jsp.  Added
  this same functionality to the WebWork version.
- Added message to the Reload Action so users will see a message when reloading
  options.  Message is currently hard-coded to English in Actions/Controllers.
- Removed proprietary State and Country Tags.  Implemented custom CountryTag
  (thanks Jens Fischer) and made state into a text box since not all countries 
  have "states".
- Reworked mail support to use Spring's MailSender and changed account 
  information e-mail (for Spring and WebWork options) to use a Velocity template.  
  This was partially motivated by all the questions I get on Sending 
  Velocity-based E-Mail with Spring.
  http://jroller.com/page/raible/20040406#sending_velocity_based_e_mail
- Consolidated all mail settings to mail.properties (in web/WEB-INF/classes).
- Added support for detecting and configuring Tomcat 5.5.x. 
    http://tinyurl.com/5ebdh
- Renamed "Secure" tag library to "SecureTag" for consistency.
- Added field-level errors (using html:errors) to Struts JSPs and viewgen for 
  Struts.
- Changed column names in User object from camelCase to normal database_names.
- Added fallback locale of 'en' in metadata/web/web-settings.xml in case no
  bundle is found for the browser's preferred locale.
- Added native2ascii task in copy-resources to encoded to ascii with unicode 
  escapes. 
- Added Dumbster (http://quintanasoft.com/dumbster/) to catch and verify 
  e-mail messages sent during test execution.
- Changed parameter key for indicating methods in Struts Actions from "action" 
  to "method" in order to alleviate conflicts with the "action" attribute
  in an HTML form.
- Changed name of generated WAR file to *not* include the version number. 
  Having the version number as part of the name seemed to cause more problems
  than it solved.
- Added forkmode="true" to junit task in "test-module" target - greatly 
  increasing the speed of test execution - particularly on my PowerBook.
    http://raibledesigns.com/page/rd?anchor=aren_t_out_of_container
- Dependent packages upgraded:
    * DbUnit 2.1
    * Display Tag 1.0 RC1
    * Hibernate 2.1.6
    * iBATIS 2.0.7
    * JSTL 1.0.6
    * MySQL JDBC Driver 3.0.14
    * Spring 1.1.1
    * Struts 1.2.4
    * Struts Menu 2.3
    * Struts Test Case 2.1.2
    * WebTest build474
    * XDoclet 1.2.2 RC1
      ** WARNING: Running "ant setup test-all" will result in the error:
                  "destDir attribute must be present." Running "ant setup" 
                  and then "ant test-all" is an easy workaround.
                  http://opensource.atlassian.com/projects/xdoclet/browse/XDT-879                  
- Dependent packages added:
    * Cargo 0.2 - A set of Ant tasks for starting and stopping Java containers.
    * Dumbster 1.2 - A fake SMTP server used to catch and verify messages in
      unit tests.
    * SiteMesh 2.2 - A page-decoration package that will work across different 
      web frameworks.
    * URL Rewrite Filter 1.2 - Added and included in WAR, but disabled by
      default.  See web/WEB-INF/urlrewrite.xml for more information.
- Dependent packages removed:
	* State Tag and Country Tag - required a $75 license for production use.
	* Cactus - no longer needed as all tests can be run out-of-container and 
	  Cargo can be used to start Tomcat for in-container (JSP) tests.


Features/Changes in 1.5
============================
- Added Spring MVC as a web framework option. You can install it by navigating
  to "extras/spring" and typing "ant install".  Includes Commons Validator
  and XDoclet support for generating validation.xml.  I also ported the 
  LabelTag so it works with Spring as well.  Make sure and read the README.txt
  in extras/spring for issues I encountered while developing.
- Changed extension for default Controller to be *.html.  We're serving up
  HTML, so it makes sense (to me) to use this instead of .do?  I'm also 
  motivated because I want to be more MVC framework-agnostic.
- Removed Struts dependency from "services" layer.  Actions can use a convert()
  method to transfer POJOs to Forms and vise versa.
- Fixed i18n (thanks Jaap!) - now reads from the user's browser's settings.
  Available languages are English, Dutch (Jaap van der Molen), Brazilian 
  (Gilberto Caetano de Andrade) and Chinese (Paul Wang).
- Fixed bug where logout didn't work when Remember Me was disabled (issue #3).
- Fixed bug in struts_form.xdt where invalid code generated for ObjectFactory
  inner class (issue #2).  Also added "indexedProperties" attribute to 
  @struts.form tag.  This is so indexed property support is only generated when 
  the user wants it to be.  Indexed property support is NOT generated by 
  default. Here is an example: 
    @struts.form include-all="true" extends="BaseForm" indexedProperties="true"
  - More information at: 
    http://raibledesigns.com/wiki/Wiki.jsp?page=XDocletIndexedProperties
- Modified XDoclet to create a standalone "actionform" task that generates
  ActionForms from POJOs.  See the "compile-web" target for more information.
- Added activation.jar, mail.jar and jta.jar to "tomcat-setup" target for 
  easier setup of Tomcat.
- Fixed deploy-web task so invalid test-only files are not copied to webapps
  directory.
- Added CurrencyConverter and DateConverter to BaseManager and ConvertUtils
  initialization.  Added currency mask to validation-global.xml. Also
  changed default Long to be null instead of zero (0).
- Added Editable Table example (at http://localhost:8080/LdGis/users.jsp) 
  using the displaytag and JSTL's SQL Tags.
- Added Dynamic (database-driven) menu example using Struts Menu (at
  http://localhost:8080/LdGis/dynamicMenu.jsp).
- Added BaseDAOHibernate with convenience methods: getObject(), saveObject,
  removeObject().
- Added documentation on common Ant targets I use:
  http://raibledesigns.com/wiki/Wiki.jsp?page=AppFuseAntTasks
- Added ReloadAction to reload drop-downs initialized in StartupListener. 
  Also added "Reload Options" menu item under "Administration" to invoke 
  this action.
- Changed Tomcat 5 detection to use a class from 5.0.x rather than parsing
  the folder name of the installed server.
- Added encoding options for UTF-8 so AppFuse can handle languages such as
  Chinese. (Thanks Paul Wang)
- Moved StrutsGen Tool and iBatis install to a common "extras" folder.
- Renamed StrutsGen Tool to JSPGen so it can be used to generate default
  master/detail screens for other frameworks.
- Changed Struts Menu to use MenuContextListener for initialization since its
  framework-agnostic.
- Dependent packages upgraded:
    * Hibernate 2.1.3
    * WebTest build 432
    * XDoclet 1.2.1-dev (generation of validation.xml for Spring and ActionForm
      generation that doesn't require j2ee.jar in classpath)
    * Velocity 1.4
- Dependent packages added:
    * Request Taglib 1.0.1 (can be used instead of "logic:present role='...'" 
      since it can be used across JSP-based MVC frameworks)
        ** Not used in Struts MVC, *is* used in Spring MVC
        ** Needs to be modified to support a comma-delimited list of roles.


Features/Changes in 1.4
=======================
- Added "cactus" task for running Cactus tests in Tomcat 4.x and Resin 3.0.5.
- Added Tomcat Ant tasks for managing tomcat with the Manager app and Ant.
  - Currently supports: install, remove, start, stop, reload and list.
  - I recommend using "ant setup-tomcat deploy" and then using "ant reload"
    after running "ant deploy" when you change .java or config files.
- Removed "upload" module and integrated file-upload into the core. Removed 
  unnecessary scriplets from uploadForm.jsp.
- UI Enhancements: 
  - Changed CSS for error messages to have a red border around them - making
    it easier to distinguish errors from messages.
  - Added onclick and onfocus event handler to form inputs to select the 
    text when an input type="text" is clicked or focuses on.
- Changed directory structure from common/ejb/web to dao/service/web. 
  More information on this change at:
  http://raibledesigns.com/page/rd?anchor=LdGis_refactorings_part_i_changing
- Added Spring to configure Hibernate, DAOs and Managers.  Configured 
  declarative transactions at the service and dao layers.  Configured 
  OpenSessionInViewFilter for guaranteeing one transaction per request.
  More information on this change at:
  http://raibledesigns.com/page/rd?anchor=LdGis_refactorings_part_ii_spring
- Changed UserCounterListener to only record users that have logged in 
  successfully.  Also added a screen to show currently logged in users.
- Changed default session timeout to 10 minutes instead of 60.
- Implemented persistent login cookie strategy (for Remember Me) as 
  recommended by Charles: http://tinyurl.com/2wyqr
  More information on this change at:
  http://raibledesigns.com/page/rd?anchor=LdGis_refactorings_part_iii_remember
- Added iBATIS as a persistence framework option.  More information on this
  feature can be found at:
  http://raibledesigns.com/page/rd?anchor=LdGis_refactorings_part_iv_replacing
- Added custom web.xml XDoclet template for ordering filters and listeners.
- Added support for generating indexed property setters in ActionForms when
  generating Forms with XDoclet.  This support includes adding Velocity JARs
  to the the list of 3rd party JARs.  Currently, Velocity is only used by 
  XDoclet.
- Added "Account Information" e-mail as part of registration process.  This
  e-mail gets sent the e-mail address the user entered on signup.
- Dependent packages upgraded:
    * Cactus 1.6 Nightly (20030119) to support the "cactus" task and Resin 
      3.0.5
    * JSTL 1.0.5
    * Patched Canoo's WebTest to work with Ant 1.6
    * Hibernate 2.1.2
    * MySQL JDBC Driver 3.0.11


Features/Changes in 1.3
=======================
- Many changes to database settings so that database.properties is generated
  at run-time from properties in build.properties (defaults to MySQL).  This
  makes it easy for users to run a MySQL database in development and have a
  DB2 database (or any other) in production.  Just customize your database 
  settings and put them in ~/.build.properties or ~/.appname- build.properties
  and these settings will be used instead of the default.
  - As part of this process, I tested AppFuse on DB2 8.1 (on Windows) 
    and PostgreSQL 7.4 (on OS X).  
  - Testing on other servers caused me to change from generator-class="native"
    to generator-class="increment" - which still works fine on MySQL.
  - I also changed tomcat-context.xml to dynamically substitute database
    properties and defaultAutoCommit is now "true" by default.
- Added error pages for 404 (page not found) and 403 (access denied), both 
  with pretty pictures. ;0) Protected /editUser.do for admin role only.
- Moved filter-mappings from Filter's JavaDocs (XDoclet) to 
  metadata/web/filter-mappings.xml in order to control the order of execution.
- Made RememberMe feature configurable via a "rememberMe.enabled" property in
  app-settings.xml. This won't kick on resin until the filter is invoked at
  least once.  Tomcat initializes filters on startup.
- Upgraded oscache.jar in Hibernate 2.1.1 to OSCache 2.0.1 and configured
  OSCache to cache JSP changes.  Also modified the oscache-2.0.1.jar to have
  a URI for the tag library.  Turned off caching of JSP pages - to enable, 
  uncomment filter-mapping in metadata/web/filter-mappings.xml.
- Made changes to be Resin 3.0.4 friendly.  More info at:
  http://raibledesigns.com/wiki/Wiki.jsp?page=AppFuseOnResin
- Refactored BaseDAOHibernate to consolidate retrieveObject and removeObject
  methods.  Also changed saveObject to do ses.saveOrUpdate and removed 
  storeObject method. 
- Replaced CompressionFilter with GZipFilter that works on Resin.
  http://www.onjava.com/pub/a/onjava/2003/11/19/filters.html
- Added print stylesheet support.
- Added Clickstream (http://www.opensymphony.com/clickstream) and menu/JSPs to
  view user paths.
- Dependent packages upgraded:
    * XDoclet 1.2.0
    * Cactus 1.6 Nightly (20030116) to support "cactus" task for supporting
      a "contextxml" attribute for testing in Tomcat.
  

Features/Changes in 1.2
=======================
- Backed out Http Post for Remember Me.  It was not redirecting user to the page
  they originally requested.  Using reponse.sendRedirect does send the user
  to the proper location.  Turned on password encryption (SHA) to protect any
  passwords that end up in log files.  Turned off encryption in Tomcat.
- Changed configuration parameters in servlet context to be in a hashmap.
- Improvements to StrutsGen tool to generate list screen as well and to fill
  in more missing elements.
- Changed to close Hibernate session when object not found in BaseDAOHibernate.
- Dependent packages upgraded:
    * Hibernate 2.1.1
    * Struts Menu 2.1
    * WebTest Build 379
- Fixed bug in UserAction.save: when creating a new user, role defaults to 
  "tomcat" regardless of what the user chooses.
  
  
Features/Changes in 1.1
=======================
- Documentation!  Now includes tutorials (in docs/index.html) for doing a full
  master-detail lifecycle (database to JSP).  HowTos are pulled from my wiki
  (http://raibledesigns.com/wiki) using "ant wiki".  Please update the wiki
  if you find any errors in the documentation.
- Now requires J2EE 1.4 - if you're not there yet, simply change the paths
  for activation.jar and mail.jar in properties.xml (look for 
  common.compile.classpath). You can use j2ee.jar instead of mail.jar and
  activation.jar for 1.3 and 1.4 B2.
- Dependent packages upgraded:
    * Hibernate 2.1
    * Struts Nightly Build 20031202
    * Display Tag Library 1.0 Beta 2
- Fixed bugs in build.xml "new" target to copy Eclipse files (.project and
  .classpath) into new project.
- Fixed issues in error.jsp, ActionExceptionHandler, UserDAOHibernate and 
  RegistrationServlet where exceptions weren't being reported accurately.
- Modified template for creating JSPs from ActionForms to more closely match
  current design.
- Renamed targets in test/web-tests.xml to be CamelCase.  I changed these 
  because when you're typing -Dtestcase=Name, I've found that I'm used to 
  doing CamelCase for my JUnit Tests.
- Fixed bug on signup.jsp where State and Country didn't retain values
  when an error occurred.
- Removed "copy-jars" target in build.xml - moved the process of including 
  jars into the war task of the package-web target.
- Fixed "setup-tomcat" target to detect Tomcat 5 and deploy LdGis.xml
  to $CATALINA_HOME/conf/Catalina/localhost instead of $CATALINA_HOME/webapps.
- Changed "test-common" task to work with J2EE 1.4 Final.  This involved
  removing ${j2ee.jar} from the classpath and adding mail.jar and 
  activation.jar explicitly.  You can change this in properties.xml.
  
  
Features/Changes in 1.0
=======================
- Dependent packages upgraded: 
    * Cactus 1.5
    * DBUnit 1.5.6
    * Hibernate 2.0.3
    * Struts Menu 2.0
    * JSTL 1.0.4
    * MySQL Driver 3.0.9
- Refactored "Remember Me" to be more secure by setting cookies only under
  the "/security/*" path and only retrieving them from there.
    - Renamed BreadCrumbFilter to LoginFilter and removed Breadcrumb 
      functionality (wasn't used anyway).
- Improved security of "Remember Me" to do an HTTP POST (instead of a GET)
  using commons HttpClient.  This way usernames and password will not show
  up in the user's browser address bar, their browser's history, or server
  log files.
- Removed Hibernate's Session from DAO and Manager method signatures - now
  it an object is passed into the implementation constructors.
- Refactored DAOFactory to return DAOs based on types of objects in the
  constructors (Bear Giles).
    - Example from LookupDAOTest.java:
        dao = (LookupDAO) DAOFactory.getInstance(conn, LookupDAO.class);
- Decoupled Manager interfaces from Struts - now only objects are passed, then
  cast to ActionForms in the ManagerImpl classes.
    - Currently there is no factory for creating Managers, should there be one?
    - Possibly use Spring to give ManagerImpl's to Actions.
- Refactored Actions to pass Objects for Open-Session-In-View Pattern and
  removed daoType variable from Manager's contructors and it's clients (Actions
  and Tests).
- Upgraded to nightly build (November 11th) of Struts.  Details available at:
  http://raibledesigns.com/page/rd?anchor=upgrading_from_struts_1_1
- Added BaseManagerTestCase and BaseDAOTestCase for common methods and 
  populating objects (i.e. Forms and POJOs) from .properties files.  If you
  put a .properties file in the same directory as a *Test.java, it will
  be loaded and available as a ResourceBundle - assigned to variable "rb".
    - Example from UserManagerTest.java:
        userForm = new UserForm();
        // call populate method in super class to populate test data
        // from a properties file matching this class name
        userForm = (UserForm) populate(userForm);
- Removed JUnitDoclet comments from existing tests.  I did this because
  I found they were confusing when trying to explain JUnit and the testcases
  to peers.
- Removed JUnit TestSuites - not needed since junit task and batchtest handle 
  this.
- Added DateUtil.java and DateUtilTest.java, as well as calendar.js for popup
  calendars (from http://www.mattkruse.com/javascript/calendarpopup/).
- Added enhancements to error handling and logging in ActionExceptionHandler
  and error.jsp.  Details available at: 
  http://jroller.com/page/prpatel?anchor=handling_the_three_kinds_of
- Changed User Profile to retain password since it's encrypted anyway.
- UNTESTED: Removed mysql values from being hardcoded in build.xml. Should work 
  with PostgreSQL by changing mysql properties to postgresql properties in 
  properties.xml.  
    - Look for "database.jar" to begin changing to postgresql - 
      there are commented out versions for postgresql.  
    - You will also need to change metadata/web/tomcat-context.xml for 
      PostgreSQL.
    - You will need to download the database driver for postgresql and put it
      in the lib directory and adjust lib.properties appropriately.
- Added auto-generation of "reset" method (for booleans) in generated 
  ActionForms - accomplished by modifying struts_form.xdt.
- Removed Parent and Child Objects and any accompanying sample data. Get the
  tag 0_9_9 if you want to play with them.
- Added SwitchLayoutAction (not used) - more details available at:
  http://raibledesigns.com/page/rd?anchor=tiles_tips_o_the_day
- Added compile-jsp.xml for pre-compiling JSPs in Tomcat. You can run it using
  "ant -f compile-jsp.xml".

###
