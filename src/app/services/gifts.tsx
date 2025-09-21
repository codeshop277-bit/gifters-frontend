import axios from "axios"
import { baseUrl } from "../../../utils/baseurl"

type GiftDetails = {
    name: string,
    link: string,
    price: number,
    description: string
}

export const addGift = async (giftDetails: GiftDetails, userId: number) => {
    const url = `${baseUrl}/gifts/${userId}`
}
