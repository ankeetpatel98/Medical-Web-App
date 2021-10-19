//Andrew's code for vital signs page

//Loads the html for the vitals signs page
$(document).on('click', '.vitalSigns', function()
{
    $('body').css("background-color","azure");
  
    $("#vs").prop("checked", true);
   
        $('#mainDisplay').hide();
        //Same Origin Policy please go away
        //$('#mainDisplay').load("vitalsigns.html");
        $('#mainDisplay').html('<div class="container-fluid"><div class="row"> <p id="patientName" style="font-size: 3em">Patient:</p></div><div class="row"><div class="col-6"><canvas id="ecg" width="550" height="250" style="background-color: black;"></canvas></div> <div class="col-6"><div class="row" style="color: green;">bpm</div><div class="row" id="bpm" style="color: green;font-size: 5em;">60</div></div></div><div class="row"> <div class="col-6"><div class="row" style="color: blue;">blood pressure</div><div class="row" id="bp" style="color: blue;font-size: 5em;">120/80</div></div> <div class="col-6"><div class="row" style="color: aqua;">spO2</div><div class="row" id="spo2" style="color: aqua;font-size: 5em;">98%</div></div></div><div class="row"><label for="dateInput">Date:</label><input type="text" id="dateInput" name="dateInput" style="padding-right: 10px"></div><div class="row"><label for="timeInput">Time:</label><input type="text" id="timeInput" name="timeInput" style="padding-right: 10px"></div><div class="row"><label for="pulseInput">Pulse:</label><input type="text" id="pulseInput" name="pulseInput" style="padding-right: 10px"></div><div class="row"><label for="bpInput">Bp:</label><input type="text" id="bpInput" name="bpInput" style="padding-right: 10px"></div><div class="row"><label for="o2Input">spo2:</label><input type="text" id="o2Input" name="o2Input" style="padding-right: 10px"><button type="button" id="saveVitals">Save</button></div></div>')
        .fadeIn();

        //Elias added this part to fix a bug when the page first loads in 
        if(window.justLoaded == true)
        {
            $('#gw').click();
            window.justLoaded = false;
        }
        
		var radioValue = $("input[name='patientOption']:checked").val();
        loadAndrewsInfo(radioValue);
		
		
});

//Get patient name and load canvas
function loadAndrewsInfo(patient)
{
	var radioValue = $("input[name='option']:checked").val();
	if(radioValue != "vs")
	{
		return; 
	}
	
    var local = localStorage.getItem("localDB");
    var dataobject = JSON.parse(local);
    var name = dataobject[patient].NAME;
    $('#patientName').html("Patient: " + name);

    window.canvas = document.getElementById("ecg");
    window.ctx = window.canvas.getContext("2d");
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    window.i = 0;
    window.data = window.EcgData[0].split(',');
    window.px = 0;
    window.opx = 0
    window.py = window.canvas.height/2;
    window.opy = py;
    window.ctx.strokeStyle = 'green';
    window.ctx.linewidth = 3;
    window.ctx.setTransform(1, 0, 0, -1, 0, window.canvas.height);
    drawWave();
}

//Draw ecg to canvas
function drawWave()
{
    window.px += 1;
    window.ctx.clearRect(window.px, 0, 20, window.canvas.height);
    window.ctx.beginPath();
    window.ctx.moveTo(window.opx, window.opy);
    window.ctx.lineJoin= 'round';
    window.py=(data[++i>=data.length? i=0 : i++]/250+window.canvas.height/2);
    window.ctx.lineTo(window.px, window.py);
    window.ctx.stroke();
    window.opx = window.px;
    window.opy = window.py;
    if (window.opx > canvas.width) {
        window.px = window.opx = -1;
    }

    var page = $("input[name='option']:checked").val();
    //Stop recursion if a new page is loaded or a new patient is selected
    if (window.newPatient == false) {
        if (page == "vs") {
            requestAnimationFrame(drawWave);
        }
    } else {
        window.newPatient = false;
    }
 }

 //When patient button is clicked, tell old drawWave to end otherwise they will pile up
 $(document).on('click', ".sideButton", function() {
     window.newPatient = true;
});

//Save vitals for shift
$(document).on('click', '#saveVitals', function(){
    var patient = $("input[name='patientOption']:checked").val();
    var date = $('#dateInput').val();
    var time = $('#timeInput').val();
    var pulse = $('#pulseInput').val();
    var bp = $('#bpInput').val();
    var o2 = $('#o2Input').val();
    if (!isNaN(pulse)) {
        var data = {};
        data["ID"] = patient;
        data["Date"] = date;
        data["Time"] = time;
        data["Pulse"] = pulse;
        data["BloodPressure"] = bp;
        data["spO2"] = o2;
        //Just log the vitals in a JSON because we don't actually have a database
        console.log(data);
    }
    else {
        alert("Invalid values");
    }
});

//Update the vital signs shown
function updateVitals() {
    setInterval(function() {
        var page = $("input[name='option']:checked").val();
        if (page == "vs") {
            //bpm
            var cur = $('#bpm').html();
            cur = parseInt(cur, 10);
            if (cur < 61) {
                cur++;
            } else if (cur > 59) {
                cur--;
            }
            $('#bpm').html(cur);

            //spo2
            cur = $('#spo2').html();
            cur = cur[0] + cur[1];
            cur = parseInt(cur, 10);
            if (cur < 99) {
                cur++;
            } else if (cur > 97) {
                cur--;
            }
            $('#spo2').html(cur + "%");
        }
    }, 2000);
}