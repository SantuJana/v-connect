const getProfileImageName = (name: string) => {
    const nameParts = name.split(" ");
    const leadChars = [nameParts[0], nameParts.at(-1)].map(part => part?.at(0)?.toUpperCase());
    return leadChars;
}

export default getProfileImageName;