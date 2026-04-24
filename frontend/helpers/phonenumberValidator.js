export function phonenumberValidator(phoneNumber) {
  if (!phoneNumber) return "Phone number can't be empty."
  if (phoneNumber.length < 10) return 'Phone numbe must be 9 digits long.'
  if (phoneNumber.length > 10) return 'Phone number is too long.'
  if (!/^\d+$/.test(phoneNumber)) return 'Phone number must contain only digits.'

  return ''
}