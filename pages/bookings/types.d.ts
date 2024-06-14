export interface UserType {
    name: string
    email: string
    phone: string
    age: string
}
  
interface BookingType {
    id: number
    idTravel: number
    paymentMethod: number
    note: string
}

interface BookingUserType {
    booking: BookingType
    user: UserType,
}