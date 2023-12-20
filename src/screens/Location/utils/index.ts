export const getMapPreview = (lat: number, lng: number) => {
	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=600x300&maptype=roadmap&markers=color:green%7Clabel:S%7C${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`

	return imagePreviewUrl
}