
var HashMap = require('hashmap');
var PriorityQueue = require('js-priority-queue');
class ParkingLot {
	constructor() {
		this.parkingArr = new Array();  //this array of objects which keep tracks of the all the cars and their drivers age
		this.totalParkings = 0;             //initially totalParkings slots is declared to zero
		this.free_slots = new PriorityQueue();  //free_slots is priorityQueue which is used to find the nearest empty parking slots
		this.age_allRegno = new HashMap();   // age_allRegno is the hashmap of  (age -> arrays of registeration Numbers)
		this.regno_slotno = new HashMap();   // regno_slotno is hashmap  of (registeration number -> slotno of that car)
		this.slotno_regno = new HashMap();   // slotno_regno is hashmap of (slotno -> registertaion number)
		this.slotno_age = new HashMap();     // slotno_age is hashmap of(slotno -> age)
	}

	create_parking_lot(totalParkingSlots) {
		this.totalParkings = totalParkingSlots;
		for (var i = 0; i <= this.totalParkings; i++) {       //initially parkingArray is initialised 
			var obj = new Object();
			obj[parseInt(i)] = null; ``
			this.parkingArr.push(obj);
		}
		for (var i = 1; i <= this.totalParkings; i++)
			this.free_slots.queue(parseInt(i));                 // initiLLY IN free_slots priority queue 1 to n numbers are inserted

		//console.log(this.parkingArr);
		return this.totalParkings;
	}
	findParking(parkingArr) {                           //this function finds whether parking is available or parking is full
		var ele = false;
		if (this.free_slots.length > 0)
			ele = true;
		return ele;
	}
	park(reg_no, age) {
		if (this.totalParkings > 0) {
			if (this.findParking() == true) {
				var available_slot = this.free_slots.dequeue();     // pop th esmallest slots from priority queue
				var inp = reg_no + ":" + age;
				this.parkingArr[available_slot][available_slot] = inp;                // parking array stores the all the  information

				this.regno_slotno.set(reg_no, available_slot);       //to store registeration number vs slot information
				this.slotno_regno.set(available_slot, reg_no);       // to store slot vs registeration number information
				this.slotno_age.set(available_slot, age);            //to store the slot vs driver age information

				if (this.age_allRegno.has(age)) {                     // to store the age vs array of registeration numbers
					var reg_nos = this.age_allRegno.get(age);
					this.age_allRegno.remove(age);
					reg_nos.push(reg_no);
					this.age_allRegno.set(age, reg_nos);
				}
				else {
					let arr_regno = new Array();
					arr_regno.push(reg_no);
					this.age_allRegno.set(age, arr_regno);

				}
				return available_slot;
			} else {
				return -1;
			}
		} else {
			return null;
		}
	}
	leave(slotNo) {                                         // function when car exits from the parking
		if (this.totalParkings > 0) {
			if (slotNo > 0 && slotNo <= this.totalParkings) {
				this.parkingArr[slotNo][slotNo] = null;
				var regno = this.slotno_regno.get(slotNo);
				var age = this.slotno_age.get(slotNo);

				this.slotno_age.remove(slotNo);
				this.slotno_regno.remove(slotNo);
				this.regno_slotno.remove(regno);

				let regnosofAge = this.age_allRegno.get(age);
				this.age_allRegno.remove(age);
				let new_regnosOfAge = new Array();
				for (var i = 0; i < regnosofAge.length; i++) {
					if (regnosofAge[i] != regno)
						new_regnosOfAge.push(regnosofAge[i]);
				}
				this.age_allRegno.set(age, new_regnosOfAge);
				this.free_slots.queue(slotNo);
				return [regno, age];
			}
		} else {
			return null;
		}
	}
	status() {                                               // function to get the current details of the parked cars
		var arr = new Array();
		if (this.totalParkings > 0) {
			arr.push("Slot No. Registration No. age ");
			for (var i = 1; i < this.parkingArr.length; i++) {
				if (this.parkingArr[i][i] != null) {
					arr.push(i + ".       " + this.parkingArr[i][i].split(":")[0] + "     " + this.parkingArr[i][i].split(":")[1]);
				}
			}
			return arr;
		} else {
			return [];
		}
	}
	registration_numbers_for_cars_with_driverage(age) {     //function which returns the registeration numbers of all the cars whose driver age = given age

		if (this.age_allRegno.has(age)) {
			return this.age_allRegno.get(age);
		}

		else {
			return null;
		}
	}
	slot_numbers_for_cars_with_age(age) {       //function which returns the  all slots numbers whose car driver age  => given age 
		if (this.age_allRegno.has(age)) {
			var regNos = this.age_allRegno.get(age);
			var slotNos = new Array();
			for (var i = 0; i < regNos.length; i++) {
				slotNos.push(this.regno_slotno.get(regNos[i]));
			}
			return slotNos;
		} else {
			return null;
		}
	}
	slot_number_for_registration_number(regno) {            //function which returns the slot number for a given registeration number

		if (this.regno_slotno.has(regno)) {
			var ele = this.regno_slotno.get(regno);
			return ele;
		} else {
			return null;
		}
	}


};
module.exports = ParkingLot;

