"use strict"

/* ********************************************************************************** */
/*										PROJECT     								  */
/* ********************************************************************************** */

var project;

function Project(name, namespace){
	this.name = name;
	this.namespace = namespace;
}

$( "#addProject" ).click(function(){
	if($( "#projectName").val() != '' && $( "#projectNamespace").val() != ''){
		$('#projectAlert').css('display', 'none');
		addProject($( "#projectName").val(),$( "#projectNamespace").val());
		$( "#profilePanel" ).css("display","block");
		$( "#generateXML" ).css("display","block");
	}else{
		$('#projectAlert').css('display', 'block');
	}
});
		
function addProject(projectName, projectNamespace){
	project = new Project(projectName,projectNamespace);
	generateXMLFromArray();
	console.log(project);
}

/* ********************************************************************************** */
/*										  PROFILE     								  */
/* ********************************************************************************** */

var profiles = [];

function Profile(name){
	this.name = name;
}

$( "#addProfile" ).click(function(){
	if($( "#profileName").val() != ''){
		$('#profileAlert').css('display', 'none');
		addProfile($( "#profileName").val());
		
		$( "#viewPanel" ).css("display","block");
		$( "#dragArea" ).css("display","block");
		
	}else{
		$('#profileAlert').css('display', 'block');
	}
});


function addProfile(profileName){
	profiles.push(new Profile(profileName));
	$( "#profileList" ).append("<li>" + profileName + "</li>");
	generateXMLFromArray();
	$( "#profileName").val('');
	console.log(profiles);
}

/* ********************************************************************************** */
/*										  VIEW       								  */
/* ********************************************************************************** */
var viewCounter = 0;
var views = [];

function View(id, name) {
	this.id = id;
	this.name = name;
	this.cordX = 5;
	this.cordY = 5;
	this.attributes = [];
}

$( "#addView" ).click(function() {
	if($( "#viewName").val() != ''){
		$('#viewAlert').css('display', 'none');
		addView($( "#viewName").val());
	}else{
		$('#viewAlert').css('display', 'block');
	}
});
		
function addView(viewName){
	
	viewCounter++;
	viewName = viewName;
	
	var singleView = new View(viewCounter,viewName);
	
	views.push(singleView);
		
	console.log(views);
	console.log("CLICKED ADD VIEW");

	$( ".dragContainer" ).append( "<div id='" + viewName + "' class='draggable'><div class='viewHeading'><strong>" + viewName + "</strong><button  type='button' id='" + viewName + "' onClick=removeView(\"" + viewName + "\")>x</button></div><div  class='viewContent'><div  class='viewAttributes'><button type='button' class='opener' id='" + viewName + "'  onClick=openAttributeDialog(\"" + viewName + "\")>+</button></div></div><div  class='viewFooter'><p class='text-muted'> Viewnr:" + viewCounter + "</p></div></div>" );
		
	generateXMLFromArray();
		
	$( function() {
		  $( ".draggable" ).draggable({
		  	  containment:"parent",
			  drag: function() {
				  var $this = $(this);
            	  var thisPos = $this.position();
				  var parentPos = $this.parent().position();

				  var x = thisPos.left - parentPos.left;
				  var y = thisPos.top - parentPos.top;

				  //console.log(x + ", " + y);
					 
			  },	  
			  stop: function(event, ui){
			      var $this = $(this);
				  var id = $(this).attr("id");
            	  var thisPos = $this.position();
				  var parentPos = $this.parent().position();

				  var x = thisPos.left - parentPos.left;
				  var y = thisPos.top - parentPos.top;
				  console.log("Position x => " + x + " && Position y => " + y);
				  var viewIndex = getViewID(id)-1;
				  views[viewIndex].cordX = x;
				  views[viewIndex].cordY = y;
			  }
		  });
		  } );
}
function getViewID(viewName){
	for(var i = 0; i < views.length; i++){		
		if(views[i].name === viewName){
			return views[i].id;
		}
	}
	return -1;
}

function getViewArrayIndex(viewName){
	for(var i = 0; i < views.length; i++){		
		if(views[i].name === viewName){
			return i;
		}
	}
	return -1;
}

function removeView(viewName){
	$( "#" + viewName ).remove();
	console.log(views);
	views.splice(getViewArrayIndex(viewName));
	console.log(views);
	generateXMLFromArray();
}



/* ********************************************************************************** */
/*										 ATTRIBUTE      							  */
/* ********************************************************************************** */

/* HELPER

<p:action function="getPostition" name="Position bestimmen" description=""/>
<p:input name="Ziel" description="geben Sie das Ziel ein" />
<p:output description="" name="Start: Wo bin ich" type="text" />
<p:transition description="open main" name=" zur Main" target="Main" />

*/

function Action(functionName, name, description, view){
	this.functionName = functionName;
	this.name = name;
	this.description = description;
	this.view = view;
}

function Input(name, description, view){
	this.name = name;
	this.description = description;
	this.view = view;
}

function Output(name, description, type, view){
	this.name = name;
	this.description = description;
	this.type = type;
	this.view = view;
}

