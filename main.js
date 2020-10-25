var http = require('http');
var fs = require('fs');       // fs module is used to read a file
var elements = process.argv;

var ParkingLot = require('./src/utils.js');  // src/utils.js contains ParkingLot class
var config = require('./src/configuration.js');
var configObj = new config();

var port = process.env.Port || configObj.port;

var totalParkings = 0;
let ParkingSystem = new ParkingLot();    //creating instance of Parkinglot class

fs.readFile(elements[2], 'utf-8', function (err, data) {         //reading file demo.txt
    var commandsArr = data.split("\n");                          //creates the command array 
    for (var i = 0; i < commandsArr.length; i++) {
        commands(commandsArr[i]);                                //each command is pass to the command function
    }

});

function commands(input) {
    var n = input.split(" ")[0];                                  //to find out the command name
    if (n == "Create_parking_lot") {
        totalParkings = ParkingSystem.create_parking_lot(parseInt(input.split(" ")[1]));   //this function will create the 'n' parking slots
        console.log("Created parking of " + totalParkings + " slots");
    }
    else if (n == "Park") {
        var reg_no = input.split(" ")[1];                              //to get the registeration  number
        var age = parseInt(input.split(" ")[3]);                       //to get the driver age
        var slotNumber = ParkingSystem.park(reg_no, age);             //this is called when  new  car is parked
        if (slotNumber)
            console.log("Car with vehicle registration number \"" + reg_no + "\" has been parked at slot number " + slotNumber);
        else if (slotNumber == -1) {
            console.log("Sorry, parking is full");                   //if car parking is full -1 is returned from the function
        }
        else
            console.log("parking is not created");                   // function  returns the null  if parking is not created

    }
    else if (n == "Leave") {
        var slotNo = parseInt(input.split(" ")[1]);                 // to get the slot number of the car which is going to leave
        var [regno, age] = ParkingSystem.leave(slotNo);              //functions returns the registeration number and age of the driver
        if (regno) {
            console.log("Slot number " + slotNo + " vacated, the car with vehicle registration number \"" + regno + "\" left the space, the driver of the car was of age " + age)
        } else {
            console.log("parking is not created ");
        }
    }
    else if (n == "Status") {
        var values = ParkingSystem.status();                      // this function shows the current status of the parking and displays the slot no, regNo,age
        if (values.length > 1) {
            console.log(values.join("\n"));
        } else {
            console.log("Parking is not created");
        }
    }
    else if (n == "Vehicle_registration_number_for_driver_of_age") {
        let age = parseInt(input.split(" ")[1]);                             //to get the age 
        var regNum = ParkingSystem.registration_numbers_for_cars_with_driverage(age); //function to find all registeration numbers whose age equals to given age
        if (regNum) {
            var RegNos_Cars = "";
            for (var i = 0; i < regNum.length; i++) {
                RegNos_Cars += "\"" + regNum[i] + "\"";
                if (i != regNum.length - 1)
                    RegNos_Cars += ",";
            }
            console.log(RegNos_Cars);
        } else {
            console.log("null");                          // if no car is present whose driver age is equals to given age
        }
    }
    else if (n == "Slot_numbers_for_driver_of_age") {
        let age = parseInt(input.split(" ")[1]);              //to get the age
        var slotNumbers = ParkingSystem.slot_numbers_for_cars_with_age(age);  //function to get the slotnumbers whose car driver age is equal to given age
        if (slotNumbers) {
            var Slots = "";
            for (var i = 0; i < slotNumbers.length; i++) {
                Slots += slotNumbers[i];
                if (i != slotNumbers.length - 1)
                    Slots += ",";
            }
            console.log(Slots);
        } else {
            console.log("null");                        //if no car is present whose driver age is equal to given age
        }
    }
    else if (n == "Slot_number_for_car_with_number") {
        var regno = input.split(" ")[1];                   //to get th eregisteration number
        var slotNumber = ParkingSystem.slot_number_for_registration_number(regno);  //function to find the slot number of a given registeration number
        if (slotNumber) {
            console.log(slotNumber);
        } else {
            console.log("This car is not parked in this parking");
        }
    }
    else {
        console.log("Invalid command")               //if command is not valid
    }
}


http.createServer(function (req, res) {
    res.writeHead(200, { 'content-Type': 'text/plain' });
    res.end('Server is up and running \n');
}).listen(port);

