interface Coord {
    lat: number,
    lon: number
}

export interface City {
    id: number,
    name: string,
    state: string,
    country: string,
    IR: string,
    coord: Coord
}

//Weather
interface WeatherInfo {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface WeatherMain {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
}

interface WeatherWind {
    speed: number,
    deg: number,
    gust: number
}

interface WeatherSnowRain {
    '1h': number,
    '3h': number
}

interface WeatherClouds {
    all: number,
}

interface WeatherSys {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}

export interface Weather {
    base: string,
    visibility: number,
    dt: number,
    timezone: number,
    id: number,
    name: string,
    cod: number,
    coord: Coord,
    weather: Array<WeatherInfo>,
    main: WeatherMain,
    wind: WeatherWind,
    snow: WeatherSnowRain,
    rain: WeatherSnowRain,
    clouds: WeatherClouds,
    sys: WeatherSys
}

//FullWeather
interface WeatherCurrent {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust?: number,
    weather: Array<WeatherInfo>
    snow?: WeatherSnowRain,
    rain?: WeatherSnowRain,
}

export interface WeatherHourly {
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust?: number,
    pop: number,
    weather: Array<WeatherInfo>
}

//FullWeather.WeatherDaily
interface WeatherDailyTemp {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
}

interface WeatherDailyFellsLike {
    day: number,
    night: number,
    eve: number,
    morn: number
}

export interface WeatherDaily {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust?: number,
    weather: Array<WeatherInfo>
    uvi: number,
    clouds: number,
    pop: number,
    rain: number,
    snow: number,
    temp: WeatherDailyTemp,
    feels_like: WeatherDailyFellsLike,
}

export interface FullWeather {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: WeatherCurrent,
    hourly: Array<WeatherHourly>,
    daily: Array<WeatherDaily>,
    cod?: number
}

export type typeUnits = 'standard' | 'metric' | 'imperial'