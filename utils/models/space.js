import { img } from "./img";

export let space={
  id: undefined,
  "payment_format": null,
  "space_mode":"rentable",
  "spaceInfo": {
    "houseType": "",
    "spaceCategory": "",
    "spaceCondition": "furnished",
    "bedroomNumber": 0,
    "bathroomNumber": 0,
    "kitchenNumber": 0,
    "sittingNumber": 0
  },
  "flatmateInfo": [],
  "spaceRules": [
    {
      "desc": "Pets allowed",
      "id": ""
    },
    {
      "desc": "No smoking allowed",
      "id": ""
    }
  ],
  "renterId": undefined,
  "userId": undefined,
  "locationInfo": {
    "cityOrTown": "",
    "area": "",
    "address": ""
  },
  "nameOfSpace": "",
  "descOfSpace": "",
  "spaceAvailabiltyInfo": {
    "lengthOfStay": undefined,
    "datesInfo": {
      "dateMode": "asRange",
      "dateRangeStrings":  {
        from: (new Date()).toISOString(),
        to: (new Date()).toISOString(),
    }
    }
  },
  "spaceBills": {
    "charge": 0,
    "otherBills": 0,
    "billFormat": "day",
    billEstimate:0
  },
  "spaceAmenities": [
    {
      "id": 0,
      "desc": "Running water"
    },
    {
      "id": 1,
      "desc": "Electricity"
    }
  ],
  "published_at": "",
  "created_at": "",
  "updated_at": "",
  "typeOfSpace": "office",
  "space_pics": [img]
}
