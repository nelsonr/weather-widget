export interface Weather {
    location: Location
    current: Current
}

export interface Location {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
}

export interface Current {
    temp_c: number
    is_day: number
    condition: Condition
    feelslike_c: number
}

export interface Condition {
    text: string
    icon: string
    code: number
}
