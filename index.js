const DISCORD = "ckay9.cameron";
const copyDiscordToClipboard = () => {
    navigator.clipboard.writeText(DISCORD);
    alert(`Copied ${DISCORD} to your clipboard`);
}