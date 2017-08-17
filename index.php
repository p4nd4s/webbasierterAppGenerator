 <!DOCTYPE html>
<html lang="en">
	<head>
    	<meta charset="utf-8">
		<title>Bachelorarbeit 2</title>
		<link rel="stylesheet" type="text/css" href="dist/boostrap/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="css/template.css">
			<!-- Create a simple CodeMirror instance -->
	<link rel="stylesheet" href="dist/codemirror-5.28.0/lib/codemirror.css">
	
	</head>

 	<body>

 	<div class="container">
		<div class="row">
			<div class="att">
				<h1>Webbasierter Generator für Apps</h1>
				<hr>
			
			<!-- Projekteinstellungen -->
			
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h3 class="panel-title">Projekteinstellungen</h3>
					<p>Legen Sie hier den Namen und den Namespace des Projektes fest.</p>
					<span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
				</div>
				<div class="panel-body">
					<div class="alert alert-danger" role="alert" id="projectAlert">Bitte füllen Sie alle Felder aus!</div>
					<div class="form-horizontal">
					  <div class="form-group">
						<label for="projectName" class="col-sm-2 control-label text-left">Projektname</label>
						<div class="col-sm-10">
						  <input type="text" class="form-control" id="projectName" placeholder="Projektname">
						</div>
					  </div>
					  <div class="form-group">
						<label for="projectNamespace" class="col-sm-2 control-label text-left">Projekt Namespace</label>
						<div class="col-sm-10">
						  <input type="text" class="form-control" id="projectNamespace" placeholder="Projekt Namespace">
						</div>
					  </div>
					  <div class="form-group">
						<div class="col-sm-12 text-center">
						  <button type="button" class="btn btn-default" id="addProject">Projekt Daten anlegen</button>
						</div>
					  </div>
					</div>
				</div>
			</div>
			
			<!-- Projekteinstellungen Ende -->
			
			<!-- Profile -->
			
			<div class="panel panel-primary" id="profilePanel">
				<div class="panel-heading">
					<h3 class="panel-title">Profile</h3>
					<p>Legen Sie hier die gewünschten Profile des Projektes fest (1...n)</p>
					<span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
				</div>
				<div class="panel-body">
					<div class="alert alert-danger" role="alert" id="profileAlert">Bitte füllen Sie alle Felder aus!</div>
					<div class="form-horizontal">
					  <div class="form-group">
						<label for="profileName" class="col-sm-2 control-label text-left">Profilname</label>
						<div class="col-sm-10">
						  <input type="text" class="form-control" id="profileName" placeholder="Profilename">
						</div>
					  </div>
					  <div class="form-group">
						<label for="profileList" class="col-sm-2 control-label text-left">Bestehende Profile</label>
						<div class="col-sm-10" id="profileList">
						  	<ul>
						  		
						  	</ul>
						</div>
					  </div>
					  <div class="form-group">
						<div class="col-sm-12 text-center">
						  <button type="button" class="btn btn-default" id="addProfile">Profil anlegen</button>
						</div>
					  </div>
					</div>
				</div>
			</div>
			
			<!-- Profile Ende -->
			
			<!-- Screen Management -->
			
			<div class="panel panel-primary" id="viewPanel">
				<div class="panel-heading">
					<h3 class="panel-title">Screen Management</h3>
					<p>Legen Sie hier Ihre Screen an und verwalten Sie diese in der folgenden Drag Area.</p>
					<span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
				</div>
				<div class="panel-body">
					<div class="alert alert-danger" role="alert" id="viewAlert">Bitte füllen Sie alle Felder aus!</div>
					<div class="form-horizontal">
					  <div class="form-group">
						<label for="viewName" class="col-sm-2 control-label text-left">Screen Name</label>
						<div class="col-sm-10">
						  <input type="text" class="form-control" id="viewName" placeholder="Screen Name">
						</div>
					  </div>
					  <div class="form-group">
						<div class="col-sm-12 text-center">
						  <button type="button" class="btn btn-default" id="addView">Screen erstellen</button>
						</div>
					  </div>
					</div>
				</div>
			</div>
			
			<!-- Screen Management Ende -->	
				
			</div>
		</div> 	
	</div>
 	
 	<!-- Dragable Bereich -->
 	
 	<div class="wrapper">
		<div class="row" id="dragArea">
			<div class="col-md-12 projectSettings">
				<h2 id="projectNameSet"></h2>
				<p id="projectNamespaceSet"></p>
			</div>
			<div class="col-md-12">
				<div class="dragContainer">

				 </div>
			</div>
		</div>
		
	<!-- Dragable Bereich Ende -->
	
	<!-- Screen Dialog -->
	
		<div id="dialog" title="Attribut hinzufügen">
			<h3>Aktueller Screen: <strong id="acutalView"></strong></h3>
			<p>Wählen Sie Ihr gewünschtes Attribut und füllen die Felder aus, um es dem Screen hinzuzufügen.</p>
			<div class="alert alert-danger" role="alert" id="viewAttributeAlert">Bitte füllen Sie alle Felder aus!</div>
			<select id="attributeSelect" name="Attribute">
				<option value="action">Action</option>
				<option value="input">Input</option>
				<option value="output">Output</option>
				<option value="transition">Transition</option>
			</select> 
			<br>
			<br>
			<div id="attributeValues"></div>
			<br>
			<div class="attributeValuesForm">
				
				<div class="form-horizontal">
					  <div class="form-group" id="functionAttributeInput">
						<label for="functionAttribute" class="col-sm-2 control-label text-left">Funktion</label>
						<div class="col-sm-10">
						  <input type="text" class="form-control" id="functionAttribute" placeholder="Funktion">
						</div>
					  </div>
					  <div class="form-group" id="nameAttributeInput">
						<label for="nameAttribute" class="col-sm-2 control-label text-left">Name</label>
						<div class="col-sm-10">
						  <input type="text" class="form-control" id="nameAttribute" placeholder="Name">
						</div>
					  </div>
					  <div class="form-group" id="descriptionAttributeInput">
						<label for="descriptionAttribute" class="col-sm-2 control-label text-left">Beschreibung</label>
						<div class="col-sm-10">
						  <input type="text" class="form-control" id="descriptionAttribute" placeholder="Beschreibung">
						</div>
					  </div>
					  <div class="form-group" id="typeAttributeInput">
						<label for="typeAttribute" class="col-sm-2 control-label text-left">Type</label>
						<div class="col-sm-10">
						  <input type="text" class="form-control" id="typeAttribute" placeholder="Type">
						</div>
					  </div>
					  <div class="form-group" id="targetAttributeInput">
						<label for="targetAttribute" class="col-sm-2 control-label text-left">Ziel</label>
						<div class="col-sm-10" >
						 	<select name="targetAttribute" form="targetsOptions" id="targetAttribute" placeholder="Ziel">
								<option value="" disabled selected>Wähle ein Ziel</option>
							</select>
						</div>
					  </div>
				</div>
				
				
			</div>
			<br>
		</div>
		
		<!-- Screnn Dialog Ende -->
		
		<br>
		<br>
		
		<!-- XML Ausgabe -->
		
		<div class="row" id="liveView">
			<div class="col-md-12">
				<h3>XML Output</h3>
				<hr>
				<p class="lead">Dieser Output wird durch das Hinzufügen eines Projektes und den damit verbundenen Screen erweitert. Zudem werden Attribute zu den entsprechenden Screens angezeigt.</p>
			</div>
			<div class="col-md-12">
				<textarea rows="40" style="width:100%;" id="xmlPrepare">

				</textarea>
			</div>
		</div>
		
		<!-- XML Ausgabe Ende -->
		
		<br>
		<br>
		<button type="button" class="btn btn-primary" id="generateXML">Generate and Download XML</button>
		<br>
		<br>

	</div><!-- /.container -->
 
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="dist/codemirror-5.28.0/lib/codemirror.js"></script>
	<script src="dist/codemirror-5.28.0/mode/xml/xml.js"></script>
	<script src="dist/jQuery/jquery.js"></script>
	<script src="dist/jQuery/jquery-ui.js"></script>
	<script src="dist/boostrap/js/bootstrap.min.js"></script>
	<script src="js/main.js" async defer></script>	
	
	<script type="text/javascript">
		$(document).on('click', '.panel-heading span.clickable', function(e){
			var $this = $(this);
			if(!$this.hasClass('panel-collapsed')) {
				$this.parents('.panel').find('.panel-body').slideUp();
				$this.addClass('panel-collapsed');
				$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
			} else {
				$this.parents('.panel').find('.panel-body').slideDown();
				$this.removeClass('panel-collapsed');
				$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
			}
		});

	</script>
	
</body>
</html>