export default function RotatedApiKey(timestamp) {
  const date = new Date(timestamp * 1000);

  this.message = `Your api key has been rotated (expire at ${date.toISOString()}).
This exception thrown due to expire api key (rotated) and your application set partner.thrownAtRotateKey as true.
Set that variable as false if you wanna ignore it.`;
  this.name = "RotatedApiKeyError";
  this.code = 4;
}
