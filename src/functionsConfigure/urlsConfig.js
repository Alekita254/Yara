const hostname = window.location.hostname; // Get the current hostname
const pathname = window.location.pathname; // Get the current pathname
const apiUrl =
    hostname === "127.0.0.1" || hostname === "127.0.0.1"
        ? "http://127.0.0.1:5000/api/"
        : `http://${hostname}:5000/api/`;

const downloadLinkUrl =
    hostname === "localhost" || hostname === "127.0.0.1"
        ? "http://localhost:5000/"
        : `http://${hostname}:5000/`;

const locationData = {
    pathname: pathname,
    hostname: hostname,
    apiUrl: apiUrl,
    downloadLinkUrl: downloadLinkUrl,
};

export default locationData;
