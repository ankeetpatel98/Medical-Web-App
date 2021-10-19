
//ELIAS CREATED CODE DO NOT MODIFY

//Function when the ventilator button is clicked
$(document).on('click','.ventilator', function(){
	$("#vt").prop("checked", true);
	$('body').css("background-color","rgb(255,234,148)");
	$('#mainDisplay').hide();
    $('#mainDisplay').html("<div class='row'><div class='col' style=' text-align: center; height: 130px;'><button type='button' class='cas' id='c' style='width: 100%; height: 100%; font-size: 50px;'> Controlled</button>	</div><div class='col' style='text-align: center;'><button type='button' class='cas' id='a' style='width: 100%; height: 100%; font-size: 50px;'> Assisted</button></div><div class='col' style=' text-align: center;'><button type='button' class='cas' id='s' style='width: 100%; height: 100%; font-size: 50px;'> Supported</button></div></div><br><br><br><div class='row'><div class='col' style=' text-align: center; height: 130px;'><button type='button' class='topRowButton' id='cbr' style='font-size: 40px; border: solid; pointer-events: none;'> Current Breathing Rate:</button>	</div><div class='col' style='text-align: center;'><input type='text' id='adjustbrText' class='adjust' style='width: 100%; height: 100%; font-size: 50px;'></div><div class='col' style=' text-align: center;' ><button type='button' class='adjust' id='adjustbr' style='width: 100%; height: 100%; font-size: 50px;'>Adjust Breathing Rate</button></div></div><br><br><br><div class='row'><div class='col' style=' text-align: center; height: 130px;'><button type='button'  class='topRowButton' id='cp' style='font-size: 40px; border: solid; pointer-events: none;'> Current Pressure:</button></div><div class='col' style='text-align: center;'><input type='text'  class='adjustText'  id='adjustcpText' style='width: 100%; height: 100%; font-size: 50px;'></div><div class='col' style=' text-align: center;' ><button type='button' class='adjust' id='adjustp' style='width: 100%; height: 100%; font-size: 50px;'> Adjust Pressure</button></div></div>")
	.fadeIn()

	radioValue = $("input[name='patientOption']:checked").val();
	loadEliassInfo(radioValue);	
});


//Actions to take when xray button is clicked
$(document).on('click', '.xrays', function(){
	$('body').css("background-color","rgb(255,169,168)");
	$("#xr").prop("checked", true);
    $('#mainDisplay').hide();
    $('#mainDisplay').html("<div class='row'<div class='row'style='height: 130px;'><div class='col' style=' text-align: center;' ><img  id='img1'></div><div class='col' style='text-align: center;' ><img  id='img2'></div><div class='col' style=' text-align: center;'><img id='img3'></div></div><br><br><br><br><br><br><br><div class='row' style='height: 130px;'><div class='col' style=' text-align: center;' ><img  id='img4'></div><div class='col' style='text-align: center;' ><img  id='img5'></div><div class='col' style=' text-align: center;' ><img id='img6'></div></div>")
	.fadeIn()
	

	//Update the radio button
	var radioValue = $("input[name='patientOption']:checked").val();
	loadEliassInfo(radioValue);
});  

//Change the value from nurse to physician 
$(document).on('click', '#login', function()
{
	if($("#login").val() == "n")
	{
		$("#login").prop("value", "p")
		$("#login").html("Physician")
	}
	else
	{
		$("#login").prop("value", "n")
		$("#login").html("Nurse")
	}
	
});

//Check to see if button in the ventilator has been pressed
$(document).on('click', ".cas", function()
{
	$(".cas").css({"border": "none"});
	if(this.id=="c")
	{
		
		$("#c").css({"border-style" : "solid", "border-width": "5px", "border-color": "black"});
	}

	if(this.id=="a")
	{
		
		$("#a").css({"border-style" : "solid", "border-width": "5px", "border-color": "black"});
	}

	if(this.id=="s")
	{
		
		$("#s").css({"border-style" : "solid", "border-width": "5px", "border-color": "black"});
	}

	//Save the change
	var JSONObject = localStorage.getItem("localDB");
	var db = JSON.parse(JSONObject);
	var radioValue = $("input[name='patientOption']:checked").val();
	db[radioValue].SUPPORT = this.id; 
	var JSONObject = JSON.stringify(db);
	localStorage.setItem("localDB", JSONObject);
});

