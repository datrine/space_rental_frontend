import profile from "./profile"

export let tenant = {
    ...profile,
    "id": null,
    "userId": null,
    "published_at": "",
    "created_at": "",
    "updated_at": "",
    "profileId": null,
    "budget": {
        id:0,
        lower:0,
        upper:0
    }
}