export const getMapPreview = (lat: number, lng: number) => {
	const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=600x300&maptype=roadmap&markers=color:green%7Clabel:S%7C${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`
	return mapPreviewUrl
}

export const convertLocationToAddress = async (lat: number, lng: number) => {
	const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}&enable_address_descriptor=true`
	const response = await fetch(URL)

	if (!response?.ok) {
		throw new Error('Failed to fetch address')
	}
	const data = await response.json()
	return data?.results?.[0]?.formatted_address
}