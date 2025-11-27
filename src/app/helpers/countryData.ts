import countries from "../constants/countries"

export const getCountryData = (country: string) => {
    if(!country)
        return { code: '', country: 'N/A', flag: '', phoneCode: '' }
    return countries.find(c => c.country.includes(country) || country.includes(c.country)) ?? { code: '', country: 'N/A', flag: '', phoneCode: '' }
}

export const getCountryOptions = countries.map(c => ({  value: c, label: c.country }));