function Transition(description, name, target, view){
	this.description = description;
	this.name = name;
	this.target= target;
	this.view = view;
}

var attributes = [];
var attribute;
 
function openAttributeDialog(viewName){
	console.log("ATTRIBUTE ADD BUTTON CLICKED");
	resetAttributeInput();
	//$( "#viewNameHelper" ).html(viewName);
    //$( "#dialog" ).data('viewName', viewName).dialog( "open" );
	//var actualView = $("#dialog").data('param_1')
	$( "#dialog" ).dialog( "open" );
	$("#acutalView").html(viewName);
	
	setAttributeForm(viewName);
}

$("#attributeSelect").change(function() {
	$("#attributeValuesForm").remove();
	attribute = $("#attributeSelect").val();
	setAttributeForm($( "#viewName").val());
	console.log("Gewählt:" + attribute);
});

function addAttribute(viewName){
	var functionAttribute = $("#functionAttribute").val();
	var nameAttribute = $("#nameAttribute").val();
	var descriptionAttribute = $("#descriptionAttribute").val();
	var typeAttribute =  $("#typeAttribute").val();
	var targetAttribute = $("#targetAttribute").val();
	var targetSelectOptions = $("#targetSelectOptions").val();
	var targetAttribute = $("#targetAttribute").val();
	
	attribute = $("#attributeSelect").val();
	
	console.log("Button CLICKED ADD ATTRIBUTE");
	console.log(viewName);
	
	if(attribute == "action"){
	
		if(functionAttribute != '' && nameAttribute != '' && descriptionAttribute != ''){
			$('#viewAttributeAlert').css('display', 'none');
			attributes.push(new Action(functionAttribute, nameAttribute, descriptionAttribute, viewName));
			//$( "#"+ viewName ).append("<p>F: " + functionAttribute + "</p>");
			$( "#"+ viewName ).append("<p><strong>A</strong>: " + nameAttribute + "</p>");
			//$( "#"+ viewName ).append("<p>D: " + descriptionAttribute + "</p>");
			console.log(attributes);
			
			views[getViewArrayIndex(viewName)].attributes.push(new Action(functionAttribute, nameAttribute, descriptionAttribute, viewName));
			
			resetAttributeInput();
		}else{
			$('#viewAttributeAlert').css('display', 'block');
		}
		
	}
	
	if(attribute == "input"){
	
		if( nameAttribute != '' && descriptionAttribute != ''){
			$('#viewAttributeAlert').css('display', 'none');
			attributes.push(new Input(nameAttribute, descriptionAttribute, viewName));
			$( "#"+ viewName ).append("<p><strong>I</strong>: " + nameAttribute + "</p>");
			//$( "#"+ viewName ).append("<p>D: " + descriptionAttribute + "</p>");
			console.log(attributes);
			
			views[getViewArrayIndex(viewName)].attributes.push(new Input(nameAttribute, descriptionAttribute, viewName));
			
			resetAttributeInput();
		}else{
			$('#viewAttributeAlert').css('display', 'block');
		}
		
	}
	
	if(attribute == "output"){
	
		if( nameAttribute != '' && descriptionAttribute != ''){
			$('#viewAttributeAlert').css('display', 'none');
			attributes.push(new Output(nameAttribute, descriptionAttribute, typeAttribute, viewName));
			$( "#"+ viewName ).append("<p><strong>O</strong>: " + nameAttribute + "</p>");
			//$( "#"+ viewName ).append("<p>D: " + descriptionAttribute + "</p>");
			//$( "#"+ viewName ).append("<p>D: " + typeAttribute + "</p>");
			console.log(attributes);
			
			views[getViewArrayIndex(viewName)].attributes.push(new Output(nameAttribute, descriptionAttribute, typeAttribute, viewName));
			
			resetAttributeInput();
		}else{
			$('#viewAttributeAlert').css('display', 'block');
		}
		
	}
	
	if(attribute == "transition"){
		console.log(nameAttribute + " -> " + descriptionAttribute + " -> " + targetAttribute);
		if( nameAttribute != '' && descriptionAttribute != '' && targetAttribute != null){
			$('#viewAttributeAlert').css('display', 'none');
			attributes.push(new Transition(nameAttribute, descriptionAttribute, targetAttribute, viewName));
			//$( "#"+ viewName ).append("<p>N: " + nameAttribute + "</p>");
			//$( "#"+ viewName ).append("<p>D: " + descriptionAttribute + "</p>");
			//$( "#"+ viewName ).append("<p>D: " + targetAttribute + "</p>");
			$( "#"+ viewName ).append("<p><strong>T</strong> : ( " + viewName + " / " + targetAttribute + " )</p>");
			console.log(attributes);
			
			views[getViewArrayIndex(viewName)].attributes.push(new Transition(nameAttribute, descriptionAttribute, targetAttribute, viewName));
			
			resetAttributeInput();
		}else{
			$('#viewAttributeAlert').css('display', 'block');
		}
		
	}
	
	generateXMLFromArray();
}

/*

functionAttribute
name
description 
type 
target

*/
function resetAttributeInput(){
	$("#functionAttribute").val('');
	$("#nameAttribute").val('');
	$("#descriptionAttribute").val('');
	$("#typeAttribute").val('');
	$("#targetAttribute").val('');
	$("#targetSelectOptions").val('');
}

