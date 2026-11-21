// A contact field (phone, email, hours, mapsUrl, instagram, facebook,
// whatsapp) is shown when it has a value AND its own `*Enabled` flag isn't
// explicitly `false`. The flag is absent on restaurants saved before this
// toggle existed, so `undefined` defaults to "on" for backward compatibility.
export function isContactFieldOn(value: string | undefined, enabled: boolean | undefined): boolean {
  return !!value && enabled !== false;
}
