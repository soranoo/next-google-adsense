const PUBLISHER_ID_REGEX = /^pub-\d{16}$/;
const SLOT_ID_REGEX = /^\d{10}$/;

export function isPublisherId(id: string | undefined): boolean {
  if (typeof id !== "string") {
    return false;
  }
  return PUBLISHER_ID_REGEX.test(id);
}

export function isSlotId(id: string | undefined): boolean {
  if (typeof id !== "string") {
    return false;
  }
  return SLOT_ID_REGEX.test(id);
}
