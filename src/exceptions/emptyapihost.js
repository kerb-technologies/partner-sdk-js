export default function EmptyApiHost() {
  this.message = `No api host provide on request.
        Api host need to be set as environment variable with name KERB_PARTNER_HOST.`

  this.name = 'EmptyApiHost'
  this.code = 1
}
