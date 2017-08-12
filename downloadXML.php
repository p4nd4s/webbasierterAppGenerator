<?php

$file ="asd-1497025659.xml";
header("Content-Type: text/xml");
header("Content-Disposition: attachment; filename=asd-1497025659.xml");
header("Content-Length:" . filesize($file));
readfile($file);

?>