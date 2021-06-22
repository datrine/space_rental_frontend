import { bankObj } from "./bankObj";
import { img } from "./img";

 const profile = {
  /**
   * @type {number}
   */
  "id": null,
  "f_name": null,
  "l_name": null,
  "m_name": null,
  "email": "",
  "gender": null,
  "phonenum": "",
  /**
   * @type {number}
   */
  "userId": undefined,
  "occupation": null,
  "dob": null,
  "address": null,
  "created_at": "",
  "updated_at": "",
  "prof_pic": img,
  "bankDetails": [bankObj],
}

export default profile