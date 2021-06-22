import { img } from "./img";

export let space={
  id: undefined,
  "payment_format": null,
  "spaceInfo": {
    "houseType": "",
    "spaceCategory": "co_work",
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
      "dateRangeStrings": {
        "from": "",
        "to": ""
      }
    }
  },
  "spaceBills": {
    "charge": 0,
    "otherBills": 0,
    "billFormat": "day"
  },
  "spaceAmenities": [
    {
      "id": "",
      "desc": ""
    },
    {
      "desc": "",
      "id": ""
    },
    {
      "desc": "",
      "id": ""
    }
  ],
  "published_at": "",
  "created_at": "",
  "updated_at": "",
  "typeOfSpace": "office",
  "space_pics": [img]
}
