import profile from "./profile"

export let renter = {
    ...profile,
    /**
     * @type {number}
     */
    "id": null,
    "email": "",
    "username": "",
    /**
     * @type {number}
     */
    "userId": null,
    /**
     * @type {number}
     */
    "profileId": null,
    "created_at": "",
    "updated_at": "",
    ...profile
}