//check to see if the patient buttons have been clicked
$(document).on('click', ".sideButton", function()
{
	
	$(".sideButton").css({"background-color" : "rgb(230,230,250, 1)"});
	if(this.id=="gw")
	{
		$("#gw1").prop("checked", true);
		$("#gw").css({"background-color" : "rgb(230,230,250, .9)"});
		loadAndrewsInfo("gw");
		loadAnkeetsInfo("gw");
		loadEliassInfo("gw");
	}
	if(this.id=="ja")
	{
		$("#ja1").prop("checked", true);
		$("#ja").css({"background-color" : "rgb(230,230,250, .9)"});
		loadAndrewsInfo("ja");
		loadAnkeetsInfo("ja");
		loadEliassInfo("ja");
	}
	if(this.id=="tj")
	{
		$("#tj1").prop("checked", true);
		$("#tj").css({"background-color" : "rgb(230,230,250, .9)"});
		loadAndrewsInfo("tj");
		loadAnkeetsInfo("tj");
		loadEliassInfo("tj");
	}
	if(this.id=="jmn")
	{
		$("#jmn1").prop("checked", true);
		$("#jmn").css({"background-color" : "rgb(230,230,250, .9)"});
		loadAndrewsInfo("jmn");
		loadAnkeetsInfo("jmn");
		loadEliassInfo("jmn");
	}
	if(this.id=="jme")
	{
		$("#jme1").prop("checked", true);
		$("#jme").css({"background-color" : "rgb(230,230,250, .9)"});
		loadAndrewsInfo("jme");
		loadAnkeetsInfo("jme");
		loadEliassInfo("jme");
	}
});


function loadEliassInfo(patient)
{
	
	var radioValue = $("input[name='option']:checked").val();
	if(radioValue == "xr")
	{
		
		var JSONObject = localStorage.getItem("localDB");
		var JSObject = JSON.parse(JSONObject);
		
		if(JSObject[patient] != null)
		{
			$('#mainDisplay').hide();
        $('#mainDisplay')
        .html("<div class='row'<div class='row'style='height: 130px;'><div class='col' style=' text-align: center;' ><img  id='img1'></div><div class='col' style='text-align: center;' ><img  id='img2'></div><div class='col' style=' text-align: center;'><img id='img3'></div></div><br><br><br><br><br><br><br><div class='row' style='height: 130px;'><div class='col' style=' text-align: center;' ><img  id='img4'></div><div class='col' style='text-align: center;' ><img  id='img5'></div><div class='col' style=' text-align: center;' ><img id='img6'></div></div>")
		.fadeIn()
	
			var picNum = JSObject[patient].XRAYS;
			for (var j=0; j<=6;j++)
			{
				var imageid = "#img" + j
				$(imageid).attr("src",'');
			}
			for (var j=1; j<=picNum;j++)
			{
				var imageid = "#img" + j
				var currentPic = patient + j + ".jpg"
				$(imageid).attr("src",currentPic);
			}
		}
      
	}

	if(radioValue == "vt")
	{
		$(".cas").css({"border": "none"});
	
		document.getElementById("adjustcpText").value = "";
		document.getElementById("adjustbrText").value = "";
		
		var JSONObject = localStorage.getItem("localDB");
		var JSObject = JSON.parse(JSONObject);
		var cbrValue = "Current Breath Rate: " + JSObject[patient].ABR;
		$("#cbr").html(cbrValue)

		var cpValue = "Current Pressure: " + JSObject[patient].AP;
		$("#cp").html(cpValue)

		var supportedValue = "#" + JSObject[patient].SUPPORT;

		$(supportedValue).css({"border-style" : "solid", "border-width": "5px", "border-color": "black"});
	}
}

//Make image full screen when xray is clicked
$(document).on('click','img',function(){
	var pic = this.src
	$('#mainDisplay').hide();
	$('#mainDisplay')
	
    .html("<div style='';><img style='width:100%; height:780px' src=' " +  pic + "'></div>")
	.fadeIn();
})



//If ventilator values are changed, ensure they are numeric values
$(document).on('click','#adjustbr', function(){
	
	var text = document.getElementById("adjustbrText").value;
	
	if(text.length == 0 || isNaN(text))
	{
		alert("Only numeric values can be saved"); 
		return; 
	}
	else{
		var JSONObject = localStorage.getItem("localDB");
		var db = JSON.parse(JSONObject);
		var radioValue = $("input[name='patientOption']:checked").val();
		db[radioValue].ABR = text 
		var JSONObject = JSON.stringify(db);
		
		
		localStorage.setItem("localDB", JSONObject);
		var cbrValue = "Current Breath Rate: " + text;
		$("#cbr").html(cbrValue)

		
	}
	
});


//If ventilator values are changed, ensure they are numeric values
$(document).on('click', '#adjustp', function(){
	var text = document.getElementById("adjustcpText").value;
	
	if(text.length == 0 || isNaN(text))
	{
		alert("Only numeric values can be saved"); 
		return; 
	}
	else{
		var JSONObject = localStorage.getItem("localDB");
		var db = JSON.parse(JSONObject);
		var radioValue = $("input[name='patientOption']:checked").val();
		db[radioValue].AP = text; 
		var JSONObject = JSON.stringify(db);
		localStorage.setItem("localDB", JSONObject);
		var cpValue = "Current Pressure: " + text;
		$("#cp").html(cpValue)
		
	}
});
