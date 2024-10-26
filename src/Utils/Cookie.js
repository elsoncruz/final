export const setUpCookie = (name, value) => {
    document.cookie = `${name}=${value}`
}

export const getFromCookie = (name) => {
    const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`));

    return cookies ? cookies.split("=")[1] : null;
}