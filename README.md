## Problem Statement
We own a parking lot that can hold up to ‘n’ cars at any given point in time. Each slot is given a number starting at one increasing with increasing distance from the entry point in steps of one. We want to create an automated ticketing system that allows our customers to use our parking lot without human intervention.
When a car enters the parking lot, we want to have a ticket issued to the driver. The ticket issuing process includes:-
<br/>
1. We are taking note of the number written on the vehicle registration plate and the age of the driver of the car.<br/>

2  And we are allocating an available parking slot to the car before actually handing over a ticket to the driver (we assume that our customers are kind enough to always park in the slots allocated to them).<br/>
The customer should be allocated a parking slot that is nearest to the entry. At the exit, the customer returns the ticket, marking the slot they were using as being available.
Due to government regulation, the system should provide us with the ability to find out:-<br/>
- Vehicle Registration numbers for all cars which are parked by the driver of a certain age,<br/>
- Slot number in which a car with a given vehicle registration plate is parked. <br/>
- Slot numbers of all slots where cars of drivers of a particular age are parked.<br/>
We interact with the system via a file-based input system, i.e. it should accept a filename as an input. The file referenced by filename will contain a set of commands separated by a newline, we need to execute the commands in order and produce output.<br/>


## Some Analysis of the Time Complexities:
1)To get the vehicles registeration numbers of all the cars whose driver age  equals to given age => this can be find O(1) time hashmap is used which stores ages as the key and array of registeration numbner as values. <br/>
2) To get the slot number of the given registeration number => o(1) time -hashmap is used which stores slot number as a key and registeration number as a value. <br/>
3)To get the slot numbers whose driver age is equal to given age-> o(1). <br/>
4)To find the avalable slot which is nearest to the entry point-> o(log(N)) priority queue is used which gives the minimum available slot in O(logN)  time . <br/>
5) One aray of objects is used in which at each  index represent the slot number and values represent the regiteration number,age of the driver which nis used to display the current statu sthe parking lot. <br/>

## Instructions to run the code
1)install nodejs from here https://nodejs.org/en/download/ <br/>
2)clone this project in any directory. <br/>
3) Then using the terminal window go to folder in which this project is downloaded <br/>
4) run command-  npm install                  // this willl install all the dependencies and node_modules folder will be created <br/>
5) Run command- node main.js demo.txt         // main.js is th entry point and demo.txt is simple text file which contains all the commands <br/>

