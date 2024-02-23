export default async function getLocation() {
    try {
        // const res = await fetch('https://ipapi.co/json');
        // const data = await res.json();
        // return `${data.region}, ${data.postal}, ${data.country}`;
        return 'da im dorf'
    } catch (error) {
        console.error(error);
        return 'Unable to fetch location';
    }
}