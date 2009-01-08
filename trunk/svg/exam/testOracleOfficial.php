<?php

    $db_conn = ocilogon("hr", "your_hr_password", "//127.0.0.1/XE");

    $cmdstr = "select last_name, salary from employees";

    $parsed = ociparse($db_conn, $cmdstr);
    ociexecute($parsed);

    $nrows = ocifetchstatement($parsed, $results);

    echo "<html><head><title>Oracle PHP Test</title></head><body>";
    echo "<center><h2>Oracle PHP Test</h2><br>";
    echo "<table border=1 cellspacing='0' width='50%'>\n<tr>\n";
    echo "<td><b>Name</b></td>\n<td><b>Salary</b></td>\n</tr>\n";

    for ($i = 0; $i < $nrows; $i++ )
    {
      echo "<tr>\n";
      echo "<td>" . $results["LAST_NAME"][$i] . "</td>";
      echo "<td>$ " . number_format($results["SALARY"][$i],   2). "</td>";
      echo "</tr>\n";
    }

    echo "<tr><td colspan='2'> Number of Rows: $nrows</td></tr></table>";
    echo "<br><em>If you see data, then it works!</em><br></center></body></html>\n";

  ?>
