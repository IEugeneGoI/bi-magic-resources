export const DATA_URLS = [
    "https://rcslabs.ru/ttrp1.json",
    "https://rcslabs.ru/ttrp2.json",
    "https://rcslabs.ru/ttrp3.json",
    "https://rcslabs.ru/ttrp4.json",
    "https://rcslabs.ru/ttrp5.json",
];

export const fetchData = async (url) => {
    const response = await fetch(url);
    if (response.ok) return await response.json();
};
