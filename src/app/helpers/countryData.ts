import countries from "../constants/countries"

export const getCountryData = (country: string) => {
    return countries.find(c => c.country.includes(country) || country.includes(c.country)) ?? { code: '', country: 'N/A', flag: '', phoneCode: '' }
}