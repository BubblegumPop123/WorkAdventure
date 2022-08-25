import { getEnvConfig } from "@geprog/vite-plugin-env-config/getEnvConfig";

const PUSHER_URL = getEnvConfig("PUSHER_URL") || "//pusher.workadventure.localhost";
const FALLBACK_LOCALE = getEnvConfig("FALLBACK_LOCALE") || undefined;
const UPLOADER_URL = getEnvConfig("UPLOADER_URL") || undefined;
const EMBEDLY_KEY = getEnvConfig("EMBEDLY_KEY") || undefined;
const ICON_URL = getEnvConfig("ICON_URL") || undefined;
const enableOpenID = getEnvConfig("ENABLE_OPENID");
const ENABLE_OPENID =
    enableOpenID !== "" && enableOpenID != undefined && enableOpenID != "0" && enableOpenID.toLowerCase() !== "false";

export { PUSHER_URL, FALLBACK_LOCALE, UPLOADER_URL, EMBEDLY_KEY, ICON_URL, ENABLE_OPENID };