function setAttributeForm(viewName){
	
	$("#functionAttribute").val('');
	$("#nameAttribute").val('');
	$("#descriptionAttribute").val('');
	$("#typeAttribute").val('');
	$("#targetAttribute").val('');
	$("#targetSelectOptions").val('');
	
	switch ($("#attributeSelect").val()) {
		case "action":
			$("#functionAttributeInput").css("display", "block");
			$("#nameAttributeInput").css("display", "block");
			$("#descriptionAttributeInput").css("display", "block");
			$("#typeAttributeInput").css("display", "none");
			$("#targetAttributeInput").css("display", "none");
			break;
		case "input":
			$("#functionAttributeInput").css("display", "none");
			$("#nameAttributeInput").css("display", "block");
			$("#descriptionAttributeInput").css("display", "block");
			$("#typeAttributeInput").css("display", "none");
			$("#targetAttributeInput").css("display", "none");
			break;
		case "output":
			$("#functionAttributeInput").css("display", "none");
			$("#nameAttributeInput").css("display", "block");
			$("#descriptionAttributeInput").css("display", "block");
			$("#typeAttributeInput").css("display", "block");
			$("#targetAttributeInput").css("display", "none");
			break;
		case "transition":
			$("#functionAttributeInput").css("display", "none");
			$("#nameAttributeInput").css("display", "block");
			$("#descriptionAttributeInput").css("display", "block");
			$("#typeAttributeInput").css("display", "none");
			$("#targetAttributeInput").css("display", "block");
			console.log(views);
			
			console.log(checkIfExists);
			for(var i = 0 ; i < views.length; i++){
				
				var checkIfExists = false;	
				
				if(viewName == views[i].name){
					checkIfExists = true;
				}
				
				if(!checkIfExists){
					console.log( "abc 123 ");
					if($("option:contains('" + views[i].name + "')", "#targetAttribute").length<1){
						$("#targetAttribute").append(" <option value='" + views[i].name + "'>" + views[i].name + "</option>");
					}
				}
			}
			
			break;
	}
}

/* ********************************************************************************** */
/*										 DRAGGABLE       							  */
/* ********************************************************************************** */

$( function() {
	$( ".draggable" ).draggable({
		  containment:"parent",
	 });
} );
		
$( "#dialog" ).dialog({
	autoOpen: false,
	resizable: false,
    height: "auto",
	width:"50%",
    modal: true,
	dialogClass: 'no-close',
    buttons: {
		"Hinzufügen": function() {
          addAttribute($("#acutalView").text());
        },
        "Abbrechen": function() {
          $( this ).dialog( "close" );
        }
	},
    show: {
        effect: "blind",
        duration: 1000
    },
    hide: {
        effect: "explode",
        duration: 1000
    }
});		

/* ********************************************************************************** */
/*										 	 XML        							  */
/* ********************************************************************************** */

var xmlString;

$( "#generateXML" ).click(function() {
	generateXMLFromArray();
	sendXMLData();
});	
		
function generateXMLFromArray(){
	//var editor;
	
	xmlString = "<";
	xmlString += "?xml version='1.0' encoding='UTF-8'?>\n\n";
	xmlString += "<p:app appname='" + project.name + "' package='" + project.namespace + "'\n";
	xmlString += "	xmlns:p='" + project.namespace + "' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'>\n";
	//xmlString += "	xsi:schemaLocation='org.accaptp accapto_model.xsd'>\n";
	//xmlString += "	<p:profile>no restrictions</p:profile>\n\n";
	for(var p = 0; p < profiles.length; p++){
		xmlString += "<p:profile>" + profiles[p].name + "</p:profile>\n";
	}	
	xmlString += "\n";
	for(var v = 0; v < views.length; v++){
		xmlString += "<p:screen name='" + views[v].name + "'>\n";
			for(var a = 0; a < views[v].attributes.length; a++){
				var key;
				xmlString += "	<p:" + views[v].attributes[a].constructor.name.toLowerCase();
				for(key in views[v].attributes[a]){
					if(key != "view"){
						xmlString += " " + key + "='" + views[v].attributes[a][key] + "'";
					}
				}
				xmlString += " /> \n";
			}
		xmlString += "</p:screen>\n\n";
	}
		
	xmlString += "</p:app>";
		
	console.log(xmlString);
	
	$("#xmlPrepare").text(xmlString);

	$(".cm-s-default").remove();
	var readOnlyCodeMirror = CodeMirror.fromTextArea(document.getElementById('xmlPrepare'), {
        mode: "xml",
        theme: "default",
        lineNumbers: true,
        readOnly: true
    });  
				
}
		
function sendXMLData(){
		
	var dataString = "xmlString=" + xmlString + "&projectName=" + project.name;
		
	// AJAX Code To Submit xmlString to generate XML document.
	$.ajax({
		type: "POST",
		url: "xmlwriter.php",
		data: dataString,
		cache: false,
		success: function(result){
			alert(result);
		}
	});
		
}
	