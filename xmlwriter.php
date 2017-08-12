<?php


//Fetching values from ajax request
$projectName=$_POST['projectName'];
$xmlString=$_POST['xmlString'];

$date = new DateTime();
$filename = $projectName . "-" . $date->getTimestamp() . ".xml";
echo $filename;
echo "Daten erfolgreich erhalten";

$projectFile = fopen($filename, "w") or die("Unable to open file!");
fwrite($projectFile, $xmlString);
fclose($projectFile);

?>