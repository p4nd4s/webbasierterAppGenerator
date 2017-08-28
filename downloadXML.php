<?php
$filename = $_GET['filename'];
header("Content-Type: text/xml");
header("Content-Disposition: attachment; filename=\"$filename\"");
header("Content-Length:" . filesize("output/" . $filename));
readfile("output/" . $filename);

?>